'use client';

import { useState } from 'react';
import { Button, Badge, Input, Card, CardHeader, CardTitle, CardContent } from '@/components/ui';

type Theme = 'sage' | 'cyberpunk';

export default function DesignSystemPage() {
  const [theme, setTheme] = useState<Theme>('sage');

  return (
    <div className={`min-h-screen transition-colors duration-500 ${theme === 'cyberpunk' ? 'theme-cyberpunk bg-[#272822]' : 'bg-[#f2f5f3]'}`}>
      {theme === 'cyberpunk' && <div className="scanlines fixed inset-0 pointer-events-none z-50 opacity-10"></div>}

      {/* Theme Toggle */}
      <div className="sticky top-0 z-40 p-4 border-b backdrop-blur-sm" style={{ backgroundColor: theme === 'cyberpunk' ? 'rgba(39, 40, 34, 0.9)' : 'rgba(242, 245, 243, 0.9)', borderColor: theme === 'cyberpunk' ? '#3e4451' : '#e7e5e4' }}>
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <h1 className={`text-2xl font-black ${theme === 'cyberpunk' ? 'text-[#F8F8F2] font-mono' : 'serif-heading text-[#1a1f2e]'}`}>
            Design System
          </h1>
          <div className="flex gap-2">
            <button
              onClick={() => setTheme('sage')}
              className={`px-4 py-2 text-sm font-medium transition-all rounded-lg ${
                theme === 'sage'
                  ? 'bg-[#1a1f2e] text-white'
                  : 'bg-transparent border border-stone-300 text-stone-600 hover:bg-stone-100'
              }`}
            >
              Sage
            </button>
            <button
              onClick={() => setTheme('cyberpunk')}
              className={`px-4 py-2 text-sm font-medium transition-all ${
                theme === 'cyberpunk'
                  ? 'bg-[#66D9EF] text-[#272822]'
                  : 'bg-transparent border border-stone-300 text-stone-600 hover:bg-stone-100 rounded-lg'
              }`}
            >
              Cyberpunk
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-8 space-y-16">

        {/* Color Palette */}
        <section className="space-y-6">
          <h2 className={`text-xs font-bold uppercase tracking-widest ${theme === 'cyberpunk' ? 'text-[#AE81FF]' : 'text-stone-400'}`}>
            {theme === 'cyberpunk' ? 'Monokai Palette' : 'Sage Palette'}
          </h2>

          {theme === 'cyberpunk' ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 font-mono text-xs">
              <div className="space-y-2">
                <div className="color-swatch h-20 rounded-lg" style={{ backgroundColor: '#F92672' }}></div>
                <p className="text-[#F8F8F2]">Pink <span className="opacity-50">#F92672</span></p>
                <p className="text-[#75715E] text-[10px]">Keywords, operators</p>
              </div>
              <div className="space-y-2">
                <div className="color-swatch h-20 rounded-lg" style={{ backgroundColor: '#A6E22E' }}></div>
                <p className="text-[#F8F8F2]">Green <span className="opacity-50">#A6E22E</span></p>
                <p className="text-[#75715E] text-[10px]">Strings, success</p>
              </div>
              <div className="space-y-2">
                <div className="color-swatch h-20 rounded-lg" style={{ backgroundColor: '#E6DB74' }}></div>
                <p className="text-[#F8F8F2]">Yellow <span className="opacity-50">#E6DB74</span></p>
                <p className="text-[#75715E] text-[10px]">Strings, highlights</p>
              </div>
              <div className="space-y-2">
                <div className="color-swatch h-20 rounded-lg" style={{ backgroundColor: '#FD971F' }}></div>
                <p className="text-[#F8F8F2]">Orange <span className="opacity-50">#FD971F</span></p>
                <p className="text-[#75715E] text-[10px]">Numbers, bold text</p>
              </div>
              <div className="space-y-2">
                <div className="color-swatch h-20 rounded-lg" style={{ backgroundColor: '#AE81FF' }}></div>
                <p className="text-[#F8F8F2]">Purple <span className="opacity-50">#AE81FF</span></p>
                <p className="text-[#75715E] text-[10px]">Constants, numbers</p>
              </div>
              <div className="space-y-2">
                <div className="color-swatch h-20 rounded-lg" style={{ backgroundColor: '#6C99BB' }}></div>
                <p className="text-[#F8F8F2]">Blue <span className="opacity-50">#6C99BB</span></p>
                <p className="text-[#75715E] text-[10px]">Variables, muted</p>
              </div>
              <div className="space-y-2">
                <div className="color-swatch h-20 rounded-lg" style={{ backgroundColor: '#66D9EF' }}></div>
                <p className="text-[#F8F8F2]">Cyan <span className="opacity-50">#66D9EF</span></p>
                <p className="text-[#75715E] text-[10px]">Functions, interactive</p>
              </div>
              <div className="space-y-2">
                <div className="color-swatch h-20 rounded-lg" style={{ backgroundColor: '#75715E' }}></div>
                <p className="text-[#F8F8F2]">Comment <span className="opacity-50">#75715E</span></p>
                <p className="text-[#75715E] text-[10px]">Comments, muted</p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
              <div className="space-y-2">
                <div className="color-swatch h-20 rounded-2xl" style={{ backgroundColor: '#1a1f2e' }}></div>
                <p className="text-[#1a1f2e] font-medium">Ink <span className="text-stone-400">#1a1f2e</span></p>
                <p className="text-stone-400">Primary text, headings</p>
              </div>
              <div className="space-y-2">
                <div className="color-swatch h-20 rounded-2xl" style={{ backgroundColor: '#4b5e54' }}></div>
                <p className="text-[#1a1f2e] font-medium">Forest <span className="text-stone-400">#4b5e54</span></p>
                <p className="text-stone-400">Secondary, accents</p>
              </div>
              <div className="space-y-2">
                <div className="color-swatch h-20 rounded-2xl" style={{ backgroundColor: '#d4b483' }}></div>
                <p className="text-[#1a1f2e] font-medium">Gold <span className="text-stone-400">#d4b483</span></p>
                <p className="text-stone-400">Highlights, premium</p>
              </div>
              <div className="space-y-2">
                <div className="color-swatch h-20 rounded-2xl border border-stone-200" style={{ backgroundColor: '#f2f5f3' }}></div>
                <p className="text-[#1a1f2e] font-medium">Sage <span className="text-stone-400">#f2f5f3</span></p>
                <p className="text-stone-400">Background</p>
              </div>
            </div>
          )}
        </section>

        {/* Typography */}
        <section className="space-y-6">
          <h2 className={`text-xs font-bold uppercase tracking-widest ${theme === 'cyberpunk' ? 'text-[#AE81FF]' : 'text-stone-400'}`}>Typography</h2>
          <div className="space-y-4">
            <h1 className={`text-5xl font-black tracking-tighter ${theme === 'cyberpunk' ? 'text-[#F8F8F2] font-mono' : 'serif-heading text-[#1a1f2e]'}`}>Heading 1</h1>
            <h2 className={`text-3xl font-bold tracking-tight ${theme === 'cyberpunk' ? 'text-[#F8F8F2] font-mono' : 'text-[#1a1f2e]'}`}>Heading 2</h2>
            <h3 className={`text-xl font-bold ${theme === 'cyberpunk' ? 'text-[#F8F8F2] font-mono' : 'text-[#1a1f2e]'}`}>Heading 3</h3>
            <p className={`text-base leading-relaxed max-w-xl ${theme === 'cyberpunk' ? 'text-[#F8F8F2] font-mono' : 'text-stone-600'}`}>
              Body text. The quick brown fox jumps over the lazy dog.
              {theme === 'cyberpunk' ? (
                <><strong className="text-[#FD971F]"> Bold is orange.</strong> <a href="#" className="text-[#66D9EF] underline">Links are cyan.</a></>
              ) : (
                <> Designed for optimal readability with high contrast.</>
              )}
            </p>
            <p className={`text-xs font-bold uppercase tracking-[0.2em] ${theme === 'cyberpunk' ? 'text-[#AE81FF]' : 'text-stone-400'}`}>Caption / Label</p>
          </div>
        </section>

        {/* Buttons */}
        <section className="space-y-6">
          <h2 className={`text-xs font-bold uppercase tracking-widest ${theme === 'cyberpunk' ? 'text-[#AE81FF]' : 'text-stone-400'}`}>Buttons</h2>
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
          <h2 className={`text-xs font-bold uppercase tracking-widest ${theme === 'cyberpunk' ? 'text-[#AE81FF]' : 'text-stone-400'}`}>Badges</h2>
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
          <h2 className={`text-xs font-bold uppercase tracking-widest ${theme === 'cyberpunk' ? 'text-[#AE81FF]' : 'text-stone-400'}`}>Cards</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="premium-card">
              <CardHeader>
                <CardTitle>Standard Card</CardTitle>
              </CardHeader>
              <CardContent>
                <p>This is a standard card component. It adapts to the current theme automatically.</p>
              </CardContent>
            </Card>
            <Card className="premium-card">
              <CardHeader>
                <CardTitle>With Content</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex gap-4">
                  <Badge variant="success">Active</Badge>
                  <Badge variant="info">Beta</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Inputs */}
        <section className="space-y-6">
          <h2 className={`text-xs font-bold uppercase tracking-widest ${theme === 'cyberpunk' ? 'text-[#AE81FF]' : 'text-stone-400'}`}>Inputs</h2>
          <div className="max-w-sm space-y-4">
            <Input placeholder="Default Input" />
            <Input placeholder="Error State" error="Invalid entry" />
          </div>
        </section>

        {/* Semantic Colors */}
        <section className="space-y-6">
          <h2 className={`text-xs font-bold uppercase tracking-widest ${theme === 'cyberpunk' ? 'text-[#AE81FF]' : 'text-stone-400'}`}>Semantic Colors</h2>
          <div className="grid md:grid-cols-4 gap-4">
            <div className="bg-success-subtle p-6 rounded-xl">
              <p className="text-success-bold font-medium">Success</p>
              <p className={`text-sm mt-1 ${theme === 'cyberpunk' ? 'text-[#66D9EF]' : 'text-emerald-600'}`}>Positive actions</p>
            </div>
            <div className="bg-error-subtle p-6 rounded-xl">
              <p className="text-error-bold font-medium">Error</p>
              <p className={`text-sm mt-1 ${theme === 'cyberpunk' ? 'text-[#F92672]' : 'text-rose-600'}`}>Destructive actions</p>
            </div>
            <div className="bg-info-subtle p-6 rounded-xl">
              <p className="text-info-bold font-medium">Info</p>
              <p className={`text-sm mt-1 ${theme === 'cyberpunk' ? 'text-[#66D9EF]' : 'text-indigo-600'}`}>Informational</p>
            </div>
            <div className="bg-surface-subtle p-6 rounded-xl">
              <p className={`font-medium ${theme === 'cyberpunk' ? 'text-[#F8F8F2]' : 'text-[#1a1f2e]'}`}>Surface</p>
              <p className={`text-sm mt-1 ${theme === 'cyberpunk' ? 'text-[#75715E]' : 'text-stone-500'}`}>Neutral backgrounds</p>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
