'use client';

import { useEffect, useMemo, useState } from 'react';
import { Download, X } from 'lucide-react';
import Image from 'next/image';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>;
}

const DISMISS_KEY = 'pwa-prompt-dismissed';

// Banner behavior
const SHOW_MS = 4500;     // total time visible
const EXIT_MS = 250;      // exit animation duration
const ENTER_MS = 280;     // enter animation duration

function isMobileDevice(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(max-width: 767px)').matches;
}

function isStandalone(): boolean {
  if (typeof window === 'undefined') return false;
  const iosStandalone = (window.navigator as unknown as { standalone?: boolean }).standalone === true;
  const displayModeStandalone = window.matchMedia('(display-mode: standalone)').matches;
  return iosStandalone || displayModeStandalone;
}

function isIOS(): boolean {
  if (typeof window === 'undefined') return false;
  return /iphone|ipad|ipod/i.test(window.navigator.userAgent);
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
  // you can change this if you want a cooldown; for now, "dismiss" hides until next reload?
  // If you want only for current visit: comment out localStorage usage entirely.
  return Number.isFinite(last) && Date.now() - last < 5 * 60 * 1000; // 5 minutes
}

export default function InstallPrompt() {
  const mobileOnly = useMemo(() => isMobileDevice(), []);
  const installed = useMemo(() => isStandalone(), []);
  const iosSafari = useMemo(() => isIOS() && isSafari(), []);

  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);

  // Render banner on load (mobile only, not installed, not recently dismissed)
  const [render, setRender] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    return isMobileDevice() && !isStandalone() && !dismissedRecently();
  });

  // phase controls enter/exit animation
  const [phase, setPhase] = useState<'enter' | 'exit'>('enter');

  useEffect(() => {
    if (!render) return;

    // Auto-hide: start exit a bit before we fully remove
    const t1 = window.setTimeout(() => setPhase('exit'), Math.max(0, SHOW_MS - EXIT_MS));
    const t2 = window.setTimeout(() => setRender(false), SHOW_MS);

    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
    };
  }, [render]);

  useEffect(() => {
    if (!mobileOnly || installed) return;

    const onBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };

    const onAppInstalled = () => {
      setDeferredPrompt(null);
      setRender(false);
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
    if (outcome === 'accepted') setRender(false);
    setDeferredPrompt(null);
  };

  const handleDismiss = () => {
    // hide now + mark dismissed (short cooldown)
    localStorage.setItem(DISMISS_KEY, Date.now().toString());
    setPhase('exit');
    window.setTimeout(() => setRender(false), EXIT_MS);
  };

  if (!mobileOnly || installed || !render) return null;

  const showInstallButton = !!deferredPrompt && !iosSafari;

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
        @keyframes tsaSlideDown {
          from {
            transform: translateY(0);
            opacity: 1;
          }
          to {
            transform: translateY(100%);
            opacity: 0;
          }
        }
      `}</style>

      <div
        className="fixed bottom-0 left-0 right-0 z-[9999] md:hidden pb-[env(safe-area-inset-bottom)]"
        style={{
          animation:
            phase === 'enter'
              ? `tsaSlideUp ${ENTER_MS}ms ease-out both`
              : `tsaSlideDown ${EXIT_MS}ms ease-in both`,
        }}
      >
        <div className="bg-black/40 backdrop-blur-xl text-white p-4 shadow-2xl border border-white/40 rounded-xl">

          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3 flex-1">
              <div className="bg-white/10 p-2 rounded-lg">
                <Image src="/icon-72.png" alt="TSA" width={40} height={40} />
              </div>

              <div className="flex-1">
                <h4 className="font-bold text-sm">Install TSA App</h4>

                {iosSafari ? (
                  <p className="text-xs text-white/80">iPhone: Share → Add to Home Screen</p>
                ) : showInstallButton ? (
                  <p className="text-xs text-white/80">Quick access & offline mode</p>
                ) : (
                  <p className="text-xs text-white/80">Android: Browser menu → “Install app”</p>
                )}
              </div>
            </div>

            <div className="flex gap-2">
              {showInstallButton ? (
                <button
                  onClick={handleInstall}
                  className="border border-white/60 text-white bg-white/10 px-4 py-2 rounded-lg font-semibold text-sm hover:bg-white/20 transition flex items-center gap-1"

                >
                  <Download className="w-4 h-4" />
                  Install
                </button>
              ) : (
                <button
                  onClick={handleDismiss}
                 className="border border-white/40 text-white bg-white/10 px-4 py-2 rounded-lg font-semibold text-sm hover:bg-white/20 transition"

                >
                  OK
                </button>
              )}

              <button
                onClick={handleDismiss}
                className="border border-white/30 text-white bg-white/10 p-2 hover:bg-white/20 rounded-lg transition"

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
