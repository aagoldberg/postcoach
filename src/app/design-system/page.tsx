'use client';

import { useState } from 'react';
import { Button, Badge, Input, Card, CardHeader, CardTitle, CardContent } from '@/components/ui';

export default function DesignSystemPage() {
  return (
    <div className="min-h-screen bg-[#f2f5f3]">
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">
        
        {/* SAGE THEME (Light) */}
        <div className="p-12 space-y-12 bg-[#f2f5f3] text-[#1a1f2e]">
          <header className="border-b border-stone-200 pb-8">
            <h1 className="text-4xl font-black serif-heading mb-2">Sage Design System</h1>
            <p className="text-stone-500 font-medium">Default Theme • Clean • Editorial</p>
          </header>

          {/* Typography */}
          <section className="space-y-6">
            <h2 className="text-xs font-bold uppercase tracking-widest text-stone-400">Typography</h2>
            <div className="space-y-4">
              <h1 className="text-6xl font-black tracking-tighter serif-heading">Heading 1</h1>
              <h2 className="text-4xl font-bold tracking-tight">Heading 2</h2>
              <h3 className="text-2xl font-bold">Heading 3</h3>
              <p className="text-base text-stone-600 leading-relaxed max-w-md">
                Body text. The quick brown fox jumps over the lazy dog. 
                Designed for optimal readability with high contrast and generous whitespace.
              </p>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-stone-400">Caption / Label</p>
            </div>
          </section>

          {/* Buttons */}
          <section className="space-y-6">
            <h2 className="text-xs font-bold uppercase tracking-widest text-stone-400">Buttons</h2>
            <div className="flex flex-wrap gap-4">
              <Button variant="primary">Primary Action</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="primary" size="sm">Small</Button>
              <Button variant="primary" isLoading>Loading</Button>
            </div>
          </section>

          {/* Badges */}
          <section className="space-y-6">
            <h2 className="text-xs font-bold uppercase tracking-widest text-stone-400">Badges</h2>
            <div className="flex flex-wrap gap-4">
              <Badge variant="default">Default</Badge>
              <Badge variant="success">Success</Badge>
              <Badge variant="warning">Warning</Badge>
              <Badge variant="error">Error</Badge>
              <Badge variant="info">Info</Badge>
            </div>
          </section>

          {/* Cards */}
          <section className="space-y-6">
            <h2 className="text-xs font-bold uppercase tracking-widest text-stone-400">Cards</h2>
            <Card className="w-full max-w-sm">
              <CardHeader>
                <CardTitle>Card Title</CardTitle>
              </CardHeader>
              <CardContent>
                This is a standard card content area. It acts as a container for other elements.
              </CardContent>
            </Card>
          </section>

          {/* Inputs */}
          <section className="space-y-6">
            <h2 className="text-xs font-bold uppercase tracking-widest text-stone-400">Inputs</h2>
            <div className="max-w-sm space-y-4">
              <Input placeholder="Default Input" />
              <Input placeholder="Error State" error="Invalid entry" />
            </div>
          </section>
        </div>

        {/* CYBERPUNK THEME (Dark) */}
        <div className="theme-cyberpunk relative p-12 space-y-12 bg-[#232530] text-[#f8f8f2] border-l border-gray-800">
          <div className="scanlines absolute inset-0 pointer-events-none opacity-10 h-full w-full z-0"></div>
          
          <header className="border-b border-[#3e4451] pb-8 relative z-10">
            <h1 className="text-4xl font-black serif-heading mb-2">Cyberpunk Design System</h1>
            <p className="text-[#66d9ef] font-mono tracking-widest text-sm">MONOKAI PALETTE • HIGH DENSITY • TERMINAL</p>
          </header>

          {/* Colors */}
          <section className="space-y-6 relative z-10">
            <h2 className="text-xs font-bold uppercase tracking-widest text-[#ae81ff]">Palette</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 font-mono text-xs">
              <div className="p-4 bg-[#f92672] text-black">Pink #f92672</div>
              <div className="p-4 bg-[#a6e22e] text-black">Green #a6e22e</div>
              <div className="p-4 bg-[#e6db74] text-black">Yellow #e6db74</div>
              <div className="p-4 bg-[#fd971f] text-black">Orange #fd971f</div>
              <div className="p-4 bg-[#ae81ff] text-black">Purple #ae81ff</div>
              <div className="p-4 bg-[#6c99bb] text-black">Blue #6c99bb</div>
              <div className="p-4 bg-[#66d9ef] text-black">Cyan #66d9ef</div>
            </div>
          </section>

          {/* Typography */}
          <section className="space-y-6 relative z-10">
            <h2 className="text-xs font-bold uppercase tracking-widest text-[#ae81ff]">Typography</h2>
            <div className="space-y-4">
              <h1 className="text-6xl font-black tracking-tighter serif-heading">Heading 1</h1>
              <h2 className="text-4xl font-bold tracking-tight">Heading 2</h2>
              <h3 className="text-2xl font-bold">Heading 3</h3>
              <p className="text-base leading-relaxed max-w-md">
                Body text. The quick brown fox jumps over the lazy dog. 
                <strong className="text-[#fd971f]"> Bold text is Orange.</strong> 
                <a href="#" className="underline"> Links are Blue.</a>
              </p>
              <p className="text-xs font-bold uppercase tracking-[0.2em]">Caption / Label</p>
            </div>
          </section>

          {/* Buttons */}
          <section className="space-y-6 relative z-10">
            <h2 className="text-xs font-bold uppercase tracking-widest text-[#ae81ff]">Buttons</h2>
            <div className="flex flex-wrap gap-4">
              <Button variant="primary">Primary Action</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="primary" size="sm">Small</Button>
              <Button variant="primary" isLoading>Loading</Button>
            </div>
          </section>

          {/* Badges */}
          <section className="space-y-6 relative z-10">
            <h2 className="text-xs font-bold uppercase tracking-widest text-[#ae81ff]">Badges</h2>
            <div className="flex flex-wrap gap-4">
              <Badge variant="default">Default</Badge>
              <Badge variant="success">Success</Badge>
              <Badge variant="warning">Warning</Badge>
              <Badge variant="error">Error</Badge>
              <Badge variant="info">Info</Badge>
            </div>
          </section>

          {/* Cards */}
          <section className="space-y-6 relative z-10">
            <h2 className="text-xs font-bold uppercase tracking-widest text-[#ae81ff]">Cards</h2>
            <Card className="w-full max-w-sm premium-card">
              <CardHeader>
                <CardTitle>Card Title</CardTitle>
              </CardHeader>
              <CardContent>
                This is a premium card with the Cyberpunk styling. Notice the borders and shadows.
              </CardContent>
            </Card>
          </section>

          {/* Inputs */}
          <section className="space-y-6 relative z-10">
            <h2 className="text-xs font-bold uppercase tracking-widest text-[#ae81ff]">Inputs</h2>
            <div className="max-w-sm space-y-4">
              <Input placeholder="Default Input" />
              <Input placeholder="Error State" error="Invalid entry" />
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
