'use client';

import { useState, useEffect } from 'react';
import { SignInButton, useProfile, useSignIn } from '@farcaster/auth-kit';
import { useBaseAuth } from '@/app/providers';

interface LoginButtonProps {
  theme?: 'sage' | 'cyberpunk';
}

// Farcaster logo SVG
const FarcasterLogo = () => (
  <svg width="20" height="20" viewBox="0 0 1000 1000" fill="currentColor">
    <path d="M257.778 155.556H742.222V844.444H671.111V528.889H670.414C662.554 441.677 589.258 373.333 500 373.333C410.742 373.333 337.446 441.677 329.586 528.889H328.889V844.444H257.778V155.556Z"/>
    <path d="M128.889 253.333L157.778 351.111H182.222V746.667C169.949 746.667 160 756.616 160 768.889V795.556H155.556C143.283 795.556 133.333 805.505 133.333 817.778V844.444H382.222V817.778C382.222 805.505 372.273 795.556 360 795.556H355.556V768.889C355.556 756.616 345.606 746.667 333.333 746.667H306.667V253.333H128.889Z"/>
    <path d="M693.333 746.667C681.06 746.667 671.111 756.616 671.111 768.889V795.556H666.667C654.394 795.556 644.444 805.505 644.444 817.778V844.444H893.333V817.778C893.333 805.505 883.384 795.556 871.111 795.556H866.667V768.889C866.667 756.616 856.717 746.667 844.444 746.667V351.111H868.889L897.778 253.333H720V746.667H693.333Z"/>
  </svg>
);

// Base logo SVG
const BaseLogo = () => (
  <svg width="20" height="20" viewBox="0 0 111 111" fill="currentColor">
    <path d="M55.5 111C86.15 111 111 86.15 111 55.5C111 24.85 86.15 0 55.5 0C26.1851 0 2.18982 22.6106 0.0615234 51.4103H73.4718V59.5897H0.0615234C2.18982 88.3894 26.1851 111 55.5 111Z"/>
  </svg>
);

export function LoginButton({ theme = 'sage' }: LoginButtonProps) {
  const { isAuthenticated: isFarcasterAuth, profile } = useProfile();
  const { signOut: signOutFarcaster } = useSignIn({});
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
              className={`w-7 h-7 md:w-8 md:h-8 object-cover ${theme === 'cyberpunk' ? 'rounded-none border border-[#00f0ff]' : 'rounded-full'}`}
            />
          ) : isBaseAuthenticated ? (
            <div className={`w-7 h-7 md:w-8 md:h-8 flex items-center justify-center bg-[#0052ff] ${theme === 'cyberpunk' ? 'rounded-none' : 'rounded-full'}`}>
              <BaseLogo />
            </div>
          ) : null}
          <span className={`hidden md:block text-sm font-medium ${theme === 'cyberpunk' ? 'text-[#00f0ff]' : 'text-[#1a1f2e]'}`}>
            {isFarcasterAuth && profile?.username ? `@${profile.username}` : formatAddress(baseUser?.address || '')}
          </span>
        </div>
        <button
          onClick={handleSignOut}
          className={`px-3 py-1.5 text-xs font-medium transition-all ${
            theme === 'cyberpunk'
              ? 'text-[#ff0099] hover:text-white'
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
    <>
      <button
        onClick={() => setShowModal(true)}
        className={`px-4 py-2 text-sm font-medium transition-all ${
          theme === 'cyberpunk'
            ? 'bg-[#00f0ff] text-black hover:bg-white'
            : 'bg-[#1a1f2e] text-white hover:bg-[#2d364d] rounded-lg'
        }`}
      >
        Sign in
      </button>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
          {/* Backdrop */}
          <div
            className={`absolute inset-0 ${theme === 'cyberpunk' ? 'bg-black/90' : 'bg-black/50'}`}
            onClick={() => setShowModal(false)}
          />

          {/* Modal content */}
          <div className={`relative w-full max-w-sm ${
            theme === 'cyberpunk'
              ? 'bg-[#0a0a0a] border border-[#00f0ff]/30'
              : 'bg-white rounded-2xl shadow-2xl'
          }`}>
            {/* Header */}
            <div className={`px-6 pt-6 pb-4 ${theme === 'cyberpunk' ? 'border-b border-[#00f0ff]/20' : ''}`}>
              <div className="flex items-center justify-between">
                <h2 className={`text-lg font-semibold ${theme === 'cyberpunk' ? 'text-white' : 'text-[#1a1f2e]'}`}>
                  Sign in to PostCoach
                </h2>
                <button
                  onClick={() => setShowModal(false)}
                  className={`p-1 transition-colors ${theme === 'cyberpunk' ? 'text-[#00f0ff]/60 hover:text-[#00f0ff]' : 'text-stone-400 hover:text-stone-600'}`}
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <p className={`mt-1 text-sm ${theme === 'cyberpunk' ? 'text-[#00f0ff]/60' : 'text-stone-500'}`}>
                Choose your preferred sign-in method
              </p>
            </div>

            {/* Options */}
            <div className="p-6 space-y-3">
              {/* Farcaster */}
              <div className={theme === 'cyberpunk' ? 'farcaster-auth-cyberpunk [&_button]:w-full [&_button]:justify-start' : '[&_button]:w-full [&_button]:justify-start'}>
                <style jsx global>{`
                  .fc-authkit-signin-button button {
                    width: 100% !important;
                    justify-content: flex-start !important;
                    padding: 12px 16px !important;
                    border-radius: ${theme === 'cyberpunk' ? '0' : '12px'} !important;
                    font-weight: 500 !important;
                    font-size: 14px !important;
                  }
                `}</style>
                <SignInButton />
              </div>

              {/* Divider */}
              <div className="relative py-2">
                <div className={`absolute inset-0 flex items-center ${theme === 'cyberpunk' ? '' : ''}`}>
                  <div className={`w-full border-t ${theme === 'cyberpunk' ? 'border-[#00f0ff]/20' : 'border-stone-200'}`} />
                </div>
                <div className="relative flex justify-center">
                  <span className={`px-3 text-xs ${theme === 'cyberpunk' ? 'bg-[#0a0a0a] text-[#00f0ff]/40' : 'bg-white text-stone-400'}`}>
                    or
                  </span>
                </div>
              </div>

              {/* Base */}
              <button
                onClick={handleBaseSignIn}
                disabled={isLoading}
                className={`w-full flex items-center gap-3 px-4 py-3 font-medium text-sm transition-all disabled:opacity-50 ${
                  theme === 'cyberpunk'
                    ? 'bg-[#0052ff] text-white hover:bg-[#0066ff] border border-[#0052ff]'
                    : 'bg-white text-[#1a1f2e] hover:bg-stone-50 border border-stone-200 rounded-xl'
                }`}
              >
                {isLoading ? (
                  <svg className="animate-spin h-5 w-5 text-current" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                ) : (
                  <div className={`flex items-center justify-center w-5 h-5 ${theme === 'cyberpunk' ? 'text-white' : 'text-[#0052ff]'}`}>
                    <BaseLogo />
                  </div>
                )}
                <span>Continue with Base</span>
              </button>
            </div>

            {/* Footer */}
            <div className={`px-6 pb-6 ${theme === 'cyberpunk' ? '' : ''}`}>
              <p className={`text-xs text-center ${theme === 'cyberpunk' ? 'text-[#00f0ff]/40' : 'text-stone-400'}`}>
                By signing in, you agree to our terms of service
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
