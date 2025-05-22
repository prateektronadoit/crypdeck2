import React, { useEffect, useRef } from 'react';

const WaveBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas dimensions to match window size
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    
    // Wave properties - adjusted to be higher on the page (in the hero section)
    const heroSectionHeight = window.innerHeight * 0.9; // Approximate height of hero section
    const waves = [
      { amplitude: 25, frequency: 0.02, speed: 0.01, color: 'rgba(126, 34, 206, 0.1)', y: heroSectionHeight * 0.7 },
      { amplitude: 20, frequency: 0.03, speed: 0.015, color: 'rgba(139, 92, 246, 0.08)', y: heroSectionHeight * 0.75 },
      { amplitude: 15, frequency: 0.02, speed: 0.02, color: 'rgba(168, 85, 247, 0.06)', y: heroSectionHeight * 0.8 },
      { amplitude: 30, frequency: 0.01, speed: 0.005, color: 'rgba(192, 132, 252, 0.05)', y: heroSectionHeight * 0.85 },
      { amplitude: 10, frequency: 0.04, speed: 0.025, color: 'rgba(216, 180, 254, 0.04)', y: heroSectionHeight * 0.9 },
    ];
    
    // Animation time
    let time = 0;
    
    // Draw wave
    const drawWave = (wave: typeof waves[0]) => {
      ctx.beginPath();
      ctx.moveTo(0, wave.y);
      
      for (let x = 0; x < canvas.width; x++) {
        const y = wave.y + Math.sin(x * wave.frequency + time * wave.speed) * wave.amplitude;
        ctx.lineTo(x, y);
      }
      
      // Only extend to the end of the hero section, not the full canvas height
      ctx.lineTo(canvas.width, wave.y + wave.amplitude + 50);
      ctx.lineTo(0, wave.y + wave.amplitude + 50);
      ctx.closePath();
      
      ctx.fillStyle = wave.color;
      ctx.fill();
    };
    
    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw waves from back to front
      for (const wave of waves) {
        drawWave(wave);
      }
      
      time += 0.5;
      requestAnimationFrame(animate);
    };
    
    animate();
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 w-full h-full bg-black pointer-events-none"
      style={{ zIndex: -1, clipPath: 'polygon(0 0, 100% 0, 100% 100vh, 0 100vh)' }} // Clip to hero height
    />
  );
};

export default WaveBackground;
