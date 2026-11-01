import os
from PIL import Image, ImageFilter

def enhance_and_enlarge(src_path, dst_paths, scale=2):
    if not os.path.exists(src_path):
        print(f"File not found: {src_path}")
        return
    
    with Image.open(src_path) as im:
        orig_w, orig_h = im.size
        new_w, new_h = orig_w * scale, orig_h * scale
        
        # High quality Lanczos resampling (exact proportions & colors preserved)
        enhanced = im.resize((new_w, new_h), Image.Resampling.LANCZOS)
        
        # Subtle unsharp mask to preserve edge crispness without altering features
        enhanced = enhanced.filter(ImageFilter.UnsharpMask(radius=1.5, percent=110, threshold=2))
        
        for dst_path in dst_paths:
            os.makedirs(os.path.dirname(dst_path), exist_ok=True)
            if dst_path.lower().endswith('.webp'):
                enhanced.save(dst_path, "WEBP", quality=92, method=6)
            elif dst_path.lower().endswith('.png'):
                enhanced.save(dst_path, "PNG", optimize=True)
            elif dst_path.lower().endswith(('.jpg', '.jpeg')):
                enhanced.convert('RGB').save(dst_path, "JPEG", quality=92, optimize=True)
            print(f"Enhanced {src_path} ({orig_w}x{orig_h}) -> {dst_path} ({new_w}x{new_h})")

def main():
    print("=== Image Enhancement & Upscaling (Enlarge Only) ===")
    
    # 1. Executive portrait in About section (290x412 -> 580x824)
    enhance_and_enlarge(
        "public/raheel_portrait_executive.png",
        [
            "public/raheel_portrait_executive_enhanced.png",
            "public/raheel_portrait_executive_enhanced.webp",
            "build/raheel_portrait_executive_enhanced.png",
            "build/raheel_portrait_executive_enhanced.webp"
        ],
        scale=2
    )

    # 2. Avatar in Navbar (401x451 -> 802x902)
    enhance_and_enlarge(
        "public/avatar.png",
        [
            "public/avatar_enhanced.png",
            "build/avatar_enhanced.png"
        ],
        scale=2
    )

    # 3. JARVIS AI project image (640x640 -> 1280x1280)
    enhance_and_enlarge(
        "public/jarvis-ai-voice-assistant.webp",
        [
            "public/jarvis-ai-voice-assistant_enhanced.webp",
            "build/jarvis-ai-voice-assistant_enhanced.webp"
        ],
        scale=2
    )

    # 4. Attendance Management project image (640x640 -> 1280x1280)
    enhance_and_enlarge(
        "public/attendance-management-system-dashboard.webp",
        [
            "public/attendance-management-system-dashboard_enhanced.webp",
            "build/attendance-management-system-dashboard_enhanced.webp"
        ],
        scale=2
    )

    # 5. Almaas Quran Academy portal image (640x640 -> 1280x1280)
    enhance_and_enlarge(
        "public/almaas-online-quran-academy-portal.webp",
        [
            "public/almaas-online-quran-academy-portal_enhanced.webp",
            "build/almaas-online-quran-academy-portal_enhanced.webp"
        ],
        scale=2
    )

    print("All image enhancements completed successfully.")

if __name__ == "__main__":
    main()
