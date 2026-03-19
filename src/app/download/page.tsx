"use client";

import { Download, FileDown, ShieldCheck } from "lucide-react";

export default function DownloadPage() {
  const fonts = [
    { name: "KrutiDev 010", size: "45 KB", type: "TTF" },
    { name: "Mangal Regular", size: "120 KB", type: "TTF" },
    { name: "Asees Punjabi", size: "38 KB", type: "TTF" },
    { name: "Shivaji Marathi", size: "52 KB", type: "TTF" },
  ];

  return (
    <div className="bg-zinc-50 min-h-screen pb-20 pt-10">
      <div className="max-w-5xl mx-auto px-4">
        <div className="mb-12 space-y-4">
          <h1 className="text-4xl font-black text-zinc-900 flex items-center gap-4">
            <div className="p-3 bg-blue-500 rounded-2xl text-white shadow-lg">
              <Download size={32} />
            </div>
            Download Typing Resources
          </h1>
          <p className="text-zinc-500 font-medium max-w-2xl">
            Get the fonts and tools you need for offline typing. All files are scanned for viruses and 100% safe.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {fonts.map((font) => (
            <div 
              key={font.name} 
              className="bg-white border border-zinc-200 p-6 rounded-[32px] flex items-center justify-between hover:shadow-lg transition-all"
            >
               <div className="flex items-center gap-4">
                  <div className="p-3 bg-blue-50 text-blue-500 rounded-xl">
                    <FileDown size={24} />
                  </div>
                  <div>
                     <h3 className="font-bold text-zinc-900">{font.name}</h3>
                     <p className="text-xs text-zinc-400 font-bold uppercase tracking-widest">{font.size} • {font.type}</p>
                  </div>
               </div>
               <button className="px-6 py-2 bg-zinc-900 text-white rounded-xl text-sm font-bold hover:bg-blue-600 transition-colors">
                 Download
               </button>
            </div>
          ))}
        </div>

        <div className="mt-12 bg-green-50 border border-green-100 rounded-3xl p-6 flex items-center gap-4">
           <ShieldCheck className="text-green-500" size={32} />
           <div>
              <h4 className="font-bold text-green-900">Secure Downloads</h4>
              <p className="text-sm text-green-700">All downloads are hosted on our secure servers and verified for integrity.</p>
           </div>
        </div>
      </div>
    </div>
  );
}
