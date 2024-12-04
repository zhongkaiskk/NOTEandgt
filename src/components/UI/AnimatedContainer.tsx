interface AnimatedContainerProps {
  children: React.ReactNode;
  className?: string;
  animation?: 'slide-in' | 'fade-in' | 'scale-in' | 'slide-up';
}

export function AnimatedContainer({ 
  children, 
  className = '', 
  animation = 'fade-in' 
}: AnimatedContainerProps) {
  return (
    <div className={`animate-${animation} ${className}`}>
      {children}
    </div>
  );
}