import React, { useState } from 'react';

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="fixed w-full top-0 z-50 bg-black backdrop-blur-sm border-b border-[#A855F7]/20">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 py-4">
        {/* Logo on the left */}
        <div className="flex-shrink-0">
          <a href="#" className="text-2xl font-bold text-[#A855F7] hover:text-[#E9D5FF] transition-colors">
            Crypquue
          </a>
        </div>
        
        {/* Navigation in the middle */}
        <div className="flex-grow flex items-center justify-center">
          <nav className="hidden md:flex space-x-8">
            <a href="#hero" className="text-[#E9D5FF] hover:text-white transition-colors font-medium">Home</a>
            <a href="#products" className="text-[#E9D5FF] hover:text-white transition-colors font-medium">Our Product</a>
            <a href="#about" className="text-[#E9D5FF] hover:text-white transition-colors font-medium">About Us</a>
          </nav>
        </div>

        <div className="flex items-center space-x-4">
          <button className="hidden md:block bg-[#A855F7] text-white px-6 py-2 rounded-lg hover:bg-[#9333EA] transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
            Get Started
          </button>
          <button 
            onClick={toggleMenu}
            className="md:hidden text-[#E9D5FF] hover:text-[#A855F7] transition-colors"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div 
        className={`md:hidden ${isOpen ? 'block' : 'hidden'} bg-black border-b border-[#A855F7]/20`}
      >
        <nav className="px-4 pt-2 pb-4 space-y-2">
          <a href="#hero" className="block text-[#E9D5FF] hover:text-white transition-colors py-2">Home</a>
          <a href="#products" className="block text-[#E9D5FF] hover:text-white transition-colors py-2">Our Product</a>
          <a href="#about" className="block text-[#E9D5FF] hover:text-white transition-colors py-2">About Us</a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
