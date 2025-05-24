import React, { useState } from 'react';

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="fixed w-full top-0 z-50 bg-transparent backdrop-blur-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 py-4">
        {/* Logo on the left */}
        <div className="flex-shrink-0">
          <a href="#" className="flex items-center">
            <span className="text-xl font-bold text-white">Crypquue</span>
          </a>
        </div>
        
        {/* Navigation in the middle */}
        <div className="flex-grow flex items-center justify-center">
          <nav className="hidden md:flex space-x-8">
            <a href="#hero" className="text-white/80 hover:text-white transition-colors font-medium text-sm">Home</a>
            <a href="#products" className="text-white/80 hover:text-white transition-colors font-medium text-sm">Products</a>
            <a href="#about" className="text-white/80 hover:text-white transition-colors font-medium text-sm">About Us</a>
          </nav>
        </div>

        <div className="flex items-center space-x-4">
          <a 
            href="#started"
            className="hidden md:block bg-white text-[#0c0a1f] px-4 py-2 rounded-md hover:bg-gray-100 transition-all text-sm font-medium"
          >
            Get Started
          </a>
          <button 
            onClick={toggleMenu}
            className="md:hidden text-white hover:text-white/80 transition-colors"
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
        className={`md:hidden ${isOpen ? 'block' : 'hidden'} bg-[#0c0a1f]/90 backdrop-blur-sm`}
      >
        <nav className="px-4 pt-2 pb-4 space-y-2">
          <a href="#hero" className="block text-white/80 hover:text-white transition-colors py-2 text-sm">Home</a>
          <a href="#products" className="block text-white/80 hover:text-white transition-colors py-2 text-sm">Products</a>
          <a href="#about" className="block text-white/80 hover:text-white transition-colors py-2 text-sm">About Us</a>
          <div className="pt-2 border-t border-white/10 mt-2">
            <a href="#started" className="block text-white/80 hover:text-white transition-colors py-2 text-sm font-medium">Get Started</a>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
