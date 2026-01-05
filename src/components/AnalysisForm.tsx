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
    <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto">
      <div className="flex flex-col gap-4">
        <Input
          type="text"
          placeholder="Enter username or FID (e.g. vitalik or 1234)"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          error={error}
          disabled={isLoading}
          className="text-center"
        />
        <Button
          type="submit"
          variant="primary"
          size="lg"
          isLoading={isLoading}
          className="w-full"
        >
          Analyze My Casts
        </Button>
      </div>
      <p className="text-xs text-zinc-500 dark:text-zinc-400 text-center mt-3">
        We&apos;ll analyze your last 30 days of posts and give you actionable feedback
      </p>
    </form>
  );
}
