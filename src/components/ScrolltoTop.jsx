import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ScrollToTop = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const onNavigation = () => {
      window.scrollTo(0, 0);
    };

    // Listen for navigation events
    navigate(onNavigation);

    // Cleanup the listener on component unmount
    return () => {
      navigate((location) => null);
    };
  }, [navigate]);

  return null;
};

export default ScrollToTop;
