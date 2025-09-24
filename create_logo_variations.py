#!/usr/bin/env python3
"""
Create logo variations for INTELLLX website
"""

import os
from PIL import Image, ImageOps
import sys

def create_logo_variations():
    # Input logo path
    input_logo = "public/images/logo/officialintelllxlogo.png"
    
    if not os.path.exists(input_logo):
        print(f"Error: Logo file not found at {input_logo}")
        return
    
    # Create output directory if it doesn't exist
    output_dir = "public/images/logo"
    os.makedirs(output_dir, exist_ok=True)
    
    try:
        # Open the original logo
        original = Image.open(input_logo)
        print(f"Original logo size: {original.size}")
        
        # Convert to RGBA if not already
        if original.mode != 'RGBA':
            original = original.convert('RGBA')
        
        # 1. Create white version (invert colors for dark backgrounds)
        print("Creating white version...")
        white_logo = original.copy()
        # Create a white version by inverting the image
        white_logo = ImageOps.invert(white_logo.convert('RGB')).convert('RGBA')
        white_logo.save(f"{output_dir}/intelllx-logo-white.png")
        
        # 2. Create different sizes
        sizes = [
            (32, 32, "favicon-32x32.png"),
            (64, 64, "favicon-64x64.png"), 
            (128, 128, "intelllx-logo-128.png"),
            (256, 256, "intelllx-logo-256.png"),
            (512, 512, "intelllx-logo-512.png")
        ]
        
        for width, height, filename in sizes:
            print(f"Creating {filename} ({width}x{height})...")
            resized = original.resize((width, height), Image.Resampling.LANCZOS)
            resized.save(f"{output_dir}/{filename}")
            
            # Also create white versions
            white_resized = white_logo.resize((width, height), Image.Resampling.LANCZOS)
            white_resized.save(f"{output_dir}/white-{filename}")
        
        # 3. Create icon version (square, centered)
        print("Creating icon version...")
        # Make it square by padding
        max_size = max(original.size)
        icon_size = 512
        icon = Image.new('RGBA', (icon_size, icon_size), (0, 0, 0, 0))
        
        # Resize original to fit in icon
        scale = min(icon_size / original.size[0], icon_size / original.size[1]) * 0.8
        new_size = (int(original.size[0] * scale), int(original.size[1] * scale))
        resized_original = original.resize(new_size, Image.Resampling.LANCZOS)
        
        # Center the logo
        x = (icon_size - new_size[0]) // 2
        y = (icon_size - new_size[1]) // 2
        icon.paste(resized_original, (x, y), resized_original)
        
        icon.save(f"{output_dir}/intelllx-icon.png")
        
        # Create white icon version
        white_icon = ImageOps.invert(icon.convert('RGB')).convert('RGBA')
        white_icon.save(f"{output_dir}/intelllx-icon-white.png")
        
        print("✅ All logo variations created successfully!")
        print(f"Files created in: {output_dir}")
        
    except Exception as e:
        print(f"Error creating logo variations: {e}")
        return False
    
    return True

if __name__ == "__main__":
    create_logo_variations()
