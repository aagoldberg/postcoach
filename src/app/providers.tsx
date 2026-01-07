'use client';

import { ReactNode, createContext, useContext, useState, useCallback } from 'react';
import '@farcaster/auth-kit/styles.css';
import { AuthKitProvider } from '@farcaster/auth-kit';

// Farcaster config
const farcasterConfig = {
  rpcUrl: 'https://mainnet.optimism.io',
  domain: typeof window !== 'undefined' ? window.location.host : 'localhost:3000',
  siweUri: typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000',
};

// Base auth context
interface BaseUser {
  address: string;
  basename?: string;
}

interface BaseAuthContextType {
  baseUser: BaseUser | null;
  isBaseAuthenticated: boolean;
  signInWithBase: () => Promise<void>;
  signOutBase: () => void;
}

const BaseAuthContext = createContext<BaseAuthContextType>({
  baseUser: null,
  isBaseAuthenticated: false,
  signInWithBase: async () => {},
  signOutBase: () => {},
});

export const useBaseAuth = () => useContext(BaseAuthContext);

function BaseAuthProvider({ children }: { children: ReactNode }) {
  const [baseUser, setBaseUser] = useState<BaseUser | null>(null);

  const signInWithBase = useCallback(async () => {
    try {
      // Dynamic import to avoid SSR issues
      const { createBaseAccountSDK } = await import('@base-org/account');
      const { createWalletClient, custom } = await import('viem');
      const { base } = await import('viem/chains');

      const sdk = createBaseAccountSDK({
        appName: 'PostCoach',
        appLogoUrl: typeof window !== 'undefined' ? `${window.location.origin}/icon.png` : '',
        appChainIds: [base.id],
      });

      const provider = sdk.getProvider();
      const client = createWalletClient({
        chain: base,
        transport: custom(provider),
      });

      const [address] = await client.getAddresses();

      if (address) {
        setBaseUser({ address });
      }
    } catch (error) {
      console.error('Base sign in error:', error);
      throw error;
    }
  }, []);

  const signOutBase = useCallback(() => {
    setBaseUser(null);
  }, []);

  return (
    <BaseAuthContext.Provider
      value={{
        baseUser,
        isBaseAuthenticated: !!baseUser,
        signInWithBase,
        signOutBase,
      }}
    >
      {children}
    </BaseAuthContext.Provider>
  );
}

interface ProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <AuthKitProvider config={farcasterConfig}>
      <BaseAuthProvider>
        {children}
      </BaseAuthProvider>
    </AuthKitProvider>
  );
}
