'use client';

import { useEffect, useMemo, useState } from 'react';
import { Download, X } from 'lucide-react';
import Image from 'next/image';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>;
}

const DISMISS_KEY = 'pwa-prompt-dismissed';
const DISMISS_COOLDOWN_MS = 7 * 24 * 60 * 60 * 1000; // 7 days

function isStandalone(): boolean {
  if (typeof window === 'undefined') return false;
  const iosStandalone = (window.navigator as unknown as { standalone?: boolean }).standalone === true;
  const displayModeStandalone = window.matchMedia('(display-mode: standalone)').matches;
  return iosStandalone || displayModeStandalone;
}

function isMobileDevice(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(max-width: 767px)').matches;
}

function isIOS(): boolean {
  if (typeof window === 'undefined') return false;
  const ua = window.navigator.userAgent.toLowerCase();
  return /iphone|ipad|ipod/.test(ua);
}

function isSafari(): boolean {
  if (typeof window === 'undefined') return false;
  const ua = window.navigator.userAgent.toLowerCase();
  return ua.includes('safari') && !ua.includes('chrome') && !ua.includes('crios') && !ua.includes('fxios');
}

function dismissedRecently(): boolean {
  if (typeof window === 'undefined') return false;
  const raw = localStorage.getItem(DISMISS_KEY);
  if (!raw) return false;
  const last = Number(raw);
  return Number.isFinite(last) && Date.now() - last < DISMISS_COOLDOWN_MS;
}

export default function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showPrompt, setShowPrompt] = useState(false);

  // Compute once on first client render (no setState in effects)
  const mobileOnly = useMemo(() => isMobileDevice(), []);
  const installed = useMemo(() => isStandalone(), []);

  // iOS fallback: show banner even without beforeinstallprompt
  const showIOSFallback = useMemo(() => {
    return mobileOnly && !installed && !dismissedRecently() && isIOS() && isSafari();
  }, [mobileOnly, installed]);

  useEffect(() => {
    if (!mobileOnly) return;
    if (installed) return;
    if (dismissedRecently()) return;

    const onBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setShowPrompt(true);
    };

    const onAppInstalled = () => {
      setShowPrompt(false);
      setDeferredPrompt(null);
    };

    window.addEventListener('beforeinstallprompt', onBeforeInstallPrompt);
    window.addEventListener('appinstalled', onAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', onBeforeInstallPrompt);
      window.removeEventListener('appinstalled', onAppInstalled);
    };
  }, [mobileOnly, installed]);

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
    setDeferredPrompt(null);
    localStorage.setItem(DISMISS_KEY, Date.now().toString());
  };

  // Visibility:
  // - Android: showPrompt becomes true when beforeinstallprompt fires
  // - iOS Safari: showIOSFallback true (no beforeinstallprompt on iOS)
  const shouldShow = mobileOnly && !installed && !dismissedRecently() && (showPrompt || showIOSFallback);
  if (!shouldShow) return null;

  return (
    <>
      <style jsx global>{`
        @keyframes tsaSlideUp {
          from {
            transform: translateY(100%);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
      `}</style>

      <div
        className="fixed bottom-0 left-0 right-0 z-[9999] md:hidden pb-[env(safe-area-inset-bottom)]"
        style={{ animation: 'tsaSlideUp 300ms ease-out both' }}
      >
        <div className="bg-black/70 backdrop-blur-md text-white p-4 shadow-2xl">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3 flex-1">
              <div className="bg-white/10 p-2 rounded-lg">
                <Image src="/icon-72.png" alt="TSA" width={40} height={40} />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-sm">Install TSA App</h3>

                {showIOSFallback && !deferredPrompt ? (
                  <p className="text-xs text-white/80">On iPhone: Share → “Add to Home Screen”</p>
                ) : (
                  <p className="text-xs text-white/80">Quick access & offline mode</p>
                )}
              </div>
            </div>

            <div className="flex gap-2">
              {deferredPrompt ? (
                <button
                  onClick={handleInstall}
                  className="bg-white text-black px-4 py-2 rounded-lg font-semibold text-sm hover:bg-white/90 transition flex items-center gap-1"
                >
                  <Download className="w-4 h-4" />
                  Install
                </button>
              ) : (
                <button
                  onClick={handleDismiss}
                  className="bg-white/10 text-white px-4 py-2 rounded-lg font-semibold text-sm hover:bg-white/15 transition"
                >
                  OK
                </button>
              )}

              <button
                onClick={handleDismiss}
                className="text-white p-2 hover:bg-white/10 rounded-lg transition"
                aria-label="Dismiss install prompt"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
