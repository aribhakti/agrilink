import React from 'react';
import { Calendar, User, ArrowRight, BookOpen } from 'lucide-react';

const News: React.FC = () => {
  const articles = [
    {
      id: 1,
      title: "Understanding Law No. 12 of 1992",
      excerpt: "A deep dive into the Plant Cultivation Systems law that forms the backbone of agricultural regulation in Indonesia.",
      date: "Oct 12, 2023",
      author: "Satrio",
      category: "Regulation",
      image: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=800"
    },
    {
      id: 2,
      title: "New Efficacy Test Standards for 2024",
      excerpt: "The Ministry of Agriculture has updated the protocols for bio-efficacy testing. Here is what you need to know to ensure compliance.",
      date: "Nov 05, 2023",
      author: "Admin",
      category: "Update",
      image: "https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&q=80&w=800"
    },
    {
      id: 3,
      title: "Accelerating Market Entry for Organic Fertilizers",
      excerpt: "Strategies to streamline the administrative requirements for organic certification and registration.",
      date: "Jan 15, 2024",
      author: "Ina",
      category: "Guide",
      image: "https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?auto=format&fit=crop&q=80&w=800"
    }
  ];

  const handleReadArticle = (title: string) => {
    alert(`Opening article: "${title}"\n\n(This is a demo interaction. In a production environment, this would navigate to the full article page.)`);
  };

  const handleDownload = () => {
    // Opens the actual regulation in a new tab if available, or simulates download
    window.open('https://peraturan.bpk.go.id/Details/46660/uu-no-12-tahun-1992', '_blank');
  };

  return (
    <div className="bg-background min-h-screen pb-20">
      <div className="bg-white border-b border-slate-200 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
           <span className="text-secondary font-bold tracking-wider uppercase text-sm mb-2 block">Insights</span>
           <h1 className="text-3xl md:text-5xl font-heading font-bold text-slate-900 mb-4">News & Regulations</h1>
           <p className="text-slate-600 max-w-2xl mx-auto text-lg">
              Stay updated with the latest changes in Indonesian agricultural law, Ministry Decrees, and industry best practices.
           </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {articles.map(article => (
               <article 
                  key={article.id} 
                  onClick={() => handleReadArticle(article.title)}
                  className="bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-slate-100 flex flex-col group cursor-pointer hover:-translate-y-1"
               >
                  <div className="h-56 overflow-hidden relative">
                     <img 
                        src={article.image} 
                        alt={article.title} 
                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                        loading="lazy"
                        decoding="async"
                     />
                     <span className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm text-primary text-xs font-bold px-3 py-1 rounded-full shadow-sm">
                        {article.category}
                     </span>
                  </div>
                  <div className="p-6 flex-1 flex flex-col">
                     <div className="flex items-center text-xs text-slate-500 mb-3 space-x-3 font-medium">
                        <div className="flex items-center">
                           <Calendar className="w-3 h-3 mr-1" />
                           {article.date}
                        </div>
                        <div className="flex items-center">
                           <User className="w-3 h-3 mr-1" />
                           {article.author}
                        </div>
                     </div>
                     <h3 className="text-xl font-bold text-slate-900 mb-3 leading-snug group-hover:text-primary transition-colors">
                        {article.title}
                     </h3>
                     <p className="text-slate-600 text-sm mb-6 flex-1 leading-relaxed">
                        {article.excerpt}
                     </p>
                     <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          handleReadArticle(article.title);
                        }}
                        className="text-secondary font-bold text-sm flex items-center group-hover:underline mt-auto"
                     >
                        Read Article <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
                     </button>
                  </div>
               </article>
            ))}
         </div>

         {/* Essential Docs Section */}
         <div className="mt-20">
            <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center">
               <BookOpen className="w-6 h-6 mr-2 text-primary" />
               Essential Documents
            </h2>
            <div className="bg-gradient-to-r from-primary to-green-700 rounded-2xl p-8 text-white flex flex-col md:flex-row items-center justify-between shadow-lg">
               <div className="mb-6 md:mb-0">
                  <h3 className="text-xl font-bold mb-2">Law No. 12 of 1992 PDF</h3>
                  <p className="text-green-50 text-sm max-w-lg leading-relaxed">
                     The fundamental legal framework for plant cultivation systems in Indonesia. Essential reading for all agricultural business operators.
                  </p>
               </div>
               <button 
                  onClick={handleDownload}
                  className="bg-white text-primary font-bold py-3 px-8 rounded-lg shadow-xl hover:bg-slate-50 transition-colors whitespace-nowrap"
               >
                  Download PDF
               </button>
            </div>
         </div>
      </div>
    </div>
  );
};

export default News;