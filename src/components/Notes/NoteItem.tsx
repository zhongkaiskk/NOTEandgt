import { useAnimationState } from '../../hooks/useAnimationState';
import { CopyButton } from '../UI/CopyButton';
import { AnimatedElement } from '../UI/AnimatedElement';

interface NoteItemProps {
  text: string;
  onCopy: (text: string) => void;
  searchQuery?: string;
}

export function NoteItem({ text, onCopy, searchQuery }: NoteItemProps) {
  const { isAnimating, startAnimation } = useAnimationState();

  const handleCopy = () => {
    startAnimation();
    onCopy(text);
  };

  const highlightText = (text: string, query: string) => {
    if (!query.trim()) return text;

    const parts = text.split(new RegExp(`(${query})`, 'gi'));
    return parts.map((part, i) => 
      part.toLowerCase() === query.toLowerCase() ? (
        <span key={i} className="bg-primary/20 text-primary px-1 rounded">
          {part}
        </span>
      ) : part
    );
  };

  return (
    <AnimatedElement animation="slideUp">
      <div className="card p-6">
        <p className="text-gray-300 mb-4 text-sm md:text-base font-normal leading-relaxed">
          {searchQuery ? highlightText(text, searchQuery) : text}
        </p>
        <div className="mt-4">
          <CopyButton onCopy={handleCopy} isAnimating={isAnimating} />
        </div>
      </div>
    </AnimatedElement>
  );
}