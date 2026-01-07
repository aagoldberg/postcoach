'use client';

import { useState } from 'react';
import { SignInButton, useProfile, useSignIn } from '@farcaster/auth-kit';
import { useBaseAuth } from '@/app/providers';

interface LoginButtonProps {
  theme?: 'sage' | 'cyberpunk';
}

export function LoginButton({ theme = 'sage' }: LoginButtonProps) {
  const { isAuthenticated: isFarcasterAuth, profile } = useProfile();
  const { signOut: signOutFarcaster } = useSignIn({});
  const { baseUser, isBaseAuthenticated, signInWithBase, signOutBase } = useBaseAuth();
  const [showMenu, setShowMenu] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const isAuthenticated = isFarcasterAuth || isBaseAuthenticated;

  // Format Base address for display
  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const handleSignOut = () => {
    if (isFarcasterAuth) {
      signOutFarcaster();
    }
    if (isBaseAuthenticated) {
      signOutBase();
    }
    setShowMenu(false);
  };

  const handleBaseSignIn = async () => {
    setIsLoading(true);
    try {
      await signInWithBase();
    } catch (error) {
      console.error('Failed to sign in with Base:', error);
    } finally {
      setIsLoading(false);
      setShowMenu(false);
    }
  };

  // Authenticated state
  if (isAuthenticated) {
    return (
      <div className="flex items-center gap-2 md:gap-3">
        <div className="flex items-center gap-2">
          {isFarcasterAuth && profile?.pfpUrl && (
            <img
              src={profile.pfpUrl}
              alt={profile.username || 'User'}
              className={`w-7 h-7 md:w-8 md:h-8 object-cover ${theme === 'cyberpunk' ? 'rounded-none border border-[#00f0ff]' : 'rounded-full'}`}
            />
          )}
          {isBaseAuthenticated && !isFarcasterAuth && (
            <div className={`w-7 h-7 md:w-8 md:h-8 flex items-center justify-center ${theme === 'cyberpunk' ? 'bg-[#0052ff] rounded-none border border-[#00f0ff]' : 'bg-[#0052ff] rounded-full'}`}>
              <svg className="w-4 h-4 text-white" viewBox="0 0 111 111" fill="currentColor">
                <path d="M55.5 0C24.85 0 0 24.85 0 55.5S24.85 111 55.5 111 111 86.15 111 55.5 86.15 0 55.5 0Zm29.34 66.42H26.16V44.58h58.68v21.84Z"/>
              </svg>
            </div>
          )}
          <span className={`hidden md:block text-sm font-bold ${theme === 'cyberpunk' ? 'text-[#00f0ff] uppercase tracking-wider' : 'text-[#1a1f2e]'}`}>
            {isFarcasterAuth && profile?.username ? `@${profile.username}` : formatAddress(baseUser?.address || '')}
          </span>
        </div>
        <button
          onClick={handleSignOut}
          className={`px-2 py-1 md:px-3 md:py-1.5 text-[8px] md:text-[10px] font-bold uppercase tracking-wider transition-all ${
            theme === 'cyberpunk'
              ? 'border border-[#ff0099] text-[#ff0099] hover:bg-[#ff0099] hover:text-black'
              : 'border border-stone-300 text-stone-500 hover:border-stone-400 hover:text-stone-700 rounded-lg'
          }`}
        >
          Sign Out
        </button>
      </div>
    );
  }

  // Unauthenticated state - show sign in options
  return (
    <div className="relative">
      <button
        onClick={() => setShowMenu(!showMenu)}
        className={`px-3 py-1.5 md:px-4 md:py-2 text-[8px] md:text-[10px] font-bold uppercase tracking-wider transition-all ${
          theme === 'cyberpunk'
            ? 'border border-[#00f0ff] text-[#00f0ff] hover:bg-[#00f0ff] hover:text-black'
            : 'bg-[#1a1f2e] text-white hover:bg-[#2d364d] rounded-lg'
        }`}
      >
        Sign In
      </button>

      {showMenu && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40"
            onClick={() => setShowMenu(false)}
          />

          {/* Dropdown menu */}
          <div className={`absolute right-0 top-full mt-2 z-50 min-w-[220px] ${
            theme === 'cyberpunk'
              ? 'bg-black border border-[#00f0ff] shadow-[0_0_20px_rgba(0,240,255,0.2)]'
              : 'bg-white border border-stone-200 rounded-xl shadow-lg'
          }`}>
            <div className={`px-3 py-2 text-[10px] font-bold uppercase tracking-wider ${
              theme === 'cyberpunk' ? 'text-[#00f0ff]/60 border-b border-[#00f0ff]/20' : 'text-stone-400 border-b border-stone-100'
            }`}>
              Choose provider
            </div>

            {/* Farcaster option */}
            <div className="p-2">
              <div className={theme === 'cyberpunk' ? 'farcaster-auth-cyberpunk' : ''}>
                <SignInButton />
              </div>
            </div>

            {/* Divider */}
            <div className={`mx-2 ${theme === 'cyberpunk' ? 'border-t border-[#00f0ff]/20' : 'border-t border-stone-100'}`} />

            {/* Base option */}
            <div className="p-2">
              <button
                onClick={handleBaseSignIn}
                disabled={isLoading}
                className={`w-full flex items-center justify-center gap-2 px-4 py-2.5 font-semibold text-sm transition-all ${
                  theme === 'cyberpunk'
                    ? 'bg-[#0052ff] text-white hover:bg-[#0066ff] disabled:opacity-50'
                    : 'bg-[#0052ff] text-white hover:bg-[#0066ff] rounded-lg disabled:opacity-50'
                }`}
              >
                {isLoading ? (
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" viewBox="0 0 111 111" fill="white">
                    <path d="M55.5 0C24.85 0 0 24.85 0 55.5S24.85 111 55.5 111 111 86.15 111 55.5 86.15 0 55.5 0Zm29.34 66.42H26.16V44.58h58.68v21.84Z"/>
                  </svg>
                )}
                Sign in with Base
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
