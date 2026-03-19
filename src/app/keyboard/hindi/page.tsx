"use client";

import { useState } from "react";
import { 
  Keyboard, 
  Languages, 
  Type,
  Copy,
  Trash2
} from "lucide-react";

const HINDI_LAYOUT = [
  ["१", "२", "३", "४", "५", "६", "७", "८", "९", "०", "-", "+"],
  ["ौ", "ै", "ा", "ी", "ू", "ब", "ह", "ग", "द", "ज", "ड", "ृ"],
  ["ो", "े", "अ", "ि", "ु", "प", "र", "क", "त", "च", "ट", "ं"],
  ["ण", "ं", "म", "न", "व", "ल", "स", "य", "श", "ष", "।", "!"]
];

export default function HindiKeyboardPage() {
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
            Online Hindi Keyboard <span className="text-zinc-400 font-medium">(Visual Layout)</span>
          </h1>
          <p className="text-zinc-500 font-medium max-w-3xl">
            Type in Devanagari script using our virtual Hindi keyboard. Perfect for users who don&apos;t have a Hindi keyboard or want to type with a mouse.
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
            className="w-full h-48 p-8 outline-none font-mangal resize-none"
            placeholder="Click keys or type here..."
          />
        </div>

        {/* Keyboard Layout */}
        <div className="bg-zinc-200/50 p-6 rounded-[40px] border border-zinc-200 shadow-inner">
          <div className="flex flex-col gap-3">
            {HINDI_LAYOUT.map((row, rowIndex) => (
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

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
           <div className="space-y-4">
              <h3 className="text-xl font-black text-zinc-900 flex items-center gap-2">
                 <Languages className="text-green-500" size={24} />
                 Special Features
              </h3>
              <ul className="space-y-3 text-zinc-500 font-medium list-disc pl-5">
                 <li>No special Hindi font installation required.</li>
                 <li>Works on all browsers and operating systems.</li>
                 <li>Supports both mouse clicks and physical keyboard.</li>
                 <li>Easily copy-paste translated text to other apps.</li>
              </ul>
           </div>
           <div className="bg-zinc-900 p-8 rounded-[32px] text-white">
              <h3 className="text-xl font-bold mb-4">Pro Tip</h3>
              <p className="text-zinc-400 leading-relaxed text-sm">
                 If you are looking for fast typing, we recommend using our <strong>Phonetic (English to Hindi)</strong> tool instead, which allows you to type much faster by using English keyboard letters.
              </p>
           </div>
        </div>
      </div>
    </div>
  );
}
