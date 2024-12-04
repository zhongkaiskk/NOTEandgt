import { useEffect, useCallback, useState } from 'react';
import { io } from 'socket.io-client';
import { Note } from '../types/notes';

const WEBSOCKET_URL = import.meta.env.VITE_WEBSOCKET_URL || 'wss://your-websocket-server.com';

export function useWebSocket(onNotesUpdate: (notes: Note[]) => void) {
  const [connectionStatus, setConnectionStatus] = useState<'connected' | 'disconnected'>('disconnected');
  const socket = io(WEBSOCKET_URL, {
    reconnection: true,
    reconnectionAttempts: 5,
    reconnectionDelay: 1000,
  });

  useEffect(() => {
    socket.on('connect', () => {
      setConnectionStatus('connected');
    });

    socket.on('disconnect', () => {
      setConnectionStatus('disconnected');
    });

    socket.on('notes:updated', (updatedNotes: Note[]) => {
      onNotesUpdate(updatedNotes);
    });

    return () => {
      socket.off('connect');
      socket.off('disconnect');
      socket.off('notes:updated');
      socket.disconnect();
    };
  }, [socket, onNotesUpdate]);

  const emitNotesUpdate = useCallback((notes: Note[]) => {
    if (connectionStatus === 'connected') {
      socket.emit('notes:update', notes);
    }
  }, [socket, connectionStatus]);

  return { emitNotesUpdate, connectionStatus };
}