import React, { useState } from 'react';
import { CheckCircle2, FileText, FlaskConical, PenTool, Send, Award } from 'lucide-react';

const FertilizerRegistration: React.FC = () => {
  const [reqView, setReqView] = useState<'admin' | 'tech'>('admin');

  return (
    <div className="bg-background min-h-screen pb-20">
      {/* Hero */}
      <div className="relative bg-primary text-white py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0">
            <img 
                src="https://images.unsplash.com/photo-1628352081506-83c43123ed6d?auto=format&fit=crop&q=80&w=2070" 
                alt="Fertilizer and Growth" 
                className="w-full h-full object-cover"
                loading="eager"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-green-900/90 to-green-800/60"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 animate-fadeIn">
          <h1 className="text-3xl md:text-5xl font-heading font-bold mb-4 drop-shadow-sm leading-tight">Comprehensive Fertilizer Registration</h1>
          <p className="text-green-50 text-base md:text-lg max-w-2xl font-medium">
            Based on Law Number 12 of 1992 concerning Plant Cultivation Systems. We handle the complexity so you can focus on production.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-20">
        {/* Scope of Services */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          <div className="bg-white p-6 md:p-8 rounded-xl shadow-lg border-t-4 border-secondary transform hover:-translate-y-2 transition-all duration-300 hover:shadow-xl group">
            <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-secondary transition-colors">Organic Fertilizer</h3>
            <p className="text-slate-600">Registration for Solid & Liquid formulations, ensuring organic certification compliance.</p>
          </div>
          <div className="bg-white p-6 md:p-8 rounded-xl shadow-lg border-t-4 border-primary transform hover:-translate-y-2 transition-all duration-300 hover:shadow-xl group">
            <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-primary transition-colors">Inorganic Fertilizer</h3>
            <p className="text-slate-600">Macro, Micro, and mixed nutrient compounds. Comprehensive NPK analysis handling.</p>
          </div>
        </div>

        {/* Roadmap */}
        <div className="mb-20">
          <h2 className="text-2xl font-heading font-bold text-center mb-12 text-slate-900">The Registration Roadmap</h2>
          <div className="relative">
            {/* Connecting Line (Desktop) */}
            <div className="hidden md:block absolute top-1/2 left-0 w-full h-1 bg-slate-200 -z-10 transform -translate-y-1/2"></div>
            
            <div className="grid grid-cols-2 md:grid-cols-5 gap-6 md:gap-8">
               {[
                 { title: "Sample Seal", icon: <FlaskConical className="w-6 h-6"/>, step: 1 },
                 { title: "Lab Analysis", icon: <CheckCircle2 className="w-6 h-6"/>, step: 2 },
                 { title: "Reporting", icon: <FileText className="w-6 h-6"/>, step: 3 },
                 { title: "Submission", icon: <Send className="w-6 h-6"/>, step: 4 },
                 { title: "Approval", icon: <Award className="w-6 h-6"/>, step: 5 }
               ].map((item, idx) => (
                 <div key={idx} className={`group flex flex-col items-center text-center bg-white md:bg-transparent p-4 md:p-0 rounded-lg shadow-sm md:shadow-none border md:border-none ${idx === 4 ? 'col-span-2 md:col-span-1' : ''} cursor-default`}>
                    <div className="w-14 h-14 rounded-full bg-primary text-white flex items-center justify-center mb-4 shadow-lg z-10 border-4 border-white transition-all duration-300 group-hover:scale-110 group-hover:shadow-xl group-hover:bg-secondary group-hover:rotate-6">
                       {item.icon}
                    </div>
                    <h4 className="font-bold text-slate-900 transition-colors group-hover:text-secondary">Step {item.step}</h4>
                    <p className="text-sm text-slate-600 font-medium">{item.title}</p>
                 </div>
               ))}
            </div>
          </div>
        </div>

        {/* Requirements Toggle */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-100">
           <div className="flex border-b border-slate-100">
              <button 
                onClick={() => setReqView('admin')}
                className={`flex-1 py-4 md:py-5 text-center font-bold transition-all text-xs md:text-base active:bg-slate-100 ${reqView === 'admin' ? 'bg-green-50 text-primary border-b-2 border-primary' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-700'}`}
              >
                Administrative Requirements
              </button>
              <button 
                onClick={() => setReqView('tech')}
                className={`flex-1 py-4 md:py-5 text-center font-bold transition-all text-xs md:text-base active:bg-slate-100 ${reqView === 'tech' ? 'bg-green-50 text-primary border-b-2 border-primary' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-700'}`}
              >
                Technical Requirements
              </button>
           </div>
           
           <div className="p-6 md:p-8 bg-white min-h-[300px]">
              {reqView === 'admin' ? (
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-fadeIn">
                   {[
                     "Deed of Establishment (Akta)",
                     "Tax ID (NPWP)",
                     "Business ID (NIB)",
                     "Director's ID Card (KTP)",
                     "Letter of Authorization",
                     "Trademark Certificate (HAKI)"
                   ].map((req, i) => (
                     <li key={i} className="flex items-center text-slate-700 p-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors">
                        <CheckCircle2 className="w-5 h-5 text-secondary mr-3 flex-shrink-0" />
                        <span className="font-medium">{req}</span>
                     </li>
                   ))}
                </ul>
              ) : (
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-fadeIn">
                   {[
                     "Product Label Design",
                     "Letter of Appointment (LoA)",
                     "SNI Certificate (if applicable)",
                     "Manufacturing Process Flowchart",
                     "Certificate of Analysis (CoA)"
                   ].map((req, i) => (
                     <li key={i} className="flex items-center text-slate-700 p-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors">
                        <PenTool className="w-5 h-5 text-accent mr-3 flex-shrink-0" />
                        <span className="font-medium">{req}</span>
                     </li>
                   ))}
                </ul>
              )}
           </div>
        </div>
      </div>
    </div>
  );
};

export default FertilizerRegistration;