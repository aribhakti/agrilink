import React from 'react';
import { Phone, MessageCircle, MapPin, Mail } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const Footer: React.FC = () => {
  const { t } = useLanguage();

  const handleConsultationClick = () => {
    // Open WhatsApp for consultation with a pre-filled message
    window.open('https://wa.me/6281252220892?text=Hello,%20I%20am%20interested%20in%20a%20free%20consultation%20for%20product%20registration.', '_blank');
  };

  const handlePlaceholderLink = (e: React.MouseEvent, title: string) => {
    e.preventDefault();
    alert(`${title} page is currently under development.`);
  };

  return (
    <footer className="bg-primary text-white pt-16 pb-8">
      {/* Pre-footer CTA */}
      <div className="max-w-6xl mx-auto px-4 text-center mb-16">
        <h2 className="text-3xl font-heading font-bold mb-4">{t.footer.readyTitle}</h2>
        <p className="text-green-50 mb-8 text-lg">
          {t.footer.readyDesc}
        </p>
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
          <button 
            onClick={handleConsultationClick}
            className="bg-white text-primary hover:bg-gray-100 font-bold py-4 px-8 rounded-lg shadow-xl transition-all transform hover:scale-105"
          >
            {t.footer.cta}
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-white/20 pt-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
           {/* Brand Info */}
           <div>
              <div className="flex items-center gap-2 mb-4">
                 <span className="text-2xl font-extrabold text-white">PT. ATS</span>
              </div>
              <p className="text-green-50 text-sm leading-relaxed mb-6">
                 {t.footer.brandDesc}
              </p>
           </div>

           {/* Contact Info */}
           <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div>
                 <h4 className="font-bold text-lg mb-4 text-accent">{t.footer.addressTitle}</h4>
                 <div className="flex items-start gap-3 text-green-50 text-sm">
                    <MapPin className="w-5 h-5 shrink-0 mt-0.5" />
                    <p>
                       Ruko Golden Madrid 2, Unit A3<br/>
                       Lt. 1, Jl. Letnan Sutopo,<br/>
                       Rawa Mekarjaya, Serpong,<br/>
                       Tangerang Selatan, Banten 15310
                    </p>
                 </div>
              </div>

              <div>
                 <h4 className="font-bold text-lg mb-4 text-accent">{t.footer.contactTitle}</h4>
                 <ul className="space-y-3 text-green-50 text-sm">
                    <li className="flex items-center gap-3">
                       <Phone className="w-5 h-5 shrink-0" />
                       <span>+62-812-5222-0892</span>
                    </li>
                    <li className="flex items-center gap-3">
                       <Mail className="w-5 h-5 shrink-0" />
                       <span>agrilinksolusi@gmail.com</span>
                    </li>
                    <li className="flex items-center gap-3">
                       <MessageCircle className="w-5 h-5 shrink-0" />
                       <span>WhatsApp Available</span>
                    </li>
                 </ul>
              </div>
           </div>
        </div>

        <div className="border-t border-white/20 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-green-100">
           <p>© {new Date().getFullYear()} PT. ATS. {t.footer.rights}</p>
           <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" onClick={(e) => handlePlaceholderLink(e, 'Privacy Policy')} className="hover:text-white transition-colors">Privacy</a>
              <a href="#" onClick={(e) => handlePlaceholderLink(e, 'Terms of Service')} className="hover:text-white transition-colors">Terms</a>
           </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;