import { GripVertical } from 'lucide-react';

export function DragHandle() {
  return (
    <button className="p-1.5 text-gray-400 hover:text-gray-300 hover:bg-gray-700/50 rounded-lg cursor-grab active:cursor-grabbing transition-colors">
      <GripVertical className="w-4 h-4" />
    </button>
  );
}