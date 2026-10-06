'use client';

import { Zap, X } from 'lucide-react';
import { useState } from 'react';

export function DemoBanner() {
  const [dismissed, setDismissed] = useState(false);
  if (dismissed) return null;
  return (
    <div className="sticky top-16 z-40 bg-amber-400 text-amber-950 px-4 py-2 flex items-center justify-between gap-3 text-sm font-semibold shadow-sm">
      <div className="flex items-center gap-2 flex-1 min-w-0">
        <Zap className="w-4 h-4 shrink-0" />
        <span className="truncate">
          Demo Mode — hardcoded data, no backend. Use{' '}
          <span className="font-mono bg-amber-300/60 px-1 rounded">student@demo.com</span> or{' '}
          <span className="font-mono bg-amber-300/60 px-1 rounded">mentor@demo.com</span> / password{' '}
          <span className="font-mono bg-amber-300/60 px-1 rounded">demo1234</span>
        </span>
      </div>
      <button
        onClick={() => setDismissed(true)}
        aria-label="Dismiss demo banner"
        className="shrink-0 w-7 h-7 rounded-full hover:bg-amber-500/40 flex items-center justify-center transition-colors"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}
