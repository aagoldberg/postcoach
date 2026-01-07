'use client';

import { ReactNode } from 'react';
import '@farcaster/auth-kit/styles.css';
import { AuthKitProvider } from '@farcaster/auth-kit';

const config = {
  rpcUrl: 'https://mainnet.optimism.io',
  domain: typeof window !== 'undefined' ? window.location.host : 'localhost:3000',
  siweUri: typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000',
};

interface ProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <AuthKitProvider config={config}>
      {children}
    </AuthKitProvider>
  );
}
