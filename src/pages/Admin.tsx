import { useState } from 'react';
import { LogOut, Save } from 'lucide-react';
import { LoginForm } from '../components/Auth/LoginForm';
import { validateCredentials } from '../utils/auth';
import { LoginCredentials } from '../types/auth';
import { AnimatedElement } from '../components/UI/AnimatedElement';
import { NotesList } from '../components/Admin/NotesList';
import { SectionsList } from '../components/Admin/SectionsList';
import { MessagesList } from '../components/Admin/MessagesList';
import { SyncStatus } from '../components/UI/SyncStatus';
import { useNotes } from '../hooks/useNotes';

export function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [syncStatus, setSyncStatus] = useState<'connected' | 'disconnected'>('connected');
  
  const {
    notes,
    selectedNote,
    selectedSection,
    newTitle,
    newMessage,
    saveStatus,
    isAdding,
    isDeleting,
    setSelectedNote,
    setSelectedSection,
    setNewTitle,
    setNewMessage,
    handleSave,
    handleAddNote,
    handleDeleteNote,
    handleAddSection,
    handleDeleteSection,
    handleAddMessage,
    handleDeleteMessage,
    handleReorderNotes,
    handleReorderSections,
    handleReorderMessages
  } = useNotes();

  const handleLogin = (credentials: LoginCredentials) => {
    if (validateCredentials(credentials)) {
      setIsAuthenticated(true);
      setAuthError(null);
    } else {
      setAuthError('Invalid username or password');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setAuthError(null);
    setSelectedNote(null);
    setSelectedSection(null);
  };

  if (!isAuthenticated) {
    return <LoginForm onLogin={handleLogin} error={authError} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background-dark to-background-darker p-4 md:p-8">
      <AnimatedElement animation="fadeIn">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-blue-400 bg-clip-text text-transparent">
            Admin Panel
          </h1>
          <div className="flex gap-3">
            <button
              onClick={handleSave}
              disabled={saveStatus === 'saving'}
              className={`
                btn
                ${saveStatus === 'saving' 
                  ? 'bg-gray-700 cursor-not-allowed' 
                  : saveStatus === 'saved'
                  ? 'bg-green-600 hover:bg-green-700'
                  : saveStatus === 'error'
                  ? 'bg-red-600 hover:bg-red-700'
                  : 'btn-primary'
                }
              `}
            >
              <Save className="w-4 h-4" />
              <span>
                {saveStatus === 'saving' ? 'Saving...' :
                 saveStatus === 'saved' ? 'Saved!' :
                 saveStatus === 'error' ? 'Error' :
                 'Save Changes'}
              </span>
            </button>
            <button
              onClick={handleLogout}
              className="btn-danger"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </button>
          </div>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6">
          <NotesList
            notes={notes}
            selectedNote={selectedNote}
            newTitle={newTitle}
            isAdding={isAdding}
            isDeleting={isDeleting}
            onTitleChange={setNewTitle}
            onAddNote={handleAddNote}
            onDeleteNote={handleDeleteNote}
            onSelectNote={setSelectedNote}
            onReorderNotes={handleReorderNotes}
          />

          {selectedNote && (
            <SectionsList
              selectedNote={selectedNote}
              selectedSection={selectedSection}
              newTitle={newTitle}
              onTitleChange={setNewTitle}
              onAddSection={handleAddSection}
              onDeleteSection={handleDeleteSection}
              onSelectSection={setSelectedSection}
              onReorderSections={(oldIndex, newIndex) => 
                handleReorderSections(selectedNote.id, oldIndex, newIndex)
              }
            />
          )}

          {selectedSection && (
            <MessagesList
              selectedSection={selectedSection}
              newMessage={newMessage}
              onMessageChange={setNewMessage}
              onAddMessage={handleAddMessage}
              onDeleteMessage={(index) => handleDeleteMessage(selectedSection.title, index)}
              onReorderMessages={(oldIndex, newIndex) => 
                handleReorderMessages(
                  selectedNote!.id,
                  selectedSection.title,
                  oldIndex,
                  newIndex
                )
              }
            />
          )}
        </div>
      </AnimatedElement>
      
      <SyncStatus status={syncStatus} />
    </div>
  );
}