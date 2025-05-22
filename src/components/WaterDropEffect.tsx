import React, { useEffect, useRef } from 'react';

const WaterDropEffect: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas dimensions
    const setCanvasDimensions = () => {
      const containerWidth = canvas.parentElement?.clientWidth || 400;
      const containerHeight = canvas.parentElement?.clientHeight || 500;
      canvas.width = containerWidth;
      canvas.height = containerHeight;
    };
    
    setCanvasDimensions();
    window.addEventListener('resize', setCanvasDimensions);
    
    // Helper function to get random value within a range
    const randomBetween = (min: number, max: number) => {
      return Math.random() * (max - min) + min;
    };
    
    // Helper function to generate random droplet properties
    const createRandomDroplet = () => ({
      x: canvas.width * randomBetween(0.1, 0.9), // Random horizontal position
      y: -randomBetween(30, 200), // Even greater variation in starting height
      radius: randomBetween(20, 35), // Slightly smaller for faster appearance
      speed: randomBetween(7.0, 9.0), // Extremely fast speed
      active: true
    });
    
    // Water droplet properties - using an array for multiple droplets
    const droplets = [
      createRandomDroplet(),
      createRandomDroplet(),
      createRandomDroplet()
    ];
    
    // Make sure they don't overlap too much initially
    // Left droplet
    droplets[0].x = canvas.width * randomBetween(0.1, 0.3);
    // Center droplet
    droplets[1].x = canvas.width * randomBetween(0.4, 0.6);
    // Right droplet
    droplets[2].x = canvas.width * randomBetween(0.7, 0.9);
    
    // Ripple properties
    const ripples: {x: number, y: number, radius: number, opacity: number, width: number}[] = [];
    
    // Pool properties
    const poolHeight = canvas.height * 0.4;
    const poolY = canvas.height - poolHeight;
    
    // Animation variables
    let animationId: number;
    let timeSinceReset = 0;
    
    // Draw water pool
    const drawPool = () => {
      const gradient = ctx.createLinearGradient(0, poolY, 0, canvas.height);
      gradient.addColorStop(0, 'rgba(126, 34, 206, 0.7)');
      gradient.addColorStop(1, 'rgba(168, 85, 247, 0.4)');
      
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.moveTo(0, poolY);
      
      // Create wave effect
      const amplitude = 5;
      const frequency = 0.05;
      const time = Date.now() * 0.001;
      
      for (let x = 0; x <= canvas.width; x += 5) {
        const y = poolY + Math.sin(x * frequency + time) * amplitude;
        ctx.lineTo(x, y);
      }
      
      ctx.lineTo(canvas.width, canvas.height);
      ctx.lineTo(0, canvas.height);
      ctx.closePath();
      ctx.fill();
    };
    
    // Draw water droplets
    const drawDroplets = () => {
      droplets.forEach(droplet => {
        if (!droplet.active) return;
        
        const gradient = ctx.createRadialGradient(
          droplet.x, droplet.y, 0,
          droplet.x, droplet.y, droplet.radius
        );
        gradient.addColorStop(0, 'rgba(168, 85, 247, 0.9)');
        gradient.addColorStop(0.7, 'rgba(126, 34, 206, 0.8)');
        gradient.addColorStop(1, 'rgba(126, 34, 206, 0.6)');
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(droplet.x, droplet.y, droplet.radius, 0, Math.PI * 2);
        ctx.fill();
        
        // Add highlight
        ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
        ctx.beginPath();
        ctx.arc(droplet.x - droplet.radius * 0.3, droplet.y - droplet.radius * 0.3, droplet.radius * 0.3, 0, Math.PI * 2);
        ctx.fill();
      });
    };
    
    // Draw ripples
    const drawRipples = () => {
      ripples.forEach((ripple, index) => {
        ctx.strokeStyle = `rgba(168, 85, 247, ${ripple.opacity})`;
        ctx.lineWidth = ripple.width;
        ctx.beginPath();
        ctx.arc(ripple.x, ripple.y, ripple.radius, 0, Math.PI * 2);
        ctx.stroke();
        
        // Update ripple
        ripple.radius += 1.5;
        ripple.opacity -= 0.02;
        ripple.width *= 0.98;
        
        // Remove faded ripples
        if (ripple.opacity <= 0) {
          ripples.splice(index, 1);
        }
      });
    };
    
    // Update droplet positions
    const updateDroplets = () => {
      // Check if all droplets are inactive
      const allInactive = droplets.every(d => !d.active);
      
      if (allInactive) {
        timeSinceReset += 1;
        if (timeSinceReset > 5) { // Extremely short reset time for many more drops
          console.log('Resetting all droplets'); // Debug log
          // Reset all droplets after delay - ALL AT ONCE
          for (let i = 0; i < droplets.length; i++) {
            droplets[i].active = true; // Set all to active first
          }
          
          // Reset all droplets with random properties
          for (let i = 0; i < droplets.length; i++) {
            droplets[i].radius = randomBetween(20, 35); // Smaller size for faster appearance
            droplets[i].y = -randomBetween(30, 200); // Even greater variation in starting height
            droplets[i].speed = randomBetween(7.0, 9.0); // Extremely fast speed
          }
          
          // Make sure they don't overlap too much horizontally
          // Left area droplet
          droplets[0].x = canvas.width * randomBetween(0.1, 0.3);
          // Center area droplet
          droplets[1].x = canvas.width * randomBetween(0.4, 0.6);
          // Right area droplet
          droplets[2].x = canvas.width * randomBetween(0.7, 0.9);
          
          timeSinceReset = 0;
        }
        return;
      }
      
      // Update each droplet
      droplets.forEach(droplet => {
        if (!droplet.active) return;
        
        // Move droplet down with extreme acceleration
        droplet.y += droplet.speed;
        droplet.speed += 0.6; // Extreme acceleration
        
        // Check if droplet hit the water
        if (droplet.y >= poolY) {
          // Create ripple effect
          ripples.push({
            x: droplet.x,
            y: poolY,
            radius: 15, // Larger initial ripple
            opacity: 0.8,
            width: 5
          });
          
          // Create more and larger splash ripples
          for (let i = 0; i < 3; i++) {
            ripples.push({
              x: droplet.x + (Math.random() * 50 - 25),
              y: poolY,
              radius: 5 + Math.random() * 10,
              opacity: 0.6 + Math.random() * 0.3,
              width: 2 + Math.random() * 2
            });
          }
          
          // Hide droplet
          droplet.active = false;
        }
      });
    };
    
    // Make sure all droplets are initialized properly and visible
    const initializeDroplets = () => {
      // Force all droplets to be active and visible from the start
      droplets[0].x = canvas.width * 0.15; // Far left
      droplets[0].y = -50;
      droplets[0].radius = 40;
      droplets[0].speed = 3.0; // Much faster speed
      droplets[0].active = true;
      
      droplets[1].x = canvas.width * 0.5; // Center
      droplets[1].y = -50;
      droplets[1].radius = 40;
      droplets[1].speed = 3.0; // Much faster speed
      droplets[1].active = true;
      
      droplets[2].x = canvas.width * 0.85; // Far right
      droplets[2].y = -50;
      droplets[2].radius = 40;
      droplets[2].speed = 3.0; // Much faster speed
      droplets[2].active = true;
    };
    
    // Call initialization immediately
    initializeDroplets();
    
    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      drawPool();
      drawRipples();
      drawDroplets();
      updateDroplets();
      
      animationId = requestAnimationFrame(animate);
    };
    
    animate();
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', setCanvasDimensions);
      cancelAnimationFrame(animationId);
    };
  }, []);
  
  return (
    <div className="relative w-full h-full">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
      />
    </div>
  );
};

export default WaterDropEffect;
