"use client";

import { useTypingStore } from "@/lib/store";
import { CheckCircle2, RotateCcw, Share2, Award } from "lucide-react";

import { useEffect } from "react";

export default function ResultCard() {
  const { wpm, accuracy, errors, reset, language, selectedTime } = useTypingStore();

  useEffect(() => {
    // Proactively save results to Neon database
    const saveResult = async () => {
      try {
        await fetch("/api/results", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            language,
            wpm,
            accuracy,
            errors,
            duration: selectedTime 
          })
        });
      } catch (e) {
        console.error("Auto-save failed:", e);
      }
    };

    if (wpm > 0) saveResult();
  }, [wpm, accuracy, errors, language, selectedTime]);

  return (
    <div className="bg-white dark:bg-zinc-900 rounded-3xl p-10 shadow-2xl border border-zinc-200 dark:border-zinc-800 max-w-2xl mx-auto overflow-hidden relative">
      <div className="absolute top-0 right-0 p-8 text-brand-primary opacity-10">
        <Award size={160} />
      </div>
      
      <div className="flex flex-col items-center text-center relative z-10">
        <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-6">
          <CheckCircle2 className="text-green-500" size={40} />
        </div>
        
        <h1 className="text-4xl font-bold mb-2">Excellent Work!</h1>
        <p className="text-zinc-500 mb-10">You have successfully completed the {Math.round(selectedTime / 60)}-minute typing examination.</p>

        
        <div className="grid grid-cols-3 gap-8 w-full mb-10">
          <div className="text-center">
            <div className="text-4xl font-black text-brand-primary mb-1">{wpm}</div>
            <div className="text-xs uppercase tracking-widest text-zinc-400 font-bold">WPM</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-black text-zinc-800 dark:text-zinc-100 mb-1">{accuracy}%</div>
            <div className="text-xs uppercase tracking-widest text-zinc-400 font-bold">Accuracy</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-black text-red-500 mb-1">{errors}</div>
            <div className="text-xs uppercase tracking-widest text-zinc-400 font-bold">Errors</div>
          </div>
        </div>
        
        <div className="flex gap-4 w-full">
          <button 
            onClick={reset}
            className="flex-1 flex items-center justify-center gap-2 bg-brand-primary hover:bg-orange-600 text-white font-bold py-4 px-6 rounded-2xl transition-all shadow-lg hover:shadow-orange-500/20"
          >
            <RotateCcw size={20} />
            Try Again
          </button>
          <button className="flex-1 flex items-center justify-center gap-2 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-100 font-bold py-4 px-6 rounded-2xl transition-all">
            <Share2 size={20} />
            Share Report
          </button>
        </div>
      </div>
    </div>
  );
}
