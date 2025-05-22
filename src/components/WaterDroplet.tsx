import React, { useEffect, useRef, useState } from 'react';

interface WaterDropletProps {
  currentSection: string;
  previousSection: string;
}

const WaterDroplet: React.FC<WaterDropletProps> = ({ currentSection, previousSection }) => {
  const dropletRef = useRef<HTMLDivElement>(null);
  const [animationDirection, setAnimationDirection] = useState<'left' | 'right' | null>(null);
  
  useEffect(() => {
    if (!previousSection || previousSection === currentSection) return;
    
    // Determine animation direction based on section change
    // This is a simple implementation that alternates direction
    // You could implement more specific logic based on section order if needed
    const direction = Math.random() > 0.5 ? 'left' : 'right';
    setAnimationDirection(direction);
    
    // Reset animation after it completes
    const timer = setTimeout(() => {
      setAnimationDirection(null);
    }, 1000); // match this with the CSS animation duration
    
    return () => clearTimeout(timer);
  }, [currentSection, previousSection]);
  
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      <div 
        ref={dropletRef}
        className={`absolute w-[300px] h-[300px] rounded-full 
                    left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
                    ${animationDirection === 'left' ? 'animate-slide-left' : ''}
                    ${animationDirection === 'right' ? 'animate-slide-right' : ''}`}
        style={{
          background: 'radial-gradient(circle at center, rgba(168, 85, 247, 0.8) 0%, rgba(126, 34, 206, 0.4) 70%, transparent 100%)',
          filter: 'blur(30px)',
          boxShadow: '0 0 60px rgba(168, 85, 247, 0.6)',
          transition: 'all 0.3s ease-out'
        }}
      />
    </div>
  );
};

export default WaterDroplet;
