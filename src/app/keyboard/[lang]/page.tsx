"use client";

import { useState } from "react";
import { 
  Keyboard, 
  Type,
  Copy,
  Trash2
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useParams } from "next/navigation";

const HINDI_LAYOUT = [
  ["१", "२", "३", "४", "५", "६", "७", "८", "९", "०", "-", "+"],
  ["ौ", "ै", "ा", "ी", "ू", "ब", "ह", "ग", "द", "ज", "ड", "ृ"],
  ["ो", "े", "अ", "ि", "ु", "प", "र", "क", "त", "च", "ट", "ं"],
  ["ण", "ं", "म", "न", "व", "ल", "स", "य", "श", "ष", "।", "!"]
];

const ENGLISH_LAYOUT = [
  ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "="],
  ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", "[", "]"],
  ["A", "S", "D", "F", "G", "H", "J", "K", "L", ";", "'", "\\"],
  ["Z", "X", "C", "V", "B", "N", "M", ",", ".", "/", "?", "!"]
];

export default function DynamicKeyboardPage() {
  const params = useParams();
  const lang = (params.lang as string) || "hindi";
  const capitalLang = lang.charAt(0).toUpperCase() + lang.slice(1);
  const layout = lang === "english" ? ENGLISH_LAYOUT : HINDI_LAYOUT;

  const [text, setText] = useState("");
  const [fontSize, setFontSize] = useState(24);

  const handleKeyClick = (key: string) => {
    setText(text + key);
  };

  return (
    <div className="bg-zinc-50 min-h-screen pb-20 pt-10">
      <div className="max-w-5xl mx-auto px-4">
        <div className="mb-10 space-y-4">
          <h1 className="text-3xl font-black text-zinc-900 flex items-center gap-3">
            <div className="p-2 bg-green-500 rounded-xl text-white">
              <Keyboard size={24} />
            </div>
            Online {capitalLang} Keyboard
          </h1>
          <p className="text-zinc-500 font-medium max-w-3xl">
            Type in {capitalLang} script using our virtual keyboard. Perfect for users who don&apos;t have a physical keyboard or want to type with a mouse.
          </p>
        </div>

        {/* Text Area */}
        <div className="bg-white border border-zinc-200 rounded-[32px] overflow-hidden shadow-xl mb-8 transition-all hover:border-green-500/30">
          <div className="p-4 border-b border-zinc-100 flex justify-between items-center bg-zinc-50/50">
             <div className="flex items-center gap-2">
                <button onClick={() => setFontSize(Math.max(16, fontSize - 2))} className="p-2 hover:bg-zinc-200 rounded-lg"><Type size={16} /></button>
                <span className="text-sm font-bold w-12 text-center text-zinc-500">{fontSize}px</span>
                <button onClick={() => setFontSize(Math.min(60, fontSize + 2))} className="p-2 hover:bg-zinc-200 rounded-lg"><Type size={24} /></button>
             </div>
             <div className="flex gap-2">
                <button onClick={() => navigator.clipboard.writeText(text)} className="flex items-center gap-2 px-4 py-2 bg-white border border-zinc-200 hover:border-green-500 hover:text-green-600 rounded-xl text-xs font-bold transition-all"><Copy size={14} /> Copy</button>
                <button onClick={() => setText("")} className="flex items-center gap-2 px-4 py-2 bg-white border border-zinc-200 hover:border-red-500 hover:text-red-600 rounded-xl text-xs font-bold transition-all"><Trash2 size={14} /> Clear</button>
             </div>
          </div>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            style={{ fontSize: `${fontSize}px` }}
            className={cn("w-full h-48 p-8 outline-none resize-none", lang === "hindi" ? "font-mangal" : "font-sans")}
            placeholder="Click keys or type here..."
          />
        </div>

        {/* Keyboard Layout */}
        <div className="bg-zinc-200/50 p-6 rounded-[40px] border border-zinc-200 shadow-inner overflow-x-auto">
          <div className="flex flex-col gap-3 min-w-[600px]">
            {layout.map((row, rowIndex) => (
              <div key={rowIndex} className="flex gap-2 justify-center">
                {row.map((key) => (
                  <button
                    key={key}
                    onClick={() => handleKeyClick(key)}
                    className="w-12 h-12 md:w-16 md:h-16 flex items-center justify-center bg-white border-b-4 border-zinc-300 rounded-xl text-xl font-bold text-zinc-700 hover:bg-zinc-50 active:border-b-0 active:translate-y-1 transition-all shadow-sm"
                  >
                    {key}
                  </button>
                ))}
              </div>
            ))}
            <div className="flex gap-2 justify-center mt-2">
               <button 
                  onClick={() => setText(text + " ")}
                  className="w-72 h-14 bg-white border-b-4 border-zinc-300 rounded-xl font-black text-zinc-400 uppercase tracking-widest text-xs hover:bg-zinc-50 active:border-b-0 active:translate-y-1 transition-all"
               >
                 Space
               </button>
               <button 
                  onClick={() => setText(text.slice(0, -1))}
                  className="w-24 h-14 bg-red-50 border-b-4 border-red-200 text-red-500 rounded-xl font-black uppercase tracking-widest text-xs hover:bg-red-100 active:border-b-0 active:translate-y-1 transition-all"
               >
                 Backspace
               </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
