import React, { useEffect, useState, useMemo, useRef } from 'react';

const Hero: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  
  // Words for the animated text display - using useMemo to avoid dependency issue
  const words = useMemo(() => ['Blockchain', 'Tokenization', 'Investment', 'Future'], []);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [text, setText] = useState('');
  const [delta, setDelta] = useState(200);

  useEffect(() => {
    setIsVisible(true);
    
    // Typing effect
    const type = () => {
      const currentWord = words[currentWordIndex];
      const shouldDelete = isDeleting;
      
      setText(currentWord.substring(0, shouldDelete ? currentCharIndex - 1 : currentCharIndex + 1));
      
      if (shouldDelete) {
        setCurrentCharIndex(prev => prev - 1);
      } else {
        setCurrentCharIndex(prev => prev + 1);
      }
      
      // Set typing speed
      if (!shouldDelete && currentCharIndex === currentWord.length) {
        // Pause at the end of the word
        setDelta(1500);
        setIsDeleting(true);
      } else if (shouldDelete && currentCharIndex === 0) {
        setIsDeleting(false);
        setCurrentWordIndex((currentWordIndex + 1) % words.length);
        setDelta(500); // Pause before typing next word
      } else {
        setDelta(shouldDelete ? 80 : 120); // Delete faster than type
      }
    };
    
    const ticker = setTimeout(type, delta);
    return () => clearTimeout(ticker);
  }, [currentCharIndex, currentWordIndex, delta, isDeleting, text, words]);

  // Video background with glow effect specifically for hero section
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    // Star effect animation
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas size to match container
    const updateCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    updateCanvasSize();
    window.addEventListener('resize', updateCanvasSize);
    
    // Star properties
    const stars: {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      opacity: number;
    }[] = [];
    
    // Create stars
    const createStars = () => {
      const centerX = canvas.width / 2;
      const centerY = canvas.height * 0.6; // Position center near buttons
      
      for (let i = 0; i < 100; i++) {
        // Start stars from different positions around the screen edges
        let x, y;
        
        // Start at edges and move inward
        const side = Math.floor(Math.random() * 4);
        if (side === 0) { // top
          x = Math.random() * canvas.width;
          y = 0;
        } else if (side === 1) { // right
          x = canvas.width;
          y = Math.random() * canvas.height;
        } else if (side === 2) { // bottom
          x = Math.random() * canvas.width;
          y = canvas.height;
        } else { // left
          x = 0;
          y = Math.random() * canvas.height;
        }
        
        // Calculate angle toward center
        const angle = Math.atan2(centerY - y, centerX - x);
        const speed = 0.3 + Math.random() * 0.8;
        
        stars.push({
          x,
          y,
          size: 1 + Math.random() * 2.5, // Larger stars
          speedX: Math.cos(angle) * speed,
          speedY: Math.sin(angle) * speed,
          opacity: 0.3 + Math.random() * 0.7 // Brighter stars
        });
      }
    };
    
    createStars();
    
    // Animate stars
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const centerX = canvas.width / 2;
      const centerY = canvas.height * 0.6; // Position center near buttons
      
      // Draw and update stars
      stars.forEach((star) => {
        // Update position
        star.x += star.speedX;
        star.y += star.speedY;
        
        // If star reaches center area, reset it
        const distanceToCenter = Math.sqrt(
          Math.pow(star.x - centerX, 2) + Math.pow(star.y - centerY, 2)
        );
        
        if (distanceToCenter < 20) {
          // Reset star to edge
          const side = Math.floor(Math.random() * 4);
          if (side === 0) { // top
            star.x = Math.random() * canvas.width;
            star.y = 0;
          } else if (side === 1) { // right
            star.x = canvas.width;
            star.y = Math.random() * canvas.height;
          } else if (side === 2) { // bottom
            star.x = Math.random() * canvas.width;
            star.y = canvas.height;
          } else { // left
            star.x = 0;
            star.y = Math.random() * canvas.height;
          }
          
          // Recalculate angle
          const angle = Math.atan2(centerY - star.y, centerX - star.x);
          const speed = 0.3 + Math.random() * 0.8;
          star.speedX = Math.cos(angle) * speed;
          star.speedY = Math.sin(angle) * speed;
        }
        
        // Draw star
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
        ctx.fill();
        
        // Draw enhanced trail
        ctx.beginPath();
        ctx.moveTo(star.x, star.y);
        ctx.lineTo(star.x - star.speedX * 6, star.y - star.speedY * 6); // Longer trail
        const gradient = ctx.createLinearGradient(
          star.x, star.y, 
          star.x - star.speedX * 6, star.y - star.speedY * 6
        );
        gradient.addColorStop(0, `rgba(255, 255, 255, ${star.opacity})`);
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
        ctx.strokeStyle = gradient;
        ctx.lineWidth = star.size / 1.5; // Slightly thicker
        ctx.stroke();
      });
      
      requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      window.removeEventListener('resize', updateCanvasSize);
    };
  }, []);

  return (
    <div className="pt-32 px-4 sm:px-6 lg:px-8 bg-transparent min-h-[100vh] flex flex-col items-center justify-start relative overflow-hidden">
      {/* Video background specific to hero section */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Video element - positioned lower with clip-path to show more from the middle-bottom part */}
        <div className="absolute inset-0 overflow-hidden" style={{ clipPath: 'polygon(0% 30%, 100% 30%, 100% 100%, 0% 100%)' }}>
          <video
            ref={videoRef}
            className="absolute w-full h-full object-cover opacity-90"
            style={{ objectPosition: 'center 40%' }}
            autoPlay
            loop
            muted
            playsInline
          >
            <source src="/q-c3d7becf.webm" type="video/webm" />
          </video>
        </div>
        
        {/* Dark overlay with gradient to make content readable - only partial coverage */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0c0a1f] via-[#0c0a1f]/80 to-transparent" />
        
        {/* Purple glow effect overlay - positioned more prominently */}
        <div className="absolute left-1/2 transform -translate-x-1/2" style={{ top: '55%' }}>
          <div className="w-[700px] h-[500px] rounded-full bg-[#5D3FD3] blur-[80px] opacity-70" />
        </div>
        
        {/* Stars canvas - moved to top of stack for better visibility */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 z-20"
        />
      </div>
      
      <div className="max-w-7xl mx-auto relative z-10 w-full">
        <div className="flex flex-col items-center justify-center text-center">
          <div 
            className="transform transition-all duration-1000 ease-out"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
              transitionDelay: '300ms'
            }}
          >
            <div className="mb-2 py-2 px-5 rounded-full bg-white/10 backdrop-blur-sm inline-block">
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="white" strokeWidth="1.5" />
                  <path d="M12 8V16" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
                  <path d="M8 12H16" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
                <span className="text-white/80 text-sm font-medium">Revolutionary Blockchain Technology</span>
              </div>
            </div>
          </div>
          
          <div 
            className="transform transition-all duration-1000 ease-out max-w-4xl"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
              transitionDelay: '300ms'
            }}
          >
            <h1 className="text-6xl sm:text-7xl font-bold mb-6 leading-tight">
              <span className="text-white">Accelerating the </span>
              <span className="text-white inline-block">{text}</span>
              <span className="text-white animate-pulse">|</span>
            </h1>
          </div>
          
          <div 
            className="transform transition-all duration-1000 ease-out"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
              transitionDelay: '600ms'
            }}
          >
            <h2 className="text-lg sm:text-xl font-normal text-white/80 mb-4">
              The Next Generation Blockchain Solution
            </h2>
            <p className="text-base text-white/70 max-w-2xl mx-auto mb-10">
              Empowering the future through blockchain innovation and strategic investments. Pushing the boundaries of blockchain technology to unlock a brand new design space.
            </p>
          </div>
          
          <div 
            className="flex flex-wrap justify-center gap-6 transform transition-all duration-1000 ease-out"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
              transitionDelay: '900ms'
            }}
          >
            <a 
              href="#products" 
              className="bg-white text-[#0c0a1f] px-6 py-3 rounded-md hover:bg-gray-100 text-sm font-medium transition-all"
            >
              Explore Products
            </a>
            <a 
              href="#about" 
              className="bg-white/10 backdrop-blur-sm text-white/90 px-6 py-3 rounded-md hover:bg-white/15 text-sm font-medium transition-all"
            >
              About Us
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
