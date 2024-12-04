import { Clipboard } from 'lucide-react';

interface CopyButtonProps {
  onCopy: () => void;
  isAnimating: boolean;
}

export function CopyButton({ onCopy, isAnimating }: CopyButtonProps) {
  return (
    <button
      onClick={onCopy}
      className={`
        copy-button
        ${isAnimating ? 'bg-green-600 hover:bg-green-700 shadow-lg shadow-green-500/20' : ''}
      `}
    >
      <Clipboard className="w-4 h-4" />
      <span className="font-normal">{isAnimating ? 'Copied!' : 'Copy'}</span>
    </button>
  );
}