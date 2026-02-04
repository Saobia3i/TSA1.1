'use client';

import { useEffect, useState } from 'react';

export default function PWAUpdateManager() {
  const [showPrompt, setShowPrompt] = useState(false);
  const [waitingWorker, setWaitingWorker] = useState<ServiceWorker | null>(null);

  useEffect(() => {
    // Only run in browser and production
    if (
      typeof window === 'undefined' ||
      typeof navigator === 'undefined' ||
      !('serviceWorker' in navigator) ||
      process.env.NODE_ENV !== 'production'
    ) {
      return;
    }

    // Check for updates every 60 seconds
    const interval = setInterval(() => {
      navigator.serviceWorker.ready
        .then((reg) => reg.update())
        .catch((err) => console.error('SW update check failed:', err));
    }, 60000);

    // Listen for waiting service worker
    navigator.serviceWorker.ready
      .then((reg) => {
        // Check if there's already a waiting worker
        if (reg.waiting) {
          setWaitingWorker(reg.waiting);
          setShowPrompt(true);
        }

        // Listen for new service worker installing
        reg.addEventListener('updatefound', () => {
          const newWorker = reg.installing;
          
          if (!newWorker) return;

          newWorker.addEventListener('statechange', () => {
            if (
              newWorker.state === 'installed' &&
              navigator.serviceWorker.controller
            ) {
              setWaitingWorker(newWorker);
              setShowPrompt(true);
            }
          });
        });
      })
      .catch((err) => console.error('SW registration failed:', err));

    // Listen for controller change (new SW activated)
    let refreshing = false;
    navigator.serviceWorker.addEventListener('controllerchange', () => {
      if (!refreshing) {
        refreshing = true;
        window.location.reload();
      }
    });

    return () => clearInterval(interval);
  }, []);

  const handleUpdate = () => {
    if (waitingWorker) {
      waitingWorker.postMessage({ type: 'SKIP_WAITING' });
    }
    setShowPrompt(false);
  };

  const handleDismiss = () => {
    setShowPrompt(false);
  };

  if (!showPrompt) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 max-w-sm animate-slide-up">
      <div className="bg-gradient-to-br from-blue-600 to-blue-700 text-white rounded-xl shadow-2xl p-5 border border-blue-400/30 backdrop-blur-sm">
        <div className="flex items-start gap-3">
          {/* Icon */}
          <div className="flex-shrink-0 mt-1">
            <svg
              className="w-6 h-6 text-blue-100"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-sm mb-1">
              Update Available
            </h3>
            <p className="text-xs text-blue-50 mb-4 leading-relaxed">
              A new version is ready. Update now for the latest features and improvements.
            </p>
            
            {/* Actions */}
            <div className="flex gap-2">
              <button
                onClick={handleUpdate}
                className="flex-1 bg-white text-blue-600 text-sm font-medium px-4 py-2.5 rounded-lg hover:bg-blue-50 active:bg-blue-100 transition-colors duration-200 shadow-sm"
              >
                Update Now
              </button>
              <button
                onClick={handleDismiss}
                className="px-4 py-2.5 text-sm text-blue-50 hover:text-white hover:bg-white/10 rounded-lg transition-colors duration-200"
              >
                Later
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}