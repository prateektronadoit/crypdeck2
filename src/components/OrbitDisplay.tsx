import React, { useEffect, useRef, useState } from 'react';

interface OrbitItem {
  name: string;
  imageName: string;
  axis: number; // 1, 2, or 3 to indicate which axis
  position: number; // Distance from center (0 to 1)
  angle: number; // Calculated based on axis and animation
  distance: number; // Calculated based on position
}

const OrbitDisplay: React.FC = () => {
  const [rotations, setRotations] = useState([0, 0, 0]); // One rotation value per axis
  // Removing hover state to eliminate swapping effects
  const animationRef = useRef<number | undefined>(undefined);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Define the orbit items with their proper image names and axis assignments
  // Using more evenly distributed positions to prevent overlap
  const orbitItems: OrbitItem[] = [
    // Axis 1 - 0 degrees
    { 
      name: 'Business Centres', 
      imageName: 'circle/co-working.png',
      axis: 1, 
      position: 0.35,
      angle: 0, 
      distance: 180 // Inner orbit
    },
    { 
      name: 'CRYP App', 
      imageName: 'circle/crypapp.png',
      axis: 1, 
      position: 0.9,
      angle: 180, 
      distance: 300 // Outer orbit
    },
    
    // Axis 2 - 120 degrees 
    { 
      name: 'TRODO TOKEN', 
      imageName: 'circle/token.png',
      axis: 2, 
      position: 0.35,
      angle: 0, 
      distance: 180 // Inner orbit
    },
    { 
      name: 'Real Estate Tokenisation', 
      imageName: 'circle/dreamrealirty.png',
      axis: 2, 
      position: 0.9,
      angle: 180, 
      distance: 300 // Outer orbit
    },
    
    // Axis 3 - 240 degrees
    { 
      name: 'GAMING CONTENT', 
      imageName: 'circle/gaming.png',
      axis: 3, 
      position: 0.35,
      angle: 0, 
      distance: 180 // Inner orbit
    },
    { 
      name: 'TRDO-Powered Digital Lottery', 
      imageName: 'circle/lottery.png',
      axis: 3, 
      position: 0.9,
      angle: 180, 
      distance: 300 // Outer orbit
    }
  ];
  
  // Using a more reliable animation technique with timestamps for smoother motion
  useEffect(() => {
    // Slower rotation speed in degrees per millisecond
    const rotationSpeed = 0.015;
    let lastTimestamp = 0;
    
    // Animation loop with timestamp-based movement for smooth, continuous rotation
    const animate = (timestamp: number) => {
      // Calculate time elapsed since last frame
      if (!lastTimestamp) lastTimestamp = timestamp;
      const elapsed = timestamp - lastTimestamp;
      lastTimestamp = timestamp;
      
      // Use elapsed time to calculate rotation amount
      const rotationAmount = rotationSpeed * elapsed;
      
      // Update all rotations
      setRotations(prev => [
        (prev[0] - rotationAmount + 360) % 360, // Axis 1 
        (prev[1] - rotationAmount + 360) % 360, // Axis 2
        (prev[2] - rotationAmount + 360) % 360  // Axis 3
      ]);
      
      // Continuously request the next frame
      animationRef.current = requestAnimationFrame(animate);
    };
    
    // Start the animation loop
    animationRef.current = requestAnimationFrame(animate);
    
    // Cleanup function
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);
  
  // Calculate position for each item based on its axis, angle and the current rotation
  const getItemPosition = (item: OrbitItem) => {
    // Get the base angle for this axis (0, 120, or 240 degrees)
    const axisBaseAngle = (item.axis - 1) * 120;
    
    // Apply the current rotation for this axis
    const axisRotation = rotations[item.axis - 1];
    
    // Add phase offset for items on the same axis to prevent overlapping
    // Items closer to center (inner orbit) are placed 0° on the axis
    // Items further from center (outer orbit) are placed 180° on the axis
    const phaseOffset = (item.position < 0.5) ? 0 : 180;
    
    // Calculate the final angle in radians
    const finalAngle = ((axisBaseAngle + axisRotation + phaseOffset) * Math.PI) / 180;
    
    // Calculate the position
    const x = item.distance * Math.cos(finalAngle);
    const y = item.distance * Math.sin(finalAngle);
    
    return { x, y };
  };
  
  return (
    <div 
      ref={containerRef}
      className="relative w-full h-[800px] flex items-center justify-center my-12"
    >
      {/* Black background with very subtle gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black to-[#0c0318] rounded-3xl overflow-hidden">
        {/* Very subtle glow in the center */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-[#4b28a6]/8 filter blur-[100px]" />
      </div>
      
      {/* Orbit circles - with subtle purple highlight */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-[600px] h-[600px] rounded-full border border-[#A855F7]/15 animate-pulse-slow shadow-[0_0_20px_rgba(168,85,247,0.03)]" />
        <div className="absolute w-[450px] h-[450px] rounded-full border border-[#A855F7]/20 shadow-[0_0_15px_rgba(168,85,247,0.04)]" />
        <div className="absolute w-[300px] h-[300px] rounded-full border border-[#A855F7]/25 shadow-[0_0_10px_rgba(168,85,247,0.05)]" />
      </div>
      
      {/* Background glow effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-[#A855F7]/5 filter blur-[90px]" />
      
      {/* Subtle stars/dots in the background */}
      {[...Array(20)].map((_, i) => {
        const size = 1 + Math.random() * 2.5;
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        const opacity = 0.2 + Math.random() * 0.3;
        const animationDelay = Math.random() * 10;
        const animationDuration = 4 + Math.random() * 8;
        const purpleHue = Math.random() > 0.5;
        
        return (
          <div 
            key={i}
            className="absolute rounded-full animate-pulse-slow"
            style={{
              width: `${size}px`,
              height: `${size}px`,
              left: `${x}%`,
              top: `${y}%`,
              opacity: opacity,
              backgroundColor: purpleHue ? '#d8b4fe' : 'white',
              boxShadow: purpleHue ? '0 0 4px #a855f7' : '0 0 2px white',
              animationDelay: `${animationDelay}s`,
              animationDuration: `${animationDuration}s`
            }}
          />
        );
      })}
      
      {/* Center logo using crypquuelogo */}
      <div className="relative z-10 transform transition-transform duration-300 flex flex-col items-center">
        <div className="w-32 h-32 flex items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-[#1c1033] to-[#12082A] shadow-[0_0_20px_rgba(168,85,247,0.4)] border-2 border-[#A855F7]/40">
          <img 
            src="crypquuelogo.png" 
            alt="Crypque Logo" 
            className="w-24 h-24 object-contain"
          />
        </div>
        {/* <div className="mt-2 text-white text-xl font-bold tracking-widest">CRYPQUE</div>
        <div className="w-24 h-0.5 bg-white mt-1"></div> */}
      </div>
      
      {/* No axis lines as requested */}
      
      {/* Orbit items */}
      {orbitItems.map((item, index) => {
        const { x, y } = getItemPosition(item);
        
        return (
          <div
            key={index}
            className="absolute transform -translate-x-1/2 -translate-y-1/2 z-20"
            style={{
              left: `calc(50% + ${x}px)`,
              top: `calc(50% + ${y}px)`,
            }}
          >
            <div className="flex flex-col items-center">
              {/* Purple circle with image */}
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#A855F7] to-[#7c3aed] flex items-center justify-center shadow-[0_0_20px_rgba(168,85,247,0.6)] border-2 border-[#A855F7]/60 overflow-hidden">
                {/* Using the specified image */}
                <img 
                  src={item.imageName} 
                  alt={item.name}
                  className="w-12 h-12 object-contain"
                />
              </div>
              
              {/* Connector line */}
              <div className="h-3 w-px bg-[#A855F7]/50"></div>
              
              {/* Label with name - positioned below the circle */}
              <div
                className="text-white bg-[#12082A] px-3 py-1 rounded-full text-sm whitespace-nowrap border border-[#A855F7]/30 shadow-[0_0_10px_rgba(168,85,247,0.2)]"
              >
                {item.name}
              </div>
            </div>
          </div>
        );
      })}
      
      {/* Background glow effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-[#A855F7]/5 filter blur-[50px]" />
    </div>
  );
};

export default OrbitDisplay;
