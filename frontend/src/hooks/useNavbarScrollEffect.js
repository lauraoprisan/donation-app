import { useEffect, useState } from 'react';



const useNavbarScrollEffect = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = document.documentElement.scrollTop;
      setScrolled(scrollTop > 100); // Change 100 to the desired scroll position
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []); // Empty dependency array to run the effect only once

  return scrolled;
};

export default useNavbarScrollEffect;