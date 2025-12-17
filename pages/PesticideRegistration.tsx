import React, { useState } from 'react';
import { Beaker, Bug, ShieldAlert, Globe2, Factory, ChevronDown, ChevronUp, AlertCircle } from 'lucide-react';
import ScrollReveal from '../components/ScrollReveal';

const PesticideRegistration: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [openAccordion, setOpenAccordion] = useState<string | null>('admin');

  const tabs = [
    { title: "Synthetic & Mineral", icon: <Beaker className="w-4 h-4"/>, desc: "Chemical pesticides requiring rigorous residue and multi-stage toxicity analysis." },
    { title: "Bio-Pesticides", icon: <Bug className="w-4 h-4"/>, desc: "Natural origin products including pheromones and growth regulators (ZPT)." },
    { title: "Vector Control", icon: <ShieldAlert className="w-4 h-4"/>, desc: "Specialized registration for household hygiene and disease vector control agents." },
    { title: "Export Only", icon: <Globe2 className="w-4 h-4"/>, desc: "Fast-track registration for products manufactured strictly for foreign markets." },
    { title: "Raw Materials", icon: <Factory className="w-4 h-4"/>, desc: "Registration for active ingredients and industrial formulation precursors." },
  ];

  return (
    <div className="bg-background min-h-screen pb-20">
      {/* Hero - Eager Loading with Optimized Lab Source */}
      <div className="relative bg-primary text-white py-24 md:py-36 overflow-hidden">
        <div className="absolute inset-0">
             <img 
                src="https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&q=80&w=1600" 
                alt="Pesticide Chemical Analysis Lab" 
                className="w-full h-full object-cover opacity-20"
                loading="eager"
             />
             <div className="absolute inset-0 bg-gradient-to-r from-blue-950 via-blue-900/90 to-blue-800/40"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <ScrollReveal animation="fade-up">
            <h1 className="text-4xl md:text-7xl font-heading font-bold mb-6 drop-shadow-md leading-tight">Pesticide Compliance</h1>
            <p className="text-blue-50 text-lg md:text-2xl max-w-3xl font-medium opacity-90 leading-relaxed">
              Managing the intricate landscape of toxicology testing and Commission reviews for global and local producers.
            </p>
          </ScrollReveal>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        {/* Classification Tabs */}
        <ScrollReveal className="flex flex-wrap gap-4 mb-12 justify-center">
          {tabs.map((tab, idx) => (
            <button
              key={idx}
              onClick={() => setActiveTab(idx)}
              className={`flex items-center gap-3 px-8 py-4 rounded-2xl text-sm font-bold transition-all duration-300 ${
                activeTab === idx 
                  ? 'bg-secondary text-white shadow-2xl scale-110 ring-4 ring-secondary/20 -translate-y-2' 
                  : 'bg-white text-slate-500 hover:bg-slate-50 border border-slate-200 hover:shadow-lg'
              }`}
            >
              {tab.icon}
              {tab.title}
            </button>
          ))}
        </ScrollReveal>

        <ScrollReveal animation="scale-in">
          <div className="bg-white p-12 md:p-16 rounded-[2.5rem] shadow-2xl border border-slate-100 text-center mb-24 animate-fadeIn max-w-4xl mx-auto group hover:shadow-secondary/10 transition-shadow">
             <h3 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6 group-hover:text-secondary transition-colors">{tabs[activeTab].title}</h3>
             <p className="text-slate-600 text-lg md:text-2xl leading-relaxed max-w-2xl mx-auto italic">"{tabs[activeTab].desc}"</p>
          </div>
        </ScrollReveal>

        {/* Process Flow with Lift Effects */}
        <div className="mb-24">
           <ScrollReveal className="mb-12 text-center md:text-left">
              <h2 className="text-3xl font-heading font-bold text-slate-900">Registration Journey</h2>
              <div className="w-20 h-1.5 bg-accent mt-3 rounded-full"></div>
           </ScrollReveal>
           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { phase: "Phase 1", title: "Pre-Assessment", color: "border-slate-300", items: ["Label Audit", "Import Permits", "Site Validation"] },
                { phase: "Phase 2", title: "Testing Protocols", color: "border-secondary", items: ["Quality Test", "Toxicity Test", "Efficacy Test"] },
                { phase: "Phase 3", title: "Panel Review", color: "border-accent", items: ["Commission Defense", "Expert Feedback", "Final Reporting"] },
                { phase: "Phase 4", title: "SK Mentan", color: "border-primary", items: ["Decree Issuance", "Label Approval", "Market Ready"] }
              ].map((step, idx) => (
                <ScrollReveal key={idx} delay={idx * 150} animation="fade-up">
                  <div className={`bg-white p-10 rounded-[2.5rem] border-l-8 ${step.color} shadow-xl card-lift cursor-default h-full group`}>
                    <span className="text-xs font-black text-slate-400 uppercase tracking-widest block mb-4">{step.phase}</span>
                    <h4 className="font-bold text-2xl mb-6 text-slate-900 group-hover:text-primary transition-colors">{step.title}</h4>
                    <ul className="text-slate-600 list-disc ml-5 space-y-3 text-base">
                      {step.items.map((item, i) => <li key={i}>{item}</li>)}
                    </ul>
                  </div>
                </ScrollReveal>
              ))}
           </div>
        </div>

        {/* Accordions */}
        <div className="max-w-4xl mx-auto space-y-8 mb-24">
           <ScrollReveal animation="slide-left">
             <div className="bg-white rounded-[2rem] shadow-xl border border-slate-100 overflow-hidden group card-lift">
                <button 
                   className="w-full flex justify-between items-center p-10 bg-white hover:bg-slate-50 transition-colors"
                   onClick={() => setOpenAccordion(openAccordion === 'admin' ? null : 'admin')}
                >
                   <span className="font-black text-slate-800 text-xl md:text-3xl text-left flex items-center gap-4">
                     Administrative Requirements 
                     <span className="text-sm font-bold bg-slate-100 text-slate-400 px-4 py-1.5 rounded-full group-hover:bg-secondary group-hover:text-white transition-colors">7 Documents</span>
                   </span>
                   {openAccordion === 'admin' ? <ChevronUp className="w-8 h-8 text-secondary"/> : <ChevronDown className="w-8 h-8 text-slate-300"/>}
                </button>
                {openAccordion === 'admin' && (
                   <div className="p-12 bg-slate-50 border-t border-slate-100 animate-fadeIn">
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-8 text-slate-700 font-semibold">
                         <li className="flex items-center gap-3"><div className="w-3 h-3 bg-secondary rounded-full"></div>Akta Pendirian (Deed)</li>
                         <li className="flex items-center gap-3"><div className="w-3 h-3 bg-secondary rounded-full"></div>Tax NPWP Profile</li>
                         <li className="flex items-center gap-3"><div className="w-3 h-3 bg-secondary rounded-full"></div>NIB (Business ID)</li>
                         <li className="flex items-center gap-3"><div className="w-3 h-3 bg-secondary rounded-full"></div>Letter of Appointment</li>
                         <li className="flex items-center gap-3"><div className="w-3 h-3 bg-secondary rounded-full"></div>Trademark (HAKI)</li>
                         <li className="flex items-center gap-3"><div className="w-3 h-3 bg-secondary rounded-full"></div>Business Licenses</li>
                      </ul>
                   </div>
                )}
             </div>
           </ScrollReveal>

           <ScrollReveal animation="slide-right">
             <div className="bg-white rounded-[2rem] shadow-xl border border-slate-100 overflow-hidden group card-lift">
                <button 
                   className="w-full flex justify-between items-center p-10 bg-white hover:bg-slate-50 transition-colors"
                   onClick={() => setOpenAccordion(openAccordion === 'tech' ? null : 'tech')}
                >
                   <span className="font-black text-slate-800 text-xl md:text-3xl text-left flex items-center gap-4">
                     Technical Requirements 
                     <span className="text-sm font-bold bg-slate-100 text-slate-400 px-4 py-1.5 rounded-full group-hover:bg-accent group-hover:text-white transition-colors">12 Data Points</span>
                   </span>
                   {openAccordion === 'tech' ? <ChevronUp className="w-8 h-8 text-accent"/> : <ChevronDown className="w-8 h-8 text-slate-300"/>}
                </button>
                {openAccordion === 'tech' && (
                   <div className="p-12 bg-slate-50 border-t border-slate-100 animate-fadeIn">
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-8 text-slate-700 font-semibold">
                         <li className="flex items-center gap-3"><AlertCircle className="w-5 h-5 text-accent"/> MSDS Profiles</li>
                         <li className="flex items-center gap-3"><AlertCircle className="w-5 h-5 text-accent"/> CoA (Lab Analysis)</li>
                         <li className="flex items-center gap-3"><AlertCircle className="w-5 h-5 text-accent"/> Process Workflows</li>
                         <li className="flex items-center gap-3"><AlertCircle className="w-5 h-5 text-accent"/> Field Efficacy Data</li>
                         <li className="flex items-center gap-3"><AlertCircle className="w-5 h-5 text-accent"/> Toxicity Studies</li>
                         <li className="flex items-center gap-3"><AlertCircle className="w-5 h-5 text-accent"/> Sustainability Impact</li>
                      </ul>
                   </div>
                )}
             </div>
           </ScrollReveal>
        </div>
      </div>
    </div>
  );
};

export default PesticideRegistration;