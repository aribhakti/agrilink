import React from 'react';
import { ShieldCheck, Copyright, FileSearch, Scale } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const IntellectualProperty: React.FC = () => {
  const navigate = useNavigate();

  const handleServiceClick = () => {
    navigate('/status');
  };

  return (
    <div className="bg-background min-h-screen pb-20">
       {/* Hero */}
       <div className="relative bg-slate-900 text-white py-20 lg:py-24 overflow-hidden">
        <div className="absolute inset-0">
             <img 
                src="https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=2070" 
                alt="Intellectual Property Law" 
                className="w-full h-full object-cover"
                fetchPriority="high"
                loading="eager"
             />
             <div className="absolute inset-0 bg-slate-900/90 mix-blend-multiply"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/20 text-accent text-sm font-bold mb-6 border border-accent/30 backdrop-blur-sm">
             <ShieldCheck className="w-4 h-4" />
             New Service
          </div>
          <h1 className="text-3xl md:text-5xl font-heading font-bold mb-4 drop-shadow-sm">Intellectual Property Protection</h1>
          <p className="text-slate-300 text-lg max-w-2xl leading-relaxed">
            Secure your agricultural brand identity and formulations. We assist with Trademark (HAKI) and Patent registration to protect your market share.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
         {/* Why It Matters */}
         <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start mb-20">
            <div>
               <h2 className="text-2xl font-heading font-bold text-slate-900 mb-8">Why Register Your Brand?</h2>
               <div className="space-y-8">
                  <div className="flex gap-4">
                     <div className="w-14 h-14 rounded-xl bg-red-50 flex items-center justify-center shrink-0 shadow-sm">
                        <ShieldCheck className="w-7 h-7 text-red-500" />
                     </div>
                     <div>
                        <h3 className="font-bold text-slate-900 text-lg mb-1">Legal Protection</h3>
                        <p className="text-slate-600 leading-relaxed">Exclusive rights to use your brand name and logo, preventing competitors from using similar assets.</p>
                     </div>
                  </div>
                  <div className="flex gap-4">
                     <div className="w-14 h-14 rounded-xl bg-blue-50 flex items-center justify-center shrink-0 shadow-sm">
                        <Scale className="w-7 h-7 text-blue-500" />
                     </div>
                     <div>
                        <h3 className="font-bold text-slate-900 text-lg mb-1">Asset Value</h3>
                        <p className="text-slate-600 leading-relaxed">Registered trademarks are intangible assets that increase your company's valuation and can be licensed.</p>
                     </div>
                  </div>
                  <div className="flex gap-4">
                     <div className="w-14 h-14 rounded-xl bg-green-50 flex items-center justify-center shrink-0 shadow-sm">
                        <Copyright className="w-7 h-7 text-green-500" />
                     </div>
                     <div>
                        <h3 className="font-bold text-slate-900 text-lg mb-1">Registration Requirement</h3>
                        <p className="text-slate-600 leading-relaxed">For many agricultural products, proof of brand ownership (HAKI) is a prerequisite for distribution permits.</p>
                     </div>
                  </div>
               </div>
            </div>
            
            <div className="bg-white p-8 rounded-2xl shadow-xl border border-slate-100 sticky top-24">
               <h3 className="text-xl font-bold text-slate-900 mb-6">Our IP Services</h3>
               <div className="space-y-4">
                  <div 
                     onClick={handleServiceClick}
                     className="p-5 rounded-lg bg-slate-50 border border-slate-100 hover:border-accent hover:bg-white hover:shadow-md transition-all cursor-pointer group"
                  >
                     <div className="flex justify-between items-center mb-2">
                        <span className="font-bold text-slate-800 group-hover:text-primary transition-colors">Trademark Search</span>
                        <FileSearch className="w-5 h-5 text-slate-400 group-hover:text-primary transition-colors" />
                     </div>
                     <p className="text-sm text-slate-500">Comprehensive analysis to ensure your brand name is available.</p>
                  </div>
                  <div 
                     onClick={handleServiceClick}
                     className="p-5 rounded-lg bg-slate-50 border border-slate-100 hover:border-accent hover:bg-white hover:shadow-md transition-all cursor-pointer group"
                  >
                     <div className="flex justify-between items-center mb-2">
                        <span className="font-bold text-slate-800 group-hover:text-primary transition-colors">Registration Filing</span>
                        <Scale className="w-5 h-5 text-slate-400 group-hover:text-primary transition-colors" />
                     </div>
                     <p className="text-sm text-slate-500">End-to-end handling of documents with the Directorate General of Intellectual Property.</p>
                  </div>
                  <div 
                     onClick={handleServiceClick}
                     className="p-5 rounded-lg bg-slate-50 border border-slate-100 hover:border-accent hover:bg-white hover:shadow-md transition-all cursor-pointer group"
                  >
                     <div className="flex justify-between items-center mb-2">
                        <span className="font-bold text-slate-800 group-hover:text-primary transition-colors">Monitoring & Renewal</span>
                        <ShieldCheck className="w-5 h-5 text-slate-400 group-hover:text-primary transition-colors" />
                     </div>
                     <p className="text-sm text-slate-500">Ongoing protection maintenance and renewal alerts.</p>
                  </div>
               </div>
               <div className="mt-8 pt-6 border-t border-slate-100 text-center">
                  <Link to="/status" className="inline-flex items-center text-primary font-bold hover:text-green-700 transition-colors">
                     Combine with Product Registration <span className="ml-1 text-xl">&rarr;</span>
                  </Link>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
};

export default IntellectualProperty;