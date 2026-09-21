import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Phone, Mail, MapPin, MessageCircle, Heart, 
  Sparkles, ExternalLink, ShieldCheck, Compass, ArrowUp
} from 'lucide-react';
import logo from "../assets/logo.png"; // <-- Logo import kar liya gaya hai

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 text-slate-300 font-sans relative overflow-hidden border-t border-slate-800">
      
      {/* Background Soft Glows */}
      <div className="absolute top-0 left-1/4 w-72 sm:w-96 h-72 sm:h-96 bg-[#34A99D]/10 rounded-full blur-[140px] pointer-events-none"></div>
      <div className="absolute bottom-0 right-10 w-64 sm:w-80 h-64 sm:h-80 bg-[#E5CB90]/10 rounded-full blur-[130px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16 pb-8 relative z-10">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 pb-10 sm:pb-12 border-b border-slate-800/80">
          
          {/* Column 1: Company Profile with Logo */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              {/* Logo Image Replaced Here */}
              <div className="w-10 h-10 rounded-2xl bg-white/10 p-1 flex items-center justify-center border border-slate-700 shadow-sm overflow-hidden shrink-0">
                <img src={logo} alt="Ishika Tour & Travels Logo" className="w-full h-full object-contain" />
              </div>
              <span className="font-black text-lg text-white tracking-tight">Ishika Tour & Travels</span>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed font-medium">
              Your trusted travel and car rental partner across Rajasthan. Offering clean AC cabs, curated sightseeing tours, and spiritual pilgrimage circuits with experienced drivers.
            </p>

            <div className="flex items-center gap-2 pt-1">
              <span className="inline-flex items-center gap-1.5 bg-[#FFF3C8]/10 text-[#FFF3C8] text-[10px] font-black px-3 py-1 rounded-full border border-[#E5CB90]/30">
                <ShieldCheck size={12} className="text-[#34A99D]" />
                <span>Verified Local Agency</span>
              </span>
            </div>
          </div>

          {/* Column 2: Popular Destination Hubs */}
          <div>
            <h4 className="text-white font-black text-sm uppercase tracking-wider mb-4 flex items-center gap-1.5">
              <Compass size={16} className="text-[#34A99D]" />
              <span>Top Destinations</span>
            </h4>
            <ul className="space-y-2.5 text-xs font-medium text-slate-400">
              <li>
                <Link to="/tours" className="hover:text-[#34A99D] transition flex items-center gap-1.5">
                  <span className="text-[#34A99D]">›</span> Jaipur Sightseeing (Hawa Mahal, Amer)
                </Link>
              </li>
              <li>
                <Link to="/tours" className="hover:text-[#34A99D] transition flex items-center gap-1.5">
                  <span className="text-[#34A99D]">›</span> Sikar (Khatu Shyam Ji, Jeen Mata)
                </Link>
              </li>
              <li>
                <Link to="/tours" className="hover:text-[#34A99D] transition flex items-center gap-1.5">
                  <span className="text-[#34A99D]">›</span> Udaipur Lakes & Palaces Tour
                </Link>
              </li>
              <li>
                <Link to="/tours" className="hover:text-[#34A99D] transition flex items-center gap-1.5">
                  <span className="text-[#34A99D]">›</span> Jodhpur Blue City & Forts
                </Link>
              </li>
              <li>
                <Link to="/tours" className="hover:text-[#34A99D] transition flex items-center gap-1.5">
                  <span className="text-[#34A99D]">›</span> Pushkar Lake & Desert Safari
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Direct Contact & Office */}
          <div>
            <h4 className="text-white font-black text-sm uppercase tracking-wider mb-4">Contact Info</h4>
            <div className="space-y-3 text-xs font-medium text-slate-400">
              <a href="tel:+917891604638" className="flex items-start gap-2.5 hover:text-white transition group">
                <div className="p-1.5 rounded-lg bg-slate-900 text-[#34A99D] group-hover:bg-[#34A99D] group-hover:text-white transition">
                  <Phone size={14} />
                </div>
                <div>
                  <p className="text-[10px] text-slate-500 font-bold uppercase">Call Us</p>
                  <p className="text-white font-bold">+91 7891604638</p>
                </div>
              </a>

              <a 
                href="https://wa.me/917891604638?text=Hi%20Ishika%20Tour%20%26%20Travels,%20I%20want%20to%20inquire%20about%20tour%20packages" 
                target="_blank" 
                rel="noreferrer"
                className="flex items-start gap-2.5 hover:text-white transition group"
              >
                <div className="p-1.5 rounded-lg bg-slate-900 text-green-500 group-hover:bg-green-600 group-hover:text-white transition">
                  <MessageCircle size={14} />
                </div>
                <div>
                  <p className="text-[10px] text-slate-500 font-bold uppercase">WhatsApp 24/7</p>
                  <p className="text-white font-bold">+91 7891604638</p>
                </div>
              </a>

              <div className="flex items-start gap-2.5">
                <div className="p-1.5 rounded-lg bg-slate-900 text-[#E5CB90]">
                  <MapPin size={14} />
                </div>
                <div>
                  <p className="text-[10px] text-slate-500 font-bold uppercase">Location</p>
                  <p className="text-slate-300">Jaipur, Rajasthan, India</p>
                </div>
              </div>
            </div>
          </div>

          {/* Column 4: Quick Action & Floating Top Button */}
          <div className="space-y-4">
            <h4 className="text-white font-black text-sm uppercase tracking-wider">Quick Inquiry</h4>
            <p className="text-xs text-slate-400 font-medium leading-relaxed">
              Planning a group tour or custom outstation cab? Get in touch with our travel desk instantly.
            </p>
            <a 
              href="https://wa.me/917891604638" 
              target="_blank" 
              rel="noreferrer"
              className="w-full inline-flex items-center justify-center gap-2 bg-[#34A99D] hover:bg-[#2c8d83] active:scale-95 text-white font-black py-2.5 px-4 rounded-xl text-xs transition shadow-md"
            >
              <MessageCircle size={14} />
              <span>Message on WhatsApp</span>
            </a>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Developer Portfolio Badge */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left text-xs">
          
          {/* Copyright */}
          <p className="text-slate-400 font-medium">
            © {new Date().getFullYear()} Ishika Tour & Travels. All rights reserved.
          </p>

          {/* Developer Portfolio Link */}
          <div className="flex items-center gap-2 bg-slate-900/90 border border-slate-800 px-4 py-2 rounded-2xl shadow-xs">
            <span className="text-slate-400 font-medium text-[11px] flex items-center gap-1">
              Crafted with <Heart size={12} className="text-red-500 fill-red-500 inline" /> by
            </span>
            <a 
              href="https://rahulrp.vercel.app/" 
              target="_blank" 
              rel="noreferrer"
              className="text-[#34A99D] hover:text-[#FFF3C8] font-black text-[11px] flex items-center gap-1 transition underline decoration-dotted underline-offset-2"
            >
              <span>Developer Portfolio</span>
              <ExternalLink size={11} />
            </a>
          </div>

          {/* Scroll to Top Trigger */}
          <button 
            onClick={scrollToTop}
            className="w-8 h-8 rounded-xl bg-slate-900 border border-slate-800 hover:border-[#34A99D] hover:text-[#34A99D] text-slate-400 flex items-center justify-center transition cursor-pointer"
            title="Scroll to top"
          >
            <ArrowUp size={15} />
          </button>

        </div>

      </div>
    </footer>
  );
};

export default Footer;