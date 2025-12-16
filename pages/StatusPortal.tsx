import React, { useState } from 'react';
import { Search, Loader2, FileCheck, CheckCircle, Clock } from 'lucide-react';
import { MOCK_STATUS_DB } from '../constants';
import { ApplicationStatus } from '../types';

const StatusPortal: React.FC = () => {
  const [searchId, setSearchId] = useState('');
  const [result, setResult] = useState<ApplicationStatus | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setResult(null);

    // Simulate API delay
    setTimeout(() => {
      const found = MOCK_STATUS_DB.find(
        item => item.id.toLowerCase() === searchId.toLowerCase()
      );
      if (found) {
        setResult(found);
      } else {
        setError('Registration ID not found. Please check and try again.');
      }
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="bg-background min-h-screen pb-20">
       {/* Hero Section */}
       <div className="relative bg-primary text-white py-24 overflow-hidden">
        <div className="absolute inset-0">
             <img 
                src="https://images.unsplash.com/photo-1586771107445-d3ca888129ff?auto=format&fit=crop&q=80&w=2072" 
                alt="Digital Agriculture Status Tracking" 
                className="w-full h-full object-cover"
                loading="eager"
             />
             <div className="absolute inset-0 bg-gray-900/80 mix-blend-multiply"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center animate-fadeIn">
             <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 backdrop-blur-md rounded-full mb-6 ring-1 ring-white/30 shadow-lg">
                <Search className="w-8 h-8 text-white" />
             </div>
             <h1 className="text-3xl md:text-5xl font-heading font-bold mb-4 drop-shadow-sm">Registration Status Portal</h1>
             <p className="text-slate-200 text-lg max-w-2xl mx-auto font-medium">
                Real-time tracking for your pesticide and fertilizer registration applications. Enter your ID below.
             </p>
        </div>
      </div>

       <div className="max-w-2xl mx-auto px-4 -mt-10 relative z-20">
          <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 border border-slate-100 transform transition-all hover:shadow-2xl">
             <form onSubmit={handleSearch} className="mb-6">
                <label className="block text-sm font-bold text-slate-700 mb-2">Registration ID</label>
                <div className="relative group">
                   <input 
                      type="text" 
                      value={searchId}
                      onChange={(e) => setSearchId(e.target.value)}
                      placeholder="e.g., AGR-2023-001"
                      className="w-full pl-4 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-4 focus:ring-secondary/20 focus:border-secondary outline-none transition-all text-lg text-slate-900 placeholder:text-slate-400 shadow-sm"
                   />
                </div>
                <button 
                  type="submit" 
                  disabled={loading || !searchId}
                  className="w-full mt-4 bg-secondary hover:bg-sky-600 text-white font-bold py-3.5 rounded-lg shadow-lg hover:shadow-xl transition-all flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed transform hover:-translate-y-0.5 active:scale-95 duration-200"
                >
                  {loading ? <Loader2 className="w-6 h-6 animate-spin mr-2"/> : 'Track Application'}
                </button>
             </form>

             {error && (
                <div className="p-4 bg-red-50 text-red-600 rounded-lg text-sm text-center border border-red-100 animate-fadeIn font-medium flex items-center justify-center gap-2">
                   <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
                   {error}
                </div>
             )}

             {result && (
                <div className="border-t border-slate-100 pt-6 animate-fadeIn">
                   <div className="flex items-center justify-between mb-4">
                      <span className="text-sm text-slate-500 font-mono bg-slate-100 px-2 py-1 rounded">ID: {result.id}</span>
                      <span className="text-xs font-bold bg-green-100 text-green-800 px-2.5 py-1 rounded-full border border-green-200 flex items-center gap-1">
                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div> Active
                      </span>
                   </div>
                   <h3 className="text-2xl font-bold text-slate-900 mb-1">{result.productName}</h3>
                   <p className="text-slate-600 text-sm mb-6 font-medium">{result.companyName}</p>

                   <div className="bg-slate-50 rounded-xl p-5 border border-slate-200">
                      <div className="flex items-center mb-4 pb-4 border-b border-slate-200">
                         <div className="w-full">
                            <div className="flex justify-between mb-1">
                               <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Current Stage</span>
                            </div>
                            <div className="text-xl font-bold text-primary flex items-center">
                               {result.stage === 'Decree Issued' ? <FileCheck className="mr-2 w-6 h-6 text-primary"/> : <Loader2 className="mr-2 w-6 h-6 animate-spin text-secondary"/>}
                               {result.stage}
                            </div>
                         </div>
                      </div>
                      <div className="flex items-center text-slate-500">
                         <Clock className="w-4 h-4 mr-2" />
                         <span className="text-xs font-medium">Last Status Update: {result.lastUpdated}</span>
                      </div>
                   </div>
                </div>
             )}
          </div>
          
          <div className="text-center mt-8">
             <p className="text-sm text-slate-500">
                Data is updated every 24 hours. <br/> For urgent inquiries, please contact our support team via WhatsApp.
             </p>
          </div>
       </div>
    </div>
  );
};

export default StatusPortal;