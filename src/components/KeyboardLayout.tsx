"use client";

import { useTypingStore } from "@/lib/store";
import { useState, useEffect } from "react";
import { Keyboard, ChevronRight, ChevronLeft } from "lucide-react";
import { cn } from "@/lib/utils";

const ENGLISH_LAYOUT = [
  ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
  ["A", "S", "D", "F", "G", "H", "J", "K", "L", ";"],
  ["Z", "X", "C", "V", "B", "N", "M", ",", ".", "/"]
];

const HINDI_LAYOUT = [
  ["ौ", "ै", "ा", "ी", "ू", "ब", "ह", "ग", "द", "ज"],
  ["ो", "े", "अ", "ि", "ु", "प", "र", "क", "त", "च"],
  ["ण", "ं", "म", "न", "व", "ल", "स", "य", "श", "ष"]
];

export default function KeyboardLayout() {
  const { language, userInput, content, isFinished } = useTypingStore();
  const [isVisible, setIsVisible] = useState(true);
  // Detect screen size to hide keyboard by default on mobile
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setIsVisible(false); // Hide by default on mobile
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const currentLayout = language === "English" ? ENGLISH_LAYOUT : HINDI_LAYOUT;
  
  // Highlighting: show what needs to be typed NEXT
  const nextChar = content[userInput.length]?.toUpperCase() || "";
  const lastTypedChar = userInput.slice(-1).toUpperCase();

  return (
    <div className={cn(
      "fixed right-0 top-1/2 -translate-y-1/2 transition-all duration-500 z-[60]",
      isVisible ? "translate-x-0" : "translate-x-[calc(100%-40px)]"
    )}>
      <div className="flex items-center">
        {/* Toggle Button - always visible on top/side */}
        <button 
          onClick={() => setIsVisible(!isVisible)}
          className="bg-brand-primary text-white p-3 md:p-2 rounded-l-xl shadow-2xl hover:bg-orange-600 transition-colors flex items-center justify-center relative z-20"
          title={isVisible ? "Hide Keyboard" : "Show Keyboard"}
        >
          {isVisible ? <ChevronRight size={24} /> : <ChevronLeft size={24} />}
        </button>

        {/* Keyboard Content */}
        <div className={cn(
          "bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-4 md:p-6 rounded-l-3xl shadow-2xl transition-all duration-300",
          "w-[300px] sm:w-[350px] md:w-[400px] lg:min-w-[400px]" // Responsive width
        )}>
          <div className="flex items-center gap-2 mb-4 md:mb-6 border-b border-zinc-100 dark:border-zinc-800 pb-3 md:pb-4">
            <Keyboard className="text-brand-primary shrink-0" size={18} />
            <h3 className="font-bold text-zinc-800 dark:text-zinc-100 uppercase tracking-wider text-[10px] md:text-xs">
              {language} Keyboard Assistant
            </h3>
          </div>

          <div className="flex flex-col gap-2 md:gap-3">
            {currentLayout.map((row, rowIndex) => (
              <div key={rowIndex} className="flex gap-1 md:gap-2 justify-center">
                {row.map((key) => {
                  const isNext = nextChar === key;
                  const isJustTyped = lastTypedChar === key;
                  
                  return (
                    <div
                      key={key}
                      className={cn(
                        "w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 flex items-center justify-center rounded-md md:rounded-lg border text-[10px] md:text-sm font-semibold transition-all duration-100 select-none",
                        isNext 
                          ? "bg-brand-primary text-white border-brand-primary scale-110 shadow-lg z-10 animate-bounce" 
                          : isJustTyped && !isFinished
                            ? "bg-brand-primary/20 border-brand-primary text-brand-primary"
                            : "bg-zinc-50 dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400"
                      )}
                    >
                      {key}
                    </div>
                  );
                })}
              </div>
            ))}
            
            <div className="mt-2 md:mt-4 flex flex-col gap-2">
               <div className={cn(
                 "h-8 md:h-10 w-full rounded-md md:rounded-lg border flex items-center justify-center text-[10px] italic font-bold uppercase tracking-widest transition-all",
                 content[userInput.length] === " " 
                  ? "bg-brand-primary text-white border-brand-primary animate-pulse" 
                  : "bg-zinc-50 dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 text-zinc-400"
               )}>
                 Space Bar
               </div>
            </div>
          </div>
          
          <div className="mt-4 md:mt-6 flex items-center justify-between text-[9px] md:text-[10px] text-zinc-400 font-bold uppercase tracking-tighter">
            <span>Visual Guide</span>
            <div className="flex gap-2">
               <div className="flex items-center gap-1">
                 <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-brand-primary rounded-full" />
                 <span>Next Key</span>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
