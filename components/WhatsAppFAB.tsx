import React from 'react';
import { MessageCircle } from 'lucide-react';

const WhatsAppFAB: React.FC = () => {
  const handleClick = () => {
    // Number: +62-812-5222-0892 -> 6281252220892
    window.open('https://wa.me/6281252220892', '_blank');
  };

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-2xl hover:bg-[#20b858] transition-all duration-300 flex items-center gap-2 group hover:pr-6 animate-pulse-slow hover:animate-none transform hover:-translate-y-1 active:scale-95 ring-4 ring-transparent hover:ring-[#25D366]/30"
      aria-label="Chat with Expert"
    >
      <MessageCircle className="w-6 h-6" />
      <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 ease-in-out whitespace-nowrap font-bold text-sm">
        Chat with Expert
      </span>
    </button>
  );
};

export default WhatsAppFAB;