import React, { useEffect, useRef } from 'react';

const EnhancedWaterEffect: React.FC = () => {
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
    
    // Wave properties - multiple layers of waves
    const waves = [
      { amplitude: 30, frequency: 0.02, speed: 0.01, color: 'rgba(126, 34, 206, 0.12)', y: canvas.height * 0.65 },
      { amplitude: 25, frequency: 0.03, speed: 0.015, color: 'rgba(139, 92, 246, 0.1)', y: canvas.height * 0.7 },
      { amplitude: 20, frequency: 0.02, speed: 0.02, color: 'rgba(168, 85, 247, 0.08)', y: canvas.height * 0.75 },
      { amplitude: 35, frequency: 0.01, speed: 0.005, color: 'rgba(192, 132, 252, 0.07)', y: canvas.height * 0.8 },
      { amplitude: 15, frequency: 0.04, speed: 0.025, color: 'rgba(216, 180, 254, 0.05)', y: canvas.height * 0.85 },
    ];
    
    // Define droplet type
    type Droplet = {
      x: number,
      y: number,
      radius: number,
      speed: number,
      acceleration: number,
      active: boolean,
      startTime: number, // When this droplet should become active
      trail: {x: number, y: number, radius: number, opacity: number}[]
    };
    
    // Create a droplet at a random position
    const createRandomDroplet = (): Droplet => {
      // Generate completely random horizontal position (5-95% of screen width)
      const randomPosition = 0.05 + Math.random() * 0.9;
      
      return {
        x: canvas.width * randomPosition,
        y: -80 - Math.random() * 60, // Slight variation in starting height
        radius: 30 + Math.random() * 30, // Varied sizes from small to large
        speed: 0,
        acceleration: 0.05 + Math.random() * 0.05, // Lower acceleration for slower falling
        active: true, // Active immediately
        startTime: Date.now(),
        trail: []
      };
    };
    
    // Create 3 droplets at random positions
    let droplets: Droplet[] = [
      createRandomDroplet(),
      createRandomDroplet(),
      createRandomDroplet()
    ];
    
    // Ripple properties
    const ripples: {x: number, y: number, radius: number, opacity: number, width: number}[] = [];
    
    // Animation time
    let time = 0;
    
    // No time tracking needed for random drops
    
    // Draw waves
    const drawWaves = () => {
      for (const wave of waves) {
        ctx.beginPath();
        ctx.moveTo(0, wave.y);
        
        for (let x = 0; x < canvas.width; x += 5) {
          const y = wave.y + Math.sin(x * wave.frequency + time * wave.speed) * wave.amplitude;
          ctx.lineTo(x, y);
        }
        
        ctx.lineTo(canvas.width, canvas.height);
        ctx.lineTo(0, canvas.height);
        ctx.closePath();
        
        ctx.fillStyle = wave.color;
        ctx.fill();
      }
    };
    
    // Draw water droplets
    const drawDroplets = () => {
      droplets.forEach(droplet => {
        if (!droplet.active) return;
        
        // Draw trail
        droplet.trail.forEach((t, i) => {
          const gradient = ctx.createRadialGradient(
            t.x, t.y, 0,
            t.x, t.y, t.radius
          );
          gradient.addColorStop(0, `rgba(168, 85, 247, ${t.opacity * 0.7})`);
          gradient.addColorStop(0.7, `rgba(126, 34, 206, ${t.opacity * 0.5})`);
          gradient.addColorStop(1, `rgba(126, 34, 206, 0)`);
          
          ctx.fillStyle = gradient;
          ctx.beginPath();
          ctx.arc(t.x, t.y, t.radius, 0, Math.PI * 2);
          ctx.fill();
          
          // Update trail opacity
          droplet.trail[i].opacity -= 0.03;
          
          // Remove faded trail elements
          if (droplet.trail[i].opacity <= 0) {
            droplet.trail.splice(i, 1);
          }
        });
        
        // Main droplet
        const gradient = ctx.createRadialGradient(
          droplet.x, droplet.y, 0,
          droplet.x, droplet.y, droplet.radius
        );
        gradient.addColorStop(0, 'rgba(192, 132, 252, 0.9)');
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
        ripple.radius += 2;
        ripple.opacity -= 0.015;
        ripple.width *= 0.99;
        
        // Remove faded ripples
        if (ripple.opacity <= 0) {
          ripples.splice(index, 1);
        }
      });
    };
    
    // Add trail behind droplet
    const addTrail = (droplet: Droplet) => {
      if (droplet.active && droplet.speed > 1) {
        droplet.trail.push({
          x: droplet.x + (Math.random() * 10 - 5),
          y: droplet.y + (Math.random() * 10 - 5),
          radius: droplet.radius * (0.4 + Math.random() * 0.2),
          opacity: 0.7
        });
      }
    };
    
    // Update droplets positions
    const updateDroplets = () => {
      
      const waterSurfaceY = waves[0].y - waves[0].amplitude;
      
      // All droplets are active immediately in this version
      
      // Check if all droplets are inactive
      const allFinished = droplets.every(d => !d.active);
      if (allFinished) {
        // Reset all droplets to start falling again at new random positions
        droplets = [
          createRandomDroplet(),
          createRandomDroplet(),
          createRandomDroplet()
        ];
        return;
      }
      
      // Update each active droplet
      droplets.forEach(droplet => {
        if (!droplet.active) return;
        
        // Move droplet down with acceleration
        droplet.speed += droplet.acceleration;
        droplet.y += droplet.speed;
        
        // Add trail behind droplet
        if (Math.random() > 0.5) {
          addTrail(droplet);
        }
        
        // Check if droplet hit the water
        if (droplet.y >= waterSurfaceY) {
          // Create main ripple effect
          ripples.push({
            x: droplet.x,
            y: waterSurfaceY,
            radius: droplet.radius * 0.8,
            opacity: 0.9,
            width: 5
          });
          
          // Create multiple splash ripples
          for (let i = 0; i < 8; i++) {
            ripples.push({
              x: droplet.x + (Math.random() * droplet.radius * 2 - droplet.radius),
              y: waterSurfaceY + (Math.random() * 10 - 5),
              radius: droplet.radius * (0.2 + Math.random() * 0.3),
              opacity: 0.6 + Math.random() * 0.3,
              width: 2 + Math.random() * 2
            });
          }
          
          // Hide droplet
          droplet.active = false;
          
          // Randomly add a new droplet to replace this one
          if (Math.random() > 0.5) { // 50% chance to add a new droplet
            droplets.push(createRandomDroplet());
          }
        }
      });
      
      // Clean up extra droplets if we have more than 5
      if (droplets.length > 5) {
        droplets = droplets.slice(0, 5);
      }
    };
    
    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Update animation time
      time += 0.5;
      
      // Draw scene
      drawWaves();
      drawRipples();
      drawDroplets();
      updateDroplets();
      
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
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0, maxHeight: '100%', width: '100vw', height: '100vh' }}
    />
  );
};

export default EnhancedWaterEffect;
