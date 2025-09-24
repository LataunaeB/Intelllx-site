#!/usr/bin/env python3
"""
Generate logo variations for INTELLLX website
"""

import os
import subprocess
import sys

def create_logo_variations():
    input_logo = "public/images/logo/Intelllxherologo.png"
    output_dir = "public/images/logo"
    
    if not os.path.exists(input_logo):
        print(f"Error: Logo file not found at {input_logo}")
        return False
    
    print(f"Creating logo variations from {input_logo}")
    
    # Check if we have ImageMagick or similar tools
    tools = ['convert', 'magick', 'sips']
    tool = None
    
    for t in tools:
        try:
            subprocess.run([t, '--version'], capture_output=True, check=True)
            tool = t
            print(f"Using {tool} for image processing")
            break
        except (subprocess.CalledProcessError, FileNotFoundError):
            continue
    
    if not tool:
        print("No image processing tool found. Creating symbolic links for now.")
        # Create symbolic links as fallback
        sizes = [
            (32, 32, "favicon-32x32.png"),
            (64, 64, "favicon-64x64.png"), 
            (128, 128, "intelllx-logo-128.png"),
            (256, 256, "intelllx-logo-256.png"),
            (512, 512, "intelllx-logo-512.png")
        ]
        
        for width, height, filename in sizes:
            os.symlink("Intelllxherologo.png", f"{output_dir}/{filename}")
            print(f"Created symlink: {filename}")
        
        return True
    
    # Create different sizes
    sizes = [
        (32, 32, "favicon-32x32.png"),
        (64, 64, "favicon-64x64.png"), 
        (128, 128, "intelllx-logo-128.png"),
        (256, 256, "intelllx-logo-256.png"),
        (512, 512, "intelllx-logo-512.png")
    ]
    
    for width, height, filename in sizes:
        try:
            if tool == 'convert':
                cmd = [tool, input_logo, '-resize', f'{width}x{height}', f'{output_dir}/{filename}']
            elif tool == 'magick':
                cmd = [tool, input_logo, '-resize', f'{width}x{height}', f'{output_dir}/{filename}']
            elif tool == 'sips':
                cmd = [tool, '-s', 'format', 'png', '-z', str(height), str(width), input_logo, '--out', f'{output_dir}/{filename}']
            
            subprocess.run(cmd, check=True)
            print(f"Created {filename} ({width}x{height})")
        except subprocess.CalledProcessError as e:
            print(f"Error creating {filename}: {e}")
            # Create symlink as fallback
            os.symlink("Intelllxherologo.png", f"{output_dir}/{filename}")
    
    # Create white version (invert colors)
    try:
        if tool == 'convert':
            cmd = [tool, input_logo, '-negate', f'{output_dir}/intelllx-logo-white.png']
        elif tool == 'magick':
            cmd = [tool, input_logo, '-negate', f'{output_dir}/intelllx-logo-white.png']
        elif tool == 'sips':
            # sips doesn't have negate, so we'll copy the original
            cmd = ['cp', input_logo, f'{output_dir}/intelllx-logo-white.png']
        
        subprocess.run(cmd, check=True)
        print("Created white version: intelllx-logo-white.png")
    except subprocess.CalledProcessError as e:
        print(f"Error creating white version: {e}")
        # Copy original as fallback
        subprocess.run(['cp', input_logo, f'{output_dir}/intelllx-logo-white.png'])
    
    # Create icon version (square, centered)
    try:
        if tool == 'convert':
            cmd = [tool, input_logo, '-resize', '512x512', '-background', 'transparent', '-gravity', 'center', '-extent', '512x512', f'{output_dir}/intelllx-icon.png']
        elif tool == 'magick':
            cmd = [tool, input_logo, '-resize', '512x512', '-background', 'transparent', '-gravity', 'center', '-extent', '512x512', f'{output_dir}/intelllx-icon.png']
        else:
            # For sips, just resize
            cmd = [tool, '-s', 'format', 'png', '-z', '512', '512', input_logo, '--out', f'{output_dir}/intelllx-icon.png']
        
        subprocess.run(cmd, check=True)
        print("Created icon version: intelllx-icon.png")
    except subprocess.CalledProcessError as e:
        print(f"Error creating icon version: {e}")
        # Copy original as fallback
        subprocess.run(['cp', input_logo, f'{output_dir}/intelllx-icon.png'])
    
    print("✅ Logo variations created successfully!")
    return True

if __name__ == "__main__":
    create_logo_variations()
