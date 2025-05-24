import React, { useEffect, useRef } from 'react';

const BackgroundEffect: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas dimensions
    const setCanvasDimensions = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.scale(dpr, dpr);
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
    };

    // Create gradient shapes
    const createGradientShapes = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Create background gradient
      const bgGradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      bgGradient.addColorStop(0, '#0f0926');
      bgGradient.addColorStop(1, '#1c0e40');
      ctx.fillStyle = bgGradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw gradient blobs
      drawGradientBlob(
        canvas.width * 0.2,
        canvas.height * 0.3,
        canvas.width * 0.4,
        'rgba(149, 76, 233, 0.2)'
      );
      
      drawGradientBlob(
        canvas.width * 0.7,
        canvas.height * 0.6,
        canvas.width * 0.35,
        'rgba(94, 53, 177, 0.2)'
      );
      
      drawGradientBlob(
        canvas.width * 0.5,
        canvas.height * 0.8,
        canvas.width * 0.45,
        'rgba(72, 41, 178, 0.15)'
      );

      // Add subtle dots/stars
      drawStars();
    };

    // Draw a gradient blob
    const drawGradientBlob = (
      x: number,
      y: number, 
      radius: number, 
      color: string
    ) => {
      const gradient = ctx.createRadialGradient(
        x, y, 0,
        x, y, radius
      );
      
      gradient.addColorStop(0, color);
      gradient.addColorStop(1, 'rgba(76, 29, 149, 0)');
      
      ctx.beginPath();
      ctx.fillStyle = gradient;
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fill();
    };

    // Draw subtle stars/dots
    const drawStars = () => {
      const starCount = 100;
      
      for (let i = 0; i < starCount; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const size = Math.random() * 1.5;
        const opacity = Math.random() * 0.5;
        
        ctx.beginPath();
        ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    // Initial setup
    setCanvasDimensions();
    createGradientShapes();

    // Handle window resize
    const handleResize = () => {
      setCanvasDimensions();
      createGradientShapes();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full -z-10"
    />
  );
};

export default BackgroundEffect;
