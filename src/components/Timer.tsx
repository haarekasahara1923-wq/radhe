"use client";

import { useEffect } from "react";
import { useTypingStore } from "@/lib/store";
import { Timer as TimerIcon } from "lucide-react";

export default function Timer() {
  const { timeLeft, isStarted, tick, isFinished, selectedTime } = useTypingStore();

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isStarted && !isFinished && timeLeft > 0) {
      interval = setInterval(() => {
        tick();
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isStarted, isFinished, timeLeft, tick]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = (timeLeft / selectedTime) * 100;


  return (
    <div className="flex flex-col items-center justify-center p-4 bg-zinc-100 dark:bg-zinc-800 rounded-2xl border border-zinc-200 dark:border-zinc-700 shadow-inner">
      <div className="flex items-center gap-2 mb-2 text-zinc-500 font-medium uppercase text-xs tracking-widest">
        <TimerIcon size={14} className="text-brand-primary" />
        Time Remaining
      </div>
      <div className="text-4xl font-mono font-bold tabular-nums text-zinc-800 dark:text-zinc-100">
        {formatTime(timeLeft)}
      </div>
      
      {/* Progress Bar */}
      <div className="w-full h-1.5 bg-zinc-200 dark:bg-zinc-700 rounded-full mt-4 overflow-hidden">
        <div 
          className="h-full bg-brand-primary transition-all duration-1000 ease-linear"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
