# 3D Humanoid Robot Implementation Guide

## Overview
You now have 5 unique 3D humanoid robot models ready to use as backgrounds for your website pages.

## Available Robot Models

### 1. **AnalystRobot** - For About Page
- **Features**: Neural circuits, transparent panels, glowing brain core
- **Colors**: Cyan (#00BEF3), Light Blue (#4DD4FF)
- **Animation**: Gentle floating, pulsing brain
- **Mood**: Analytical, trustworthy, intelligent

### 2. **InnovationRobot** - For Services Page
- **Features**: Sharp angular design, energy veins, particle sparks
- **Colors**: Purple (#A855F7), Electric Blue (#3B82F6)
- **Animation**: Dynamic motion, rotating particles
- **Mood**: Aggressive, powerful, cutting-edge

### 3. **NeuralCoreRobot** - For Technology Page
- **Features**: Transparent skull, rotating holographic rings, orbiting particles
- **Colors**: Purple (#8B5CF6), Blue (#3B82F6)
- **Animation**: Rotating rings, pulsing core, orbiting particles
- **Mood**: Advanced, mysterious, futuristic

### 4. **FriendlyRobot** - For Careers Page
- **Features**: Smooth rounded design, blinking eyes, gentle smile
- **Colors**: Blue (#3B82F6), Light Blue (#60A5FA)
- **Animation**: Gentle floating, blinking eyes
- **Mood**: Friendly, approachable, welcoming

### 5. **CommunicationRobot** - For Contact Page
- **Features**: Holographic transparency, signal waves, scanlines, glitch effects
- **Colors**: Blue (#3B82F6), Light Blue (#60A5FA)
- **Animation**: Expanding waves, holographic flicker, glitch effects
- **Mood**: Interactive, connected, futuristic

---

## How to Use

### Basic Implementation

```tsx
'use client';

import RobotScene from '@/components/3d/RobotScene';
import AnalystRobot from '@/components/3d/AnalystRobot';

export default function AboutPage() {
  return (
    <div className="relative min-h-screen">
      {/* 3D Robot Background */}
      <div className="fixed inset-0 -z-10 opacity-30">
        <RobotScene>
          <AnalystRobot />
        </RobotScene>
      </div>

      {/* Your page content */}
      <div className="relative z-10">
        <h1>About Us</h1>
        {/* Rest of your content */}
      </div>
    </div>
  );
}
```

### Advanced Implementation with Custom Positioning

```tsx
'use client';

import RobotScene from '@/components/3d/RobotScene';
import InnovationRobot from '@/components/3d/InnovationRobot';

export default function ServicesPage() {
  return (
    <div className="relative min-h-screen">
      {/* 3D Robot in specific position */}
      <div className="fixed top-0 right-0 w-1/2 h-screen -z-10 opacity-40">
        <RobotScene 
          cameraPosition={[2, 0, 5]}
          enableControls={false}
        >
          <InnovationRobot />
        </RobotScene>
      </div>

      {/* Your page content */}
      <div className="relative z-10 container mx-auto">
        <h1>Our Services</h1>
        {/* Rest of your content */}
      </div>
    </div>
  );
}
```

### Hero Section Implementation

```tsx
'use client';

import RobotScene from '@/components/3d/RobotScene';
import NeuralCoreRobot from '@/components/3d/NeuralCoreRobot';

export default function TechnologyPage() {
  return (
    <div className="relative">
      {/* Hero section with 3D background */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* 3D Robot Background */}
        <div className="absolute inset-0 -z-10">
          <RobotScene cameraPosition={[0, 0, 4]}>
            <NeuralCoreRobot />
          </RobotScene>
        </div>

        {/* Gradient overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/80 -z-5" />

        {/* Hero content */}
        <div className="relative z-10 text-center">
          <h1 className="text-7xl font-black text-white">
            Advanced Technology
          </h1>
          <p className="text-xl text-slate-300 mt-6">
            Powered by AI and Innovation
          </p>
        </div>
      </section>

      {/* Rest of page content */}
      <section className="relative z-10 bg-black">
        {/* Your content */}
      </section>
    </div>
  );
}
```

### Side Panel Implementation

```tsx
'use client';

import RobotScene from '@/components/3d/RobotScene';
import FriendlyRobot from '@/components/3d/FriendlyRobot';

export default function CareersPage() {
  return (
    <div className="relative min-h-screen flex">
      {/* Left side: 3D Robot */}
      <div className="hidden lg:block w-1/3 fixed left-0 top-0 h-screen">
        <RobotScene cameraPosition={[1.5, 0, 4]}>
          <FriendlyRobot />
        </RobotScene>
      </div>

      {/* Right side: Content */}
      <div className="w-full lg:w-2/3 lg:ml-[33.333%] p-12">
        <h1 className="text-6xl font-black text-white">Join Our Team</h1>
        {/* Rest of your content */}
      </div>
    </div>
  );
}
```

### Multiple Robots (Advanced)

```tsx
'use client';

import RobotScene from '@/components/3d/RobotScene';
import CommunicationRobot from '@/components/3d/CommunicationRobot';
import { useState } from 'react';

export default function ContactPage() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePosition({
      x: (e.clientX / window.innerWidth) * 2 - 1,
      y: -(e.clientY / window.innerHeight) * 2 + 1,
    });
  };

  return (
    <div 
      className="relative min-h-screen"
      onMouseMove={handleMouseMove}
    >
      {/* Interactive 3D Robot */}
      <div className="fixed inset-0 -z-10 opacity-50">
        <RobotScene cameraPosition={[mousePosition.x * 2, mousePosition.y, 5]}>
          <CommunicationRobot />
        </RobotScene>
      </div>

      {/* Your page content */}
      <div className="relative z-10">
        <h1>Contact Us</h1>
        {/* Rest of your content */}
      </div>
    </div>
  );
}
```

---

## RobotScene Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | ReactNode | required | The robot component to render |
| `cameraPosition` | [number, number, number] | [0, 0, 5] | Camera position [x, y, z] |
| `enableControls` | boolean | false | Enable orbit controls for interaction |
| `className` | string | "w-full h-full" | CSS classes for the container |

---

## Styling Tips

### Opacity Control
```tsx
<div className="opacity-30"> {/* Subtle background */}
<div className="opacity-50"> {/* Medium visibility */}
<div className="opacity-70"> {/* More prominent */}
```

### Positioning
```tsx
<div className="fixed inset-0"> {/* Full screen background */}
<div className="fixed top-0 right-0 w-1/2 h-screen"> {/* Right half */}
<div className="absolute top-20 left-20 w-96 h-96"> {/* Specific position */}
```

### Blend Modes (Experimental)
```tsx
<div className="mix-blend-screen"> {/* Lighter blend */}
<div className="mix-blend-overlay"> {/* Overlay effect */}
<div className="mix-blend-soft-light"> {/* Soft light */}
```

---

## Performance Optimization

### 1. Use Fixed Positioning
```tsx
<div className="fixed"> {/* Better than absolute for backgrounds */}
```

### 2. Limit to One Robot Per Page
Only render one 3D robot at a time for optimal performance.

### 3. Adjust Opacity
Lower opacity = better readability and less visual distraction.

### 4. Mobile Considerations
```tsx
<div className="hidden lg:block"> {/* Hide on mobile */}
```

---

## Quick Start Examples

### About Page
```tsx
import RobotScene from '@/components/3d/RobotScene';
import AnalystRobot from '@/components/3d/AnalystRobot';

<div className="fixed inset-0 -z-10 opacity-30">
  <RobotScene><AnalystRobot /></RobotScene>
</div>
```

### Services Page
```tsx
import RobotScene from '@/components/3d/RobotScene';
import InnovationRobot from '@/components/3d/InnovationRobot';

<div className="fixed inset-0 -z-10 opacity-40">
  <RobotScene><InnovationRobot /></RobotScene>
</div>
```

### Technology Page
```tsx
import RobotScene from '@/components/3d/RobotScene';
import NeuralCoreRobot from '@/components/3d/NeuralCoreRobot';

<div className="fixed inset-0 -z-10 opacity-35">
  <RobotScene><NeuralCoreRobot /></RobotScene>
</div>
```

### Careers Page
```tsx
import RobotScene from '@/components/3d/RobotScene';
import FriendlyRobot from '@/components/3d/FriendlyRobot';

<div className="fixed inset-0 -z-10 opacity-25">
  <RobotScene><FriendlyRobot /></RobotScene>
</div>
```

### Contact Page
```tsx
import RobotScene from '@/components/3d/RobotScene';
import CommunicationRobot from '@/components/3d/CommunicationRobot';

<div className="fixed inset-0 -z-10 opacity-45">
  <RobotScene><CommunicationRobot /></RobotScene>
</div>
```

---

## Troubleshooting

### Robot not visible?
- Check z-index: Use `-z-10` for backgrounds
- Check opacity: Start with `opacity-30` to `opacity-50`
- Verify imports are correct

### Performance issues?
- Hide on mobile: `className="hidden lg:block"`
- Reduce opacity
- Disable controls: `enableControls={false}`

### Robot too close/far?
- Adjust `cameraPosition` prop
- Try: `[0, 0, 3]` (closer) or `[0, 0, 7]` (farther)

---

Generated: 2026-02-09
For: Tech-DLT Website
