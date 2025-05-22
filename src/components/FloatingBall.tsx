import React, { useEffect, useRef, useState } from 'react';

interface FloatingBallProps {
  observeElementIds: string[];
}

const FloatingBall: React.FC<FloatingBallProps> = ({ observeElementIds }) => {
  const ballRef = useRef<HTMLDivElement>(null);
  const [currentSection, setCurrentSection] = useState<string | null>(null);
  const [ballPosition, setBallPosition] = useState({ x: 50, y: 100 });
  const [scrollY, setScrollY] = useState(0);
  
  // Track scroll position
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.6, // Element is considered visible when 60% of it is in viewport
    };

    // Create observer for each section
    const observers: IntersectionObserver[] = [];
    
    // Handler for when a section becomes visible
    const handleIntersection = (entries: IntersectionObserverEntry[], sectionId: string) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setCurrentSection(sectionId);
        }
      });
    };

    // Set up observers for each section
    observeElementIds.forEach(id => {
      const element = document.getElementById(id);
      if (element) {
        const observer = new IntersectionObserver(
          entries => handleIntersection(entries, id),
          observerOptions
        );
        observer.observe(element);
        observers.push(observer);
      }
    });

    // Clean up observers
    return () => {
      observers.forEach(observer => observer.disconnect());
    };
  }, [observeElementIds]);

  // Animation effect to move the ball based on current section
  useEffect(() => {
    if (!currentSection || !ballRef.current) return;

    let targetX = 50; // Default center position
    let targetY = 100;

    // Define positions based on current section
    switch (currentSection) {
      case 'hero':
        targetX = 20;
        targetY = 150;
        break;
      case 'products':
        targetX = 75;
        targetY = 200;
        break;
      case 'ecosystem':
        targetX = 50; // Centered in orbit display
        targetY = 250;
        break;
      case 'about':
        targetX = 30;
        targetY = 300;
        break;
      default:
        targetX = 50;
        targetY = 100;
    }

    // Animate the ball to the new position
    const animateBall = () => {
      setBallPosition(prev => {
        const newX = prev.x + (targetX - prev.x) * 0.05;
        const newY = prev.y + (targetY - prev.y) * 0.05;
        
        // Continue animation until close enough to target
        if (Math.abs(newX - targetX) > 0.5 || Math.abs(newY - targetY) > 0.5) {
          requestAnimationFrame(animateBall);
        }
        
        return { x: newX, y: newY };
      });
    };

    requestAnimationFrame(animateBall);
  }, [currentSection]);

  // Don't render the floating ball if in hero section or not scrolled enough to reach products
  if (currentSection === 'hero' || scrollY < 300) {
    return null;
  }

  return (
    <div 
      ref={ballRef}
      className="fixed w-40 h-40 rounded-full bg-gradient-to-br from-purple-600 to-indigo-700 shadow-lg shadow-purple-500/50 z-0 transition-all duration-1000 ease-out"
      style={{ 
        left: `calc(${ballPosition.x}% - 80px)`, 
        top: `${ballPosition.y}px`,
        filter: 'blur(15px)',
        opacity: 0.8,
        transform: `scale(${currentSection === 'ecosystem' ? 2 : 1.5})` 
      }}
    />
  );
};

export default FloatingBall;
