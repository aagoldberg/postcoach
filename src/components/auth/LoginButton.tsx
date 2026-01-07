'use client';

import { useState, useEffect } from 'react';
import { useProfile, useSignIn } from '@farcaster/auth-kit';
import { useBaseAuth } from '@/app/providers';

interface LoginButtonProps {
  theme?: 'sage' | 'cyberpunk';
}

// Farcaster logo
const FarcasterLogo = () => (
  <img src="/logos/farcaster/farcaster-logo.png" alt="Farcaster" width={20} height={20} className="object-contain" />
);

// Base logo
const BaseLogo = () => (
  <img src="/logos/base/base-logo.png" alt="Base" width={16} height={16} className="object-contain" />
);

export function LoginButton({ theme = 'sage' }: LoginButtonProps) {
  const { isAuthenticated: isFarcasterAuth, profile } = useProfile();
  const { signIn: signInFarcaster, signOut: signOutFarcaster } = useSignIn({});
  const { baseUser, isBaseAuthenticated, signInWithBase, signOutBase } = useBaseAuth();
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const isAuthenticated = isFarcasterAuth || isBaseAuthenticated;

  // Close modal on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setShowModal(false);
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, []);

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const handleSignOut = () => {
    if (isFarcasterAuth) signOutFarcaster();
    if (isBaseAuthenticated) signOutBase();
  };

  const handleBaseSignIn = async () => {
    setIsLoading(true);
    try {
      await signInWithBase();
      setShowModal(false);
    } catch (error) {
      console.error('Failed to sign in with Base:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Authenticated state
  if (isAuthenticated) {
    return (
      <div className="flex items-center gap-2 md:gap-3">
        <div className="flex items-center gap-2">
          {isFarcasterAuth && profile?.pfpUrl ? (
            <img
              src={profile.pfpUrl}
              alt={profile.username || 'User'}
              className={`w-7 h-7 md:w-8 md:h-8 object-cover ${theme === 'cyberpunk' ? 'rounded-none border border-[#66D9EF]' : 'rounded-full'}`}
            />
          ) : isBaseAuthenticated ? (
            <div className={`w-7 h-7 md:w-8 md:h-8 flex items-center justify-center bg-[#0052ff] ${theme === 'cyberpunk' ? 'rounded-none' : 'rounded-full'}`}>
              <BaseLogo />
            </div>
          ) : null}
          <span className={`hidden md:block text-sm font-medium ${theme === 'cyberpunk' ? 'text-[#66D9EF]' : 'text-[#1a1f2e]'}`}>
            {isFarcasterAuth && profile?.username ? `@${profile.username}` : formatAddress(baseUser?.address || '')}
          </span>
        </div>
        <button
          onClick={handleSignOut}
          className={`px-3 py-1.5 text-xs font-medium transition-all ${
            theme === 'cyberpunk'
              ? 'text-[#F92672] hover:text-[#F8F8F2]'
              : 'text-stone-400 hover:text-stone-600'
          }`}
        >
          Sign out
        </button>
      </div>
    );
  }

  // Unauthenticated state
  return (
    <div className="relative">
      <button
        onClick={() => setShowModal(!showModal)}
        className={`px-4 py-2 text-sm font-medium transition-all ${
          theme === 'cyberpunk'
            ? 'bg-[#66D9EF] text-[#272822] hover:bg-[#F8F8F2]'
            : 'bg-[#1a1f2e] text-white hover:bg-[#2d364d] rounded-lg'
        }`}
      >
        Sign in
      </button>

      {/* Dropdown */}
      {showModal && (
        <div 
          className="absolute top-full right-0 mt-2 w-64 p-2 z-[200] rounded-xl border overflow-hidden animate-in fade-in zoom-in-95 duration-200"
          style={{
            backgroundColor: 'var(--toggle-bg)',
            borderColor: 'var(--toggle-border)',
            boxShadow: 'var(--toggle-shadow)'
          }}
        >
          {/* Header */}
          <div className="px-3 py-2">
            <p 
              className="text-xs font-bold uppercase tracking-wider opacity-60"
              style={{ color: 'var(--toggle-text)' }}
            >
              Sign in with
            </p>
          </div>

          <div className="space-y-2">
            {/* Farcaster */}
            <button
              onClick={() => signInFarcaster()}
              className="w-full flex items-center gap-3 px-3 py-2.5 font-medium text-sm transition-all rounded-xl border"
              style={{
                borderColor: 'var(--toggle-border)',
                color: 'var(--toggle-text-active)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--toggle-slider)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
              }}
            >
              <FarcasterLogo />
              <span>Farcaster</span>
            </button>

            {/* Base */}
            <button
              onClick={handleBaseSignIn}
              disabled={isLoading}
              className="w-full flex items-center gap-3 px-3 py-2.5 font-medium text-sm transition-all rounded-xl border disabled:opacity-50"
              style={{
                borderColor: 'var(--toggle-border)',
                color: 'var(--toggle-text-active)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--toggle-slider)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
              }}
            >
              {isLoading ? (
                <svg className="animate-spin h-5 w-5 text-current" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
              ) : (
                <BaseLogo />
              )}
              <span>Base</span>
            </button>
          </div>
        </div>
      )}
      
      {/* Backdrop to close dropdown */}
      {showModal && (
        <div 
          className="fixed inset-0 z-[190]" 
          onClick={() => setShowModal(false)}
        />
      )}
    </div>
  );
}
