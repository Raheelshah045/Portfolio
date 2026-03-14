from PIL import Image, ImageDraw, ImageFont
import os

def render_image():
    img_path = r'C:\Users\HP\.gemini\antigravity\brain\0422b162-ea3e-4f32-9b7d-a968ce0ad652\media__1773490388986.png'
    save_path = r'C:\Users\HP\Downloads\portfolio\portfolio\public\finflow-preview.png'
    
    try:
        img = Image.open(img_path).convert("RGB")
    except Exception as e:
        print("Error opening image:", e)
        return
        
    draw = ImageDraw.Draw(img)
    
    try:
        font_large = ImageFont.truetype("C:\\Windows\\Fonts\\arialbd.ttf", 26)
        font_medium = ImageFont.truetype("C:\\Windows\\Fonts\\arial.ttf", 16)
        font_small = ImageFont.truetype("C:\\Windows\\Fonts\\arial.ttf", 10)
    except:
        font_large = font_medium = font_small = ImageFont.load_default()

    # Colors
    bg_sidebar = (16, 25, 42) # #10192A estimate for sidebar
    bg_white = (255, 255, 255)
    bg_light = (248, 250, 252) # estimate for grey card backgrounds
    text_dark = (15, 23, 42)
    green = (16, 185, 129)
    gold = (245, 158, 11)
    red = (220, 38, 38)
    
    # Sidebar
    draw.rectangle([130, 95, 182, 130], fill=bg_sidebar)
    draw.text((135, 96), "PKR 1.2M", fill=green, font=font_small)
    draw.text((135, 115), "PKR 850k", fill=gold, font=font_small)

    # Top Cards
    def draw_num(x, y, text, color=text_dark, bg=bg_white, padding=35, w=150):
        draw.rectangle([x, y, x+w, y+padding], fill=bg)
        draw.text((x+5, y+2), text, fill=color, font=font_large)

    draw_num(210, 115, "PKR 4.2M", w=160) # Available Cash
    draw_num(405, 115, "PKR 850k", w=160) # Institutional Funds
    draw_num(602, 115, "PKR 1.2M", w=160) # Net Yield
    draw_num(803, 115, "PKR 650k", w=160) # Inventory Valuation

    # Bottom Cards
    draw_num(222, 415, "PKR 2.4M", bg=bg_light, w=150) # Period Revenue
    draw_num(400, 415, "PKR 1.8M", bg=bg_light, w=150) # Period Expense

    # Alerts Area
    draw.rectangle([700, 270, 900, 330], fill=bg_white)
    draw.text((720, 280), "⚠ 3 Low Stock Alerts", fill=red, font=font_medium)
    draw.text((720, 305), "- iPhone 13 (2 left)", fill=text_dark, font=font_medium)

    # Graph Area
    for i, month_x in enumerate([248, 320, 390, 460, 532]):
        h_rev = [40, 60, 50, 80, 110][i]
        h_exp = [20, 30, 45, 50, 75][i]
        # Revenue
        draw.rectangle([month_x - 12, 350 - h_rev, month_x, 350], fill=(202, 138, 4))
        # Expense
        draw.rectangle([month_x + 2, 350 - h_exp, month_x + 14, 350], fill=(153, 27, 27))
        
    # Save the modified image
    img.save(save_path)
    print("Done generating", save_path)

render_image()
