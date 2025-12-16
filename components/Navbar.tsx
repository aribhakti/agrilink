import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, Globe } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [imgError, setImgError] = useState(false);
  const { language, setLanguage, t } = useLanguage();
  const location = useLocation();

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleDropdownEnter = (label: string) => setActiveDropdown(label);
  const handleDropdownLeave = () => setActiveDropdown(null);

  // Dynamic Nav Items based on Translation
  const navItems = [
    { label: t.nav.home, path: '/' },
    { label: t.nav.about, path: '/about' },
    { 
      label: t.nav.services, 
      path: '/services',
      subItems: [
        { label: t.nav.fertilizer, path: '/services/fertilizer' },
        { label: t.nav.pesticide, path: '/services/pesticide' },
        { label: t.nav.ip, path: '/services/ip' },
      ]
    },
    { label: t.nav.clients, path: '/clients' },
    { label: t.nav.news, path: '/news' },
    { label: t.nav.status, path: '/status' },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm shadow-md border-b border-slate-100 font-heading transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 md:h-24">
          <div className="flex items-center">
            <NavLink to="/" className="flex-shrink-0 flex items-center gap-3 group">
              {/* Logo Logic: Try to load /logo.png, fallback to SVG if missing */}
              {!imgError ? (
                <img 
                  src="/logo.png" 
                  alt="PT. ATS - Agrilink Teknologi Solusi" 
                  className="h-12 md:h-20 w-auto object-contain py-1 transition-transform duration-300 group-hover:scale-105"
                  width="80"
                  height="80"
                  onError={() => setImgError(true)}
                />
              ) : (
                /* Fallback SVG if logo.png is missing */
                <div className="flex items-center gap-2 md:gap-3">
                    <div className="w-10 h-10 md:w-12 md:h-12 relative flex items-center justify-center transition-transform duration-300 group-hover:rotate-6">
                      <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-sm">
                          {/* Top Left Leaf - Light Green */}
                          <path d="M50 50 C50 25 25 25 25 50 C25 75 50 75 50 50 Z" fill="#c0ca33" transform="translate(-10, -10)" opacity="0.9" />
                          {/* Top Right Leaf - Blue */}
                          <path d="M50 50 C75 50 75 25 50 25 C25 25 25 50 50 50 Z" fill="#0288d1" transform="translate(10, -10)" />
                          {/* Bottom Left Leaf - Primary Green */}
                          <path d="M50 50 C25 50 25 75 50 75 C75 75 75 50 50 50 Z" fill="#15803d" transform="translate(-10, 10)" />
                          {/* Bottom Right Leaf - Primary Green Outline/Fill */}
                          <path d="M50 50 C50 75 75 75 75 50 C75 25 50 25 50 50 Z" fill="#166534" transform="translate(10, 10)" opacity="0.8"/>
                      </svg>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xl md:text-2xl font-extrabold text-primary leading-none tracking-tight">PT. ATS</span>
                      <span className="text-[10px] md:text-xs font-semibold text-secondary tracking-widest uppercase hidden sm:block">Agrilink Teknologi Solusi</span>
                    </div>
                </div>
              )}
            </NavLink>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex md:items-center md:space-x-4 lg:space-x-8">
            {navItems.map((item) => (
              <div 
                key={item.label} 
                className="relative group h-full flex items-center"
                onMouseEnter={() => item.subItems && handleDropdownEnter(item.label)}
                onMouseLeave={handleDropdownLeave}
              >
                {item.subItems ? (
                  <button className={`flex items-center text-sm font-semibold transition-colors duration-200 ${
                    location.pathname.startsWith(item.path) ? 'text-primary' : 'text-slate-600 hover:text-primary'
                  }`}>
                    {item.label}
                    <ChevronDown className={`ml-1 w-4 h-4 transition-transform duration-300 ${activeDropdown === item.label ? 'rotate-180' : ''}`} />
                  </button>
                ) : (
                  <NavLink
                    to={item.path}
                    className={({ isActive }) =>
                      `relative text-sm font-semibold transition-colors duration-200 py-2 ${
                        isActive ? 'text-primary' : 'text-slate-600 hover:text-primary'
                      } after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-primary after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left ${isActive ? 'after:scale-x-100 after:origin-bottom-left' : ''}`
                    }
                  >
                    {item.label}
                  </NavLink>
                )}

                {/* Dropdown */}
                {item.subItems && activeDropdown === item.label && (
                  <div className="absolute top-full left-0 w-64 bg-white shadow-xl rounded-b-xl border-x border-b border-slate-100 py-2 animate-fadeIn z-50 overflow-hidden">
                    {item.subItems.map((subItem) => (
                      <NavLink
                        key={subItem.path}
                        to={subItem.path}
                        className="block px-4 py-3 text-sm text-slate-700 hover:bg-slate-50 hover:text-primary hover:pl-6 transition-all duration-300 font-medium border-l-4 border-transparent hover:border-primary"
                      >
                        {subItem.label}
                      </NavLink>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {/* Language Switcher */}
            <div className="flex items-center space-x-2 border-l pl-4 border-slate-200">
               <Globe className="w-4 h-4 text-slate-400" />
               <button 
                onClick={() => setLanguage('ID')}
                className={`text-xs font-bold transition-all ${language === 'ID' ? 'text-primary scale-110' : 'text-slate-400 hover:text-slate-600'}`}
               >
                ID
               </button>
               <span className="text-slate-300">|</span>
               <button 
                onClick={() => setLanguage('EN')}
                className={`text-xs font-bold transition-all ${language === 'EN' ? 'text-primary scale-110' : 'text-slate-400 hover:text-slate-600'}`}
               >
                EN
               </button>
            </div>

            {/* CTA Button */}
            <NavLink to="/status" className="bg-secondary text-white px-5 py-2 rounded-full text-sm font-bold shadow-lg shadow-secondary/30 hover:shadow-secondary/50 transition-all active:scale-95 hover:-translate-y-0.5 whitespace-nowrap">
              {t.nav.status}
            </NavLink>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-slate-600 hover:text-primary focus:outline-none transition-transform active:scale-90"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-slate-100 absolute w-full shadow-xl animate-fadeIn origin-top">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 max-h-[80vh] overflow-y-auto">
            {navItems.map((item) => (
              <div key={item.label}>
                 {item.subItems ? (
                    <div className="space-y-1">
                      <div className="px-3 py-2 text-base font-bold text-slate-900 border-b border-slate-50">{item.label}</div>
                      {item.subItems.map(sub => (
                         <NavLink
                            key={sub.path}
                            to={sub.path}
                            onClick={() => setIsOpen(false)}
                            className="block pl-6 pr-3 py-3 text-sm font-medium text-slate-600 hover:text-primary hover:bg-green-50 rounded-md transition-colors active:bg-green-100"
                         >
                           {sub.label}
                         </NavLink>
                      ))}
                    </div>
                 ) : (
                    <NavLink
                      to={item.path}
                      onClick={() => setIsOpen(false)}
                      className={({ isActive }) =>
                        `block px-3 py-3 rounded-md text-base font-medium transition-all active:scale-[0.98] ${
                          isActive
                            ? 'text-primary bg-green-50'
                            : 'text-slate-700 hover:text-primary hover:bg-slate-50'
                        }`
                      }
                    >
                      {item.label}
                    </NavLink>
                 )}
              </div>
            ))}
             <div className="flex justify-center py-4 space-x-4 border-t border-slate-100 mt-2 bg-slate-50">
                <button onClick={() => setLanguage('ID')} className={`font-bold py-2 px-4 rounded transition-all active:scale-95 ${language === 'ID' ? 'bg-white shadow text-primary' : 'text-slate-400'}`}>INDONESIA</button>
                <button onClick={() => setLanguage('EN')} className={`font-bold py-2 px-4 rounded transition-all active:scale-95 ${language === 'EN' ? 'bg-white shadow text-primary' : 'text-slate-400'}`}>ENGLISH</button>
             </div>
             <div className="p-4">
                <NavLink
                    to="/status"
                    onClick={() => setIsOpen(false)}
                    className="block w-full text-center px-4 py-3 rounded-lg text-base font-bold bg-secondary text-white shadow-lg active:scale-95 transition-transform"
                >
                    {t.nav.status}
                </NavLink>
             </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;