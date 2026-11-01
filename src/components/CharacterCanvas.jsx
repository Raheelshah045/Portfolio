import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';
import { Sparkles, Camera, Eye } from 'lucide-react';

/**
 * CharacterCanvas Component
 * =============================================================
 * Real-time 3D character viewport engineered for Raheel Jamal.
 * 
 * Capabilities:
 * - Native GLTF/GLB loader with DRACO compression support
 * - Dynamic AnimationMixer handling idle and triggered gestures
 * - Head/torso bone tracking responding subtly to cursor coordinates
 * - Loading progress tracking with percentage telemetry
 * - Graceful error handling and asset specifications fallback
 * - IntersectionObserver render-loop suspension when off-screen (0% GPU/CPU idle)
 * - Accessibility: Full prefers-reduced-motion integration
 * - Mobile optimization: pixelRatio clamping, antialias disabling
 * - Static optimized hologram card fallback
 */
export default function CharacterCanvas({ isOpeningActive = false }) {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const mixerRef = useRef(null);
  const characterGroupRef = useRef(null);
  const bonesRef = useRef({ head: null, neck: null, spine: null, rightArm: null });
  const isVisibleRef = useRef(true);

  // Status & Telemetry State
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [modelType, setModelType] = useState('detecting'); // 'custom_glb' | 'procedural_rig'
  const [loadError, setLoadError] = useState(null);
  const [webGLSupported, setWebGLSupported] = useState(true);
  const [viewMode, setViewMode] = useState('3d'); // '3d' | 'static_card'
  const [poseMode, setPoseMode] = useState('front'); // 'front' | 'angle' | 'orbit'
  const [activeGesture, setActiveGesture] = useState('idle'); // 'idle' | 'greet'
  const [cardTilt, setCardTilt] = useState({ x: 0, y: 0 });
  const [showSpecSheet, setShowSpecSheet] = useState(false);

  // Check WebGL availability
  const checkWebGLSupport = useCallback(() => {
    try {
      const testCanvas = document.createElement('canvas');
      return !!(
        window.WebGLRenderingContext &&
        (testCanvas.getContext('webgl') || testCanvas.getContext('experimental-webgl'))
      );
    } catch (e) {
      return false;
    }
  }, []);

  useEffect(() => {
    if (!checkWebGLSupport()) {
      setWebGLSupported(false);
      setViewMode('static_card');
      setIsLoading(false);
      return;
    }

    const container = containerRef.current;
    if (!container) return;

    let width = container.clientWidth || 380;
    let height = container.clientHeight || 500;

    // Detect reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile = window.innerWidth < 768;

    // 1. Scene & Environment
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x060911, 0.035);

    // 2. Camera Setup
    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 50);
    camera.position.set(0, 1.35, 3.8);

    // 3. Renderer Configuration
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: !isMobile,
      alpha: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(isMobile ? 1.5 : Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    renderer.outputColorSpace = THREE.SRGBColorSpace;

    // 4. Cinematic Lighting System
    const ambientLight = new THREE.AmbientLight(0x1e293b, 1.4);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 2.4);
    keyLight.position.set(2.8, 4.2, 3.2);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0x38bdf8, 1.6);
    fillLight.position.set(-3.2, 2.2, 2.0);
    scene.add(fillLight);

    const rimLight = new THREE.DirectionalLight(0x818cf8, 3.0);
    rimLight.position.set(0, 3.8, -3.2);
    scene.add(rimLight);

    // Platform Base
    const platformGroup = new THREE.Group();
    scene.add(platformGroup);

    const platformGeo = new THREE.CylinderGeometry(0.95, 1.05, 0.04, 32);
    const platformMat = new THREE.MeshStandardMaterial({
      color: 0x0f172a,
      roughness: 0.35,
      metalness: 0.85
    });
    const platformMesh = new THREE.Mesh(platformGeo, platformMat);
    platformMesh.position.y = -0.02;
    platformGroup.add(platformMesh);

    const ringGeo = new THREE.RingGeometry(0.98, 1.05, 48);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.45,
      side: THREE.DoubleSide
    });
    const ringMesh = new THREE.Mesh(ringGeo, ringMat);
    ringMesh.rotation.x = Math.PI / 2;
    ringMesh.position.y = 0.01;
    platformGroup.add(ringMesh);

    // Ambient floating particles
    const particleCount = isMobile ? 40 : 90;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      particlePositions[i] = (Math.random() - 0.5) * 4.5;
      particlePositions[i + 1] = Math.random() * 3.2;
      particlePositions[i + 2] = (Math.random() - 0.5) * 3.5;
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0x38bdf8,
      size: 0.022,
      transparent: true,
      opacity: 0.55,
      blending: THREE.AdditiveBlending
    });
    const particleSystem = new THREE.Points(particleGeo, particleMat);
    scene.add(particleSystem);

    // Character Group Anchor
    const characterGroup = new THREE.Group();
    scene.add(characterGroup);
    characterGroupRef.current = characterGroup;

    // 5. Procedural 3D Rig (Active fallback & exact concept representation)
    const buildProceduralRig = () => {
      const skinMat = new THREE.MeshStandardMaterial({ color: 0xdeb887, roughness: 0.65, metalness: 0.05 });
      const suitBlackMat = new THREE.MeshStandardMaterial({ color: 0x080a10, roughness: 0.7, metalness: 0.15 });
      const shirtDarkMat = new THREE.MeshStandardMaterial({ color: 0x141822, roughness: 0.6, metalness: 0.1 });
      const shoesMat = new THREE.MeshStandardMaterial({ color: 0x05070a, roughness: 0.25, metalness: 0.6 });
      const hairMat = new THREE.MeshStandardMaterial({ color: 0x1a1512, roughness: 0.85 });
      const glassesFrameMat = new THREE.MeshStandardMaterial({ color: 0x020305, roughness: 0.2, metalness: 0.95 });
      const glassesLensMat = new THREE.MeshPhysicalMaterial({
        color: 0x88c0d0,
        roughness: 0.1,
        metalness: 0.1,
        transmission: 0.85,
        transparent: true,
        opacity: 0.75
      });

      // Lower Body: Shoes & Legs
      const shoeLeft = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.08, 0.26), shoesMat);
      shoeLeft.position.set(-0.16, 0.04, 0.02);
      const shoeRight = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.08, 0.26), shoesMat);
      shoeRight.position.set(0.16, 0.04, 0.02);
      characterGroup.add(shoeLeft, shoeRight);

      const legLeft = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.07, 0.75, 16), suitBlackMat);
      legLeft.position.set(-0.16, 0.45, 0);
      const legRight = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.07, 0.75, 16), suitBlackMat);
      legRight.position.set(0.16, 0.45, 0);
      characterGroup.add(legLeft, legRight);

      // Torso & Upper Body
      const torsoGroup = new THREE.Group();
      torsoGroup.position.y = 0.82;
      characterGroup.add(torsoGroup);
      bonesRef.current.spine = torsoGroup;

      const hips = new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.18, 0.24), suitBlackMat);
      hips.position.y = 0.06;
      torsoGroup.add(hips);

      const torso = new THREE.Mesh(new THREE.BoxGeometry(0.46, 0.52, 0.26), suitBlackMat);
      torso.position.y = 0.38;
      torsoGroup.add(torso);

      const shirt = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.44, 0.27), shirtDarkMat);
      shirt.position.set(0, 0.4, 0.01);
      torsoGroup.add(shirt);

      // Lapels
      const lapelLeft = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.38, 0.04), suitBlackMat);
      lapelLeft.position.set(-0.11, 0.42, 0.14);
      lapelLeft.rotation.z = -0.15;
      const lapelRight = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.38, 0.04), suitBlackMat);
      lapelRight.position.set(0.11, 0.42, 0.14);
      lapelRight.rotation.z = 0.15;
      torsoGroup.add(lapelLeft, lapelRight);

      // Arms in professional posture
      const armLeft = new THREE.Mesh(new THREE.CylinderGeometry(0.065, 0.055, 0.58, 16), suitBlackMat);
      armLeft.position.set(-0.31, 0.36, 0.04);
      armLeft.rotation.z = 0.12;
      armLeft.rotation.x = 0.1;
      const handLeft = new THREE.Mesh(new THREE.SphereGeometry(0.05, 12, 12), skinMat);
      handLeft.position.set(-0.34, 0.05, 0.08);
      torsoGroup.add(armLeft, handLeft);

      const armRightGroup = new THREE.Group();
      armRightGroup.position.set(0.31, 0.58, 0.04);
      torsoGroup.add(armRightGroup);
      bonesRef.current.rightArm = armRightGroup;

      const armRight = new THREE.Mesh(new THREE.CylinderGeometry(0.065, 0.055, 0.58, 16), suitBlackMat);
      armRight.position.set(0, -0.22, 0);
      armRight.rotation.z = -0.12;
      armRight.rotation.x = 0.1;
      const handRight = new THREE.Mesh(new THREE.SphereGeometry(0.05, 12, 12), skinMat);
      handRight.position.set(0.03, -0.53, 0.04);
      armRightGroup.add(armRight, handRight);

      // Neck
      const neck = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.08, 0.14, 16), skinMat);
      neck.position.y = 0.68;
      torsoGroup.add(neck);
      bonesRef.current.neck = neck;

      // Head Group (Targets visitor cursor)
      const headGroup = new THREE.Group();
      headGroup.position.y = 0.84;
      torsoGroup.add(headGroup);
      bonesRef.current.head = headGroup;

      const head = new THREE.Mesh(new THREE.SphereGeometry(0.15, 24, 24), skinMat);
      head.scale.set(1, 1.15, 1.05);
      headGroup.add(head);

      // Dark Groomed Hairstyle
      const hairBase = new THREE.Mesh(new THREE.SphereGeometry(0.165, 20, 20), hairMat);
      hairBase.position.set(0, 0.04, -0.02);
      hairBase.scale.set(1.02, 1.08, 1.06);
      headGroup.add(hairBase);

      const hairTop = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.15, 0.08, 16), hairMat);
      hairTop.position.set(0, 0.16, 0.01);
      headGroup.add(hairTop);

      // Signature Rectangular Glasses
      const frameLeft = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.045, 0.015), glassesFrameMat);
      frameLeft.position.set(-0.065, 0.015, 0.152);
      const frameRight = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.045, 0.015), glassesFrameMat);
      frameRight.position.set(0.065, 0.015, 0.152);
      const frameBridge = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.01, 0.015), glassesFrameMat);
      frameBridge.position.set(0, 0.015, 0.152);

      const lensLeft = new THREE.Mesh(new THREE.PlaneGeometry(0.065, 0.035), glassesLensMat);
      lensLeft.position.set(-0.065, 0.015, 0.155);
      const lensRight = new THREE.Mesh(new THREE.PlaneGeometry(0.065, 0.035), glassesLensMat);
      lensRight.position.set(0.065, 0.015, 0.155);

      headGroup.add(frameLeft, frameRight, frameBridge, lensLeft, lensRight);
    };

    // 6. Loading Pipeline for Custom GLB Asset
    const loadGLBModel = () => {
      const loadingManager = new THREE.LoadingManager(
        () => {
          setIsLoading(false);
          setLoadingProgress(100);
        },
        (url, itemsLoaded, itemsTotal) => {
          const progress = Math.round((itemsLoaded / itemsTotal) * 100);
          setLoadingProgress(progress);
        },
        (url) => {
          // If asset is unavailable, fall back cleanly
          setLoadError(`Custom asset not found at ${url}`);
          setIsLoading(false);
          setModelType('procedural_rig');
          buildProceduralRig();
        }
      );

      const dracoLoader = new DRACOLoader();
      dracoLoader.setDecoderPath('https://www.gstatic.com/draco/versioned/decoders/1.5.6/');

      const loader = new GLTFLoader(loadingManager);
      loader.setDRACOLoader(dracoLoader);

      loader.load(
        '/models/raheel-character.glb',
        (gltf) => {
          characterGroup.clear();
          const model = gltf.scene;
          model.position.set(0, 0, 0);
          model.scale.set(1, 1, 1);

          // Configure PBR materials and shadow reception
          model.traverse((child) => {
            if (child.isMesh) {
              child.castShadow = true;
              child.receiveShadow = true;
              if (child.material) {
                child.material.roughness = Math.min(child.material.roughness || 0.6, 0.85);
                child.material.metalness = child.material.metalness || 0.1;
              }
            }
            // Locate humanoid bones
            const name = child.name.toLowerCase();
            if (name.includes('head')) bonesRef.current.head = child;
            else if (name.includes('neck')) bonesRef.current.neck = child;
            else if (name.includes('spine')) bonesRef.current.spine = child;
            else if (name.includes('arm') && name.includes('r')) bonesRef.current.rightArm = child;
          });

          // Set up AnimationMixer if animations exist
          if (gltf.animations && gltf.animations.length > 0) {
            const mixer = new THREE.AnimationMixer(model);
            mixerRef.current = mixer;
            const idleAction = mixer.clipAction(gltf.animations[0]);
            idleAction.play();
          }

          characterGroup.add(model);
          setModelType('custom_glb');
          setIsLoading(false);
        },
        (xhr) => {
          if (xhr.lengthComputable) {
            const percent = Math.round((xhr.loaded / xhr.total) * 100);
            setLoadingProgress(percent);
          }
        },
        () => {
          // 404 or missing custom model: load procedural rig
          setIsLoading(false);
          setModelType('procedural_rig');
          buildProceduralRig();
        }
      );
    };

    // Attempt to load GLB
    loadGLBModel();

    // 7. Controlled Pointer / Cursor Tracking Setup
    const targetLook = { x: 0, y: 0 };
    const currentLook = { x: 0, y: 0 };

    const handlePointerMove = (e) => {
      if (prefersReducedMotion) return;
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);

      // Clamp target rotation within natural anatomical limits
      targetLook.y = THREE.MathUtils.clamp(x * 0.42, -0.45, 0.45);
      targetLook.x = THREE.MathUtils.clamp(y * 0.22, -0.25, 0.25);
    };

    window.addEventListener('mousemove', handlePointerMove, { passive: true });

    // 8. Visibility Optimization via IntersectionObserver (0% GPU idle offscreen)
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisibleRef.current = entry.isIntersecting;
        });
      },
      { threshold: 0.1 }
    );
    observer.observe(container);

    // 9. Resize Handling
    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      width = container.clientWidth || 380;
      height = container.clientHeight || 500;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    // 10. Single Continuous Animation Loop
    let animationFrameId;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      // Skip render if off-screen to preserve CPU/GPU battery
      if (!isVisibleRef.current) return;

      const delta = clock.getDelta();
      const elapsedTime = clock.getElapsedTime();

      // Update GLTF AnimationMixer if available
      if (mixerRef.current) {
        mixerRef.current.update(delta);
      }

      // Smooth interpolation for pointer reaction (lerp)
      if (!prefersReducedMotion) {
        currentLook.x += (targetLook.x - currentLook.x) * 0.05;
        currentLook.y += (targetLook.y - currentLook.y) * 0.05;
      }

      // Apply procedural idle breathing & pointer response
      const head = bonesRef.current.head;
      const neck = bonesRef.current.neck;
      const spine = bonesRef.current.spine;
      const rightArm = bonesRef.current.rightArm;

      if (!prefersReducedMotion) {
        // Subtle breathing motion on torso
        if (spine) {
          spine.position.y = 0.82 + Math.sin(elapsedTime * 1.6) * 0.01;
          spine.rotation.x = Math.sin(elapsedTime * 1.6) * 0.007;
          spine.rotation.y = currentLook.y * 0.25;
        }

        // Head and neck track cursor
        if (head) {
          head.rotation.y = currentLook.y * 0.65;
          head.rotation.x = -currentLook.x * 0.35;
        }
        if (neck) {
          neck.rotation.y = currentLook.y * 0.35;
        }

        // Controlled subtle gesture response
        if (rightArm) {
          if (activeGesture === 'greet') {
            rightArm.rotation.x = THREE.MathUtils.lerp(rightArm.rotation.x, -0.65, 0.08);
            rightArm.rotation.z = THREE.MathUtils.lerp(rightArm.rotation.z, -0.3, 0.08);
          } else {
            rightArm.rotation.x = THREE.MathUtils.lerp(rightArm.rotation.x, 0, 0.08);
            rightArm.rotation.z = THREE.MathUtils.lerp(rightArm.rotation.z, 0, 0.08);
          }
        }

        // Platform glow ring rotation
        ringMesh.rotation.z = elapsedTime * 0.25;

        // Particle floating
        const positions = particleGeo.attributes.position.array;
        for (let i = 1; i < particlePositions.length; i += 3) {
          positions[i] += 0.0018;
          if (positions[i] > 3.2) positions[i] = 0;
        }
        particleGeo.attributes.position.needsUpdate = true;
      }

      // Camera / Character Base Pose
      if (poseMode === 'angle') {
        characterGroup.rotation.y = THREE.MathUtils.lerp(characterGroup.rotation.y, 0.45, 0.05);
      } else if (poseMode === 'orbit') {
        characterGroup.rotation.y = prefersReducedMotion ? 0 : elapsedTime * 0.35;
      } else {
        characterGroup.rotation.y = THREE.MathUtils.lerp(characterGroup.rotation.y, 0, 0.05);
      }

      renderer.render(scene, camera);
    };

    animate();

    // 11. Complete Resource Disposal on Unmount
    return () => {
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('resize', handleResize);
      observer.disconnect();
      cancelAnimationFrame(animationFrameId);

      scene.traverse((obj) => {
        if (obj.geometry) obj.geometry.dispose();
        if (obj.material) {
          if (Array.isArray(obj.material)) {
            obj.material.forEach(m => m.dispose());
          } else {
            obj.material.dispose();
          }
        }
      });
      renderer.dispose();
    };
  }, [poseMode, activeGesture, checkWebGLSupport]);

  // Trigger brief interactive acknowledgment gesture
  const triggerAcknowledgeGesture = () => {
    setActiveGesture('greet');
    setTimeout(() => {
      setActiveGesture('idle');
    }, 1400);
  };

  // Holographic 3D Tilt Card handler (optimized static fallback)
  const handleCardMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setCardTilt({ x: y * -16, y: x * 16 });
  };

  const handleCardMouseLeave = () => {
    setCardTilt({ x: 0, y: 0 });
  };

  return (
    <div
      ref={containerRef}
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        minHeight: '480px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      {/* Loading Telemetry Bar */}
      {isLoading && viewMode === '3d' && (
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            background: 'rgba(15, 23, 42, 0.9)',
            border: '1px solid rgba(56, 189, 248, 0.3)',
            borderRadius: '1rem',
            padding: '1.25rem 2rem',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '0.75rem',
            zIndex: 20,
            backdropFilter: 'blur(12px)',
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.7)'
          }}
        >
          <span style={{ fontSize: '0.8rem', color: '#38BDF8', fontWeight: 700, letterSpacing: '0.06em' }}>
            CALIBRATING 3D ENVIRONMENT // {loadingProgress}%
          </span>
          <div style={{ width: '160px', height: '4px', background: 'rgba(255, 255, 255, 0.1)', borderRadius: '9999px', overflow: 'hidden' }}>
            <div
              style={{
                width: `${loadingProgress}%`,
                height: '100%',
                background: 'linear-gradient(90deg, #38BDF8, #818CF8)',
                transition: 'width 0.2s'
              }}
            />
          </div>
        </div>
      )}

      {/* Mode 1: Interactive WebGL 3D Viewport */}
      {viewMode === '3d' && webGLSupported ? (
        <div style={{ position: 'relative', width: '100%', height: '100%', display: 'flex', justifyContent: 'center' }}>
          <canvas
            ref={canvasRef}
            onClick={triggerAcknowledgeGesture}
            title="Click to interact with character"
            style={{ width: '100%', height: '100%', maxWidth: '440px', outline: 'none', cursor: 'pointer' }}
          />

          {/* Top Status Capsule */}
          <div
            style={{
              position: 'absolute',
              top: '12px',
              left: '50%',
              transform: 'translateX(-50%)',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              background: 'rgba(15, 23, 42, 0.85)',
              backdropFilter: 'blur(12px)',
              padding: '4px 12px',
              borderRadius: '9999px',
              border: '1px solid rgba(56, 189, 248, 0.25)',
              zIndex: 10
            }}
          >
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: modelType === 'custom_glb' ? '#10B981' : '#38BDF8' }} />
            <span style={{ fontSize: '0.72rem', color: '#CBD5E1', fontWeight: 600 }}>
              {modelType === 'custom_glb' ? 'GLB RIG ACTIVE' : '3D RIG ACTIVE'}
            </span>
            <button
              onClick={() => setShowSpecSheet(!showSpecSheet)}
              title="View 3D Asset Integration Specs"
              style={{
                background: 'none',
                border: 'none',
                color: '#38BDF8',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                padding: '2px'
              }}
            >
              <Eye size={13} />
            </button>
          </div>

          {/* Bottom Interactive Angle & Gesture Controls */}
          <div
            style={{
              position: 'absolute',
              bottom: '12px',
              left: '50%',
              transform: 'translateX(-50%)',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              background: 'rgba(15, 23, 42, 0.9)',
              backdropFilter: 'blur(16px)',
              padding: '6px 14px',
              borderRadius: '9999px',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              boxShadow: '0 10px 30px rgba(0, 0, 0, 0.5)',
              zIndex: 10
            }}
          >
            <button
              onClick={() => setPoseMode('front')}
              style={{
                background: poseMode === 'front' ? '#38BDF8' : 'transparent',
                color: poseMode === 'front' ? '#060911' : '#CBD5E1',
                border: 'none',
                borderRadius: '9999px',
                padding: '4px 10px',
                fontSize: '0.72rem',
                fontWeight: 700,
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
            >
              Facing
            </button>
            <button
              onClick={() => setPoseMode('angle')}
              style={{
                background: poseMode === 'angle' ? '#38BDF8' : 'transparent',
                color: poseMode === 'angle' ? '#060911' : '#CBD5E1',
                border: 'none',
                borderRadius: '9999px',
                padding: '4px 10px',
                fontSize: '0.72rem',
                fontWeight: 700,
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
            >
              Angle
            </button>
            <button
              onClick={() => setPoseMode(poseMode === 'orbit' ? 'front' : 'orbit')}
              style={{
                background: poseMode === 'orbit' ? '#38BDF8' : 'transparent',
                color: poseMode === 'orbit' ? '#060911' : '#CBD5E1',
                border: 'none',
                borderRadius: '9999px',
                padding: '4px 10px',
                fontSize: '0.72rem',
                fontWeight: 700,
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
            >
              {poseMode === 'orbit' ? 'Orbiting' : 'Orbit'}
            </button>
            <button
              onClick={triggerAcknowledgeGesture}
              title="Trigger greeting acknowledgment gesture"
              style={{
                background: activeGesture === 'greet' ? '#10B981' : 'rgba(255, 255, 255, 0.08)',
                color: activeGesture === 'greet' ? '#060911' : '#38BDF8',
                border: 'none',
                borderRadius: '9999px',
                padding: '4px 10px',
                fontSize: '0.72rem',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '3px'
              }}
            >
              <Sparkles size={11} /> Wave
            </button>
            <button
              onClick={() => setViewMode('static_card')}
              title="Switch to Optimized Static Hologram Card"
              style={{
                background: 'rgba(255, 255, 255, 0.06)',
                color: '#94A3B8',
                border: 'none',
                borderRadius: '9999px',
                padding: '4px 10px',
                fontSize: '0.72rem',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              <Camera size={11} style={{ display: 'inline', marginRight: '3px' }} /> Photo
            </button>
          </div>
        </div>
      ) : (
        /* Mode 2: Static Optimized Holographic 3D Tilt Card Fallback */
        <div
          onMouseMove={handleCardMouseMove}
          onMouseLeave={handleCardMouseLeave}
          style={{
            position: 'relative',
            width: '100%',
            maxWidth: '340px',
            aspectRatio: '3 / 4',
            borderRadius: '1.5rem',
            padding: '1.25rem',
            background: 'linear-gradient(145deg, rgba(15, 23, 42, 0.95), rgba(30, 41, 59, 0.9))',
            border: '1px solid rgba(56, 189, 248, 0.3)',
            boxShadow: '0 25px 60px rgba(0, 0, 0, 0.6), 0 0 35px rgba(56, 189, 248, 0.15)',
            transform: `perspective(1000px) rotateX(${cardTilt.x}deg) rotateY(${cardTilt.y}deg)`,
            transition: 'transform 0.15s ease-out',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            overflow: 'hidden'
          }}
        >
          {/* Cyber Grid Background */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              backgroundImage: 'linear-gradient(rgba(56, 189, 248, 0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(56, 189, 248, 0.04) 1px, transparent 1px)',
              backgroundSize: '24px 24px',
              pointerEvents: 'none'
            }}
          />

          {/* Top Identifier */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 2 }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#38BDF8', letterSpacing: '0.08em' }}>
              IDENTITY // VERIFIED
            </span>
            <span style={{ fontSize: '0.7rem', background: 'rgba(16, 185, 129, 0.15)', color: '#34D399', padding: '2px 8px', borderRadius: '9999px', border: '1px solid rgba(16, 185, 129, 0.3)' }}>
              ● ACTIVE
            </span>
          </div>

          {/* Portrait Image Frame */}
          <div
            style={{
              position: 'relative',
              width: '100%',
              flex: 1,
              margin: '0.75rem 0',
              borderRadius: '1rem',
              overflow: 'hidden',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              background: '#0B0F19'
            }}
          >
            <img
              src="/profile.jpg"
              alt="Raheel Jamal"
              onError={(e) => {
                e.target.src = '/3.png';
              }}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                filter: 'contrast(1.05) brightness(0.98)'
              }}
            />
            {/* Hologram Scanner Bar */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '2px',
                background: 'linear-gradient(90deg, transparent, #38BDF8, transparent)',
                boxShadow: '0 0 12px #38BDF8',
                animation: 'scanBar 3s ease-in-out infinite'
              }}
            />
          </div>

          {/* Bottom Card Controls */}
          <div style={{ zIndex: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <p style={{ fontSize: '0.9rem', fontWeight: 700, color: '#F8FAFC', margin: 0 }}>Raheel Jamal</p>
              <p style={{ fontSize: '0.75rem', color: '#94A3B8', margin: 0 }}>Software & Automation Dev</p>
            </div>
            {webGLSupported && (
              <button
                onClick={() => setViewMode('3d')}
                style={{
                  background: 'rgba(56, 189, 248, 0.15)',
                  color: '#38BDF8',
                  border: '1px solid rgba(56, 189, 248, 0.4)',
                  padding: '5px 12px',
                  borderRadius: '0.5rem',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  cursor: 'pointer'
                }}
              >
                Launch 3D
              </button>
            )}
          </div>
        </div>
      )}

      {/* Asset Specifications Drawer / Overlay */}
      {showSpecSheet && (
        <div
          style={{
            position: 'absolute',
            inset: '10px',
            backgroundColor: 'rgba(6, 9, 17, 0.95)',
            border: '1px solid rgba(56, 189, 248, 0.35)',
            borderRadius: '1rem',
            padding: '1.25rem',
            zIndex: 30,
            overflowY: 'auto',
            backdropFilter: 'blur(16px)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
          }}
        >
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
              <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#38BDF8' }}>
                3D ASSET INTEGRATION PIPELINE
              </span>
              <button
                onClick={() => setShowSpecSheet(false)}
                style={{ background: 'none', border: 'none', color: '#94A3B8', cursor: 'pointer', fontSize: '0.8rem' }}
              >
                ✕ Close
              </button>
            </div>
            <p style={{ fontSize: '0.82rem', color: '#CBD5E1', lineHeight: 1.6, margin: 0 }}>
              The runtime architecture actively polls for your custom rigged 3D character at:
            </p>
            <code
              style={{
                display: 'block',
                background: 'rgba(15, 23, 42, 0.8)',
                padding: '6px 10px',
                borderRadius: '6px',
                color: '#38BDF8',
                fontSize: '0.75rem',
                margin: '8px 0',
                border: '1px solid rgba(255, 255, 255, 0.1)'
              }}
            >
              /public/models/raheel-character.glb
            </code>
            {loadError && (
              <p style={{ fontSize: '0.75rem', color: '#F59E0B', margin: '4px 0' }}>
                Status: {loadError} (Active procedural rig engaged)
              </p>
            )}
            <ul style={{ fontSize: '0.78rem', color: '#94A3B8', lineHeight: 1.6, paddingLeft: '1.2rem', margin: '0.5rem 0' }}>
              <li><strong>Armature:</strong> Humanoid skeleton (Hips, Spine, Neck, Head, Arms).</li>
              <li><strong>Budget:</strong> &lt; 45,000 triangles, DRACO compression supported.</li>
              <li><strong>Outfit:</strong> Approved black professional suit, collared shirt, dress shoes.</li>
              <li><strong>Likeness:</strong> Signature glasses, groomed hair, approved facial concept.</li>
            </ul>
          </div>
          <p style={{ fontSize: '0.72rem', color: '#64748B', margin: 0 }}>
            * When placed, the pipeline automatically binds the AnimationMixer and pointer tracking.
          </p>
        </div>
      )}
    </div>
  );
}
