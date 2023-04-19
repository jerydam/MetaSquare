import React, { useState, useEffect } from 'react';

function JumpToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.pageYOffset > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <button
      className={`fixed bottom-10 right-10 p-4 rounded-full text-white ${isVisible ? 'visible' : 'hidden'}`}
      onClick={handleClick}
      style={{ backgroundColor: '#4B5563' }}
    >
      Jump to Top
    </button>
  );
}

export default JumpToTopButton;
