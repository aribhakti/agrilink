import React, { useState } from 'react';
import { Beaker, Bug, ShieldAlert, Globe2, Factory, ChevronDown, ChevronUp, AlertCircle } from 'lucide-react';

const PesticideRegistration: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [openAccordion, setOpenAccordion] = useState<string | null>('admin');

  const tabs = [
    { title: "Synthetic & Mineral", icon: <Beaker className="w-4 h-4"/>, desc: "Chemical pesticides and metabolites." },
    { title: "Bio-Pesticides", icon: <Bug className="w-4 h-4"/>, desc: "Natural, attractants, pheromones, ZPT." },
    { title: "Vector Control", icon: <ShieldAlert className="w-4 h-4"/>, desc: "Household and human disease vectors." },
    { title: "Export Only", icon: <Globe2 className="w-4 h-4"/>, desc: "Products manufactured solely for export." },
    { title: "Technical Materials", icon: <Factory className="w-4 h-4"/>, desc: "Raw active ingredients registration." },
  ];

  return (
    <div className="bg-background min-h-screen pb-20">
      {/* Hero */}
      <div className="relative bg-primary text-white py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0">
             <img 
                src="https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&q=80&w=2070" 
                alt="Lab Research" 
                className="w-full h-full object-cover"
                loading="eager"
             />
             <div className="absolute inset-0 bg-blue-900/80 mix-blend-multiply"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <h1 className="text-3xl md:text-5xl font-heading font-bold mb-4 drop-shadow-sm leading-tight">Pesticide Regulatory Compliance</h1>
          <p className="text-blue-50 text-base md:text-lg max-w-2xl font-medium">
            Navigate the complex multi-stage testing and commission reviews with our expert guidance.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        {/* Classification Tabs */}
        <div className="flex flex-wrap gap-3 mb-8 justify-center">
          {tabs.map((tab, idx) => (
            <button
              key={idx}
              onClick={() => setActiveTab(idx)}
              className={`flex items-center gap-2 px-4 py-2 md:px-5 md:py-3 rounded-full text-xs md:text-sm font-bold transition-all duration-300 ${
                activeTab === idx 
                  ? 'bg-secondary text-white shadow-lg scale-105 ring-2 ring-secondary ring-offset-2' 
                  : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200 hover:shadow-md'
              }`}
            >
              {tab.icon}
              {tab.title}
            </button>
          ))}
        </div>

        <div className="bg-white p-6 md:p-8 rounded-2xl shadow-md border border-slate-100 text-center mb-16 animate-fadeIn max-w-3xl mx-auto">
           <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-2">{tabs[activeTab].title}</h3>
           <p className="text-slate-600 text-base md:text-lg">{tabs[activeTab].desc}</p>
        </div>

        {/* Visual Process Flow */}
        <div className="mb-16">
           <h2 className="text-xl md:text-2xl font-heading font-bold mb-8 text-center md:text-left text-slate-900">Advanced Process Flow</h2>
           <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-white p-6 rounded-lg border-l-4 border-slate-300 shadow-sm hover:shadow-md transition-all">
                 <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">Phase 1</span>
                 <h4 className="font-bold text-lg mb-2 text-slate-900">Pre-Assessment</h4>
                 <ul className="text-sm text-slate-600 list-disc ml-4 space-y-1">
                    <li>Label Validation</li>
                    <li>Import Permit</li>
                 </ul>
              </div>
              
              <div className="bg-white p-6 rounded-lg border-l-4 border-secondary shadow-sm hover:shadow-md transition-all">
                 <span className="text-xs font-bold text-secondary uppercase tracking-wider block mb-2">Phase 2</span>
                 <h4 className="font-bold text-lg mb-2 text-slate-900">Multi-Stage Testing</h4>
                 <div className="flex flex-col gap-2 text-sm text-slate-600 font-medium">
                    <span className="bg-green-50 px-3 py-1.5 rounded-md text-green-700">Quality Test</span>
                    <span className="bg-green-50 px-3 py-1.5 rounded-md text-green-700">Toxicity Test</span>
                    <span className="bg-green-50 px-3 py-1.5 rounded-md text-green-700">Efficacy Test</span>
                 </div>
              </div>

              <div className="bg-white p-6 rounded-lg border-l-4 border-accent shadow-sm hover:shadow-md transition-all">
                 <span className="text-xs font-bold text-accent uppercase tracking-wider block mb-2">Phase 3</span>
                 <h4 className="font-bold text-lg mb-2 text-slate-900">Commission Review</h4>
                 <p className="text-sm text-slate-600">Panel review by the Pesticide Commission.</p>
              </div>

              <div className="bg-white p-6 rounded-lg border-l-4 border-primary shadow-sm hover:shadow-md transition-all">
                 <span className="text-xs font-bold text-primary uppercase tracking-wider block mb-2">Phase 4</span>
                 <h4 className="font-bold text-lg mb-2 text-slate-900">Final Outcome</h4>
                 <div className="space-y-3 mt-3">
                    <div className="flex items-center text-sm font-bold text-primary bg-green-50 p-2 rounded">
                       <div className="w-2 h-2 rounded-full bg-primary mr-2"></div> Success: Decree
                    </div>
                    <div className="flex items-center text-sm font-bold text-red-500 bg-red-50 p-2 rounded">
                       <div className="w-2 h-2 rounded-full bg-red-500 mr-2"></div> Rejection: Retry
                    </div>
                 </div>
              </div>
           </div>
        </div>

        {/* Requirements Accordion */}
        <div className="max-w-3xl mx-auto space-y-4">
           {/* Admin Accordion */}
           <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
              <button 
                 className="w-full flex justify-between items-center p-5 bg-white hover:bg-slate-50 transition-colors"
                 onClick={() => setOpenAccordion(openAccordion === 'admin' ? null : 'admin')}
              >
                 <span className="font-bold text-slate-800 text-base md:text-lg text-left">Administrative Requirements <span className="text-sm font-normal text-slate-500 md:ml-2 block md:inline">(7 Items)</span></span>
                 {openAccordion === 'admin' ? <ChevronUp className="w-6 h-6 text-slate-400 flex-shrink-0"/> : <ChevronDown className="w-6 h-6 text-slate-400 flex-shrink-0"/>}
              </button>
              {openAccordion === 'admin' && (
                 <div className="p-5 bg-slate-50 border-t border-slate-100 animate-fadeIn">
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-slate-700">
                       <li className="flex items-center"><div className="w-2 h-2 bg-secondary rounded-full mr-3 flex-shrink-0"></div>Deed of Establishment</li>
                       <li className="flex items-center"><div className="w-2 h-2 bg-secondary rounded-full mr-3 flex-shrink-0"></div>Tax ID (NPWP)</li>
                       <li className="flex items-center"><div className="w-2 h-2 bg-secondary rounded-full mr-3 flex-shrink-0"></div>Business ID (NIB)</li>
                       <li className="flex items-center"><div className="w-2 h-2 bg-secondary rounded-full mr-3 flex-shrink-0"></div>Import Permit Data</li>
                    </ul>
                 </div>
              )}
           </div>

           {/* Technical Accordion */}
           <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
              <button 
                 className="w-full flex justify-between items-center p-5 bg-white hover:bg-slate-50 transition-colors"
                 onClick={() => setOpenAccordion(openAccordion === 'tech' ? null : 'tech')}
              >
                 <span className="font-bold text-slate-800 text-base md:text-lg text-left">Technical Requirements <span className="text-sm font-normal text-slate-500 md:ml-2 block md:inline">(12 Items)</span></span>
                 {openAccordion === 'tech' ? <ChevronUp className="w-6 h-6 text-slate-400 flex-shrink-0"/> : <ChevronDown className="w-6 h-6 text-slate-400 flex-shrink-0"/>}
              </button>
              {openAccordion === 'tech' && (
                 <div className="p-5 bg-slate-50 border-t border-slate-100 animate-fadeIn">
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-slate-700">
                       <li className="flex items-center"><AlertCircle className="w-4 h-4 text-accent mr-3 flex-shrink-0"/> MSDS</li>
                       <li className="flex items-center"><AlertCircle className="w-4 h-4 text-accent mr-3 flex-shrink-0"/> Certificate of Analysis (CoA)</li>
                       <li className="flex items-center"><AlertCircle className="w-4 h-4 text-accent mr-3 flex-shrink-0"/> Manufacturing Process</li>
                       <li className="flex items-center"><AlertCircle className="w-4 h-4 text-accent mr-3 flex-shrink-0"/> Bio-efficacy Data</li>
                       <li className="flex items-center"><AlertCircle className="w-4 h-4 text-accent mr-3 flex-shrink-0"/> Toxicology Reports</li>
                       <li className="flex items-center"><AlertCircle className="w-4 h-4 text-accent mr-3 flex-shrink-0"/> Residue Data</li>
                    </ul>
                 </div>
              )}
           </div>
        </div>
      </div>
    </div>
  );
};

export default PesticideRegistration;