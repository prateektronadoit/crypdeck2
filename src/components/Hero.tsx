import React from 'react';
import EnhancedWaterEffect from './EnhancedWaterEffect';

const Hero: React.FC = () => {
  return (
    <div className="pt-32 px-4 sm:px-6 lg:px-8 bg-transparent min-h-[100vh] flex flex-col items-center justify-start relative overflow-hidden">
      <div className="absolute inset-0 z-0 overflow-hidden" style={{ height: 'auto', bottom: '0' }}>
        <EnhancedWaterEffect />
      </div>
      <div className="max-w-7xl mx-auto relative z-10 w-full">
        <div className="flex flex-col items-center justify-center text-center mb-8">
          <h1 className="text-6xl sm:text-7xl font-bold mb-6 leading-tight">
            <span className="text-[#E9D5FF]">Accelerating the </span>
            <span className="text-[#A855F7]">Future</span>
          </h1>
          
          <h2 className="text-2xl sm:text-3xl font-semibold text-[#E9D5FF] mb-6">
            The Next Generation Blockchain Solution
          </h2>
          
          <p className="text-lg md:text-xl text-[#E9D5FF] max-w-3xl mx-auto mb-8 leading-relaxed">
            Empowering the future through blockchain innovation and strategic investments.
            Pushing the boundaries of blockchain technology to unlock a brand new design space.
          </p>
          
          <div className="flex flex-wrap justify-center gap-6">
            <a 
              href="#products" 
              className="bg-[#A855F7] text-white px-8 py-3 rounded-full hover:bg-[#9333EA] text-lg font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all"
            >
              Explore Products
            </a>
            {/* <a 
              href="#Contact" 
              className="bg-transparent text-[#E9D5FF] px-8 py-3 rounded-full hover:bg-[#A855F7]/20 text-lg font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all border-2 border-[#A855F7]"
            >
              Contact Us
            </a> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
