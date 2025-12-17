import React from 'react';
import { ShieldCheck, Copyright, FileSearch, Scale, ArrowRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import ScrollReveal from '../components/ScrollReveal';

const IntellectualProperty: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-background min-h-screen pb-20">
       {/* Hero - Eager */}
       <div className="relative bg-slate-900 text-white py-24 md:py-36 overflow-hidden">
        <div className="absolute inset-0">
             <img 
                src="https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=1600" 
                alt="Intellectual Property" 
                className="w-full h-full object-cover opacity-30"
                loading="eager"
             />
             <div className="absolute inset-0 bg-slate-950/80 mix-blend-multiply"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <ScrollReveal animation="fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/20 text-accent text-sm font-bold mb-8 border border-accent/30 backdrop-blur-sm">
               <ShieldCheck className="w-4 h-4" />
               Critical Compliance Service
            </div>
            <h1 className="text-4xl md:text-7xl font-heading font-bold mb-6 drop-shadow-md leading-tight">Intellectual Property Protection</h1>
            <p className="text-slate-300 text-lg md:text-2xl max-w-2xl leading-relaxed">
              Shield your brand and formulations from day one. In Indonesia, IP ownership is the first step toward successful product distribution.
            </p>
          </ScrollReveal>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
         <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start mb-24">
            <div>
               <ScrollReveal className="mb-10">
                 <h2 className="text-3xl font-heading font-bold text-slate-900 mb-2">Securing Your Assets</h2>
                 <div className="w-16 h-1.5 bg-accent rounded-full"></div>
               </ScrollReveal>
               
               <div className="space-y-10">
                  <ScrollReveal animation="fade-up" delay={100} className="flex gap-6">
                     <div className="w-16 h-16 rounded-2xl bg-red-50 flex items-center justify-center shrink-0 shadow-sm text-red-500">
                        <ShieldCheck className="w-8 h-8" />
                     </div>
                     <div>
                        <h3 className="font-bold text-slate-900 text-xl mb-2">Legal Exclusivity</h3>
                        <p className="text-slate-600 leading-relaxed text-lg">Gain the absolute right to use your brand, preventing unauthorized distribution of counterfeit agricultural inputs.</p>
                     </div>
                  </ScrollReveal>
                  <ScrollReveal animation="fade-up" delay={200} className="flex gap-6">
                     <div className="w-16 h-16 rounded-2xl bg-blue-50 flex items-center justify-center shrink-0 shadow-sm text-blue-500">
                        <Scale className="w-8 h-8" />
                     </div>
                     <div>
                        <h3 className="font-bold text-slate-900 text-xl mb-2">Strategic Valuation</h3>
                        <p className="text-slate-600 leading-relaxed text-lg">Turn your brand identity into a tangible corporate asset that adds value to your company’s Indonesian portfolio.</p>
                     </div>
                  </ScrollReveal>
                  <ScrollReveal animation="fade-up" delay={300} className="flex gap-6">
                     <div className="w-16 h-16 rounded-2xl bg-green-50 flex items-center justify-center shrink-0 shadow-sm text-green-500">
                        <Copyright className="w-8 h-8" />
                     </div>
                     <div>
                        <h3 className="font-bold text-slate-900 text-xl mb-2">Registration Prerequisite</h3>
                        <p className="text-slate-600 leading-relaxed text-lg">The Ministry of Agriculture requires proof of brand ownership (HAKI) for all new pesticide and fertilizer filings.</p>
                     </div>
                  </ScrollReveal>
               </div>
            </div>
            
            <ScrollReveal animation="scale-in" delay={400} className="sticky top-28">
              <div className="bg-white p-10 rounded-[2.5rem] shadow-2xl border border-slate-100">
                 <h3 className="text-2xl font-bold text-slate-900 mb-8 flex items-center gap-3">
                   <FileSearch className="text-primary w-7 h-7" />
                   Our IP Workflow
                 </h3>
                 <div className="space-y-6">
                    {[
                      { title: "Trademark Search", desc: "Determining brand availability and legal feasibility before filing.", icon: FileSearch },
                      { title: "Registration Filing", desc: "Expert handling of all Directorate General of Intellectual Property (DJKI) requirements.", icon: Scale },
                      { title: "Monitoring & Maintenance", desc: "Continuous protection monitoring and proactive renewal alerts.", icon: ShieldCheck }
                    ].map((item, idx) => (
                      <div 
                        key={idx}
                        onClick={() => navigate('/status')}
                        className="p-6 rounded-2xl bg-slate-50 border border-slate-100 hover:border-primary/30 hover:bg-white hover:shadow-xl transition-all cursor-pointer group flex items-center gap-4"
                      >
                         <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center shadow-sm group-hover:bg-primary group-hover:text-white transition-colors">
                            <item.icon className="w-6 h-6" />
                         </div>
                         <div>
                            <div className="font-bold text-slate-800 transition-colors">{item.title}</div>
                            <p className="text-sm text-slate-500">{item.desc}</p>
                         </div>
                      </div>
                    ))}
                 </div>
                 <div className="mt-10 pt-8 border-t border-slate-100 text-center">
                    <Link to="/services/fertilizer" className="inline-flex items-center gap-2 bg-primary text-white px-8 py-4 rounded-xl font-bold hover:bg-green-700 transition-all shadow-xl shadow-green-900/10 active:scale-95">
                       Register Products Together
                       <ArrowRight className="w-5 h-5" />
                    </Link>
                 </div>
              </div>
            </ScrollReveal>
         </div>
      </div>
    </div>
  );
};

export default IntellectualProperty;