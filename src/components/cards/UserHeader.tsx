'use client';

import Image from 'next/image';
import type { FarcasterUser } from '@/types';
import { Card } from '@/components/ui';

interface UserHeaderProps {
  user: FarcasterUser;
}

export function UserHeader({ user }: UserHeaderProps) {
  return (
    <Card className="flex flex-col items-center gap-4 p-8 bg-white text-center overflow-visible">
      <div className="relative w-24 h-24 rounded-[2rem] overflow-hidden border-[6px] border-white shadow-xl flex-shrink-0">
        {user.pfpUrl ? (
          <Image
            src={user.pfpUrl}
            alt={user.displayName}
            fill
            className="object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-3xl font-bold bg-stone-100 text-stone-400">
            {user.displayName[0]?.toUpperCase() || '?'}
          </div>
        )}
      </div>
      <div className="space-y-1">
        <h1 className="text-3xl font-black text-[#1a1f2e] tracking-tighter serif-heading">{user.displayName}</h1>
        <p className="text-stone-400 font-bold text-xs tracking-widest uppercase">@{user.username}</p>
        <div className="flex gap-8 mt-6 pt-6 border-t border-stone-50 text-[10px] font-bold uppercase tracking-[0.2em] text-stone-400">
          <span className="flex flex-col items-center">
            <strong className="text-lg text-[#1a1f2e] font-black tracking-tighter">{user.followerCount.toLocaleString()}</strong> followers
          </span>
          <span className="flex flex-col items-center">
            <strong className="text-lg text-[#1a1f2e] font-black tracking-tighter">{user.followingCount.toLocaleString()}</strong> following
          </span>
        </div>
      </div>
    </Card>
  );
}
