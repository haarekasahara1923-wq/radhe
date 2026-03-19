"use client";

import { useEffect, useState, useCallback } from "react";
import { useTypingStore } from "@/lib/store";
import TypingBox from "@/components/TypingBox";
import Timer from "@/components/Timer";
import MetricsDisplay from "@/components/MetricsDisplay";
import KeyboardLayout from "@/components/KeyboardLayout";
import ResultCard from "@/components/ResultCard";
import LanguageToggle from "@/components/LanguageToggle";
import { Loader2, FileText, Sparkles, RefreshCw, ArrowRight, Clock } from "lucide-react";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

// Fallback paragraphs (Extra Long) for Offline Mode
const ENGLISH_FALLBACKS = [
  "In the rapidly evolving world of digital information technology, the ability to process and communicate data quickly and accurately has become a cornerstone of professional success. Computer literacy is no longer just an additional skill but a fundamental requirement in almost every sector of the global economy. From complex data analysis to simple administrative tasks, technology integrates into our daily workflows, demanding a high level of proficiency and adaptability. Developing a strong typing speed with high accuracy allows professionals to translate their thoughts into digital form seamlessly, thereby increasing productivity and reducing cognitive strain. As we move further into the age of artificial intelligence and automated systems, the human element remains vital in guiding these tools and ensuring that the output aligns with organizational goals and ethical standards. Furthermore, the psychological benefits of mastering touch typing cannot be overstated. It fosters a sense of flow, where the barrier between the mind and the machine dissolves, enabling a purely creative output.",
  "The industrial revolution marked a major turning point in history which influenced almost every aspect of daily life in some way. In particular, average income and population began to exhibit unprecedented sustained growth. Some economists say that the major impact of the Industrial Revolution was that the standard of living for the general population began to increase consistently for the first time in history, although others have said that it did not begin to meaningfully improve until the late nineteenth and twentieth centuries. The commencement of the Industrial Revolution is closely linked to a small number of innovations, beginning in the second half of the eighteenth century. By the 1830s, the following gains had been made in important technologies. Textiles, steam power, and iron making were the three main sectors that saw the most growth. This period of rapid change fundamentally altered the social and economic landscape of the world forever.",
  "Effective communication is the lifeblood of any successful organization. It is more than just an exchange of information; it is about understanding the emotion and intentions behind the information. When people communicate effectively, they are able to share ideas, feelings, and thoughts in a way that is clear and concise. This leads to increased productivity, better problem-solving, and stronger relationships among team members. In today's globalized world, the ability to communicate across cultures is also increasingly important. This requires sensitivity to cultural differences in communication styles and a willingness to adapt one's own style to better connect with others. Furthermore, the rise of digital communication has introduced new challenges and opportunities. While email and instant messaging allow for quick exchange of information, they can also lead to misunderstandings if not used carefully.",
  "Artificial intelligence is transforming the way we live and work in ways we are only beginning to understand. From self-driving cars to virtual assistants that can manage our schedules, AI is becoming deeply integrated into our daily routines. The potential benefits are enormous, including increased efficiency, improved medical diagnoses, and more personalized learning experiences. However, there are also significant concerns about the impact of AI on jobs, privacy, and security. As AI systems become more autonomous, it is crucial that we develop ethical frameworks to govern their use and ensure that they are used for the benefit of all humanity. This requires collaboration between governments, industry leaders, and researchers across many different fields. The future of AI is both exciting and uncertain, and it will be up to us to shape it in a way that reflects our values and aspiratons."
];

const HINDI_FALLBACKS = [
  "डिजिटल सूचना प्रौद्योगिकी की तेजी से बदलती दुनिया में, डेटा को जल्दी और सही तरीके से संसाधित और संप्रेषित करने की क्षमता पेशेवर सफलता का एक आधार बन गई है। कंप्यूटर साक्षरता अब केवल एक अतिरिक्त कौशल नहीं है, बल्कि वैश्विक अर्थव्यवस्था के लगभग हर क्षेत्र में एक मौलिक आवश्यकता है। जटिल डेटा विश्लेषण से लेकर सरल प्रशासनिक कार्यों तक, प्रौद्योगिकी हमारे दैनिक वर्कफ़्लो में एकीकृत होती है, जिसमें उच्च स्तर की दक्षता और अनुकूलन क्षमता की आवश्यकता होती है। उच्च सटीकता के साथ एक मजबूत टाइपिंग गति विकसित करने से पेशेवरों को अपने विचारों को डिजिटल रूप में निर्बाध रूप से अनुवाद करने की अनुमति मिलती है जिससे उत्पादकता बढ़ती है और मानसिक तनाव कम होता है। जैसे-जैसे हम कृत्रिम बुद्धिमत्ता और स्वचालित प्रणालियों के युग में आगे बढ़ते हैं, इन उपकरणों का मार्गदर्शन करने और यह सुनिश्चित करने में मानवीय तत्व महत्वपूर्ण बना रहता है कि आउटपुट संगठनात्मक लक्ष्यों और नैतिक मानकों के साथ संरेखित हो।",
  "भारत एक विविधतापूर्ण देश है जहाँ विभिन्न संस्कृतियों, भाषाओं और धर्मों के लोग एक साथ रहते हैं। इस विविधता में एकता ही भारत की सबसे बड़ी शक्ति है। हमारे देश का इतिहास अत्यंत प्राचीन और गौरवशाली है, जिसमें अनेक महान राजाओं, समाज सुधारकों और स्वतंत्रता सेनानियों का योगदान रहा है। आज भारत विश्व की सबसे तेजी से बढ़ती अर्थव्यवस्थाओं में से एक है और विज्ञान, तकनीक तथा अंतरिक्ष के क्षेत्र में नए कीर्तिमान स्थापित कर रहा है। युवाओं की बड़ी संख्या भारत की जनसांख्यिकीय लाभांश है, जो देश के भविष्य को उज्ज्वल बनाने की क्षमता रखती है। हमें अपनी विरासत पर गर्व होना चाहिए और एक समृद्ध तथा विकसित भारत के निर्माण के लिए मिलकर कार्य करना चाहिए। आने वाले समय में भारत वैश्विक पटल पर एक नई पहचान बनाने के लिए पूरी तरह तैयार है और हम सभी का उत्तरदायित्व है कि हम इस यात्रा में सक्रिय रूप से भाग लें।",
  "पर्यावरण संरक्षण आज के समय की सबसे बड़ी आवश्यकता है। प्राकृतिक संसाधनों का अत्यधिक दोहन और प्रदूषण के कारण हमारी पृथ्वी का संतुलन बिगड़ रहा है। ग्लोबल वार्मिंग, जलवायु परिवर्तन और जैव विविधता का ह्रास गंभीर चिंता के विषय हैं। हमें अब जागरूक होने की आवश्यकता है और अपनी जीवनशैली में बदलाव लाकर प्रकृति के साथ सामंजस्य बिठाना होगा। वृक्षारोपण, जल संरक्षण और कचरे का सही प्रबंधन कुछ ऐसे कदम हैं जो हम व्यक्तिगत स्तर पर उठा सकते हैं। सरकारों और अंतरराष्ट्रीय संस्थाओं को भी कड़े कानून और नीतियां बनाने की जरूरत है ताकि आने वाली पीढ़ियों के लिए एक सुरक्षित और स्वच्छ वातावरण सुनिश्चित किया जा सके। प्रकृति हमें सब कुछ देती है और हमारा कर्तव्य है कि हम इसकी रक्षा करें और इसे आने वाली संतानों के लिए बचाकर रखें। सतत विकास ही भविष्य की एकमात्र राह है जिस पर हमें पूरी निष्ठा के साथ चलना होगा।",
  "शिक्षा ही वह माध्यम है जिससे समाज में सकारात्मक बदलाव लाया जा सकता है। यह केवल किताबी ज्ञान प्राप्त करने तक सीमित नहीं है, बल्कि व्यक्ति के व्यक्तित्व का सर्वांगीण विकास करने और उसे एक बेहतर इंसान बनाने की प्रक्रिया है। एक शिक्षित व्यक्ति न केवल अपने लिए बल्कि अपने परिवार और समाज के लिए भी योगदान दे सकता है। वर्तमान समय में शिक्षा की गुणवत्ता और पहुंच में सुधार के लिए अनेक प्रयास किए जा रहे हैं। डिजिटल टूल्स और ऑनलाइन प्लेटफॉर्म्स ने सीखने के तरीकों को बदल दिया है, जिससे दूर-दराज के क्षेत्रों में रहने वाले छात्र भी विश्व स्तरीय शिक्षा प्राप्त कर पा रहे हैं। हालांकि, अभी भी हमारे सामने अनेक चुनौतियां हैं, जिन्हें शिक्षा के माध्यम से ही पार किया जा सकता है। प्रत्येक बच्चे को शिक्षा का अधिकार मिलना चाहिए क्योंकि वे ही देश के बेहतर भविष्य के निर्माता हैं।"
];

function TypingTestContent() {
  const { isFinished, setContent, language, setLanguage, resetStore, selectedTime, setTimeLimit, isStarted } = useTypingStore();
  const [isLoading, setIsLoading] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);
  const searchParams = useSearchParams();
  const langParam = searchParams.get("lang");


  useEffect(() => {
    if (langParam === "Hindi" || langParam === "English") {
      setLanguage(langParam);
    }
  }, [langParam, setLanguage]);

  const getRandomFallback = useCallback(() => {
    const fallbacks = language === 'English' ? ENGLISH_FALLBACKS : HINDI_FALLBACKS;
    return fallbacks[Math.floor(Math.random() * fallbacks.length)];
  }, [language]);

  const fetchExistingContent = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`/api/paragraphs?language=${language}`);
      const data = await res.json();
      
      if (data && data.length > 0) {
        const randomIndex = Math.floor(Math.random() * data.length);
        setContent(data[randomIndex].content);
      } else {
        setContent(getRandomFallback());
      }
    } catch (error) {
      console.error("Failed to fetch content", error);
      setContent(getRandomFallback());
    } finally {
      setIsLoading(false);
      setTimeout(() => window.scrollTo(0, 0), 100);
    }
  }, [language, setContent, getRandomFallback]);

  const generateNewContent = async () => {
    setIsGenerating(true);
    resetStore(); 
    try {
      // If offline, skip the fetch immediately
      if (!navigator.onLine) {
        throw new Error("Offline");
      }

      const res = await fetch('/api/paragraphs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ language, difficulty: 'Intermediate' })
      });
      const data = await res.json();
      if (data && data.content) {
        setContent(data.content);
        window.scrollTo({ top: 0, behavior: 'instant' });
      } else {
        setContent(getRandomFallback());
      }
    } catch {
       console.log("Using local offline content...");
       setContent(getRandomFallback());
    } finally {

      setIsGenerating(false);
    }
  };


  useEffect(() => {
    // Disable automatic scroll restoration to fix jumping
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);
    fetchExistingContent();
  }, [fetchExistingContent]);

  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    setIsOnline(navigator.onLine);
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return (

    <div className="pt-6 pb-20 px-4 md:px-6 max-w-7xl mx-auto min-h-[calc(100vh-100px)]">
      {isLoading ? (
        <div className="flex flex-col items-center justify-center h-[500px] gap-4">
          <Loader2 className="w-12 h-12 text-brand-primary animate-spin" />
          <p className="text-zinc-400 font-bold uppercase tracking-widest text-sm">Preparing Examination...</p>
        </div>
      ) : !isFinished ? (
        <div className="space-y-8 animate-in fade-in duration-500">
          
          {/* Main Controls Overlay for AI/Language (Pinned better for Mobile) */}
          <div className="bg-white p-4 rounded-3xl border border-zinc-200 shadow-xl flex flex-wrap items-center justify-between gap-4 sticky top-20 z-40 md:relative md:top-0">
             <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center">
                  <FileText className="text-brand-primary" size={20} />
                </div>
                <div>
                  <h2 className="font-black text-zinc-900 leading-tight">
                    {language} Examination
                  </h2>
                </div>
             </div>

             <div className="flex flex-wrap items-center gap-2">
               {/* Time Selection Dropdown */}
               <div className="flex items-center gap-2 bg-zinc-100 border border-zinc-200 px-3 py-1.5 rounded-xl">
                 <Clock size={14} className="text-zinc-400" />
                 <select 
                   disabled={isStarted}
                   value={Math.round(selectedTime / 60)}
                   onChange={(e) => setTimeLimit(parseInt(e.target.value))}
                   className="bg-transparent text-xs font-black text-zinc-700 outline-none cursor-pointer disabled:cursor-not-allowed"
                   title="Select Test Duration"
                 >
                   {Array.from({ length: 60 }, (_, i) => i + 1).map(m => (
                     <option key={m} value={m}>{m} MINUTES</option>
                   ))}

                 </select>
               </div>

               <button 
                 onClick={generateNewContent}
                 disabled={isGenerating}
                 className="flex items-center gap-2 px-4 py-2 bg-brand-primary text-white rounded-xl text-xs font-black shadow-lg shadow-orange-500/20 hover:bg-orange-600 transition-all active:scale-95 disabled:opacity-50"
               >
                 {isGenerating ? <Loader2 size={16} className="animate-spin" /> : (isOnline ? <Sparkles size={16} /> : <RefreshCw size={16} />)}
                 {isGenerating ? "GENERATING..." : (isOnline ? "NEW AI TEST" : "NEXT TEXT")}
               </button>

               <LanguageToggle />
             </div>

          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
             <div className="md:col-span-3">
                <MetricsDisplay />
             </div>
             <div>
                <Timer />
             </div>
          </div>

          {/* Typing Area */}
          <TypingBox />

          {/* Footer Actions */}
          <div className="flex flex-col items-center gap-6 py-8">
             <button 
               onClick={() => { resetStore(); fetchExistingContent(); window.scrollTo(0,0); }}
               className="flex items-center gap-2 px-6 py-3 bg-zinc-100 text-zinc-500 hover:bg-zinc-200 hover:text-zinc-800 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all shadow-sm"
             >
               <RefreshCw size={14} /> Restart Test
             </button>
             <div className="text-zinc-300 text-[10px] font-bold uppercase tracking-[0.3em] flex items-center gap-3">
                <div className="h-px w-12 bg-zinc-200" />
                PROFESSIONAL TYPING CENTER
                <div className="h-px w-12 bg-zinc-200" />
             </div>
          </div>
        </div>
      ) : (
        <div className="animate-in zoom-in-95 duration-500">
          <ResultCard />
          <div className="mt-8 flex justify-center">
             <button 
               onClick={() => { resetStore(); fetchExistingContent(); }}
               className="px-10 py-5 bg-brand-primary text-white font-black rounded-[2rem] shadow-2xl shadow-orange-500/30 hover:bg-orange-600 transition-all active:scale-95 flex items-center gap-4 italic text-lg"
             >
               START ANOTHER TEST <ArrowRight size={24} />
             </button>
          </div>
        </div>
      )}
      <KeyboardLayout />
    </div>
  );
}

export default function TypingTestPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><Loader2 className="animate-spin text-brand-primary" size={40} /></div>}>
      <TypingTestContent />
    </Suspense>
  );
}
