import { useState, useEffect } from 'react';

export function useAnimationState(initialState = false, duration = 300) {
  const [isAnimating, setIsAnimating] = useState(initialState);

  useEffect(() => {
    if (isAnimating) {
      const timer = setTimeout(() => setIsAnimating(false), duration);
      return () => clearTimeout(timer);
    }
  }, [isAnimating, duration]);

  const startAnimation = () => setIsAnimating(true);
  const stopAnimation = () => setIsAnimating(false);

  return {
    isAnimating,
    startAnimation,
    stopAnimation
  };
}