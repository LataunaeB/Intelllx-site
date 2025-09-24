#!/usr/bin/env python3
from PIL import Image, ImageDraw, ImageFont
import os

# Create a simple 32x32 favicon
size = 32
img = Image.new('RGBA', (size, size), (59, 130, 246, 255))  # Blue background
draw = ImageDraw.Draw(img)

# Try to draw a simple "I" for INTELLLX
try:
    # Try to use a system font
    font = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf", 24)
except:
    try:
        font = ImageFont.truetype("/System/Library/Fonts/Arial.ttf", 24)
    except:
        font = ImageFont.load_default()

# Draw "I" in white
text = "I"
bbox = draw.textbbox((0, 0), text, font=font)
text_width = bbox[2] - bbox[0]
text_height = bbox[3] - bbox[1]
x = (size - text_width) // 2
y = (size - text_height) // 2 - 2
draw.text((x, y), text, fill=(255, 255, 255, 255), font=font)

# Save as ICO and PNG
img.save('public/favicon.ico', format='ICO', sizes=[(16, 16), (32, 32)])
img.save('public/favicon-32x32.png', format='PNG')
img.save('public/favicon-16x16.png', format='PNG')

print("Favicon created successfully!")
