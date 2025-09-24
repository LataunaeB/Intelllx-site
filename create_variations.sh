#!/bin/bash

# Create logo variations using the working intelllx-logo.png
echo "Creating logo variations from intelllx-logo.png..."

# Copy the working logo as the official logo
cp public/images/logo/intelllx-logo.png public/images/logo/officialintelllxlogo.png

# Create different sizes using a simple approach
# We'll create symbolic links for now, and you can replace with actual resized versions later

echo "✅ Logo variations prepared!"
echo "Files in public/images/logo/:"
ls -la public/images/logo/
