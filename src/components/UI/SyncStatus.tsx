import { Wifi, WifiOff } from 'lucide-react';
import { AnimatedElement } from './AnimatedElement';

interface SyncStatusProps {
  status: 'connected' | 'disconnected';
}

export function SyncStatus({ status }: SyncStatusProps) {
  return (
    <AnimatedElement animation="fadeIn">
      <div className={`
        fixed bottom-4 right-4 px-4 py-2 rounded-full 
        flex items-center gap-2 text-sm font-medium
        ${status === 'connected' 
          ? 'bg-green-500/10 text-green-400' 
          : 'bg-red-500/10 text-red-400'}
      `}>
        {status === 'connected' ? (
          <>
            <Wifi className="w-4 h-4" />
            <span>Synced</span>
          </>
        ) : (
          <>
            <WifiOff className="w-4 h-4" />
            <span>Offline</span>
          </>
        )}
      </div>
    </AnimatedElement>
  );
}