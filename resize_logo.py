#!/usr/bin/env python3
import sys
import os

# Try to import PIL, if not available, we'll use a different approach
try:
    from PIL import Image
    PIL_AVAILABLE = True
except ImportError:
    PIL_AVAILABLE = False

def create_favicon():
    if not PIL_AVAILABLE:
        print("PIL not available, copying original logo...")
        # Just copy the original logo
        os.system("cp public/images/logo/Intelllxherologo.png public/favicon-32x32.png")
        os.system("cp public/images/logo/Intelllxherologo.png public/favicon-16x16.png")
        return
    
    # Create different sizes
    sizes = [(16, 16), (32, 32), (64, 64)]
    
    for size in sizes:
        try:
            # Open the original logo
            img = Image.open("public/images/logo/Intelllxherologo.png")
            
            # Resize with high quality
            resized = img.resize(size, Image.Resampling.LANCZOS)
            
            # Save as PNG
            resized.save(f"public/favicon-{size[0]}x{size[1]}.png", "PNG")
            print(f"Created favicon-{size[0]}x{size[1]}.png")
            
        except Exception as e:
            print(f"Error creating {size}: {e}")

if __name__ == "__main__":
    create_favicon()
