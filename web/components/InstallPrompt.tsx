'use client';

import { useState, useEffect } from 'react';
import { Download, X } from 'lucide-react';
import Image from 'next/image';
export default function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    // Check if already installed
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstalled(true);
      return;
    }

    // Listen for beforeinstallprompt event
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowPrompt(true);
    };

    window.addEventListener('beforeinstallprompt', handler);

    // Check if app was installed
    window.addEventListener('appinstalled', () => {
      setIsInstalled(true);
      setShowPrompt(false);
    });

    return () => {
      window.removeEventListener('beforeinstallprompt', handler);
    };
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;

    if (outcome === 'accepted') {
      setShowPrompt(false);
    }

    setDeferredPrompt(null);
  };

  const handleDismiss = () => {
    setShowPrompt(false);
    // Store dismissal in localStorage
    localStorage.setItem('pwa-prompt-dismissed', Date.now().toString());
  };

  // Don't show if already installed or dismissed recently
  if (isInstalled || !showPrompt) return null;

  return (
    <>
      {/* Mobile Banner (Bottom) */}
      <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden">
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-4 shadow-2xl">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3 flex-1">
              <div className="bg-white p-2 rounded-lg">
                <Image 
                  src="/icon-72.png" 
                  alt="TSA" 
                  className="w-10 h-10"
                />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-sm">Install TSA App</h3>
                <p className="text-xs text-blue-100">
                  Quick access & offline mode
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleInstall}
                className="bg-white text-blue-600 px-4 py-2 rounded-lg font-semibold text-sm hover:bg-blue-50 transition flex items-center gap-1"
              >
                <Download className="w-4 h-4" />
                Install
              </button>
              <button
                onClick={handleDismiss}
                className="text-white p-2 hover:bg-blue-800 rounded-lg transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop Banner (Top) */}
      <div className="hidden md:block fixed top-0 left-0 right-0 z-50">
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
          <div className="container mx-auto px-6 py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="bg-white p-2 rounded-lg">
                  <Image 
                    src="/icon-72.png" 
                    alt="TSA" 
                    className="w-8 h-8"
                  />
                </div>
                <div>
                  <h3 className="font-bold">Install Tensor Security Academy</h3>
                  <p className="text-sm text-blue-100">
                    Get faster access, offline support, and desktop notifications
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={handleInstall}
                  className="bg-white text-blue-600 px-6 py-2 rounded-lg font-semibold hover:bg-blue-50 transition flex items-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  Install App
                </button>
                <button
                  onClick={handleDismiss}
                  className="text-white hover:bg-blue-800 px-3 rounded-lg transition"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}