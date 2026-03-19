"use client";

import { BookOpen, ArrowRight, CheckCircle2 } from "lucide-react";
import { useParams } from "next/navigation";

export default function DynamicTutorPage() {
  const params = useParams();
  const lang = (params.lang as string) || "hindi";
  const capitalLang = lang.charAt(0).toUpperCase() + lang.slice(1);

  const lessons = [
    { id: 1, title: "Home Row Basics", desc: "Learn to place your fingers correctly on the home row." },
    { id: 2, title: "Top Row Practice", desc: "Training for the upper row keys (QWERTY)." },
    { id: 3, title: "Bottom Row Discovery", desc: "Mastering the lower part of the keyboard." },
    { id: 4, title: "Shift Key & Symbols", desc: "Working with capital letters and special characters." },
  ];

  return (
    <div className="bg-zinc-50 min-h-screen pb-20 pt-10">
      <div className="max-w-5xl mx-auto px-4">
        <div className="mb-12 space-y-4">
          <h1 className="text-4xl font-black text-zinc-900 flex items-center gap-4">
            <div className="p-3 bg-brand-primary rounded-2xl text-white shadow-lg">
              <BookOpen size={32} />
            </div>
            {capitalLang} Typing Tutor
          </h1>
          <p className="text-zinc-500 font-medium max-w-2xl">
            A comprehensive, step-by-step course designed to take you from a beginner to a pro typist in record time.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {lessons.map((lesson) => (
            <div 
              key={lesson.id} 
              className="bg-white border border-zinc-200 p-6 rounded-[32px] hover:border-brand-primary group transition-all"
            >
               <div className="flex justify-between items-center mb-4">
                  <span className="text-xs font-black text-brand-primary uppercase tracking-widest bg-orange-50 px-3 py-1 rounded-full">
                    Lesson {lesson.id}
                  </span>
                  {lesson.id === 1 && <CheckCircle2 className="text-green-500" size={20} />}
               </div>
               <h3 className="text-xl font-bold text-zinc-900 group-hover:text-brand-primary transition-colors mb-2">{lesson.title}</h3>
               <p className="text-zinc-500 text-sm mb-6 leading-relaxed">{lesson.desc}</p>
               <button className="w-full py-3 bg-zinc-900 text-white rounded-xl font-bold flex items-center justify-center gap-2 group-hover:bg-brand-primary transition-all">
                 Start Learning <ArrowRight size={18} />
               </button>
            </div>
          ))}
        </div>

        <div className="mt-20 bg-zinc-900 rounded-[40px] p-10 text-white text-center">
           <h2 className="text-3xl font-black mb-4">Master Typing Like a Pro</h2>
           <p className="text-zinc-400 mb-8 max-w-xl mx-auto font-medium">Follow our structured path and increase your speed by up to 40% in just two weeks.</p>
           <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-left">
              <div className="p-4 border border-white/10 rounded-2xl">
                 <div className="text-brand-primary font-black text-2xl mb-1">56+</div>
                 <div className="text-xs uppercase tracking-widest font-bold text-zinc-500">Interactive Lessons</div>
              </div>
              <div className="p-4 border border-white/10 rounded-2xl">
                 <div className="text-brand-primary font-black text-2xl mb-1">100k+</div>
                 <div className="text-xs uppercase tracking-widest font-bold text-zinc-500">Active Students</div>
              </div>
              <div className="p-4 border border-white/10 rounded-2xl">
                 <div className="text-brand-primary font-black text-2xl mb-1">08+</div>
                 <div className="text-xs uppercase tracking-widest font-bold text-zinc-500">Regional Languages</div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
