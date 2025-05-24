import React, { useEffect, useRef, useState } from 'react';

const About: React.FC = () => {
  // Reference to the ecosystem section for scroll detection
  const ecosystemRef = useRef<HTMLDivElement>(null);
  const [revealed, setRevealed] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      if (ecosystemRef.current) {
        const rect = ecosystemRef.current.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        
        // Check if the ecosystem section is in view (with some buffer)
        if (rect.top < windowHeight * 0.8) {
          setRevealed(true);
        } else {
          setRevealed(false); // Reset when scrolled back up
        }
      }
    };
    
    // Add event listeners
    window.addEventListener('scroll', handleScroll);
    
    // Initial check in case section is already in view on load
    handleScroll();
    
    // Cleanup
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Data for ecosystem cards
  const ecosystemCards = [
    {
      title: "Crypque Education",
      description: "A comprehensive learning platform focused on blockchain, crypto investments, and Web3 technologies — designed to educate and empower the next generation of innovators and investors.",
      position: "top-left"
    },
    {
      title: "Crypque Investment",
      description: "A trusted gateway for users and institutions to explore strategic investment opportunities in vetted blockchain projects, tokens, and decentralized technologies.",
      position: "top-right"
    },
    {
      title: "Real-World Tokenization",
      description: "Bringing tangible assets on-chain — from real estate to intellectual property — through secure and transparent tokenization solutions, enhancing liquidity and accessibility.",
      position: "bottom-left"
    },
    {
      title: "Blockchain & Tech Innovation",
      description: "Developing scalable, user-centric platforms and infrastructure to solve real-world challenges through blockchain technology and decentralized applications.",
      position: "bottom-right"
    }
  ];
  
  return (
    <section id="about" className="py-20 relative z-10 overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0 w-full h-full z-0">
        <img 
          src="/q-97c536f9.png" 
          alt="Background" 
          className="absolute w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-[#A855F7] mb-4">ABOUT US</h2>
          <div className="h-1 w-24 bg-[#A855F7] mx-auto rounded-full"></div>
        </div>
        
        <div className="text-[#E9D5FF] max-w-4xl mx-auto text-lg">
          <p className="mb-6">
            Over the past 4.5 years, Crypque has cultivated a robust global community under the leadership of
            founders who bring a collective experience of 25+ years in the blockchain, finance, and technology
            sectors. Recognized with multiple national awards, our team is committed to building a sustainable,
            revenue-generating ecosystem that empowers users and transforms industries through innovation.
          </p>
          
          <p className="mb-10">
            Crypque's vision goes beyond traditional boundaries — we aim to redefine how users interact with technology,
            investments, and education through real-world blockchain applications.
          </p>
          
          <h3 className="text-2xl font-bold text-white mb-6">Our Ecosystem Includes:</h3>
          
          {/* Ecosystem Cards Container */}
          <div ref={ecosystemRef} className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {ecosystemCards.map((card, index) => (
              <div 
                key={index}
                className="bg-[#1a1033]/50 backdrop-blur-md rounded-xl p-6 border border-[#A855F7]/20 hover:border-[#A855F7]/50 transition-all duration-700 hover:shadow-[0_0_15px_rgba(168,85,247,0.15)]" 
                style={{
                  transform: revealed 
                    ? `scale(1) rotate(${card.position.includes('left') ? -1 : 1}deg)` 
                    : 'scale(0.6) translateY(40px)',
                  opacity: revealed ? 1 : 0,
                  transitionDelay: `${index * 150}ms`,
                }}
              >
                <h4 className="text-xl font-bold text-[#A855F7] mb-3">{card.title}</h4>
                <p className="text-[#E9D5FF]">{card.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
