"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { 
  Languages, 
  Copy, 
  Trash2, 
  Download, 
  Printer, 
  Type, 
  Maximize2,
  Minimize2,
  Info,
  Volume2
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useParams } from "next/navigation";
import { Brain, Play, Pause } from "lucide-react";

export default function DynamicTypingPage() {
  const params = useParams();
  const lang = (params.lang as string) || "hindi";
  const capitalLang = lang.charAt(0).toUpperCase() + lang.slice(1);
  
  const [text, setText] = useState("");
  const [fontSize, setFontSize] = useState(18);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [practiceText, setPracticeText] = useState("");
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    alert("Text copied to clipboard!");
  };

  const handleClear = () => {
    if (confirm("Are you sure you want to clear all text?")) {
      setText("");
    }
  };

  const handleDownload = () => {
    const element = document.createElement("a");
    const file = new Blob([text], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = `${lang}-typing.doc`;
    document.body.appendChild(element);
    element.click();
  };

  const handleSpeak = (content: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(content);
      utterance.lang = lang === 'hindi' ? 'hi-IN' : 'en-US';
      utterance.rate = 0.5; // Half speed for better dictation
      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      window.speechSynthesis.speak(utterance);
    } else {
      alert("Text to speech not supported.");
    }
  };

  const handleAiGenerate = async () => {
    setIsAiLoading(true);
    try {
      // Step 1: Try to get existing or trigger silent generation
      let response = await fetch("/api/paragraphs?language=" + (lang === "hindi" ? "Hindi" : "English"));
      let data = await response.json();
      
      if (Array.isArray(data) && data.length > 0) {
        setPracticeText(data[Math.floor(Math.random() * data.length)].content);
      } else {
        // Step 2: If empty, it means generation might be in progress or failed. Try one more time after a short delay.
        setIsAiLoading(true);
        const timer = (ms: number) => new Promise(res => setTimeout(res, ms));
        await timer(2000); // Wait 2s
        
        response = await fetch("/api/paragraphs?language=" + (lang === "hindi" ? "Hindi" : "English"));
        data = await response.json();
        
        if (Array.isArray(data) && data.length > 0) {
          setPracticeText(data[Math.floor(Math.random() * data.length)].content);
        } else {
          alert("AI is preparing fresh content. Please try clicking again in a few seconds.");
        }
      }
    } catch (e) {
      console.error("AI Generation Error:", e);
      alert("Note: AI generation might take up to 10 seconds. Please try again.");
    } finally {
      setIsAiLoading(false);
    }
  };

  return (
    <div className={cn("bg-zinc-50 min-h-screen pb-20", isFullScreen && "fixed inset-0 z-[100] bg-white pt-0")}>
      <div className="max-w-6xl mx-auto px-4 pt-10">
        {!isFullScreen && (
          <div className="mb-8 space-y-4">
            <h1 className="text-3xl font-black text-zinc-900 flex items-center gap-3">
              <div className="p-2 bg-brand-primary rounded-xl text-white">
                <Languages size={24} />
              </div>
              {capitalLang} Online Typing {lang !== "english" && <span className="text-zinc-400 font-medium">(Phonetic English to {capitalLang})</span>}
            </h1>
            <p className="text-zinc-500 font-medium max-w-3xl">
              {lang === "english" 
                ? "Standard English typing tool for practice and document creation."
                : `Type in English (Roman) script and it will automatically convert into ${capitalLang} script.`}
            </p>
          </div>
        )}

        {/* Toolbar */}
        <div className="bg-white border border-zinc-200 rounded-t-[24px] p-4 flex flex-wrap items-center justify-between gap-4 shadow-sm">
          <div className="flex items-center gap-2">
            <div className="flex items-center bg-zinc-100 rounded-lg p-1">
              <button 
                onClick={() => setFontSize(Math.max(12, fontSize - 2))}
                className="w-8 h-8 flex items-center justify-center hover:bg-white rounded-md transition-colors"
                title="Decrease Font Size"
              >
                <Type size={14} />
              </button>
              <div className="px-2 text-xs font-bold text-zinc-500 w-8 text-center">{fontSize}</div>
              <button 
                onClick={() => setFontSize(Math.min(48, fontSize + 2))}
                className="w-8 h-8 flex items-center justify-center hover:bg-white rounded-md transition-colors"
                title="Increase Font Size"
              >
                <Type size={20} />
              </button>
            </div>
            <div className="h-8 w-px bg-zinc-200 mx-2" />
            <button 
              onClick={() => setIsFullScreen(!isFullScreen)}
              className="p-2 hover:bg-zinc-100 rounded-lg transition-colors text-zinc-600"
              title="Fullscreen Mode"
            >
              {isFullScreen ? <Minimize2 size={20} /> : <Maximize2 size={20} />}
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button 
              onClick={handleCopy}
              className="flex items-center gap-2 px-4 py-2 bg-zinc-100 hover:bg-zinc-200 text-zinc-700 rounded-xl text-sm font-bold transition-all"
            >
              <Copy size={16} /> Copy
            </button>
            <button 
              onClick={handleDownload}
              className="flex items-center gap-2 px-4 py-2 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-xl text-sm font-bold transition-all"
            >
              <Download size={16} /> Save as .DOC
            </button>
            <button 
              onClick={() => window.print()}
              className="flex items-center gap-2 px-4 py-2 bg-green-50 hover:bg-green-100 text-green-600 rounded-xl text-sm font-bold transition-all"
            >
              <Printer size={16} /> Print
            </button>
            <button 
              onClick={() => handleSpeak(text)}
              className="flex items-center gap-2 px-4 py-2 bg-purple-50 hover:bg-purple-100 text-purple-600 rounded-xl text-sm font-bold transition-all"
              title="Dictation - Read Your Text"
            >
              <Volume2 size={16} /> Listen My Text
            </button>
            <button 
              onClick={handleClear}
              className="flex items-center gap-2 px-4 py-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-xl text-sm font-bold transition-all"
            >
              <Trash2 size={16} /> Clear
            </button>
          </div>
        </div>

        {/* AI Practice Panel */}
        {!isFullScreen && (
          <div className="mt-8 mb-4">
            <div className="bg-zinc-900 border border-zinc-800 rounded-[32px] p-8 shadow-2xl relative overflow-hidden group">
               <div className="absolute top-0 right-0 p-8 opacity-10 text-brand-primary group-hover:scale-110 transition-transform">
                  <Brain size={120} />
               </div>
               <div className="relative z-10">
                  <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                    <div className="space-y-1">
                      <h2 className="text-xl font-black text-white flex items-center gap-2 uppercase tracking-tighter italic">
                        <Brain className="text-brand-primary" size={24} />
                        Professional Dictation Practice
                      </h2>
                      <p className="text-zinc-400 text-xs font-bold uppercase tracking-widest">Generate AI text & Listen while you type</p>
                    </div>
                    <div className="flex gap-2">
                      <button 
                        onClick={handleAiGenerate}
                        disabled={isAiLoading}
                        className="flex items-center gap-2 px-6 py-3 bg-brand-primary hover:bg-orange-600 text-white rounded-2xl text-sm font-black uppercase tracking-widest transition-all shadow-lg shadow-orange-500/20 disabled:opacity-50"
                      >
                        {isAiLoading ? "Generating..." : "Generate Practice"}
                      </button>
                      {practiceText && (
                        <button 
                          onClick={() => isSpeaking ? window.speechSynthesis.cancel() : handleSpeak(practiceText)}
                          className="flex items-center gap-2 px-6 py-3 bg-white hover:bg-zinc-100 text-zinc-900 rounded-2xl text-sm font-black uppercase tracking-widest transition-all shadow-lg"
                        >
                          {isSpeaking ? <Pause size={18} /> : <Play size={18} />}
                          {isSpeaking ? "Stop" : "Start Dictation"}
                        </button>
                      )}
                    </div>
                  </div>
                  
                  {practiceText ? (
                    <div className={cn(
                      "bg-white/5 border border-white/10 rounded-2xl p-6 text-zinc-300 leading-relaxed max-h-40 overflow-y-auto scrollbar-hide",
                      lang === 'hindi' ? "font-mangal text-2xl text-left" : "font-sans text-lg italic text-left"
                    )}>
                      {practiceText}
                    </div>
                  ) : (
                    <div className="h-24 flex items-center justify-center border-2 border-dashed border-zinc-800 rounded-2xl">
                      <p className="text-zinc-600 text-sm font-bold uppercase tracking-[0.2em]">Click Generate to Start Practice Session</p>
                    </div>
                  )}
               </div>
            </div>
          </div>
        )}

        {/* Main Textarea */}
        <div className="relative group">
          <textarea
            ref={textareaRef}
            value={text}
            onChange={(e) => setText(e.target.value)}
            style={{ fontSize: `${fontSize}px` }}
            placeholder={lang === "english" ? "Start typing here..." : `Start typing in English to convert it to ${capitalLang}...`}
            className={cn(
              "w-full bg-white border-x border-b border-zinc-200 p-8 min-h-[500px] outline-none transition-all",
              lang !== "english" ? "font-mangal" : "font-sans",
              isFullScreen && "min-h-[calc(100vh-80px)] border-none rounded-none"
            )}
          />
          <div className="absolute bottom-4 right-4 text-xs font-bold text-zinc-300 uppercase tracking-widest pointer-events-none text-right">
            By Emax Computer Education Center
          </div>
        </div>

        {!isFullScreen && (
          <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white border border-zinc-200 rounded-[32px] p-8">
                <h3 className="text-xl font-black text-zinc-900 mb-4 flex items-center gap-2">
                  <Info className="text-brand-primary" size={20} />
                  How to use {capitalLang} Online Typing?
                </h3>
                <div className="text-zinc-600 space-y-4 text-sm leading-relaxed">
                  {lang === "english" ? (
                    <p>Simply type your text in the box above. You can use the toolbar to format, copy, or save your document.</p>
                  ) : (
                    <>
                      <p>
                        1. Type the {capitalLang} word phonetically using English letters. For example, to type <strong>&quot;नमस्ते&quot;</strong>, type <strong>&quot;namaste&quot;</strong>.
                      </p>
                      <p>
                        2. After typing each word, press the <strong>SPACE</strong> key.
                      </p>
                      <p>
                        3. If you get the wrong word, press <strong>BACKSPACE</strong> to see alternatives.
                      </p>
                    </>
                  )}
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-orange-50 border border-orange-100 rounded-[32px] p-6">
                <h4 className="font-bold text-orange-900 mb-4">Quick Links</h4>
                <div className="space-y-3">
                  <Link href={`/typing-test?lang=${capitalLang === 'English' ? 'English' : 'Hindi'}`} className="block p-3 bg-white border border-orange-200 rounded-xl text-sm font-bold text-orange-700 hover:bg-orange-500 hover:text-white transition-all">
                    {capitalLang} Typing Test
                  </Link>
                  <Link href={`/keyboard/${lang}`} className="block p-3 bg-white border border-orange-200 rounded-xl text-sm font-bold text-orange-700 hover:bg-orange-500 hover:text-white transition-all">
                    {capitalLang} Virtual Keyboard
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
