import React, { useEffect, useRef } from 'react';

const servicesData = [
  { 
    name: 'Business Centres', 
    imageName: 'circle/co-working.png',
  },
  { 
    name: 'CRYP App', 
    imageName: 'circle/crypapp.png',
  },
  { 
    name: 'TRODO TOKEN', 
    imageName: 'circle/token.png',
  },
  { 
    name: 'Real Estate Tokenisation', 
    imageName: 'circle/dreamrealirty.png',
  },
  { 
    name: 'GAMING CONTENT', 
    imageName: 'circle/gaming.png',
  },
  { 
    name: 'TRDO-Powered Digital Lottery', 
    imageName: 'circle/lottery.png',
  }
];

const OrbitSection: React.FC = () => {
  // Refs for orbit and circle images
  const orbitRef = useRef<HTMLDivElement>(null);
  const circleRefs = useRef<(HTMLDivElement | null)[]>([]);
  
  // Add CSS styles for the light ray animation but keep logos static
  // Add light ray animation and logo visibility logic
  useEffect(() => {
    // Create styles for animation and logo visibility
    const styleEl = document.createElement('style');
    styleEl.textContent = `
      .orbit-logo {
        opacity: 0; /* Hide all logos by default */
        transition: opacity 1.5s ease-in-out, box-shadow 1.5s ease-in-out;
      }
      
      .logo-highlighted {
        opacity: 1 !important; /* Make visible when highlighted */
        box-shadow: 0 0 25px rgba(157, 78, 221, 0.8) !important;
        z-index: 30 !important;
      }

      .logo-name {
        position: absolute;
        bottom: -30px;
        left: 50%;
        transform: translateX(-50%);
        color: white;
        font-size: 0.75rem;
        text-align: center;
        width: 120px;
        opacity: 0;
        transition: opacity 0.3s ease;
      }

      .logo-highlighted .logo-name {
        opacity: 1;
      }
      
      .rotating-ray {
        position: absolute;
        left: 50%;
        bottom: 0;
        width: 4px;
        height: 400px;
        background: linear-gradient(to top, rgba(157, 78, 221, 0.8), transparent);
        transform-origin: bottom center;
        animation: rayRotate 12s linear infinite;
        box-shadow: 0 0 15px rgba(157, 78, 221, 0.5);
        border-radius: 4px;
      }
      
      @keyframes rayRotate {
        0% { transform: translateX(-50%) rotate(-60deg); }
        50% { transform: translateX(-50%) rotate(60deg); }
        100% { transform: translateX(-50%) rotate(-60deg); }
      }
    `;
    document.head.appendChild(styleEl);
    
    // Define our logo positions and the ray angles that will activate them
    const logoPositions = [
      { index: 0, angle: -45 }, // Left upper logo
      { index: 1, angle: -15 }, // Left middle logo
      { index: 2, angle: 15 },  // Right middle logo
      { index: 3, angle: 45 },  // Right upper logo
      { index: 4, angle: -30 }, // Left lower logo
      { index: 5, angle: 30 }   // Right lower logo
    ];
    
    // Get all logo elements
    const logoElements = circleRefs.current.filter(el => el !== null);
    let currentAngle = -60; // Starting ray angle
    const totalDuration = 12; // Total seconds for full cycle (matches CSS animation)
    let currentLogoIndex = -1; // Start with no logo visible
    
    // Function to update the light ray position and visible logo
    const updateRayPosition = () => {
      // Calculate current angle based on time
      const time = (Date.now() / 1000) % totalDuration;
      const normalizedTime = time / totalDuration; // 0 to 1
      
      // First half: -60 to 60 degrees
      // Second half: 60 to -60 degrees
      if (normalizedTime < 0.5) {
        currentAngle = -60 + (normalizedTime * 2 * 120);
      } else {
        currentAngle = 60 - ((normalizedTime - 0.5) * 2 * 120);
      }
      
      // Find which logo should be visible based on ray position
      // Increased visibility window for faster transitions
      const logoToShow = logoPositions.findIndex(pos => 
        Math.abs(currentAngle - pos.angle) < 10
      );
      
      // Only update DOM if we need to change the visible logo
      if (logoToShow !== currentLogoIndex) {
        // Hide all logos
        logoElements.forEach(logo => {
          if (logo) {
            logo.classList.remove('logo-highlighted');
          }
        });
        
        // Show the current logo if one should be visible
        if (logoToShow >= 0 && logoElements[logoToShow]) {
          logoElements[logoToShow].classList.add('logo-highlighted');
        }
        
        currentLogoIndex = logoToShow;
      }
      
      // Request next animation frame
      requestAnimationFrame(updateRayPosition);
    };
    
    // Start the animation
    const animationId = requestAnimationFrame(updateRayPosition);
    
    // Clean up on unmount
    return () => {
      cancelAnimationFrame(animationId);
      if (document.head.contains(styleEl)) {
        document.head.removeChild(styleEl);
      }
    };
  }, []);

  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-b from-[#100a2c] to-[#191033] border-b border-purple-900/20 pt-10 pb-0">
      {/* Our Ecosystem heading */}
      <div className="text-center mb-8">
        <h2 className="text-4xl font-bold text-white mb-2">Our Ecosystem</h2>
        <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-indigo-600 mx-auto"></div>
      </div>
      {/* Light rays effect */}
      <div className="absolute inset-0 z-0 opacity-30 overflow-hidden">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 h-[600px] w-[1200px]">
          {/* Light rays coming from center */}
          {[...Array(12)].map((_, index) => (
            <div
              key={index}
              className="absolute left-1/2 top-1/2 h-[600px] origin-bottom"
              style={{
                width: '4px',
                backgroundColor: 'rgba(157, 78, 221, 0.6)',
                transform: `translateX(-50%) rotate(${index * 30}deg)`,
                boxShadow: '0 0 15px 5px rgba(157, 78, 221, 0.3)',
              }}
            />
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto relative">
        {/* Container for half-visible orbit */}
        <div className="h-[400px] relative overflow-hidden">
          {/* Orbit container - static, positioned to show only bottom half */}
          <div 
            ref={orbitRef}
            className="absolute left-1/2 -translate-x-1/2 w-[800px] h-[800px]"
            style={{ bottom: '0' }}
          >
            {/* Custom orbit concentric arcs */}
            <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
              {/* Semicircular arcs */}
              {[...Array(5)].map((_, index) => {
                const arcWidth = 2 - index * 0.2;
                const opacity = 0.6 - index * 0.08;
                return (
                  <div 
                    key={index} 
                    className="absolute left-1/2 bottom-0 -translate-x-1/2 rounded-t-full border-t border-l border-r" 
                    style={{
                      width: `${240 + index * 120}px`,
                      height: `${120 + index * 60}px`,
                      borderColor: `rgba(157, 78, 221, ${opacity})`,
                      borderWidth: `${arcWidth}px`,
                      borderBottom: 'none',
                    }}
                  />
                );
              })}
              
              {/* Radial lines */}
              {[...Array(12)].map((_, index) => {
                // Only show lines in the bottom half
                if (index > 3 && index < 9) {
                  const length = 380;
                  
                  return (
                    <div 
                      key={index}
                      className="absolute left-1/2 bottom-0 h-1 origin-bottom -translate-x-1/2" 
                      style={{
                        width: '1px',
                        height: `${length}px`,
                        backgroundColor: 'rgba(157, 78, 221, 0.3)',
                        transform: `rotate(${(index-6) * 30}deg)`,
                      }}
                    />
                  );
                }
                return null;
              })}
              
              {/* No dots at intersections */}
            </div>
            
            {/* Purple glow effect */}
            <div className="absolute left-1/2 bottom-0 -translate-x-1/2 w-[600px] h-[300px] rounded-t-full bg-[#5D3FD3] blur-[80px] opacity-10" />
            
            {/* Static logos positioned on their axes */}
            <div className="absolute inset-0 z-10">
              {/* Logos positioned on each orbit with 2 per orbit */}
              <div className="absolute left-1/2 bottom-0 -translate-x-1/2 w-full h-full">
                {servicesData.map((service, index) => {
                  // Calculate position based on index
                  let left = 'calc(50%)';
                  let bottom = '200px';
                  
                  // Left side logos (0, 1)
                  if (index < 2) {
                    left = 'calc(50% - 180px)';
                    bottom = index === 0 ? '160px' : '240px';
                  }
                  // Center logos (2, 3)
                  else if (index < 4) {
                    left = 'calc(50%)';
                    bottom = index === 2 ? '200px' : '300px';
                  }
                  // Right side logos (4, 5)
                  else {
                    left = 'calc(50% + 180px)';
                    bottom = index === 4 ? '160px' : '240px';
                  }
                  
                  return (
                    <div
                      key={index}
                      ref={(el) => { circleRefs.current[index] = el; }}
                      className="orbit-logo absolute z-10 w-14 h-14 rounded-full bg-white flex items-center justify-center shadow-[0_0_15px_rgba(157,78,221,0.3)]"
                      style={{ left, bottom }}
                    >
                      <img
                        src={`/${service.imageName}`}
                        alt={service.name}
                        className="w-10 h-10 object-contain"
                      />
                      <div className="logo-name">{service.name}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          
          {/* Light ray that rotates and highlights logos */}
          <div className="absolute z-10 left-1/2 bottom-0 w-[600px] h-[300px] -translate-x-1/2 pointer-events-none">
            <div className="rotating-ray"></div>
          </div>
          
          {/* Center logo */}
          <div className="absolute left-1/2 bottom-0 -translate-x-1/2 z-20">
            <div className="w-24 h-24 rounded-full bg-[#15122b] flex items-center justify-center shadow-[0_0_30px_rgba(157,78,221,0.5)]">
              <div className="w-18 h-18 rounded-full bg-[#5D3FD3] flex items-center justify-center overflow-hidden">
                <img 
                  src="/crypquuelogo1.png" 
                  alt="Crypquue Logo" 
                  className="w-12 h-12 object-contain" 
                />
              </div>
            </div>
          </div>

          {/* CSS styles added directly to head via useEffect */}
        </div>
      </div>
    </section>
  );
};

export default OrbitSection;
