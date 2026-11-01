import os
import asyncio
from playwright.async_api import async_playwright
from PIL import Image, ImageDraw, ImageFont

async def render_html_to_webp(html_content, output_paths, width=1920, height=1080):
    async with async_playwright() as p:
        browser = await p.chromium.launch(channel="chrome")
        page = await browser.new_page(viewport={"width": width, "height": height}, device_scale_factor=1)
        await page.set_content(html_content)
        await page.wait_for_timeout(500)
        png_temp = "temp_capture.png"
        await page.screenshot(path=png_temp, full_page=False)
        await browser.close()
        
        # Open in PIL and save as webp with high quality
        img = Image.open(png_temp)
        for path in output_paths:
            os.makedirs(os.path.dirname(path), exist_ok=True)
            img.save(path, "WEBP", quality=90, method=6)
        
        if os.path.exists(png_temp):
            os.remove(png_temp)
        print(f"Generated: {output_paths[0]}")

def generate_logos():
    # 1. SEO Logo
    img_seo = Image.new("RGBA", (256, 256), (0, 0, 0, 0))
    draw_seo = ImageDraw.Draw(img_seo)
    # Circle background
    draw_seo.ellipse([8, 8, 248, 248], fill=(15, 23, 42, 255), outline=(59, 130, 246, 200), width=6)
    # Bar chart lines / growth curve
    draw_seo.rectangle([48, 140, 78, 195], fill=(59, 130, 246, 255))
    draw_seo.rectangle([94, 110, 124, 195], fill=(96, 165, 250, 255))
    draw_seo.rectangle([140, 80, 170, 195], fill=(147, 197, 253, 255))
    draw_seo.rectangle([186, 50, 216, 195], fill=(56, 189, 248, 255))
    # Growth line with arrow
    draw_seo.line([(55, 125), (105, 95), (155, 65), (205, 35)], fill=(245, 158, 11, 255), width=6)
    draw_seo.polygon([(205, 25), (218, 42), (196, 42)], fill=(245, 158, 11, 255))
    
    for path in ["public/logos/seo.png", "build/logos/seo.png"]:
        os.makedirs(os.path.dirname(path), exist_ok=True)
        img_seo.save(path, "PNG")
    print("Generated SEO logo")

    # 2. Design Logo
    img_des = Image.new("RGBA", (256, 256), (0, 0, 0, 0))
    draw_des = ImageDraw.Draw(img_des)
    draw_des.ellipse([8, 8, 248, 248], fill=(24, 24, 27, 255), outline=(154, 91, 50, 220), width=6)
    # Creative palette / pen shape
    # Palette circle
    draw_des.ellipse([45, 45, 211, 211], fill=(39, 39, 42, 255))
    # Color swatches
    draw_des.ellipse([70, 95, 95, 120], fill=(239, 68, 68, 255))
    draw_des.ellipse([105, 65, 130, 90], fill=(245, 158, 11, 255))
    draw_des.ellipse([155, 75, 180, 100], fill=(59, 130, 246, 255))
    draw_des.ellipse([175, 125, 200, 150], fill=(16, 185, 129, 255))
    # Thumb hole
    draw_des.ellipse([115, 135, 150, 170], fill=(24, 24, 27, 255))

    for path in ["public/logos/design.png", "build/logos/design.png"]:
        os.makedirs(os.path.dirname(path), exist_ok=True)
        img_des.save(path, "PNG")
    print("Generated Design logo")

TASKLY_HTML = """
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; }
  body { background: #0F172A; width: 1920px; height: 1080px; display: flex; align-items: center; justify-content: center; overflow: hidden; }
  .browser-window { width: 1760px; height: 980px; background: #FFFFFF; border-radius: 16px; box-shadow: 0 30px 80px rgba(0,0,0,0.5); overflow: hidden; display: flex; flex-direction: column; border: 1px solid rgba(255,255,255,0.15); }
  .titlebar { height: 48px; background: #F8FAFC; border-bottom: 1px solid #E2E8F0; display: flex; align-items: center; padding: 0 20px; justify-content: space-between; }
  .dots { display: flex; gap: 8px; }
  .dot { width: 12px; height: 12px; border-radius: 50%; }
  .dot-red { background: #EF4444; } .dot-yellow { background: #F59E0B; } .dot-green { background: #10B981; }
  .urlbar { background: #EDF2F7; border-radius: 6px; padding: 6px 36px; font-size: 13px; color: #4A5568; font-weight: 500; letter-spacing: 0.02em; }
  .workspace { display: flex; flex: 1; height: calc(100% - 48px); }
  
  /* Sidebar */
  .sidebar { width: 320px; background: #F8FAFC; border-right: 1px solid #E2E8F0; padding: 28px 20px; display: flex; flex-direction: column; justify-content: space-between; }
  .brand { display: flex; align-items: center; gap: 12px; margin-bottom: 32px; }
  .brand-logo { width: 36px; height: 36px; background: #3B82F6; border-radius: 10px; display: flex; align-items: center; justify-content: center; color: white; font-weight: 900; font-size: 20px; }
  .brand-name { font-size: 20px; font-weight: 800; color: #0F172A; letter-spacing: -0.02em; }
  .nav-group { margin-bottom: 24px; }
  .nav-title { font-size: 11px; font-weight: 700; color: #94A3B8; text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 10px; padding-left: 10px; }
  .nav-item { display: flex; align-items: center; justify-content: space-between; padding: 10px 14px; border-radius: 8px; color: #475569; font-size: 14px; font-weight: 600; margin-bottom: 4px; cursor: pointer; }
  .nav-item.active { background: #EFF6FF; color: #2563EB; }
  .nav-badge { background: #E2E8F0; color: #475569; font-size: 11px; padding: 2px 8px; border-radius: 12px; font-weight: 700; }
  .nav-item.active .nav-badge { background: #DBEAFE; color: #1D4ED8; }
  .tag-item { display: flex; align-items: center; gap: 10px; padding: 8px 14px; font-size: 13px; color: #64748B; font-weight: 500; }
  .tag-circle { width: 10px; height: 10px; border-radius: 50%; }

  /* Main Area */
  .main { flex: 1; display: flex; flex-direction: column; background: #FAFAFA; }
  .top-header { height: 72px; border-bottom: 1px solid #E2E8F0; background: #FFFFFF; display: flex; align-items: center; justify-content: space-between; padding: 0 40px; }
  .search-input { width: 440px; height: 42px; background: #F1F5F9; border: 1px solid #E2E8F0; border-radius: 8px; padding: 0 16px; font-size: 14px; color: #334155; }
  .btn-add { background: #2563EB; color: white; border: none; border-radius: 8px; padding: 10px 20px; font-size: 14px; font-weight: 700; cursor: pointer; box-shadow: 0 4px 12px rgba(37,99,235,0.25); }

  .content-scroll { padding: 40px; flex: 1; overflow: hidden; display: flex; gap: 32px; }
  .tasks-container { flex: 2; display: flex; flex-direction: column; gap: 16px; }
  .view-heading { display: flex; align-items: baseline; justify-content: space-between; margin-bottom: 8px; }
  .view-title { font-size: 26px; font-weight: 800; color: #0F172A; }
  .view-date { font-size: 14px; color: #64748B; font-weight: 500; }

  .task-card { background: #FFFFFF; border: 1px solid #E2E8F0; border-radius: 12px; padding: 18px 24px; display: flex; align-items: center; justify-content: space-between; box-shadow: 0 2px 6px rgba(0,0,0,0.03); }
  .task-left { display: flex; align-items: center; gap: 16px; }
  .checkbox { width: 22px; height: 22px; border-radius: 6px; border: 2px solid #CBD5E1; display: flex; align-items: center; justify-content: center; }
  .checkbox.checked { background: #10B981; border-color: #10B981; color: white; font-weight: 900; font-size: 14px; }
  .task-title { font-size: 15px; font-weight: 600; color: #1E293B; }
  .task-title.done { color: #94A3B8; text-decoration: line-through; }
  .task-sub { font-size: 12px; color: #64748B; margin-top: 4px; display: flex; gap: 12px; }
  .tag-pill { padding: 2px 8px; border-radius: 4px; font-size: 11px; font-weight: 700; }
  .pill-red { background: #FEE2E2; color: #DC2626; }
  .pill-blue { background: #E0E7FF; color: #4338CA; }
  .pill-amber { background: #FEF3C7; color: #D97706; }
  .pill-slate { background: #F1F5F9; color: #475569; }

  /* Right Stats Panel */
  .stats-panel { flex: 1; background: #FFFFFF; border: 1px solid #E2E8F0; border-radius: 12px; padding: 28px; display: flex; flex-direction: column; gap: 24px; }
  .stat-card { background: #F8FAFC; border-radius: 10px; padding: 20px; border: 1px solid #E2E8F0; }
  .stat-label { font-size: 12px; color: #64748B; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; }
  .stat-val { font-size: 32px; font-weight: 900; color: #0F172A; margin-top: 6px; }
  .progress-bg { height: 8px; background: #E2E8F0; border-radius: 4px; margin-top: 12px; overflow: hidden; }
  .progress-fill { height: 100%; width: 75%; background: #2563EB; border-radius: 4px; }
</style>
</head>
<body>
<div class="browser-window">
  <div class="titlebar">
    <div class="dots"><div class="dot dot-red"></div><div class="dot dot-yellow"></div><div class="dot dot-green"></div></div>
    <div class="urlbar">https://taskly-261.pages.dev/app/today</div>
    <div style="width: 50px;"></div>
  </div>
  <div class="workspace">
    <div class="sidebar">
      <div>
        <div class="brand">
          <div class="brand-logo">T</div>
          <div class="brand-name">Taskly</div>
        </div>
        <div class="nav-group">
          <div class="nav-title">Focus</div>
          <div class="nav-item"><span>📥 Inbox</span><span class="nav-badge">12</span></div>
          <div class="nav-item active"><span>☀️ Today</span><span class="nav-badge">4</span></div>
          <div class="nav-item"><span>📅 Upcoming</span><span class="nav-badge">8</span></div>
          <div class="nav-item"><span>✅ Completed</span><span class="nav-badge">42</span></div>
        </div>
        <div class="nav-group">
          <div class="nav-title">Projects & Context</div>
          <div class="tag-item"><div class="tag-circle" style="background:#EF4444;"></div>ADC Banking Ops</div>
          <div class="tag-item"><div class="tag-circle" style="background:#3B82F6;"></div>Computer Science</div>
          <div class="tag-item"><div class="tag-circle" style="background:#10B981;"></div>Cloud Deployments</div>
          <div class="tag-item"><div class="tag-circle" style="background:#F59E0B;"></div>Personal Projects</div>
        </div>
      </div>
      <div style="font-size: 12px; color: #94A3B8; font-weight: 600;">PWA Sync Active • Supabase DB</div>
    </div>
    <div class="main">
      <div class="top-header">
        <input class="search-input" placeholder="Quick search tasks (Press ⌘K)..." value="status:active priority:high" />
        <button class="btn-add">+ New Task</button>
      </div>
      <div class="content-scroll">
        <div class="tasks-container">
          <div class="view-heading">
            <h1 class="view-title">Today's Agenda</h1>
            <span class="view-date">Friday, October 31 • 4 Pending</span>
          </div>
          
          <div class="task-card">
            <div class="task-left">
              <div class="checkbox"></div>
              <div>
                <div class="task-title">Finalize UAT Test Cases for Card Operations CR-204</div>
                <div class="task-sub">
                  <span class="tag-pill pill-red">High Priority</span>
                  <span class="tag-pill pill-slate">ADC Ops</span>
                  <span>Due Today 4:30 PM</span>
                </div>
              </div>
            </div>
            <div style="color: #94A3B8; font-size: 13px; font-weight: 600;">UBL Branch Portal</div>
          </div>

          <div class="task-card">
            <div class="task-left">
              <div class="checkbox"></div>
              <div>
                <div class="task-title">Review Distributed Systems Concurrency Module</div>
                <div class="task-sub">
                  <span class="tag-pill pill-blue">Academic</span>
                  <span class="tag-pill pill-slate">SZABIST BSCS</span>
                  <span>Due Tonight 8:00 PM</span>
                </div>
              </div>
            </div>
            <div style="color: #94A3B8; font-size: 13px; font-weight: 600;">Module 4</div>
          </div>

          <div class="task-card">
            <div class="task-left">
              <div class="checkbox"></div>
              <div>
                <div class="task-title">Deploy Supabase Realtime Migration to Cloudflare Pages</div>
                <div class="task-sub">
                  <span class="tag-pill pill-amber">Engineering</span>
                  <span class="tag-pill pill-slate">PWA Manifest</span>
                  <span>Due Tonight 11:00 PM</span>
                </div>
              </div>
            </div>
            <div style="color: #94A3B8; font-size: 13px; font-weight: 600;">Production</div>
          </div>

          <div class="task-card" style="opacity: 0.65;">
            <div class="task-left">
              <div class="checkbox checked">✓</div>
              <div>
                <div class="task-title done">Daily Settlement Reconciliation Log Check</div>
                <div class="task-sub">
                  <span class="tag-pill pill-slate">Completed at 10:15 AM</span>
                </div>
              </div>
            </div>
            <div style="color: #10B981; font-size: 12px; font-weight: 700;">Verified</div>
          </div>
        </div>

        <div class="stats-panel">
          <div class="stat-card">
            <div class="stat-label">Daily Completion Velocity</div>
            <div class="stat-val">75%</div>
            <div class="progress-bg"><div class="progress-fill"></div></div>
          </div>
          <div class="stat-card">
            <div class="stat-label">Active Workflows</div>
            <div class="stat-val">3 Remaining</div>
            <div style="font-size: 13px; color: #64748B; margin-top: 6px;">Zero cognitive clutter pipeline</div>
          </div>
          <div class="stat-card">
            <div class="stat-label">Engine Architecture</div>
            <div style="font-size: 14px; color: #1E293B; font-weight: 700; margin-top: 6px;">Vite • React 18 • Supabase</div>
            <div style="font-size: 12px; color: #64748B; margin-top: 4px;">Sub-second edge caching enabled</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</body>
</html>
"""

ARCHITECTURE_HTML = """
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "JetBrains Mono", monospace; }
  body { background: #090D16; width: 1920px; height: 1080px; display: flex; align-items: center; justify-content: center; overflow: hidden; }
  .canvas-window { width: 1760px; height: 980px; background: #0E131F; border-radius: 16px; border: 1px solid #1E293B; box-shadow: 0 30px 90px rgba(0,0,0,0.8); display: flex; flex-direction: column; overflow: hidden; position: relative; }
  
  /* Topbar */
  .topbar { height: 56px; background: #131A29; border-bottom: 1px solid #1E293B; display: flex; align-items: center; justify-content: space-between; padding: 0 24px; z-index: 10; }
  .title-group { display: flex; align-items: center; gap: 14px; }
  .logo-box { width: 32px; height: 32px; background: linear-gradient(135deg, #3B82F6, #8B5CF6); border-radius: 8px; display: flex; align-items: center; justify-content: center; color: white; font-weight: 900; font-size: 16px; }
  .title-text { color: #F1F5F9; font-size: 16px; font-weight: 700; }
  .badge { background: rgba(59, 130, 246, 0.15); color: #60A5FA; border: 1px solid rgba(59, 130, 246, 0.3); font-size: 11px; padding: 2px 8px; border-radius: 12px; font-weight: 700; }
  .tools { display: flex; gap: 12px; align-items: center; }
  .btn-tool { background: #1E293B; color: #E2E8F0; border: 1px solid #334155; padding: 6px 14px; border-radius: 6px; font-size: 13px; font-weight: 600; }
  .btn-accent { background: #2563EB; border-color: #3B82F6; color: white; }

  /* Canvas Area with Dot Grid */
  .canvas { flex: 1; position: relative; background-image: radial-gradient(#1E293B 1.5px, transparent 1.5px); background-size: 32px 32px; overflow: hidden; }

  /* SVG Wires */
  svg.wires { position: absolute; inset: 0; width: 100%; height: 100%; pointer-events: none; z-index: 1; }

  /* Nodes */
  .node { position: absolute; background: #172033; border: 1px solid #2A3854; border-radius: 12px; box-shadow: 0 10px 30px rgba(0,0,0,0.5); z-index: 2; width: 260px; overflow: hidden; }
  .node-header { padding: 10px 14px; display: flex; align-items: center; justify-content: space-between; border-bottom: 1px solid #2A3854; background: rgba(255,255,255,0.03); }
  .node-tag { font-size: 10px; font-weight: 800; letter-spacing: 0.05em; padding: 2px 6px; border-radius: 4px; text-transform: uppercase; }
  .node-title { color: #F8FAFC; font-size: 13px; font-weight: 700; }
  .node-body { padding: 14px; font-size: 12px; color: #94A3B8; }
  .metric-row { display: flex; justify-content: space-between; margin-top: 8px; padding-top: 8px; border-top: 1px solid #1E293B; font-family: monospace; font-size: 11px; }

  /* Specific Nodes Placement */
  #node-cdn { left: 80px; top: 380px; }
  #node-gw { left: 420px; top: 350px; border-color: #3B82F6; }
  #node-auth { left: 800px; top: 160px; }
  #node-order { left: 800px; top: 480px; border-color: #10B981; }
  #node-kafka { left: 1160px; top: 440px; border-color: #F59E0B; }
  #node-db { left: 1460px; top: 260px; }
  #node-cache { left: 1460px; top: 540px; }

  /* Floating Telemetry HUD */
  .hud-panel { position: absolute; bottom: 24px; left: 24px; background: rgba(15, 23, 42, 0.85); border: 1px solid #1E293B; border-radius: 10px; padding: 14px 20px; backdrop-filter: blur(8px); display: flex; gap: 28px; z-index: 5; }
  .hud-stat-val { font-size: 18px; font-weight: 800; color: #F1F5F9; font-family: monospace; }
  .hud-stat-lbl { font-size: 11px; color: #64748B; font-weight: 600; text-transform: uppercase; }
  
  .isometric-badge { position: absolute; top: 24px; right: 24px; background: #1E293B; border: 1px solid #334155; border-radius: 8px; padding: 8px 14px; color: #E2E8F0; font-size: 12px; font-weight: 700; z-index: 5; display: flex; align-items: center; gap: 8px; }
  .iso-dot { width: 8px; height: 8px; border-radius: 50%; background: #10B981; box-shadow: 0 0 8px #10B981; }
</style>
</head>
<body>
<div class="canvas-window">
  <div class="topbar">
    <div class="title-group">
      <div class="logo-box">S</div>
      <div class="title-text">System Architecture Designer</div>
      <span class="badge">SIMULATION ENGINE ACTIVE</span>
    </div>
    <div class="tools">
      <button class="btn-tool">Layers (3D On)</button>
      <button class="btn-tool">Stress Test Flow</button>
      <button class="btn-tool btn-accent">Export JSON Schema</button>
    </div>
  </div>

  <div class="canvas">
    <div class="isometric-badge"><div class="iso-dot"></div> Isometric Simulation Active • Latency 14ms</div>

    <!-- SVG Wires connecting nodes -->
    <svg class="wires">
      <!-- CDN to Gateway -->
      <path d="M 340 430 C 380 430, 380 410, 420 410" stroke="#3B82F6" stroke-width="3" fill="none" stroke-dasharray="6,4" />
      <!-- Gateway to Auth -->
      <path d="M 680 390 C 740 390, 740 220, 800 220" stroke="#8B5CF6" stroke-width="2.5" fill="none" />
      <!-- Gateway to Order Service -->
      <path d="M 680 430 C 740 430, 740 530, 800 530" stroke="#10B981" stroke-width="3" fill="none" stroke-dasharray="8,4" />
      <!-- Order to Kafka -->
      <path d="M 1060 540 C 1110 540, 1110 500, 1160 500" stroke="#F59E0B" stroke-width="3" fill="none" />
      <!-- Kafka to DB -->
      <path d="M 1420 480 C 1440 480, 1440 320, 1460 320" stroke="#06B6D4" stroke-width="2.5" fill="none" />
      <!-- Kafka to Cache -->
      <path d="M 1420 520 C 1440 520, 1440 580, 1460 580" stroke="#EC4899" stroke-width="2.5" fill="none" />
    </svg>

    <!-- Nodes -->
    <div class="node" id="node-cdn">
      <div class="node-header">
        <div class="node-title">Cloudflare Edge CDN</div>
        <div class="node-tag" style="background: rgba(59,130,246,0.2); color: #60A5FA;">Edge</div>
      </div>
      <div class="node-body">
        Global Anycast Network & WAF
        <div class="metric-row"><span>Throughput:</span><span style="color:#10B981;">34.2 k/s</span></div>
      </div>
    </div>

    <div class="node" id="node-gw">
      <div class="node-header">
        <div class="node-title">API Gateway / Envoy</div>
        <div class="node-tag" style="background: rgba(139,92,246,0.2); color: #A78BFA;">Router</div>
      </div>
      <div class="node-body">
        mTLS & Reverse Proxy Routing
        <div class="metric-row"><span>Roundtrip:</span><span style="color:#60A5FA;">3.2 ms</span></div>
      </div>
    </div>

    <div class="node" id="node-auth">
      <div class="node-header">
        <div class="node-title">Identity & Auth Service</div>
        <div class="node-tag" style="background: rgba(239,68,68,0.2); color: #F87171;">Security</div>
      </div>
      <div class="node-body">
        JWT Validation & Vault Keystore
        <div class="metric-row"><span>Validations:</span><span style="color:#E2E8F0;">99.99%</span></div>
      </div>
    </div>

    <div class="node" id="node-order">
      <div class="node-header">
        <div class="node-title">Core Order Orchestrator</div>
        <div class="node-tag" style="background: rgba(16,185,129,0.2); color: #34D399;">Business</div>
      </div>
      <div class="node-body">
        Distributed Transaction State
        <div class="metric-row"><span>TPS Peak:</span><span style="color:#34D399;">4,810/s</span></div>
      </div>
    </div>

    <div class="node" id="node-kafka">
      <div class="node-header">
        <div class="node-title">Apache Kafka Event Bus</div>
        <div class="node-tag" style="background: rgba(245,158,11,0.2); color: #FBBF24;">Broker</div>
      </div>
      <div class="node-body">
        Partitioned Event Streaming
        <div class="metric-row"><span>Lag:</span><span style="color:#10B981;">0 ms</span></div>
      </div>
    </div>

    <div class="node" id="node-db">
      <div class="node-header">
        <div class="node-title">PostgreSQL Cluster</div>
        <div class="node-tag" style="background: rgba(6,182,212,0.2); color: #22D3EE;">Storage</div>
      </div>
      <div class="node-body">
        ACID Transaction Primary/Replica
        <div class="metric-row"><span>Conn Pool:</span><span style="color:#E2E8F0;">48 / 100</span></div>
      </div>
    </div>

    <div class="node" id="node-cache">
      <div class="node-header">
        <div class="node-title">Redis In-Memory Tier</div>
        <div class="node-tag" style="background: rgba(236,72,153,0.2); color: #F472B6;">Cache</div>
      </div>
      <div class="node-body">
        Session & Idempotency Store
        <div class="metric-row"><span>Hit Ratio:</span><span style="color:#10B981;">98.4%</span></div>
      </div>
    </div>

    <div class="hud-panel">
      <div>
        <div class="hud-stat-lbl">Global Nodes</div>
        <div class="hud-stat-val">7 Active</div>
      </div>
      <div>
        <div class="hud-stat-lbl">Simulated Traffic</div>
        <div class="hud-stat-val" style="color: #34D399;">34,200 req/s</div>
      </div>
      <div>
        <div class="hud-stat-lbl">Pipeline Failure Risk</div>
        <div class="hud-stat-val" style="color: #60A5FA;">0.000%</div>
      </div>
    </div>
  </div>
</div>
</body>
</html>
"""

BANKING_HTML = """
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "JetBrains Mono", monospace; }
  body { background: #0B0F19; width: 1920px; height: 1080px; display: flex; align-items: center; justify-content: center; overflow: hidden; }
  .dashboard-window { width: 1760px; height: 980px; background: #0F172A; border-radius: 16px; border: 1px solid #1E293B; box-shadow: 0 30px 90px rgba(0,0,0,0.8); display: flex; flex-direction: column; overflow: hidden; }
  
  /* Topbar */
  .topbar { height: 60px; background: #131C31; border-bottom: 1px solid #1E293B; display: flex; align-items: center; justify-content: space-between; padding: 0 30px; }
  .brand-group { display: flex; align-items: center; gap: 14px; }
  .shield-icon { width: 34px; height: 34px; background: #1E293B; border: 1px solid #334155; border-radius: 8px; display: flex; align-items: center; justify-content: center; color: #38BDF8; font-weight: 900; font-size: 16px; }
  .brand-name { color: #F8FAFC; font-size: 16px; font-weight: 700; letter-spacing: -0.01em; }
  .confidential-tag { background: rgba(239, 68, 68, 0.15); border: 1px solid rgba(239, 68, 68, 0.35); color: #F87171; font-size: 11px; font-weight: 800; padding: 3px 10px; border-radius: 12px; letter-spacing: 0.08em; text-transform: uppercase; }
  .status-cluster { display: flex; align-items: center; gap: 20px; color: #94A3B8; font-size: 13px; font-weight: 600; }
  .live-dot { width: 8px; height: 8px; border-radius: 50%; background: #10B981; box-shadow: 0 0 10px #10B981; }

  /* Grid Layout */
  .content { flex: 1; padding: 28px 30px; display: flex; flex-direction: column; gap: 20px; overflow: hidden; }
  .kpi-row { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; }
  .kpi-card { background: #17223B; border: 1px solid #233354; border-radius: 12px; padding: 20px; display: flex; flex-direction: column; justify-content: space-between; }
  .kpi-title { font-size: 12px; color: #94A3B8; font-weight: 700; text-transform: uppercase; letter-spacing: 0.04em; }
  .kpi-val { font-size: 30px; font-weight: 800; color: #F8FAFC; margin-top: 8px; font-family: monospace; }
  .kpi-sub { font-size: 12px; color: #34D399; margin-top: 6px; font-weight: 600; }

  /* Visual Charts Row */
  .charts-row { display: grid; grid-template-columns: 2fr 1fr; gap: 20px; flex: 1; min-height: 0; }
  .chart-panel { background: #17223B; border: 1px solid #233354; border-radius: 12px; padding: 22px; display: flex; flex-direction: column; min-height: 0; }
  .panel-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 16px; }
  .panel-title { font-size: 14px; font-weight: 700; color: #F1F5F9; }
  
  /* Telemetry Table */
  .telemetry-table { width: 100%; border-collapse: collapse; font-size: 13px; color: #CBD5E1; }
  .telemetry-table th { text-align: left; padding: 10px 14px; color: #64748B; font-weight: 700; font-size: 11px; text-transform: uppercase; border-bottom: 1px solid #233354; }
  .telemetry-table td { padding: 12px 14px; border-bottom: 1px solid rgba(35, 51, 84, 0.5); font-family: monospace; }
  .badge-status { padding: 3px 8px; border-radius: 6px; font-size: 11px; font-weight: 700; }
  .status-green { background: rgba(16, 185, 129, 0.15); color: #34D399; border: 1px solid rgba(16, 185, 129, 0.3); }
  .status-blue { background: rgba(56, 189, 248, 0.15); color: #38BDF8; border: 1px solid rgba(56, 189, 248, 0.3); }

  /* Wave Graph */
  .wave-container { flex: 1; display: flex; align-items: flex-end; position: relative; border-bottom: 1px solid #233354; min-height: 180px; }
  svg.trend-chart { width: 100%; height: 100%; overflow: visible; }

  /* Log Stream */
  .log-stream { display: flex; flex-direction: column; gap: 10px; overflow: hidden; }
  .log-item { background: #131C31; border: 1px solid #233354; border-radius: 8px; padding: 10px 14px; display: flex; align-items: center; justify-content: space-between; font-size: 12px; }
  .log-time { color: #64748B; font-family: monospace; font-size: 11px; }
</style>
</head>
<body>
<div class="dashboard-window">
  <div class="topbar">
    <div class="brand-group">
      <div class="shield-icon">🛡️</div>
      <div class="brand-name">Enterprise Delivery Channels Surveillance Console</div>
      <span class="confidential-tag">CONFIDENTIAL // SYNTHETIC TELEMETRY</span>
    </div>
    <div class="status-cluster">
      <div style="display: flex; align-items: center; gap: 8px;"><div class="live-dot"></div> Core Switch: Synchronized</div>
      <span>UAT Pipeline: Active</span>
      <span>00:14:28 UTC</span>
    </div>
  </div>

  <div class="content">
    <div class="kpi-row">
      <div class="kpi-card">
        <div class="kpi-title">ADC Gateway Throughput</div>
        <div class="kpi-val">1,842 TPS</div>
        <div class="kpi-sub">▲ +4.2% vs baseline SLA</div>
      </div>
      <div class="kpi-card">
        <div class="kpi-title">Card Switch Settlement Latency</div>
        <div class="kpi-val">84 ms</div>
        <div class="kpi-sub" style="color: #38BDF8;">● Peak Threshold: &lt; 250ms</div>
      </div>
      <div class="kpi-card">
        <div class="kpi-title">Daily Synthetic Reconciled Volume</div>
        <div class="kpi-val">$48.2M</div>
        <div class="kpi-sub">✓ 100% Zero Variance Match</div>
      </div>
      <div class="kpi-card">
        <div class="kpi-title">Operational Rails Health</div>
        <div class="kpi-val">8 / 8 Online</div>
        <div class="kpi-sub">POS • ATM • E-Comm • Mobile</div>
      </div>
    </div>

    <div class="charts-row">
      <div class="chart-panel">
        <div class="panel-header">
          <div class="panel-title">Transaction Volume Distribution & Anomaly Surveillance (24-Hour Stream)</div>
          <span style="font-size: 12px; color: #64748B;">Synthetic Feed (No PII)</span>
        </div>
        <div class="wave-container">
          <svg class="trend-chart" viewBox="0 0 800 200" preserveAspectRatio="none">
            <defs>
              <linearGradient id="grad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" style="stop-color:#38BDF8;stop-opacity:0.4" />
                <stop offset="100%" style="stop-color:#38BDF8;stop-opacity:0.0" />
              </linearGradient>
            </defs>
            <path d="M 0 160 Q 100 120, 200 140 T 400 90 T 600 60 T 800 40 L 800 200 L 0 200 Z" fill="url(#grad)" />
            <path d="M 0 160 Q 100 120, 200 140 T 400 90 T 600 60 T 800 40" fill="none" stroke="#38BDF8" stroke-width="3" />
          </svg>
        </div>
        <table class="telemetry-table" style="margin-top: 14px;">
          <thead>
            <tr>
              <th>Routing Rail</th>
              <th>Protocol</th>
              <th>Avg Latency</th>
              <th>Success Rate</th>
              <th>Surveillance State</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Rail Alpha (ATM Network)</td>
              <td>ISO 8583 Dual-Message</td>
              <td>62 ms</td>
              <td>99.98%</td>
              <td><span class="badge-status status-green">NOMINAL</span></td>
            </tr>
            <tr>
              <td>Rail Beta (POS Terminals)</td>
              <td>EMV Contactless Gateway</td>
              <td>78 ms</td>
              <td>99.94%</td>
              <td><span class="badge-status status-green">NOMINAL</span></td>
            </tr>
            <tr>
              <td>Rail Gamma (E-Commerce 3DS)</td>
              <td>EMV 3DS 2.2 / API</td>
              <td>110 ms</td>
              <td>99.91%</td>
              <td><span class="badge-status status-blue">MONITORED</span></td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="chart-panel">
        <div class="panel-header">
          <div class="panel-title">Operational Workflow Queue</div>
        </div>
        <div class="log-stream">
          <div class="log-item">
            <div>
              <div style="font-weight: 700; color: #F1F5F9;">CR-204 UAT Approval</div>
              <div style="color: #94A3B8; font-size: 11px;">Card ops batch logic verified</div>
            </div>
            <div class="log-time">10:14:02</div>
          </div>
          <div class="log-item">
            <div>
              <div style="font-weight: 700; color: #F1F5F9;">BRD Scope Documentation</div>
              <div style="color: #94A3B8; font-size: 11px;">Dispute automation module</div>
            </div>
            <div class="log-time">09:30:15</div>
          </div>
          <div class="log-item">
            <div>
              <div style="font-weight: 700; color: #F1F5F9;">Batch Settlement Reconcile</div>
              <div style="color: #94A3B8; font-size: 11px;">100% matched against GL</div>
            </div>
            <div class="log-time">08:00:00</div>
          </div>
          <div class="log-item">
            <div>
              <div style="font-weight: 700; color: #F1F5F9;">Switch Heartbeat Audit</div>
              <div style="color: #94A3B8; font-size: 11px;">Zero packet loss across rails</div>
            </div>
            <div class="log-time">07:45:12</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</body>
</html>
"""

async def main():
    print("Generating project showcase mockups and logos...")
    generate_logos()

    await render_html_to_webp(TASKLY_HTML, ["public/taskly-project.webp", "build/taskly-project.webp"])
    await render_html_to_webp(ARCHITECTURE_HTML, ["public/system-architecture-designer.webp", "build/system-architecture-designer.webp"])
    await render_html_to_webp(BANKING_HTML, ["public/banking-operations-dashboard.webp", "build/banking-operations-dashboard.webp"])
    print("All assets successfully generated!")

if __name__ == "__main__":
    asyncio.run(main())
