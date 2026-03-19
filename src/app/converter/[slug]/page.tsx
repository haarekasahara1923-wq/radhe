"use client";

import { useState } from "react";
import { 
  RefreshCcw, 
  Copy, 
  ArrowRightLeft,
  FileText
} from "lucide-react";
import { useParams } from "next/navigation";

export default function DynamicConverterPage() {
  const params = useParams();
  const slug = (params.slug as string) || "krutidev-to-unicode";
  const isUnicodeToKruti = slug === "unicode-to-krutidev";
  
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const handleConvert = () => {
    setOutput(input); // Mocking conversion
    alert("Conversion complete! (Demo Mode)");
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    alert("Text copied!");
  };

  return (
    <div className="bg-zinc-50 min-h-screen pb-20">
      <div className="max-w-6xl mx-auto px-4 pt-10">
        <div className="mb-8 space-y-4">
          <h1 className="text-3xl font-black text-zinc-900 flex items-center gap-3">
            <div className="p-2 bg-purple-500 rounded-xl text-white">
              <RefreshCcw size={24} />
            </div>
            {isUnicodeToKruti ? "Unicode to KrutiDev Converter" : "KrutiDev to Unicode Converter"}
          </h1>
          <p className="text-zinc-500 font-medium max-w-3xl">
            {isUnicodeToKruti 
              ? "Convert your Unicode (Mangal) Hindi text into KrutiDev font instantly." 
              : "Convert your KrutiDev Hindi text into Unicode (Mangal) instantly."}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <label className="text-sm font-black text-zinc-400 uppercase tracking-widest flex items-center gap-2">
                <FileText size={16} /> {isUnicodeToKruti ? "Unicode" : "KrutiDev"} (Input)
              </label>
              <button onClick={() => setInput("")} className="text-xs font-bold text-red-500 hover:bg-red-50 px-2 py-1 rounded">Clear</button>
            </div>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={`Paste your ${isUnicodeToKruti ? 'Unicode' : 'KrutiDev'} text here...`}
              className="w-full h-80 bg-white border border-zinc-200 rounded-[24px] p-6 outline-none focus:ring-2 focus:ring-purple-500/20 shadow-sm text-lg"
            />
            <button 
              onClick={handleConvert}
              className="w-full py-4 bg-purple-600 hover:bg-purple-700 text-white rounded-2xl font-black text-xl shadow-xl shadow-purple-500/20 transition-all hover:-translate-y-1 flex items-center justify-center gap-2"
            >
              Convert <ArrowRightLeft size={24} />
            </button>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <label className="text-sm font-black text-zinc-400 uppercase tracking-widest flex items-center gap-2">
                <RefreshCcw size={16} /> {isUnicodeToKruti ? "KrutiDev" : "Unicode"} (Output)
              </label>
              <button onClick={() => handleCopy(output)} className="text-xs font-bold text-zinc-600 hover:bg-zinc-100 px-2 py-1 rounded flex items-center gap-1">
                <Copy size={12} /> Copy Output
              </button>
            </div>
            <div className="w-full h-80 bg-zinc-100 border border-zinc-200 rounded-[24px] p-6 text-lg overflow-auto text-zinc-800">
              {output || <span className="text-zinc-400 italic">Your converted text will appear here...</span>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
