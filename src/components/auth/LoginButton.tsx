'use client';

import { SignInButton, useProfile, useSignIn } from '@farcaster/auth-kit';

interface LoginButtonProps {
  theme?: 'sage' | 'cyberpunk';
}

export function LoginButton({ theme = 'sage' }: LoginButtonProps) {
  const { isAuthenticated, profile } = useProfile();
  const { signOut } = useSignIn({});

  if (isAuthenticated && profile) {
    return (
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          {profile.pfpUrl && (
            <img
              src={profile.pfpUrl}
              alt={profile.username || 'User'}
              className={`w-8 h-8 object-cover ${theme === 'cyberpunk' ? 'rounded-none border border-[#00f0ff]' : 'rounded-full'}`}
            />
          )}
          <span className={`text-sm font-bold ${theme === 'cyberpunk' ? 'text-[#00f0ff] uppercase tracking-wider' : 'text-[#1a1f2e]'}`}>
            @{profile.username}
          </span>
        </div>
        <button
          onClick={() => signOut()}
          className={`px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider transition-all ${
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

  return (
    <div className={theme === 'cyberpunk' ? 'farcaster-auth-cyberpunk' : ''}>
      <SignInButton />
    </div>
  );
}
