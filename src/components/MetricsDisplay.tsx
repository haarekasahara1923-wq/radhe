"use client";

import { useTypingStore } from "@/lib/store";
import { Gauge, Target, AlertCircle, Zap, TrendingUp } from "lucide-react";

export default function MetricsDisplay() {
  const { wpm, accuracy, errors, cpm } = useTypingStore();

  const metrics = [
    { 
      label: "Net speed", 
      subLabel: "WPM",
      value: wpm, 
      icon: Gauge, 
      color: "text-emerald-500", 
      bg: "bg-emerald-50 dark:bg-emerald-950/20",
      description: "Words per minute (Net)"
    },
    { 
      label: "Accuracy", 
      subLabel: "Percentage",
      value: `${accuracy}%`, 
      icon: Target, 
      color: "text-blue-500", 
      bg: "bg-blue-50 dark:bg-blue-950/20",
      description: "Typing precision"
    },
    { 
      label: "Hard Errors", 
      subLabel: "Count",
      value: errors, 
      icon: AlertCircle, 
      color: "text-rose-500", 
      bg: "bg-rose-50 dark:bg-rose-950/20",
      description: "Mistakes made"
    },
    { 
      label: "Format", 
      subLabel: "CPM",
      value: cpm, 
      icon: Zap, 
      color: "text-amber-500", 
      bg: "bg-amber-50 dark:bg-amber-950/20", 
      description: "Characters per min"
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
      {metrics.map((m) => (
        <div 
          key={m.label} 
          className="group relative p-6 rounded-[2rem] bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
        >
          <div className="flex items-start justify-between mb-4">
            <div className={`p-3 rounded-2xl ${m.bg} group-hover:scale-110 transition-transform`}>
              <m.icon className={m.color} size={22} />
            </div>
            <TrendingUp size={14} className="text-zinc-300 dark:text-zinc-700" />
          </div>
          
          <div className="space-y-1">
             <div className="text-4xl font-black text-zinc-900 dark:text-zinc-100 tabular-nums tracking-tighter italic">
              {m.value}
            </div>
            <div className="flex items-center gap-1.5">
               <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400">{m.label}</span>
               <span className="text-[8px] font-bold text-zinc-300 dark:text-zinc-600 bg-zinc-100 dark:bg-zinc-800 px-1.5 rounded-full">{m.subLabel}</span>
            </div>
          </div>
          
          <div className="mt-4 pt-4 border-t border-zinc-50 dark:border-zinc-800/50">
             <p className="text-[9px] text-zinc-400 font-medium uppercase tracking-wider">{m.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

