import React, { useState, useRef } from 'react';
import { BadgeCheck, Clock, Shield, ArrowRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import ScrollReveal from '../components/ScrollReveal';
import ParticleBackground from '../components/ParticleBackground';

const Home: React.FC = () => {
  const { t } = useLanguage();
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setMousePos({
      x: (e.clientX - rect.left) / rect.width,
      y: (e.clientY - rect.top) / rect.height,
    });
  };

  const words = t.hero.title.split(' ');

  return (
    <div className="flex flex-col min-h-screen" onMouseMove={handleMouseMove} ref={containerRef}>
      {/* Hero Section */}
      <section className="relative bg-primary overflow-hidden min-h-[600px] lg:min-h-[700px] flex items-center group">
        <ParticleBackground />
        
        {/* Background Layer - High quality landscape representing Agriculture */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          <div className="w-full h-full overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&q=75&w=1600" 
              alt="Sustainable Agriculture Landscape" 
              className="w-full h-full object-cover transition-transform duration-[4s] ease-out group-hover:scale-105 opacity-40 lg:opacity-50"
              loading="eager"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-green-950 via-green-900/95 to-transparent"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-24">
          {/* Hero Content - Centered for better focus after removing foreground image */}
          <div className="max-w-3xl text-center lg:text-left">
            <ScrollReveal animation="fade-in">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs font-bold mb-6 lg:mb-10 shadow-inner group/badge cursor-default">
                <Sparkles className="w-4 h-4 text-accent animate-pulse" />
                <span className="tracking-widest uppercase">Pioneer in Ag-Tech Compliance</span>
              </div>
            </ScrollReveal>
            
            <div className="flex flex-wrap justify-center lg:justify-start gap-x-3 gap-y-1 mb-8">
              {words.map((word, i) => (
                <ScrollReveal 
                  key={i} 
                  animation="fade-up" 
                  delay={i * 100}
                  className="inline-block"
                >
                  <span className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white font-heading tracking-tight drop-shadow-2xl inline-block cursor-default transform hover:scale-105 transition-transform duration-300">
                    {word}
                  </span>
                </ScrollReveal>
              ))}
            </div>

            <ScrollReveal delay={450}>
              <p className="text-base md:text-xl text-green-50 mb-12 leading-relaxed font-medium drop-shadow-md opacity-90 max-w-xl mx-auto lg:mx-0">
                {t.hero.subtitle}
              </p>
            </ScrollReveal>
            
            <ScrollReveal delay={600}>
              <div className="flex flex-col sm:flex-row gap-5 justify-center lg:justify-start">
                <Link 
                  to="/services/fertilizer" 
                  className="inline-flex justify-center items-center px-10 py-4.5 border border-transparent text-lg font-bold rounded-2xl text-white bg-secondary hover:bg-sky-600 transition-all shadow-2xl shadow-blue-900/30 active:scale-95 group/btn"
                >
                  {t.hero.ctaPrimary}
                  <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover/btn:translate-x-2" />
                </Link>
                <Link 
                  to="/about" 
                  className="inline-flex justify-center items-center px-10 py-4.5 border-2 border-white/80 text-lg font-bold rounded-2xl text-white backdrop-blur-md hover:bg-white hover:text-primary transition-all duration-300 active:scale-95"
                >
                  {t.hero.ctaSecondary}
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Why Us Section */}
      <section className="py-24 md:py-32 bg-background relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
           <ScrollReveal className="text-center mb-24">
              <h2 className="text-3xl md:text-5xl font-heading font-bold text-slate-900 tracking-tight">{t.whyUs.title}</h2>
              <div className="w-24 h-2 bg-secondary mx-auto mt-6 rounded-full shadow-sm"></div>
           </ScrollReveal>

           <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-12">
              <ScrollReveal delay={100} className="h-full">
                <div className="group bg-white p-10 lg:p-12 rounded-[2.5rem] shadow-xl card-lift border border-slate-100 h-full flex flex-col items-center text-center">
                  <div className="w-20 h-20 bg-green-50 rounded-3xl flex items-center justify-center mb-10 text-primary transition-all group-hover:bg-primary group-hover:text-white group-hover:rotate-12 shadow-inner">
                    <BadgeCheck className="w-10 h-10" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-5 group-hover:text-primary transition-colors">{t.whyUs.expTitle}</h3>
                  <p className="text-slate-600 leading-relaxed text-lg opacity-80">
                    {t.whyUs.expDesc}
                  </p>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={250} className="h-full">
                <div className="group bg-white p-10 lg:p-12 rounded-[2.5rem] shadow-xl card-lift border border-slate-100 h-full flex flex-col items-center text-center">
                  <div className="w-20 h-20 bg-blue-50 rounded-3xl flex items-center justify-center mb-10 text-secondary transition-all group-hover:bg-secondary group-hover:text-white group-hover:-rotate-12 shadow-inner">
                    <Clock className="w-10 h-10" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-5 group-hover:text-secondary transition-colors">{t.whyUs.speedTitle}</h3>
                  <p className="text-slate-600 leading-relaxed text-lg opacity-80">
                    {t.whyUs.speedDesc}
                  </p>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={400} className="h-full">
                <div className="group bg-white p-10 lg:p-12 rounded-[2.5rem] shadow-xl card-lift border border-slate-100 h-full flex flex-col items-center text-center">
                  <div className="w-20 h-20 bg-accent/10 rounded-3xl flex items-center justify-center mb-10 text-primary transition-all group-hover:bg-accent group-hover:text-white group-hover:rotate-[20deg] shadow-inner">
                    <Shield className="w-10 h-10" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-5 group-hover:text-primary transition-colors">{t.whyUs.compTitle}</h3>
                  <p className="text-slate-600 leading-relaxed text-lg opacity-80">
                    {t.whyUs.compDesc}
                  </p>
                </div>
              </ScrollReveal>
           </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="py-24 lg:py-32 bg-white overflow-hidden border-t border-slate-100">
        <ScrollReveal className="max-w-7xl mx-auto px-4 mb-20 text-center">
           <h3 className="text-3xl lg:text-4xl font-heading font-bold text-slate-800 tracking-tight">{t.clients.title}</h3>
           <p className="text-slate-500 mt-4 text-lg">Partnering with market leaders to shape Indonesian agriculture.</p>
        </ScrollReveal>
        
        <div className="relative w-full overflow-hidden mask-linear-fade">
           <div className="flex animate-scroll whitespace-nowrap w-[200%]">
              {[...Array(10)].map((_, i) => (
                <Link to="/clients" key={i} className="mx-8 lg:mx-14 inline-block group">
                  <div className="w-48 h-24 lg:w-64 lg:h-32 bg-slate-50 rounded-[2rem] flex items-center justify-center grayscale group-hover:grayscale-0 transition-all duration-700 opacity-50 group-hover:opacity-100 border border-slate-100 group-hover:border-primary/20 group-hover:shadow-2xl group-hover:bg-white group-hover:-translate-y-2">
                     <span className="text-xl lg:text-2xl font-black text-slate-300 group-hover:text-primary tracking-tighter transition-colors uppercase">Partner {i + 1}</span>
                  </div>
                </Link>
              ))}
              {/* Duplicate for seamless loop */}
              {[...Array(10)].map((_, i) => (
                <Link to="/clients" key={`dup-${i}`} className="mx-8 lg:mx-14 inline-block group">
                  <div className="w-48 h-24 lg:w-64 lg:h-32 bg-slate-50 rounded-[2rem] flex items-center justify-center grayscale group-hover:grayscale-0 transition-all duration-700 opacity-50 group-hover:opacity-100 border border-slate-100 group-hover:border-primary/20 group-hover:shadow-2xl group-hover:bg-white group-hover:-translate-y-2">
                     <span className="text-xl lg:text-2xl font-black text-slate-300 group-hover:text-primary tracking-tighter transition-colors uppercase">Partner {i + 1}</span>
                  </div>
                </Link>
              ))}
           </div>
        </div>
      </section>
    </div>
  );
};

export default Home;