import React, { useState } from 'react';

interface PriceInfo {
  current: string;
  expected: string;
}

interface Product {
  title: string;
  image: string;
  subtitle?: string;
  description: string;
  priceInfo?: PriceInfo;
  features?: string[];
}

const Products: React.FC = () => {
  const [expandedCard, setExpandedCard] = useState<number | null>(null);

  // Generate background colors for cards with no images
  const getGradientStyle = (index: number) => {
    const gradients = [
      'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)',
      'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
      'linear-gradient(135deg, #ec4899 0%, #8b5cf6 100%)',
      'linear-gradient(135deg, #14b8a6 0%, #6366f1 100%)',
      'linear-gradient(135deg, #f43f5e 0%, #c026d3 100%)',
      'linear-gradient(135deg, #8b5cf6 0%, #d946ef 100%)',
    ];
    return gradients[index % gradients.length];
  };

  const products: Product[] = [
    {
      title: 'CRYP APPLICATION',
      image: '/products/Crypapp.png',
      description: 'A one-of-its-kind platform bridging crypto and fiat for users across 180+ countries, with seamless global accessibility. In partnership with a global bank, users can add, convert, and remit funds in multiple currencies, and even load them onto Mastercard (virtual & physical). It enables a user to add funds to a non-custodial wallet (external wallet). The platform offers global utility services, cross-border payments, and aims to evolve into a comprehensive Web2 + Web3 banking solution.'
    },
    {
      title: 'TRONADO TOKEN',
      image: '/products/TRDO-TOKEN.png',
      description: 'TRDO is a utility token on the Polygon blockchain with a total supply of 25 crore tokens. 21.5 crore are locked, with 25 lakh released every 3 months to manage demand and supply. Launched at 2 cents in 2021, it\'s now around 15 cents, with an upcoming international launch at 20+ cents. Tronado Token can be utilized in the CRYP application for various utility payments, as well as for multiple futuristic token-based applications.',
      priceInfo: {
        current: '$1',
        expected: '$3'
      }
    },
    {
      title: 'Real Estate Tokenisation',
      image: '/products/real-world-tokenisation.jpg',
      subtitle: 'Crypque Dream Reality Plan – 2X Buy Back Guarantee',
      description: 'Under the Crypque Dream Reality Plan, investors can benefit from a guaranteed 2X Buy Back Plan designed to provide both security and exceptional returns. For example, with an investment of AED 1 Million in property under this plan, the investor receives a guaranteed buy back of AED 2 Million for the same property from Crypque Dream Reality after 30 months from the date of investment. This plan ensures a 100% return on investment, offering both asset-backed security and a clear exit strategy, making it a powerful option for investors seeking predictable and substantial gains in the real estate market.'
    },
    {
      title: 'Business Centres',
      image: '/products/Businesscenter.jpg',
      description: 'With UAE\'s startup growth outpacing the world and plans to 4x by 2030, demand for office spaces is surging. We\'re already operating a 12,000 sq. ft. business center in Dubai\'s prime Business Bay and see strong potential for revenue and brand expansion. We aim to raise liquidity to scale operations and offer investors a chance to grow with us across high-demand segments over the next 3–5 years.'
    },
    {
      title: 'GAMING CONTENT',
      image: '/products/game.jpg',
      subtitle: 'Mini-Games in Progress: The Future of Play-to-Earn',
      description: 'The next generation of blockchain gaming is on the way. Our Play-to-Earn mini-games are currently in development, blending fun and functionality. Soon, players will be able to compete, earn, and unlock real rewards through engaging skill-based gameplay. Stay tuned as we build interactive experiences that make every moment in the $TRDO universe count.'
    },
    {
      title: 'TRDO-Powered Digital Lottery',
      image: '/products/lottery.jpg',
      description: 'A decentralized, transparent, and tamper-proof lottery system with instant settlements via TRDO token. Global participation with crypto wallets and smart contract-based draws and automated payouts.',
      features: [
        'Instant settlements via TRDO token',
        'Global participation with crypto wallets',
        'Smart contract-based draws',
        'Automated payouts'
      ]
    }
  ];

  const handleMouseEnter = (index: number) => {
    setExpandedCard(index);
  };

  const handleMouseLeave = () => {
    setExpandedCard(null);
  };

  // Function to truncate description for initial display
  const truncateDescription = (text: string) => {
    return text.length > 100 ? text.substring(0, 100) + '...' : text;
  };

  return (
    <section className="pt-0 pb-20 bg-transparent relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-[#A855F7] mb-4">OUR PRODUCTS</h2>
          <p className="text-xl text-[#E9D5FF] max-w-3xl mx-auto">
            A powerful ecosystem offering a utility token (TRDO), a global crypto-fiat banking platform,
            real estate tokenization in the UAE, and premium business centers, all designed to unlock
            high-growth opportunities across Web3, finance, real estate, and enterprise solutions
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <div 
              key={index} 
              className={`group bg-[#1a1033]/80 backdrop-blur-md rounded-xl overflow-hidden transition-all duration-500 border border-transparent hover:border-[#A855F7] ${expandedCard === index ? 'shadow-[0_0_30px_rgba(168,85,247,0.3)] z-20' : ''}`}
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave}
            >
              {/* Card Content */}
              <div className="flex flex-col h-full">
                {/* Image container covering full top border - no overlays */}
                <div className="relative h-48 overflow-hidden">
                  {/* Image with full cover style */}
                  <img 
                    src={product.image} 
                    alt={product.title}
                    className="w-full h-full object-cover object-center"
                    onError={(e) => {
                      // If image fails to load, show a gradient background
                      (e.target as HTMLImageElement).style.display = 'none';
                      const parent = (e.target as HTMLImageElement).parentElement;
                      if (parent) {
                        const gradientDiv = document.createElement('div');
                        gradientDiv.className = 'absolute inset-0 w-full h-full';
                        gradientDiv.style.background = getGradientStyle(index);
                        parent.appendChild(gradientDiv);
                      }
                    }}
                    loading="lazy"
                  />
                </div>
                
                {/* Title and Description */}
                <div className="p-5 border-t border-purple-500/20 flex flex-col flex-grow">
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#A855F7] transition-colors duration-300">{product.title}</h3>
                  
                  {product.subtitle && (
                    <h4 className="text-sm font-semibold text-[#E9D5FF]/70 mb-3">{product.subtitle}</h4>
                  )}
                  
                  <div className="description-container overflow-hidden transition-all duration-500" style={{ maxHeight: expandedCard === index ? '1000px' : '80px' }}>
                    <p className="text-[#E9D5FF]/80 text-sm leading-relaxed">
                      {expandedCard === index ? product.description : truncateDescription(product.description)}
                    </p>
                    
                    {expandedCard === index && product.priceInfo && (
                      <div className="mt-4 bg-[#2d1a5a]/60 p-3 rounded-lg border border-[#A855F7]/30">
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="text-[#E9D5FF] text-xs">Current Price</p>
                            <p className="text-lg font-bold text-white">{product.priceInfo.current}</p>
                          </div>
                          <div className="h-10 w-0.5 bg-[#A855F7]/20"></div>
                          <div>
                            <p className="text-[#E9D5FF] text-xs">Expected Price</p>
                            <p className="text-lg font-bold text-[#A855F7]">{product.priceInfo.expected}</p>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {expandedCard === index && product.features && (
                      <div className="mt-4">
                        <h5 className="text-sm font-semibold text-[#A855F7] mb-2">Key Features</h5>
                        <ul className="space-y-1">
                          {product.features.map((feature, idx) => (
                            <li key={idx} className="flex items-start text-[#E9D5FF]/80 text-xs">
                              <span className="mr-2 text-[#A855F7] mt-0.5">•</span>
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                  
                  {/* Hover to see more indicator */}
                  {expandedCard !== index && (
                    <div className="mt-2 text-[#A855F7] text-xs font-medium flex items-center">
                      <span>Hover for details</span>
                      <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Products;
