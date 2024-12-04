import { Search } from 'lucide-react';
import { AnimatedElement } from '../UI/AnimatedElement';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function SearchBar({ value, onChange, placeholder = 'Search messages...' }: SearchBarProps) {
  return (
    <AnimatedElement animation="slideIn" className="w-full">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
          <Search className="h-5 w-5 text-gray-500" />
        </div>
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="input pl-10 w-full bg-gray-900 border-gray-700"
          placeholder={placeholder}
        />
      </div>
    </AnimatedElement>
  );
}