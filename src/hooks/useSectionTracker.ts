import { useState, useEffect } from 'react';

const useSectionTracker = () => {
  const [currentSection, setCurrentSection] = useState<string>('hero');
  const [previousSection, setPreviousSection] = useState<string>('');

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      
      // Get all sections
      const sections = document.querySelectorAll('section[id]');
      
      // Find the current visible section
      sections.forEach((section) => {
        const sectionTop = (section as HTMLElement).offsetTop;
        const sectionHeight = (section as HTMLElement).offsetHeight;
        
        if (
          scrollPosition >= sectionTop - windowHeight / 3 &&
          scrollPosition < sectionTop + sectionHeight - windowHeight / 3
        ) {
          const id = section.getAttribute('id') || '';
          if (currentSection !== id && id) {
            setPreviousSection(currentSection);
            setCurrentSection(id);
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial position
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [currentSection]);

  return { currentSection, previousSection };
};

export default useSectionTracker;
