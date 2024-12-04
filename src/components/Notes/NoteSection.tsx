import { AnimatedContainer } from '../UI/AnimatedContainer';

interface NoteSectionProps {
  title: string;
  children: React.ReactNode;
}

export function NoteSection({ title, children }: NoteSectionProps) {
  return (
    <AnimatedContainer animation="slide-up" className="mb-8">
      <h3 className="text-blue-600 font-semibold mb-4 text-lg font-libre">{title}</h3>
      <div className="space-y-4">
        {children}
      </div>
    </AnimatedContainer>
  );
}