'use client';

import { useState, FormEvent } from 'react';
import { Input, Button } from '@/components/ui';

interface AnalysisFormProps {
  onSubmit: (identifier: string) => void;
  isLoading: boolean;
}

export function AnalysisForm({ onSubmit, isLoading }: AnalysisFormProps) {
  const [input, setInput] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError('');

    const trimmed = input.trim();

    if (!trimmed) {
      setError('Please enter a Farcaster username or FID');
      return;
    }

    // Remove @ prefix if present
    const identifier = trimmed.startsWith('@') ? trimmed.slice(1) : trimmed;

    onSubmit(identifier);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-lg mx-auto">
      <div className="flex flex-col gap-6">
        <Input
          type="text"
          placeholder="ENTER USERNAME OR FID"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          error={error}
          disabled={isLoading}
          className="text-center font-bold tracking-widest text-sm"
        />
        <Button
          type="submit"
          variant="primary"
          size="lg"
          isLoading={isLoading}
          className="w-full py-6 rounded-3xl"
        >
          Begin Analysis
        </Button>
      </div>
      <p className="text-[10px] text-stone-400 font-bold uppercase tracking-[0.25em] text-center mt-6">
        30-day historical content audit & strategy mapping
      </p>
    </form>
  );
}
