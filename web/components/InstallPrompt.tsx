'use client';

import { useEffect, useState } from 'react';
import { Download, X } from 'lucide-react';
import Image from 'next/image';

// Non-standard but widely used event type (Chrome/Edge/Android)
interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>;
}

const DISMISS_KEY = 'pwa-prompt-dismissed';
const DISMISS_COOLDOWN_MS = 7 * 24 * 60 * 60 * 1000; // 7 days

function getIsInstalled(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(display-mode: standalone)').matches;
}

function wasDismissedRecently(): boolean {
  if (typeof window === 'undefined') return false;
  const raw = window.localStorage.getItem(DISMISS_KEY);
  if (!raw) return false;
  const last = Number(raw);
  return Number.isFinite(last) && Date.now() - last < DISMISS_COOLDOWN_MS;
}

export default function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const [isInstalled, setIsInstalled] = useState<boolean>(() => getIsInstalled());

  useEffect(() => {
    // Subscribe to install availability
    const onBeforeInstallPrompt = (e: Event) => {
      if (wasDismissedRecently()) return;

      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setShowPrompt(true);
    };

    // Subscribe to installed event
    const onAppInstalled = () => {
      setIsInstalled(true);
      setShowPrompt(false);
      setDeferredPrompt(null);
    };

    window.addEventListener('beforeinstallprompt', onBeforeInstallPrompt);
    window.addEventListener('appinstalled', onAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', onBeforeInstallPrompt);
      window.removeEventListener('appinstalled', onAppInstalled);
    };
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;

    await deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;

    if (outcome === 'accepted') {
      setShowPrompt(false);
    }

    setDeferredPrompt(null);
  };

  const handleDismiss = () => {
    setShowPrompt(false);
    localStorage.setItem(DISMISS_KEY, Date.now().toString());
  };

  // Don't show if already installed or no prompt ready
  if (isInstalled || !showPrompt) return null;

  return (
    <>
      {/* Mobile Banner (Bottom) */}
      <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden">
        <div className="bg-black/70 backdrop-blur-md text-white p-4 shadow-2xl">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3 flex-1">
              <div className="bg-white p-2 rounded-lg">
                <Image src="/icon-72.png" alt="TSA" width={40} height={40} />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-sm">Install TSA App</h3>
                <p className="text-xs text-white/80">Quick access & offline mode</p>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleInstall}
                className="bg-white text-black px-4 py-2 rounded-lg font-semibold text-sm hover:bg-white/90 transition flex items-center gap-1"
              >
                <Download className="w-4 h-4" />
                Install
              </button>
              <button onClick={handleDismiss} className="text-white p-2 hover:bg-white/10 rounded-lg transition">
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop Banner (Top) */}
      <div className="hidden md:block fixed top-0 left-0 right-0 z-50">
        <div className="bg-black/70 backdrop-blur-md text-white">
          <div className="container mx-auto px-6 py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="bg-white p-2 rounded-lg">
                  <Image src="/icon-72.png" alt="TSA" width={32} height={32} />
                </div>
                <div>
                  <h3 className="font-bold">Install Tensor Security Academy</h3>
                  <p className="text-sm text-white/80">
                    Get faster access, offline support, and desktop notifications
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={handleInstall}
                  className="bg-white text-black px-6 py-2 rounded-lg font-semibold hover:bg-white/90 transition flex items-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  Install App
                </button>
                <button onClick={handleDismiss} className="text-white hover:bg-white/10 px-3 rounded-lg transition">
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
