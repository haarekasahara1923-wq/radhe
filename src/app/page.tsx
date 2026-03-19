"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { 
  Keyboard, 
  Languages, 
  Monitor, 
  FileText, 
  RefreshCcw, 
  ArrowRight,
  TrendingUp,
  Award,
  Zap,
  GraduationCap,
  Users,
  Briefcase,
  BadgeCheck,
  CheckCircle2,
  Phone,
  ShieldCheck,
  X
} from "lucide-react";

const tools = [
  {
    category: "Typing Tools",
    icon: <Languages className="text-orange-500" size={24} />,
    items: [
      { name: "Hindi Typing", href: "/typing/hindi", desc: "Type in English to get Hindi text" },
      { name: "Marathi Typing", href: "/typing/marathi", desc: "Phonetic Marathi typing tool" },
      { name: "Punjabi Typing", href: "/typing/punjabi", desc: "Simple Panjabi typing software" },
      { name: "Tamil Typing", href: "/typing/tamil", desc: "Online Tamil typing tool" },
    ]
  },
  {
    category: "Typing Tests",
    icon: <FileText className="text-blue-500" size={24} />,
    items: [
      { name: "English Typing Test", href: "/typing-test?lang=English", desc: "Check your speed in English" },
      { name: "Hindi Typing Test", href: "/typing-test?lang=Hindi", desc: "Hindi Mangal/KrutiDev Test" },
      { name: "Exam Mode Test", href: "/typing-test?mode=exam", desc: "SSC/Railway Pattern Practice" },
      { name: "Custom Test", href: "/typing-test", desc: "Upload your own paragraph" },
    ]
  },
  {
    category: "Tutor & Keyboards",
    icon: <Keyboard className="text-green-500" size={24} />,
    items: [
      { name: "Hindi Typing Tutor", href: "/tutor/hindi", desc: "Step-by-step Hindi learning" },
      { name: "English Typing Tutor", href: "/tutor/english", desc: "56 Lessons for beginners" },
      { name: "Virtual Hindi Keyboard", href: "/keyboard/hindi", desc: "Type using mouse or keys" },
      { name: "All Online Keyboards", href: "/keyboard", desc: "100+ language keyboards" },
    ]
  },
  {
    category: "Converters & Games",
    icon: <RefreshCcw className="text-purple-500" size={24} />,
    items: [
      { name: "KrutiDev to Unicode", href: "/converter/krutidev-to-unicode", desc: "Universal font conversion" },
      { name: "Unicode to KrutiDev", href: "/converter/unicode-to-krutidev", desc: "Web content to Kruti Dev" },
      { name: "Typing Tank Game", href: "/games/tank-war", desc: "Destroy tanks by typing words" },
      { name: "Download Fonts", href: "/download", desc: "KrutiDev, Mangal, Asees" },
    ]
  }
];

import { useState } from "react";
 
export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    whatsapp: "",
    contact: "",
    email: ""
  });

  const handleEnrol = (courseTitle: string) => {
    setSelectedCourse(courseTitle);
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const message = `*New Course Enquiry*\n\n*Student Name:* ${formData.name}\n*Course:* ${selectedCourse || "General Inquiry"}\n*WhatsApp:* ${formData.whatsapp}\n*Contact:* ${formData.contact}\n*Email:* ${formData.email}`;
    const whatsappUrl = `https://wa.me/917999453467?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
    setIsModalOpen(false);
  };

  return (
    <div className="bg-zinc-50 min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-white pt-16 pb-20 lg:pt-24 lg:pb-32 border-b border-zinc-200">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full opacity-5 pointer-events-none">
          <div className="absolute top-10 left-10 w-96 h-96 bg-brand-primary rounded-full blur-[120px]" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-blue-500 rounded-full blur-[120px]" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center max-w-3xl mx-auto space-y-8">
            <div className="inline-flex items-center gap-2 bg-orange-50 border border-orange-100 text-brand-primary px-4 py-1.5 rounded-full text-sm font-bold animate-bounce">
              <Zap size={16} fill="currentColor" />
              <span>Gwalior&apos;s #1 Computer Education Center</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-zinc-900 leading-[1.1]">
              Master Skills at <span className="text-brand-primary">Emax Computer Education Center</span>
            </h1>
            
            <p className="text-xl text-zinc-500 font-medium">
              Free online tools for Hindi & English Typing, Speed Tests, Font Converters, and much more. Start practicing now and boost your productivity!
            </p>

            <div className="flex flex-wrap justify-center gap-4 pt-4">
              <Link 
                href="/typing-test?lang=English" 
                className="bg-brand-primary hover:bg-orange-600 text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-xl shadow-orange-500/20 transition-all hover:-translate-y-1 flex items-center gap-2"
              >
                English Typing Test <ArrowRight size={20} />
              </Link>
              <Link 
                href="/typing-test?lang=Hindi" 
                className="bg-zinc-900 hover:bg-black text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-xl shadow-zinc-900/20 transition-all hover:-translate-y-1"
              >
                Hindi Typing Test
              </Link>
            </div>

            <div className="flex justify-center items-center gap-8 pt-10 text-zinc-400">
              <div className="flex items-center gap-2">
                <TrendingUp size={20} />
                <span className="text-sm font-bold uppercase tracking-wider">Fast Results</span>
              </div>
              <div className="flex items-center gap-2">
                <Award size={20} />
                <span className="text-sm font-bold uppercase tracking-wider">Accurate Metrics</span>
              </div>
              <div className="flex items-center gap-2">
                <Monitor size={20} />
                <span className="text-sm font-bold uppercase tracking-wider">Exam Ready</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ADMISSIONS OPEN 2026 BANNER */}
      <section className="bg-zinc-900 overflow-hidden py-4 border-y border-white/10">
        <div className="flex whitespace-nowrap animate-marquee">
          {[...Array(10)].map((_, i) => (
            <span key={i} className="text-orange-400 font-extrabold text-lg uppercase tracking-widest mx-10 flex items-center gap-4">
              <Zap size={20} fill="currentColor" />
              ADMISSIONS OPEN 2026 BATCH STARTED! • JOIN NOW
            </span>
          ))}
        </div>
      </section>

      {/* Tools Grid Section Content (Keep current tools grid but wrap it better) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
          <div className="text-center w-full">
            <h2 className="text-4xl font-black text-zinc-900 tracking-tight">Emax Professional Courses</h2>
            <p className="text-zinc-500 mt-3 font-bold uppercase tracking-widest text-sm">&quot;Shape Your Future With Digital Skills&quot;</p>
            <div className="w-24 h-1.5 bg-brand-primary mx-auto mt-4 rounded-full" />
          </div>
        </div>

        {/* Courses Grid from Ad Creative */}
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8 mb-24">
          {[
            { title: "Social Media Marketing", desc: "Expert training in Facebook, Instagram & Google Ads to boost any business online.", icon: <TrendingUp className="text-blue-600" />, bgColor: "bg-blue-50" },
            { title: "DCA / PGDCA", desc: "Get university-recognized diplomas in computer applications for govt & private jobs.", icon: <FileText className="text-orange-600" />, bgColor: "bg-orange-50" },
            { title: "Tally Prime with GST", desc: "Master professional accounting, inventory management, and GST filing from scratch.", icon: <BadgeCheck className="text-green-600" />, bgColor: "bg-green-50" },
            { title: "CPCT Preparation", desc: "Special batches for MP CPCT exam with focus on typing speed and theory accuracy.", icon: <GraduationCap className="text-purple-600" />, bgColor: "bg-purple-50" },
            { title: "Job Oriented AI Courses", desc: "Stay ahead with Generative AI tools like ChatGPT, Midjourney for workplace productivity.", icon: <Zap className="text-yellow-600" />, bgColor: "bg-yellow-50" },
            { title: "ITI Training", desc: "Technical vocational training for all trades with practical focus on employability.", icon: <Monitor className="text-zinc-700" />, bgColor: "bg-zinc-100" },
            { title: "Digital Marketing", desc: "Join our comprehensive course on SEO, Content Marketing, and Online Strategy.", icon: <Users className="text-sky-600" />, bgColor: "bg-sky-50" },
            { title: "Academic Degrees", desc: "Admission guidance for BBA, BCA, BTech, B.Com, MBA & MTech programs.", icon: <CheckCircle2 className="text-red-600" />, bgColor: "bg-red-50" },
            { title: "Medical & Nursing", desc: "Enroll in DPharma, BPharma, D.Ed and other high-demand medical diplomas.", icon: <ShieldCheck className="text-teal-600" />, bgColor: "bg-teal-50" },
          ].map((course, idx) => (
            <div key={idx} className="p-10 bg-white border border-zinc-200 rounded-[40px] hover:border-brand-primary shadow-sm hover:shadow-2xl transition-all duration-300 group relative flex flex-col items-start text-left">
               <div className={cn("p-4 rounded-[20px] mb-8 group-hover:scale-110 transition-transform", course.bgColor)}>
                 {course.icon}
               </div>
               <h3 className="text-2xl font-black text-zinc-900 mb-4 group-hover:text-brand-primary transition-colors">{course.title}</h3>
               <p className="text-zinc-600 text-base font-medium leading-relaxed">{course.desc}</p>
                <button 
                  onClick={() => handleEnrol(course.title)}
                  className="mt-8 pt-6 border-t border-zinc-100 w-full flex items-center justify-between group-hover:border-brand-primary transition-colors"
                >
                  <span className="text-sm font-bold text-brand-primary uppercase tracking-widest">Enrolment Open</span>
                  <ArrowRight size={18} className="text-brand-primary transition-transform group-hover:translate-x-1" />
                </button>
            </div>
          ))}
        </div>

        {/* Director Profile Section */}
        <div className="mt-20 flex flex-col lg:flex-row items-center gap-12 bg-white rounded-[48px] p-8 lg:p-12 border border-zinc-200 shadow-xl">
            <div className="lg:w-1/3">
             <div className="w-full aspect-[4/5] bg-zinc-100 rounded-[32px] overflow-hidden border-4 border-white shadow-2xl relative">
               {/* eslint-disable-next-line @next/next/no-img-element */}
               <img 
                 src="/girraj-sir.jpg" 
                 alt="Girraj Sharma Sir"
                 className="w-full h-full object-cover object-top"
                 onError={(e) => {
                   (e.target as HTMLImageElement).src = "https://ui-avatars.com/api/?name=Girraj+Sharma&background=000&color=fff&size=512";
                 }}
               />
               <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 to-transparent p-6 pt-12">
                  <p className="text-xs font-black uppercase tracking-widest text-orange-400 mb-1">Director</p>
                  <h4 className="text-xl font-bold text-white uppercase tracking-tighter">Girraj Sharma Sir</h4>
               </div>
             </div>
           </div>
           <div className="lg:w-2/3 space-y-8">
              <div className="inline-block px-4 py-1 bg-orange-100 text-brand-primary rounded-full font-black text-xs uppercase tracking-widest shadow-sm">Director&apos;s Message</div>
              <h2 className="text-4xl lg:text-5xl font-black text-zinc-900 leading-tight">FREE Demo Class & Special Discount for 2026 Batch!</h2>
              <div className="relative">
                <span className="absolute -top-6 -left-4 text-8xl text-zinc-100 font-serif pointer-events-none select-none">&ldquo;</span>
                <p className="text-xl text-zinc-700 font-bold leading-relaxed italic relative z-10">
                  Our mission is to empower every student with high-end digital skills that lead directly to professional success and career growth. We focus on practical education that matters in the real world.
                </p>
                <div className="mt-4 flex items-center gap-3">
                   <div className="w-12 h-0.5 bg-brand-primary rounded-full" />
                   <span className="font-black text-zinc-900 text-lg">Girraj Sharma Sir</span>
                </div>
              </div>
              
              <div className="flex items-center pt-4">
                 <div className="bg-zinc-50 px-6 py-4 rounded-2xl border border-zinc-100 flex items-center gap-4">
                    <Phone className="text-brand-primary" size={24} />
                    <div>
                      <p className="text-xs font-black uppercase text-zinc-400">Call/WhatsApp Now</p>
                      <p className="font-bold text-lg text-zinc-900">7999453467</p>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </section>

      {/* Typing Tools Preview Section */}
      <section className="bg-white py-20 border-y border-zinc-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
            <div>
              <h2 className="text-3xl font-black text-zinc-900 tracking-tight">Powerful Online Tools</h2>
              <p className="text-zinc-500 mt-2 font-medium">Everything you need to improve your speed in one place.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {tools.map((cat) => (
              <div key={cat.category} className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-zinc-50 rounded-xl border border-zinc-200">
                    {cat.icon}
                  </div>
                  <h3 className="font-black text-zinc-800 uppercase tracking-wider text-sm">{cat.category}</h3>
                </div>
                <div className="space-y-3">
                  {cat.items.map((item) => (
                    <Link 
                      key={item.name} 
                      href={item.href}
                      className="block p-4 bg-white border border-zinc-200 rounded-2xl hover:border-brand-primary hover:shadow-md transition-all group"
                    >
                      <div className="flex justify-between items-start">
                        <h4 className="font-bold text-zinc-900 group-hover:text-brand-primary transition-colors">{item.name}</h4>
                        <ArrowRight size={14} className="text-zinc-300 -rotate-45 group-hover:rotate-0 transition-transform group-hover:text-brand-primary" />
                      </div>
                      <p className="text-xs text-zinc-500 mt-1 line-clamp-1">{item.desc}</p>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SEO Section / Why Choose Us */}
      <section className="bg-zinc-900 text-white py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <h2 className="text-4xl font-black leading-tight">Why Choose Us for Your Training?</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[
                  { title: "Experienced Teachers", icon: <Users /> },
                  { title: "Practical Lab Training", icon: <Monitor /> },
                  { title: "Certificate Courses", icon: <BadgeCheck /> },
                  { title: "Job Oriented Programs", icon: <Briefcase /> },
                  { title: "Affordable Fees", icon: <ArrowRight /> },
                  { title: "Small Batches", icon: <Zap /> },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4 bg-white/5 border border-white/10 p-4 rounded-2xl">
                    <div className="text-orange-400">{item.icon}</div>
                    <span className="font-bold">{item.title}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-[32px] p-8 backdrop-blur-sm">
              <h3 className="text-2xl font-bold mb-6">Frequently Asked Questions</h3>
              <div className="space-y-6 text-sm">
                <div className="border-b border-white/10 pb-4">
                  <p className="font-bold text-orange-400 mb-2">How to increase typing speed?</p>
                  <p className="text-zinc-400">Regular practice, maintaining correct posture, and not looking at the keyboard are key. Use our tutor lessons to master the finger positions.</p>
                </div>
                <div className="border-b border-white/10 pb-4">
                  <p className="font-bold text-orange-400 mb-2">What is KrutiDev to Unicode?</p>
                  <p className="text-zinc-400">KrutiDev is a font-based encoding while Unicode is a global standard. Our converter helps you use KrutiDev text on the web easily.</p>
                </div>
                <div>
                  <p className="font-bold text-orange-400 mb-2">Are these tools free?</p>
                  <p className="text-zinc-400">Yes, every tool at Emax Computer Education Center is 100% free to use for students and professionals.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-brand-primary rounded-[40px] p-12 text-center text-white space-y-8 shadow-2xl shadow-orange-500/40">
            <h2 className="text-3xl md:text-5xl font-black">Ready to Start Practicing?</h2>
            <p className="text-xl text-white/80 font-medium">Join thousands of students who have improved their typing speed with our tools.</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link 
                href="/typing-test" 
                className="bg-zinc-900 text-white px-10 py-4 rounded-2xl font-bold text-xl hover:bg-black transition-colors"
              >
                Start Speed Test
              </Link>
              <Link 
                href="/keyboard" 
                className="bg-white text-brand-primary px-10 py-4 rounded-2xl font-bold text-xl hover:bg-zinc-50 transition-colors"
              >
                Virtual Keyboard
              </Link>
            </div>
          </div>
        </div>
      </section>
      {/* Floating WhatsApp Button */}
      <button 
        onClick={() => handleEnrol("Quick Inquiry")}
        className="fixed bottom-8 right-8 z-[100] bg-[#25D366] text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform flex items-center gap-3 group"
      >
        <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-500 font-bold">Enquire on WhatsApp</span>
        {/* Simple WhatsApp SVG Icon */}
        <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
        </svg>
      </button>

      {/* Enrolment Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-[40px] w-full max-w-lg overflow-hidden shadow-2xl animate-in zoom-in duration-300">
            <div className="bg-zinc-900 p-8 text-white relative">
               <button 
                 onClick={() => setIsModalOpen(false)}
                 className="absolute top-6 right-6 p-2 hover:bg-white/10 rounded-full transition-colors"
               >
                 <X size={24} />
               </button>
               <h3 className="text-2xl font-black mb-1">Course Enrolment</h3>
               <p className="text-orange-400 font-bold uppercase tracking-widest text-xs">
                 {selectedCourse ? `Interested in ${selectedCourse}` : "Get in Touch"}
               </p>
            </div>
            <form onSubmit={handleSubmit} className="p-8 space-y-5">
               <div className="space-y-1">
                 <label className="text-xs font-black uppercase text-zinc-400 ml-1">Student Full Name</label>
                 <input 
                   required
                   type="text"
                   placeholder="Enter your name"
                   className="w-full p-4 bg-zinc-50 border border-zinc-200 rounded-2xl focus:border-brand-primary outline-none transition-colors"
                   value={formData.name}
                   onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                 />
               </div>
               <div className="grid grid-cols-2 gap-4">
                 <div className="space-y-1">
                   <label className="text-xs font-black uppercase text-zinc-400 ml-1">WhatsApp No.</label>
                   <input 
                     required
                     type="tel"
                     placeholder="WhatsApp No"
                     className="w-full p-4 bg-zinc-50 border border-zinc-200 rounded-2xl focus:border-brand-primary outline-none transition-colors"
                     value={formData.whatsapp}
                     onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                   />
                 </div>
                 <div className="space-y-1">
                   <label className="text-xs font-black uppercase text-zinc-400 ml-1">Contact No.</label>
                   <input 
                     required
                     type="tel"
                     placeholder="Phone Number"
                     className="w-full p-4 bg-zinc-50 border border-zinc-200 rounded-2xl focus:border-brand-primary outline-none transition-colors"
                     value={formData.contact}
                     onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                   />
                 </div>
               </div>
               <div className="space-y-1">
                 <label className="text-xs font-black uppercase text-zinc-400 ml-1">Email Address</label>
                 <input 
                   required
                   type="email"
                   placeholder="example@mail.com"
                   className="w-full p-4 bg-zinc-50 border border-zinc-200 rounded-2xl focus:border-brand-primary outline-none transition-colors"
                   value={formData.email}
                   onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                 />
               </div>
               <button 
                 type="submit"
                 className="w-full bg-brand-primary hover:bg-orange-600 text-white p-5 rounded-2xl font-black text-lg shadow-xl shadow-orange-500/20 transition-all active:scale-95 flex items-center justify-center gap-3"
               >
                 Submit Inquiry <ArrowRight size={20} />
               </button>
               <p className="text-center text-xs text-zinc-400 font-medium">After clicking submit, you will be redirected to WhatsApp.</p>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
