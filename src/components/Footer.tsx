import Link from "next/link";
import { Facebook, Twitter, Instagram, Youtube, Mail, MapPin, Phone } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-zinc-900 text-zinc-300 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand section */}
          <div className="space-y-6">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-brand-primary rounded-lg flex items-center justify-center text-white font-bold text-xl">
                EM
              </div>
              <span className="text-2xl font-extrabold tracking-tight text-white leading-none">
                Emax<span className="text-brand-primary"> Computer Education Center</span>
              </span>
            </Link>
            <p className="text-zinc-400 text-sm leading-relaxed">
              India&apos;s leading typing portal providing free tools for typing practice, speed tests, and font conversions. Available in multiple Indian languages.
            </p>
            <div className="flex gap-4">
              <Link href="#" className="w-10 h-10 border border-zinc-700 rounded-lg flex items-center justify-center hover:bg-brand-primary hover:border-brand-primary transition-colors text-white">
                <Facebook size={18} />
              </Link>
              <Link href="#" className="w-10 h-10 border border-zinc-700 rounded-lg flex items-center justify-center hover:bg-brand-primary hover:border-brand-primary transition-colors text-white">
                <Twitter size={18} />
              </Link>
              <Link href="#" className="w-10 h-10 border border-zinc-700 rounded-lg flex items-center justify-center hover:bg-brand-primary hover:border-brand-primary transition-colors text-white">
                <Instagram size={18} />
              </Link>
              <Link href="#" className="w-10 h-10 border border-zinc-700 rounded-lg flex items-center justify-center hover:bg-brand-primary hover:border-brand-primary transition-colors text-white">
                <Youtube size={18} />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6">Typing Tools</h3>
            <ul className="space-y-4 text-sm">
              <li><Link href="/typing/hindi" className="hover:text-brand-primary transition-colors">Hindi Online Typing</Link></li>
              <li><Link href="/typing-test?lang=English" className="hover:text-brand-primary transition-colors">English Typing Test</Link></li>
              <li><Link href="/typing/marathi" className="hover:text-brand-primary transition-colors">Marathi Online Typing</Link></li>
              <li><Link href="/keyboard" className="hover:text-brand-primary transition-colors">Online Virtual Keyboards</Link></li>
              <li><Link href="#" className="hover:text-brand-primary transition-colors">Learn Typing Free</Link></li>
            </ul>
          </div>

          {/* More Tools */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6">Other Tools</h3>
            <ul className="space-y-4 text-sm">
              <li><Link href="/converter/krutidev-to-unicode" className="hover:text-brand-primary transition-colors">KrutiDev to Unicode</Link></li>
              <li><Link href="#" className="hover:text-brand-primary transition-colors">Mangal to KrutiDev Converter</Link></li>
              <li><Link href="#" className="hover:text-brand-primary transition-colors">English to Hindi Translator</Link></li>
              <li><Link href="#" className="hover:text-brand-primary transition-colors">Download Hindi Fonts</Link></li>
              <li><Link href="#" className="hover:text-brand-primary transition-colors">Typing Games Online</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6">Get in Touch</h3>
            <ul className="space-y-4 text-sm">
              <li className="flex gap-3">
                <MapPin className="text-brand-primary shrink-0" size={18} />
                <span>2nd Floor, Above Hero Agency, InFront of VRG Girls College, Gwalior(MP)-474006</span>
              </li>
              <li className="flex gap-3">
                <Phone className="text-brand-primary shrink-0" size={18} />
                <span>+91 7999453467</span>
              </li>
              <li className="flex gap-3">
                <Mail className="text-brand-primary shrink-0" size={18} />
                <span>support@emax.wapiflow.site</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-zinc-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-medium uppercase tracking-widest text-zinc-500">
          <p>© {new Date().getFullYear()} Emax Computer Education Center. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
            <Link href="#" className="hover:text-white transition-colors">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
