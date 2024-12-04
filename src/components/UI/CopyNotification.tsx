import { CheckCircle } from 'lucide-react';
import { AnimatedContainer } from './AnimatedContainer';

interface CopyNotificationProps {
  show: boolean;
}

export function CopyNotification({ show }: CopyNotificationProps) {
  if (!show) return null;

  return (
    <div className="fixed bottom-8 right-8 z-50">
      <AnimatedContainer animation="slide-notification">
        <div className="bg-gray-800/90 backdrop-blur-md text-white px-6 py-4 rounded-2xl
          shadow-2xl border border-gray-700/50 flex items-center gap-4
          hover:scale-105 transition-transform duration-300">
          <div className="bg-green-500/20 p-2 rounded-xl">
            <CheckCircle className="w-6 h-6 text-green-400 animate-pulse" />
          </div>
          <div>
            <p className="font-medium text-green-400">Copied Successfully!</p>
            <p className="text-sm text-gray-400">Text has been copied to clipboard</p>
          </div>
        </div>
      </AnimatedContainer>
    </div>
  );
}