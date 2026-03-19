"use client";

import { Gamepad2, Play, Trophy } from "lucide-react";
import { useParams } from "next/navigation";

export default function DynamicGamePage() {
  const params = useParams();
  const slug = (params.slug as string) || "tank-war";
  const capitalSlug = slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());

  return (
    <div className="bg-zinc-900 min-h-screen text-white flex flex-col items-center justify-center p-6 bg-[url('/grid-dark.svg')]">
      <div className="max-w-4xl w-full text-center space-y-10">
        <div className="inline-flex items-center gap-3 bg-white/5 border border-white/10 px-6 py-2 rounded-full animate-pulse">
          <Gamepad2 className="text-brand-primary" size={24} />
          <span className="text-sm font-bold uppercase tracking-widest">Typing Pro Arcade</span>
        </div>

        <h1 className="text-5xl md:text-7xl font-black tracking-tighter">
          {capitalSlug} <span className="text-brand-primary">Adventure</span>
        </h1>

        <div className="relative aspect-video w-full bg-zinc-800 rounded-[40px] border-4 border-zinc-700 flex flex-col items-center justify-center gap-8 shadow-2xl overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          
          <div className="z-10 text-center space-y-4">
             <div className="w-24 h-24 bg-brand-primary rounded-full flex items-center justify-center shadow-xl shadow-orange-500/40 hover:scale-110 transition-transform cursor-pointer mx-auto">
                <Play fill="white" size={40} className="ml-2" />
             </div>
             <p className="font-black text-2xl uppercase tracking-[0.2em]">Press Start</p>
          </div>

          <div className="absolute bottom-10 left-10 flex gap-4">
             <div className="bg-black/50 backdrop-blur px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-widest border border-white/10 flex items-center gap-2">
                <Trophy size={14} className="text-yellow-500" /> High Score: 12,450
             </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
           <div className="bg-white/5 p-6 rounded-3xl border border-white/10">
              <h4 className="font-bold text-brand-primary mb-2 uppercase">How to Play</h4>
              <p className="text-zinc-400">Type the words appearing on screen as fast as possible to progress.</p>
           </div>
           <div className="bg-white/5 p-6 rounded-3xl border border-white/10">
              <h4 className="font-bold text-brand-primary mb-2 uppercase">Game Rules</h4>
              <p className="text-zinc-400">Each typo takes one health point. 3 typos and it is game over!</p>
           </div>
           <div className="bg-white/5 p-6 rounded-3xl border border-white/10">
              <h4 className="font-bold text-brand-primary mb-2 uppercase">Rewards</h4>
              <p className="text-zinc-400">Unlock new tanks and weapons as you achieve higher WPM.</p>
           </div>
        </div>
      </div>
    </div>
  );
}
