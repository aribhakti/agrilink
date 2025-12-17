import React from 'react';
import { Phone, MessageCircle, MapPin, Mail, Instagram, Linkedin, Twitter, Facebook } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import ScrollReveal from './ScrollReveal';

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

  const socialLinks = [
    { icon: Facebook, name: 'Facebook', color: 'hover:bg-blue-600' },
    { icon: Twitter, name: 'Twitter', color: 'hover:bg-sky-500' },
    { icon: Instagram, name: 'Instagram', color: 'hover:bg-pink-600' },
    { icon: Linkedin, name: 'LinkedIn', color: 'hover:bg-blue-700' },
  ];

  return (
    <footer className="bg-primary text-white pt-16 pb-8">
      {/* Pre-footer CTA */}
      <ScrollReveal className="max-w-6xl mx-auto px-4 text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-heading font-bold mb-6">{t.footer.readyTitle}</h2>
        <p className="text-green-50 mb-10 text-lg md:text-xl max-w-2xl mx-auto opacity-80">
          {t.footer.readyDesc}
        </p>
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
          <button 
            onClick={handleConsultationClick}
            className="bg-white text-primary hover:bg-accent hover:text-white font-black py-5 px-10 rounded-2xl shadow-2xl transition-all transform hover:scale-110 active:scale-95 text-lg"
          >
            {t.footer.cta}
          </button>
        </div>
      </ScrollReveal>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-white/20 pt-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 mb-16">
           {/* Brand Info */}
           <ScrollReveal animation="slide-left">
             <div>
                <div className="flex items-center gap-2 mb-6">
                   <span className="text-3xl font-black text-white tracking-tighter">PT. ATS</span>
                </div>
                <p className="text-green-50 text-base leading-relaxed mb-8 opacity-80">
                   {t.footer.brandDesc}
                </p>
                <div className="flex gap-4">
                  {socialLinks.map((social) => (
                    <a 
                      key={social.name} 
                      href="#" 
                      onClick={(e) => e.preventDefault()}
                      className={`w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center transition-all duration-300 hover:scale-125 ${social.color} hover:shadow-xl group`}
                      aria-label={social.name}
                    >
                      <social.icon className="w-5 h-5 text-white group-hover:rotate-6 transition-transform" />
                    </a>
                  ))}
                </div>
             </div>
           </ScrollReveal>

           {/* Contact Info */}
           <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-12">
              <ScrollReveal animation="fade-in" delay={100}>
                <div>
                   <h4 className="font-black text-xl mb-6 text-accent uppercase tracking-widest">{t.footer.addressTitle}</h4>
                   <div className="flex items-start gap-4 text-green-50 text-base">
                      <MapPin className="w-6 h-6 shrink-0 mt-1 text-accent" />
                      <p className="opacity-90 leading-relaxed">
                         Ruko Golden Madrid 2, Unit A3<br/>
                         Lt. 1, Jl. Letnan Sutopo,<br/>
                         Rawa Mekarjaya, Serpong,<br/>
                         Tangerang Selatan, Banten 15310
                      </p>
                   </div>
                </div>
              </ScrollReveal>

              <ScrollReveal animation="fade-in" delay={200}>
                <div>
                   <h4 className="font-black text-xl mb-6 text-accent uppercase tracking-widest">{t.footer.contactTitle}</h4>
                   <ul className="space-y-4 text-green-50 text-base">
                      <li className="flex items-center gap-4 group cursor-pointer">
                         <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center group-hover:bg-secondary transition-colors">
                           <Phone className="w-4 h-4 text-white" />
                         </div>
                         <span className="opacity-90 group-hover:text-white transition-colors">+62-812-5222-0892</span>
                      </li>
                      <li className="flex items-center gap-4 group cursor-pointer">
                         <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center group-hover:bg-red-500 transition-colors">
                           <Mail className="w-4 h-4 text-white" />
                         </div>
                         <span className="opacity-90 group-hover:text-white transition-colors">agrilinksolusi@gmail.com</span>
                      </li>
                      <li className="flex items-center gap-4 group cursor-pointer">
                         <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center group-hover:bg-green-500 transition-colors">
                           <MessageCircle className="w-4 h-4 text-white" />
                         </div>
                         <span className="opacity-90 group-hover:text-white transition-colors">WhatsApp Available 24/7</span>
                      </li>
                   </ul>
                </div>
              </ScrollReveal>
           </div>
        </div>

        <div className="border-t border-white/10 pt-10 flex flex-col md:flex-row justify-between items-center text-sm text-green-100/60 font-medium">
           <p>© {new Date().getFullYear()} PT. ATS. {t.footer.rights}</p>
           <div className="flex space-x-8 mt-6 md:mt-0">
              <a href="#" onClick={(e) => handlePlaceholderLink(e, 'Privacy Policy')} className="hover:text-white transition-colors hover:underline">Privacy Policy</a>
              <a href="#" onClick={(e) => handlePlaceholderLink(e, 'Terms of Service')} className="hover:text-white transition-colors hover:underline">Terms of Service</a>
           </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;