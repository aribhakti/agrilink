import React, { useState } from 'react';
import { CheckCircle2, FileText, FlaskConical, PenTool, Send, Award, Info } from 'lucide-react';
import ScrollReveal from '../components/ScrollReveal';

const TOOLTIP_DATA: Record<string, string> = {
  "Deed of Establishment (Akta)": "Mandatory legal document certifying company formation and legal status in Indonesia.",
  "Tax ID (NPWP)": "Company taxpayer identification number required for all regulatory filings and financial compliance.",
  "Business ID (NIB)": "Single identity number for businesses under the OSS (Online Single Submission) system.",
  "Director's ID Card (KTP)": "Identity verification of the company's legal representative or person in charge.",
  "Letter of Authorization": "Formal permission allowing PT. ATS to handle the registration process on your company's behalf.",
  "Trademark Certificate (HAKI)": "Crucial proof of brand ownership, required to prevent legal conflicts and market overlaps.",
  "Product Label Design": "Labels must strictly follow Indonesian language laws and Ministry of Agriculture specifications.",
  "Letter of Appointment (LoA)": "Legal agreement between the manufacturer and the distributor in Indonesia.",
  "SNI Certificate (if applicable)": "Certificate of compliance for products requiring Indonesian National Standard markers.",
  "Manufacturing Process Flowchart": "Technical document detailing the steps of production for quality verification.",
  "Certificate of Analysis (CoA)": "Laboratory-certified results detailing the product's chemical composition and nutrients."
};

interface RequirementItemProps {
  req: string;
  icon: React.ElementType;
}

const FertilizerRegistration: React.FC = () => {
  const [reqView, setReqView] = useState<'admin' | 'tech'>('admin');
  const [hoveredReq, setHoveredReq] = useState<string | null>(null);

  const RequirementItem: React.FC<RequirementItemProps> = ({ req, icon: Icon }) => (
    <li 
      className="relative flex items-center text-slate-700 p-4 bg-slate-50 rounded-2xl hover:bg-white hover:shadow-xl transition-all border border-transparent hover:border-primary/20 cursor-help group"
      onMouseEnter={() => setHoveredReq(req)}
      onMouseLeave={() => setHoveredReq(null)}
    >
      <Icon className="w-5 h-5 text-secondary mr-3 flex-shrink-0 group-hover:scale-125 transition-transform" />
      <span className="font-semibold text-sm md:text-base flex-grow leading-tight">{req}</span>
      <Info className="w-4 h-4 text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity ml-2" />
      
      {hoveredReq === req && (
        <div className="absolute left-0 bottom-full mb-3 z-50 w-72 bg-slate-900 text-white text-xs p-4 rounded-xl shadow-2xl animate-fadeIn pointer-events-none leading-relaxed border border-white/10">
          <div className="font-bold text-accent mb-1 uppercase tracking-tighter">Regulatory Context</div>
          {TOOLTIP_DATA[req] || "Required documentation for submission."}
          <div className="absolute top-full left-6 -translate-y-1 border-8 border-transparent border-t-slate-900"></div>
        </div>
      )}
    </li>
  );

  return (
    <div className="bg-background min-h-screen pb-20">
      {/* Hero - Eager Loading with Optimized Source representing Fertilizer Application */}
      <div className="relative bg-primary text-white py-24 md:py-36 overflow-hidden">
        <div className="absolute inset-0">
            <img 
                src="https://images.unsplash.com/photo-1625246333195-58197bd4773d?auto=format&fit=crop&q=80&w=1600" 
                alt="High-Tech Fertilizer Application in Field" 
                className="w-full h-full object-cover opacity-20"
                loading="eager"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-green-950 via-green-900/95 to-green-800/40"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <ScrollReveal animation="fade-up">
            <h1 className="text-4xl md:text-7xl font-heading font-bold mb-6 drop-shadow-md leading-tight">Fertilizer Registration</h1>
            <p className="text-green-50 text-lg md:text-2xl max-w-3xl font-medium opacity-90 leading-relaxed">
              Based on Law No. 12/1992. We streamline the journey from technical verification to Ministry of Agriculture approval.
            </p>
          </ScrollReveal>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 relative z-20">
        {/* Scopes */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
          <ScrollReveal animation="slide-left">
            <div className="bg-white p-10 md:p-12 rounded-[2rem] shadow-xl border-t-8 border-secondary card-lift group cursor-default h-full">
              <h3 className="text-2xl font-bold text-slate-900 mb-4 group-hover:text-secondary transition-colors">Organic Fertilizer</h3>
              <p className="text-slate-600 text-lg leading-relaxed">Pioneering registration protocols for Solid & Liquid organic solutions. We handle complex bio-certification standards with surgical precision.</p>
            </div>
          </ScrollReveal>
          <ScrollReveal animation="slide-right">
            <div className="bg-white p-10 md:p-12 rounded-[2rem] shadow-xl border-t-8 border-primary card-lift group cursor-default h-full">
              <h3 className="text-2xl font-bold text-slate-900 mb-4 group-hover:text-primary transition-colors">Inorganic Fertilizer</h3>
              <p className="text-slate-600 text-lg leading-relaxed">Covering Macro, Micro, and NPK blends. Our experts ensure high-efficiency lab testing management for large-scale industrial producers.</p>
            </div>
          </ScrollReveal>
        </div>

        {/* Requirements */}
        <ScrollReveal animation="fade-up">
          <div className="bg-white rounded-[2.5rem] shadow-2xl overflow-hidden border border-slate-100 mb-24">
            <div className="flex border-b border-slate-100 bg-slate-50/50">
                <button 
                  onClick={() => setReqView('admin')}
                  className={`flex-1 py-8 text-center font-bold transition-all text-sm md:text-xl ${reqView === 'admin' ? 'bg-white text-primary border-b-4 border-primary shadow-sm' : 'text-slate-400 hover:text-slate-600 hover:bg-white/50'}`}
                >
                  Administrative Requirements
                </button>
                <button 
                  onClick={() => setReqView('tech')}
                  className={`flex-1 py-8 text-center font-bold transition-all text-sm md:text-xl ${reqView === 'tech' ? 'bg-white text-primary border-b-4 border-primary shadow-sm' : 'text-slate-400 hover:text-slate-600 hover:bg-white/50'}`}
                >
                  Technical Requirements
                </button>
            </div>
            
            <div className="p-8 md:p-16 bg-white min-h-[450px]">
                <div className="mb-8 flex items-center gap-2 text-slate-400 bg-slate-100/50 p-3 rounded-xl inline-flex">
                  <Info className="w-5 h-5 text-secondary" />
                  <p className="text-xs font-bold uppercase tracking-widest px-2">Hover for regulatory insight</p>
                </div>
                {reqView === 'admin' ? (
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fadeIn">
                    {["Deed of Establishment (Akta)", "Tax ID (NPWP)", "Business ID (NIB)", "Director's ID Card (KTP)", "Letter of Authorization", "Trademark Certificate (HAKI)"].map((req, i) => (
                      <RequirementItem key={req} req={req} icon={CheckCircle2} />
                    ))}
                  </ul>
                ) : (
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fadeIn">
                    {["Product Label Design", "Letter of Appointment (LoA)", "SNI Certificate (if applicable)", "Manufacturing Process Flowchart", "Certificate of Analysis (CoA)"].map((req, i) => (
                      <RequirementItem key={req} req={req} icon={PenTool} />
                    ))}
                  </ul>
                )}
            </div>
          </div>
        </ScrollReveal>

        {/* Content Image - Lazy Loaded representing Quality Growth */}
        <ScrollReveal animation="scale-in">
          <div className="rounded-[2.5rem] overflow-hidden h-[400px] md:h-[500px] relative group shadow-2xl border border-slate-100">
            <img 
              src="https://images.unsplash.com/photo-1530836361253-efad5cb2f6de?auto=format&fit=crop&q=80&w=1200" 
              alt="Healthy Crops Growth" 
              className="w-full h-full object-cover transition-transform duration-[5s] group-hover:scale-110"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
            <div className="absolute bottom-12 left-12 text-white max-w-2xl">
              <h4 className="text-3xl font-bold mb-4">Market Readiness</h4>
              <p className="text-slate-200 text-lg leading-relaxed">Our registration expertise ensures your biological and chemical products enter the Indonesian market with absolute legal integrity.</p>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
};

export default FertilizerRegistration;