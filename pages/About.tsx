import React from 'react';
import { Target, Users, CheckCircle, Award, BookOpen, ShieldCheck } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

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
      {/* Hero */}
      <div className="relative bg-primary text-white py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0">
            <img 
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=2070" 
                alt="Team Meeting" 
                className="w-full h-full object-cover"
                loading="eager"
            />
            <div className="absolute inset-0 bg-green-900/80 mix-blend-multiply"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center animate-fadeIn">
          <h1 className="text-3xl md:text-5xl font-heading font-bold mb-6 drop-shadow-md">{t.about.title}</h1>
          <p className="text-green-50 text-base md:text-lg max-w-2xl mx-auto leading-relaxed font-medium">
            {t.about.subtitle}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 md:-mt-16 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
           {/* Visi */}
           <div className="group bg-white p-6 md:p-8 rounded-xl shadow-xl border-t-4 border-secondary flex flex-col h-full transform hover:-translate-y-2 transition-all duration-300">
              <div className="flex items-center gap-3 mb-6">
                 <div className="p-3 bg-blue-50 rounded-lg text-secondary group-hover:bg-secondary group-hover:text-white transition-colors duration-300">
                    <Target className="w-8 h-8" />
                 </div>
                 <h2 className="text-xl md:text-2xl font-bold text-slate-900">{t.about.visionTitle}</h2>
              </div>
              <p className="text-slate-700 text-base md:text-lg leading-relaxed flex-grow italic border-l-4 border-slate-100 pl-4 my-2">
                 "{t.about.visionDesc}"
              </p>
           </div>

           {/* Misi */}
           <div className="group bg-white p-6 md:p-8 rounded-xl shadow-xl border-t-4 border-primary flex flex-col h-full transform hover:-translate-y-2 transition-all duration-300">
              <div className="flex items-center gap-3 mb-6">
                 <div className="p-3 bg-green-50 rounded-lg text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                    <Award className="w-8 h-8" />
                 </div>
                 <h2 className="text-xl md:text-2xl font-bold text-slate-900">{t.about.missionTitle}</h2>
              </div>
              <ul className="space-y-4">
                 {t.about.missionList.map((mission, index) => (
                    <li key={index} className="flex items-start text-slate-700">
                       <CheckCircle className="w-5 h-5 text-accent mr-3 mt-1 shrink-0 transition-transform group-hover:scale-110" />
                       <span className="leading-snug">{mission}</span>
                    </li>
                 ))}
              </ul>
           </div>
        </div>

        {/* Layanan Kami */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-12">
           <div className="bg-secondary p-8 md:p-10 text-center relative overflow-hidden">
              <div className="absolute inset-0 bg-secondary pattern-grid-lg opacity-10"></div>
              <h2 className="text-2xl md:text-3xl font-heading font-bold text-white relative z-10">{t.about.servicesTitle}</h2>
              <p className="text-blue-100 mt-2 relative z-10">{t.about.servicesSubtitle}</p>
           </div>
           
           <div className="p-6 md:p-12">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                 {t.about.serviceList.map((service, idx) => (
                   <div key={idx} className="group flex gap-4 p-4 rounded-xl hover:bg-white transition-all duration-300 border border-transparent hover:border-slate-200 hover:shadow-lg hover:-translate-y-1 cursor-default">
                      <div className="w-12 h-12 rounded-full bg-accent/20 text-accent-700 flex items-center justify-center shrink-0 group-hover:bg-accent group-hover:text-white transition-colors duration-300">
                         <span className="text-primary group-hover:text-white transition-colors">{getServiceIcon(idx)}</span>
                      </div>
                      <div>
                         <h3 className="font-bold text-slate-900 mb-1 group-hover:text-primary transition-colors">{service.title}</h3>
                         <p className="text-sm text-slate-600 leading-snug">{service.desc}</p>
                      </div>
                   </div>
                 ))}
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default About;