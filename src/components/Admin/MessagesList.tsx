import { Plus, Trash2 } from 'lucide-react';
import { Section } from '../../types/notes';

interface MessagesListProps {
  selectedSection: Section;
  newMessage: string;
  onMessageChange: (message: string) => void;
  onAddMessage: () => void;
  onDeleteMessage: (index: number) => void;
}

export function MessagesList({
  selectedSection,
  newMessage,
  onMessageChange,
  onAddMessage,
  onDeleteMessage
}: MessagesListProps) {
  return (
    <div className="card p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-medium text-gray-200">Messages</h2>
        <div className="flex gap-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => onMessageChange(e.target.value)}
            placeholder="New message"
            className="input text-sm"
          />
          <button
            onClick={onAddMessage}
            className="btn-primary"
            aria-label="Add message"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="space-y-2">
        {selectedSection.messages.map((message, index) => (
          <div
            key={index}
            className="p-4 rounded-lg bg-gray-800/50 hover:bg-gray-800 
              border border-gray-700/50 transition-colors
              flex justify-between items-center gap-4"
          >
            <span className="text-sm text-gray-300 font-normal">{message}</span>
            <button
              onClick={() => onDeleteMessage(index)}
              className="p-2 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
              aria-label="Delete message"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}