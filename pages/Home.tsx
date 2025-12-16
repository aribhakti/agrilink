import React from 'react';
import { BadgeCheck, Clock, Shield, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';

const Home: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <div className="relative bg-primary overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1625246333195-58197bd4773d?auto=format&fit=crop&q=80&w=2070" 
            alt="Modern Agriculture Technology Drone" 
            className="w-full h-full object-cover"
            // High priority for Largest Contentful Paint (LCP)
            fetchPriority="high"
            loading="eager"
            onError={(e) => {
              e.currentTarget.src = "https://images.unsplash.com/photo-1628352081506-83c43123ed6d?auto=format&fit=crop&q=80&w=2070"; // Fallback
            }}
          />
          {/* Gradient Overlay for Text Readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-green-900/90 via-green-800/80 to-transparent"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 lg:py-32">
          <div className="max-w-2xl animate-fadeIn">
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-white font-heading tracking-tight mb-6 shadow-sm leading-tight">
              {t.hero.title}
            </h1>
            <p className="text-base md:text-lg text-green-50 mb-8 leading-relaxed font-medium drop-shadow-md">
              {t.hero.subtitle}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/services/fertilizer" className="inline-flex justify-center items-center px-6 py-3 border border-transparent text-base font-bold rounded-md text-white bg-secondary hover:bg-sky-600 transition-all shadow-lg shadow-green-900/20 active:scale-95 hover:shadow-xl">
                {t.hero.ctaPrimary}
                <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link to="/about" className="inline-flex justify-center items-center px-6 py-3 border-2 border-white text-base font-bold rounded-md text-white hover:bg-white hover:text-primary transition-all duration-300 active:scale-95">
                {t.hero.ctaSecondary}
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Why Us Section */}
      <div className="py-16 md:py-20 bg-background relative">
        <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-slate-200/50 to-transparent opacity-50"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
           <div className="text-center mb-12 md:mb-16">
              <h2 className="text-2xl md:text-3xl font-heading font-bold text-slate-900">{t.whyUs.title}</h2>
              <div className="w-20 h-1 bg-secondary mx-auto mt-4 rounded-full"></div>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
              {/* Feature 1 */}
              <div className="group bg-white p-6 md:p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-slate-100 transform hover:-translate-y-2 cursor-default">
                <div className="w-14 h-14 bg-green-50 rounded-xl flex items-center justify-center mb-6 text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                  <BadgeCheck className="w-8 h-8 transition-transform duration-500 group-hover:scale-110" />
                </div>
                <h3 className="text-lg md:text-xl font-bold text-slate-900 mb-3 group-hover:text-primary transition-colors">{t.whyUs.expTitle}</h3>
                <p className="text-sm md:text-base text-slate-600 leading-relaxed">
                  {t.whyUs.expDesc}
                </p>
              </div>

              {/* Feature 2 */}
              <div className="group bg-white p-6 md:p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-slate-100 transform hover:-translate-y-2 cursor-default">
                <div className="w-14 h-14 bg-blue-50 rounded-xl flex items-center justify-center mb-6 text-secondary transition-colors group-hover:bg-secondary group-hover:text-white">
                  <Clock className="w-8 h-8 transition-transform duration-500 group-hover:rotate-12" />
                </div>
                <h3 className="text-lg md:text-xl font-bold text-slate-900 mb-3 group-hover:text-secondary transition-colors">{t.whyUs.speedTitle}</h3>
                <p className="text-sm md:text-base text-slate-600 leading-relaxed">
                  {t.whyUs.speedDesc}
                </p>
              </div>

              {/* Feature 3 */}
              <div className="group bg-white p-6 md:p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-slate-100 transform hover:-translate-y-2 cursor-default">
                <div className="w-14 h-14 bg-green-50 rounded-xl flex items-center justify-center mb-6 text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                  <Shield className="w-8 h-8 transition-transform duration-500 group-hover:scale-110" />
                </div>
                <h3 className="text-lg md:text-xl font-bold text-slate-900 mb-3 group-hover:text-primary transition-colors">{t.whyUs.compTitle}</h3>
                <p className="text-sm md:text-base text-slate-600 leading-relaxed">
                  {t.whyUs.compDesc}
                </p>
              </div>
           </div>
        </div>
      </div>

      {/* Client Ecosystem - Infinite Scroll */}
      <div className="py-16 md:py-20 bg-white border-t border-slate-100 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 mb-10 md:mb-12 text-center">
           <h3 className="text-xl md:text-2xl font-heading font-bold text-slate-800">{t.clients.title}</h3>
        </div>
        
        <div className="relative w-full overflow-hidden mask-linear-fade">
           <div className="flex animate-scroll whitespace-nowrap w-[200%]">
              {/* Double the logos to create seamless loop */}
              {[...Array(16)].map((_, i) => (
                <Link to="/clients" key={i} className="mx-4 md:mx-8 inline-block cursor-pointer group active:scale-95 transition-transform">
                  <div className="w-32 h-16 md:w-40 md:h-20 bg-slate-50 rounded-lg flex items-center justify-center grayscale group-hover:grayscale-0 transition-all duration-500 opacity-60 group-hover:opacity-100 border border-slate-100 group-hover:border-primary/20 group-hover:shadow-md hover:-translate-y-1">
                     <span className="text-base md:text-lg font-bold text-slate-400 group-hover:text-primary">PARTNER {i + 1}</span>
                  </div>
                </Link>
              ))}
           </div>
        </div>
      </div>
    </div>
  );
};

export default Home;