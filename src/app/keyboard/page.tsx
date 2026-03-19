"use client";

import Link from "next/link";
import { Keyboard, ArrowRight } from "lucide-react";

export default function KeyboardsIndexPage() {
  const keyboards = [
    { name: "Hindi Keyboard", lang: "hindi", desc: "Standard Hindi Devanagari layout" },
    { name: "English Keyboard", lang: "english", desc: "QWERTY US English layout" },
    { name: "Marathi Keyboard", lang: "marathi", desc: "Marathi script typing guide" },
    { name: "Punjabi Keyboard", lang: "punjabi", desc: "Punjabi Gurmukhi keyboard tool" },
  ];

  return (
    <div className="bg-zinc-50 min-h-screen pb-20 pt-10">
      <div className="max-w-5xl mx-auto px-4">
        <div className="mb-12 text-center space-y-4">
          <h1 className="text-4xl font-black text-zinc-900">Virtual Online Keyboards</h1>
          <p className="text-zinc-500 font-medium max-w-2xl mx-auto">
            Access computer keyboards for multiple languages. Use your mouse or physical keys to type in your desired script.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {keyboards.map((kb) => (
            <Link 
              key={kb.lang} 
              href={`/keyboard/${kb.lang}`}
              className="group bg-white border border-zinc-200 p-8 rounded-[32px] hover:border-brand-primary hover:shadow-xl transition-all"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-zinc-100 group-hover:bg-brand-primary group-hover:text-white rounded-2xl transition-colors">
                  <Keyboard size={24} />
                </div>
                <ArrowRight className="text-zinc-300 group-hover:text-brand-primary transition-colors" />
              </div>
              <h3 className="text-xl font-bold text-zinc-900 group-hover:text-brand-primary transition-colors mb-2">{kb.name}</h3>
              <p className="text-zinc-500 text-sm">{kb.desc}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
