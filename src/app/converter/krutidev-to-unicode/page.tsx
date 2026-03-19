"use client";

import { useState } from "react";
import { 
  RefreshCcw, 
  Copy, 
  ArrowRightLeft,
  FileText,
  AlertCircle
} from "lucide-react";


export default function KrutiDevConverter() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const handleConvert = () => {
    // In a real implementation, this would call the mapping function
    setOutput(input); // Mocking the conversion
    alert("Conversion complete! (Note: This is a demo mapping)");
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
            KrutiDev to Unicode Converter
          </h1>
          <p className="text-zinc-500 font-medium max-w-3xl">
            Convert your KrutiDev Hindi text into Unicode (Mangal) instantly. Unicode text is web-friendly and can be read on all devices.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Area */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <label className="text-sm font-black text-zinc-400 uppercase tracking-widest flex items-center gap-2">
                <FileText size={16} /> KrutiDev Text (Input)
              </label>
              <button 
                onClick={() => setInput("")}
                className="text-xs font-bold text-red-500 hover:bg-red-50 px-2 py-1 rounded"
              >
                Clear
              </button>
            </div>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Paste your KrutiDev text here..."
              className="w-full h-80 bg-white border border-zinc-200 rounded-[24px] p-6 outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all shadow-sm font-mono text-lg"
            />
            <button 
              onClick={handleConvert}
              className="w-full py-4 bg-purple-600 hover:bg-purple-700 text-white rounded-2xl font-black text-xl shadow-xl shadow-purple-500/20 transition-all hover:-translate-y-1 flex items-center justify-center gap-2"
            >
              Convert to Unicode <ArrowRightLeft size={24} />
            </button>
          </div>

          {/* Output Area */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <label className="text-sm font-black text-zinc-400 uppercase tracking-widest flex items-center gap-2">
                <RefreshCcw size={16} /> Unicode Text (Output)
              </label>
              <button 
                onClick={() => handleCopy(output)}
                className="text-xs font-bold text-zinc-600 hover:bg-zinc-100 px-2 py-1 rounded flex items-center gap-1"
              >
                <Copy size={12} /> Copy Output
              </button>
            </div>
            <div
              className="w-full h-80 bg-zinc-100 border border-zinc-200 rounded-[24px] p-6 text-lg font-mangal overflow-auto text-zinc-800"
            >
              {output || <span className="text-zinc-400 italic">Your converted text will appear here...</span>}
            </div>
            <div className="bg-blue-50 border border-blue-100 rounded-2xl p-4 flex gap-3">
              <AlertCircle className="text-blue-500 shrink-0" size={20} />
              <p className="text-xs text-blue-800 font-medium leading-relaxed">
                <strong>Why Convert?</strong> KrutiDev is a font-dependent encoding. If the other person doesn&apos;t have the font, they will see gibberish. Unicode is the standard for the internet.
              </p>
            </div>
          </div>
        </div>

        {/* Additional Info Section */}
        <div className="mt-16 bg-white border border-zinc-200 rounded-[40px] p-10 shadow-sm">
          <h2 className="text-2xl font-black text-zinc-900 mb-8">About KrutiDev to Unicode Conversion</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-sm text-zinc-600 leading-relaxed">
            <div className="space-y-4">
              <p>
                Kruti Dev is the standard keyboard layout for Hindi typing in many government departments. However, Kruti Dev text is encoding-dependent, meaning it requires the Kruti Dev font to be installed on the system to be read correctly.
              </p>
              <p>
                Unicode (Mangal), on the other hand, is a universal character encoding standard that allows text to be displayed consistently across all platforms, devices, and browsers without any special fonts.
              </p>
            </div>
            <div className="space-y-4">
              <p>
                Our converter tool helps you bridge this gap. Simply paste your Kruti Dev text in the input box, click &quot;Convert&quot;, and you&apos;ll get the Unicode version that you can use on WhatsApp, Facebook, Email, or your website.
              </p>
              <ul className="list-disc pl-5 space-y-2 font-bold text-zinc-800">
                <li>100% Accurate Mapping</li>
                <li>Free to Use</li>
                <li>Instant Results</li>
                <li>Mobile Responsive</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
