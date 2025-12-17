import React from 'react';
import { Target, Users, CheckCircle, Award, BookOpen, ShieldCheck } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import ScrollReveal from '../components/ScrollReveal';

const About: React.FC = () => {
  const { t } = useLanguage();

  const getServiceIcon = (index: number) => {
    const icons = [
        <BookOpen className="w-6 h-6"/>, 
        <ShieldCheck className="w-6 h-6"/>, 
        <Target className="w-6 h-6"/>, 
        <Users className="w-6 h-6"/>, 
        <Award className="w-6 h-6"/>
    ];
    return icons[index % icons.length];
  }

  return (
    <div className="bg-background min-h-screen pb-20">
      {/* Hero - Eager Loading with Professional Consultancy Image */}
      <div className="relative bg-primary text-white py-16 md:py-32 overflow-hidden">
        <div className="absolute inset-0">
            <img 
                src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&q=80&w=1600" 
                alt="Professional Consultancy Session" 
                className="w-full h-full object-cover"
                loading="eager"
            />
            <div className="absolute inset-0 bg-green-900/85 mix-blend-multiply"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <ScrollReveal animation="fade-in">
            <h1 className="text-4xl md:text-6xl font-heading font-bold mb-6 drop-shadow-md tracking-tight">{t.about.title}</h1>
            <p className="text-green-50 text-base md:text-xl max-w-2xl mx-auto leading-relaxed font-medium">
              {t.about.subtitle}
            </p>
          </ScrollReveal>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 md:-mt-20 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
           {/* Visi */}
           <ScrollReveal animation="slide-left">
             <div className="group bg-white p-8 md:p-12 rounded-3xl shadow-xl border-t-8 border-secondary flex flex-col h-full transform hover:-translate-y-2 transition-all duration-300">
                <div className="flex items-center gap-4 mb-8">
                   <div className="p-4 bg-blue-50 rounded-2xl text-secondary group-hover:bg-secondary group-hover:text-white transition-colors duration-300 shadow-inner">
                      <Target className="w-8 h-8" />
                   </div>
                   <h2 className="text-2xl md:text-3xl font-bold text-slate-900">{t.about.visionTitle}</h2>
                </div>
                <p className="text-slate-700 text-lg md:text-xl leading-relaxed flex-grow italic border-l-4 border-slate-100 pl-6 my-2">
                   "{t.about.visionDesc}"
                </p>
             </div>
           </ScrollReveal>

           {/* Misi */}
           <ScrollReveal animation="slide-right">
             <div className="group bg-white p-8 md:p-12 rounded-3xl shadow-xl border-t-8 border-primary flex flex-col h-full transform hover:-translate-y-2 transition-all duration-300">
                <div className="flex items-center gap-4 mb-8">
                   <div className="p-4 bg-green-50 rounded-2xl text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300 shadow-inner">
                      <Award className="w-8 h-8" />
                   </div>
                   <h2 className="text-2xl md:text-3xl font-bold text-slate-900">{t.about.missionTitle}</h2>
                </div>
                <ul className="space-y-5">
                   {t.about.missionList.map((mission, index) => (
                      <li key={index} className="flex items-start text-slate-700 text-lg">
                         <CheckCircle className="w-6 h-6 text-accent mr-4 mt-0.5 shrink-0 transition-transform group-hover:scale-110" />
                         <span className="leading-snug">{mission}</span>
                      </li>
                   ))}
                </ul>
             </div>
           </ScrollReveal>
        </div>

        {/* Layanan Kami (Services) */}
        <ScrollReveal animation="scale-in">
          <div className="bg-white rounded-[2.5rem] shadow-2xl overflow-hidden mb-12 border border-slate-100">
             <div className="bg-secondary p-12 md:p-16 text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-secondary pattern-grid-lg opacity-10"></div>
                <h2 className="text-3xl md:text-4xl font-heading font-bold text-white relative z-10">{t.about.servicesTitle}</h2>
                <p className="text-blue-100 mt-4 text-lg relative z-10 max-w-2xl mx-auto">{t.about.servicesSubtitle}</p>
             </div>
             
             <div className="p-8 md:p-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
                   {t.about.serviceList.map((service, idx) => (
                     <ScrollReveal key={idx} animation="fade-up" delay={idx * 100}>
                       <div className="group flex gap-5 p-6 rounded-2xl hover:bg-slate-50 transition-all duration-300 border border-transparent hover:border-slate-200 hover:shadow-xl hover:-translate-y-2 cursor-default">
                          <div className="w-14 h-14 rounded-2xl bg-accent/20 text-accent flex items-center justify-center shrink-0 group-hover:bg-accent group-hover:text-white transition-colors duration-300 shadow-sm">
                             <span className="text-primary group-hover:text-white transition-colors">{getServiceIcon(idx)}</span>
                          </div>
                          <div>
                             <h3 className="font-bold text-slate-900 text-xl mb-2 group-hover:text-primary transition-colors">{service.title}</h3>
                             <p className="text-base text-slate-600 leading-relaxed">{service.desc}</p>
                          </div>
                       </div>
                     </ScrollReveal>
                   ))}
                </div>
             </div>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
};

export default About;