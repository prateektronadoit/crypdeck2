import React, { useEffect, useRef } from 'react';

const AnimatedBackground: React.FC = () => {
  const sphereRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleScroll = () => {
      if (sphereRef.current) {
        const scrolled = window.scrollY;
        const windowWidth = window.innerWidth;
        
        // Calculate horizontal position based on scroll
        const xPos = windowWidth - (scrolled % (windowWidth * 2));
        
        sphereRef.current.style.transform = `translateX(${xPos}px)`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      <div 
        ref={sphereRef}
        className="absolute w-[600px] h-[600px] rounded-full"
        style={{
          background: 'radial-gradient(circle at center, rgba(168, 85, 247, 0.4) 0%, rgba(126, 34, 206, 0.2) 50%, transparent 100%)',
          filter: 'blur(80px)',
          top: '50%',
          transform: 'translateY(-50%)',
          transition: 'transform 0.5s ease-out'
        }}
      />
      <div className="absolute inset-0 bg-black opacity-95" />
    </div>
  );
};

export default AnimatedBackground;
