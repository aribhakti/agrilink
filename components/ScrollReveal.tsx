import React, { useEffect, useRef, useState } from 'react';

interface ScrollRevealProps {
  children: React.ReactNode;
  animation?: 'fade-up' | 'fade-in' | 'scale-in' | 'slide-left' | 'slide-right';
  delay?: number;
  className?: string;
}

const ScrollReveal: React.FC<ScrollRevealProps> = ({ 
  children, 
  animation = 'fade-up', 
  delay = 0,
  className = "" 
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    const currentRef = domRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  const getAnimationStyles = () => {
    const base = "transition-all duration-1000 ease-out";
    const delayStyle = { transitionDelay: `${delay}ms` };
    
    let effect = "";
    switch (animation) {
      case 'fade-up':
        effect = isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10";
        break;
      case 'fade-in':
        effect = isVisible ? "opacity-100" : "opacity-0";
        break;
      case 'scale-in':
        effect = isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95";
        break;
      case 'slide-left':
        effect = isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10";
        break;
      case 'slide-right':
        effect = isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10";
        break;
      default:
        effect = isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10";
    }

    return { className: `${base} ${effect} ${className}`, style: delayStyle };
  };

  const { className: finalClassName, style } = getAnimationStyles();

  return (
    <div ref={domRef} className={finalClassName} style={style}>
      {children}
    </div>
  );
};

export default ScrollReveal;