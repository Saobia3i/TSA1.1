'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { Download, X } from 'lucide-react';
import Image from 'next/image';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>;
}

const DISMISS_KEY = 'pwa-prompt-dismissed';
const SHOW_MS = 4500;
const EXIT_MS = 350;
const ENTER_MS = 380;
const TOP_OFFSET_PX = 80;

function safeWindow(): Window | null {
  return typeof window === 'undefined' ? null : window;
}

function isMobileDevice(): boolean {
  const w = safeWindow();
  if (!w) return false;
  return w.matchMedia('(max-width: 767px)').matches;
}

function isStandalone(): boolean {
  const w = safeWindow();
  if (!w) return false;
  const nav = w.navigator as unknown as { standalone?: boolean };
  const iosStandalone = nav.standalone === true;
  const displayModeStandalone = w.matchMedia('(display-mode: standalone)').matches;
  return iosStandalone || displayModeStandalone;
}

function isIOS(): boolean {
  const w = safeWindow();
  if (!w) return false;
  return /iphone|ipad|ipod/i.test(w.navigator.userAgent);
}

function isSafari(): boolean {
  const w = safeWindow();
  if (!w) return false;
  const ua = w.navigator.userAgent.toLowerCase();
  return ua.includes('safari') && !ua.includes('chrome') && !ua.includes('crios') && !ua.includes('fxios');
}

function dismissedRecently(): boolean {
  const w = safeWindow();
  if (!w) return false;
  const raw = w.localStorage.getItem(DISMISS_KEY);
  if (!raw) return false;
  const last = Number(raw);
  return Number.isFinite(last) && Date.now() - last < 5 * 60 * 1000;
}

export default function InstallPrompt() {
  const cssInjectedRef = useRef(false);

  const [clientReady, setClientReady] = useState(false);
  const [render, setRender] = useState(false);
  const [phase, setPhase] = useState<'enter' | 'exit'>('enter');
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);

  const mobileOnly = useMemo(() => (clientReady ? isMobileDevice() : false), [clientReady]);
  const installed = useMemo(() => (clientReady ? isStandalone() : false), [clientReady]);
  const iosSafari = useMemo(() => (clientReady ? isIOS() && isSafari() : false), [clientReady]);

  useEffect(() => {
    const w = safeWindow();
    if (!w) return;

    const raf = w.requestAnimationFrame(() => {
      if (!cssInjectedRef.current) {
        const style = document.createElement('style');
        style.setAttribute('data-tsa-installprompt', 'true');
        style.innerHTML = `
          @keyframes tsaSlideDownTop {
            from { transform: translateY(-120%); opacity: 0; }
            to   { transform: translateY(0); opacity: 1; }
          }
          @keyframes tsaSlideUpTop {
            from { transform: translateY(0); opacity: 1; }
            to   { transform: translateY(-120%); opacity: 0; }
          }
        `;
        document.head.appendChild(style);
        cssInjectedRef.current = true;
      }

      setClientReady(true);

      const m = isMobileDevice();
      const s = isStandalone();
      if (m && !s && !dismissedRecently()) {
        setRender(true);
        setPhase('enter');
      }
    });

    return () => w.cancelAnimationFrame(raf);
  }, []);

  useEffect(() => {
    const w = safeWindow();
    if (!w) return;
    if (!clientReady || !render) return;

    const t1 = w.setTimeout(() => setPhase('exit'), Math.max(0, SHOW_MS - EXIT_MS));
    const t2 = w.setTimeout(() => setRender(false), SHOW_MS);

    return () => {
      w.clearTimeout(t1);
      w.clearTimeout(t2);
    };
  }, [clientReady, render]);

  useEffect(() => {
    const w = safeWindow();
    if (!w) return;
    if (!clientReady) return;
    if (!mobileOnly || installed) return;

    const onBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };

    const onAppInstalled = () => {
      setDeferredPrompt(null);
      setRender(false);
    };

    w.addEventListener('beforeinstallprompt', onBeforeInstallPrompt);
    w.addEventListener('appinstalled', onAppInstalled);

    return () => {
      w.removeEventListener('beforeinstallprompt', onBeforeInstallPrompt);
      w.removeEventListener('appinstalled', onAppInstalled);
    };
  }, [clientReady, mobileOnly, installed]);

  const showHintTemporarily = (msg: string) => {
    console.info('Install hint:', msg);
  };

  const handleInstallClick = async () => {
    const w = safeWindow();
    if (!w) return;

    if (iosSafari) {
      showHintTemporarily('iPhone: Share → Add to Home Screen');
      return;
    }

    if (deferredPrompt) {
      await deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;

      if (outcome === 'accepted') {
        setPhase('exit');
        w.setTimeout(() => setRender(false), EXIT_MS);
      }
      setDeferredPrompt(null);
      return;
    }

    showHintTemporarily('Open Chrome menu (⋮) → Install app');
  };

  const handleDismiss = () => {
    const w = safeWindow();
    if (!w) return;

    w.localStorage.setItem(DISMISS_KEY, Date.now().toString());
    setPhase('exit');
    w.setTimeout(() => setRender(false), EXIT_MS);
  };

  if (!clientReady) return null;
  if (!mobileOnly || installed || !render) return null;

  return (
    <div
      className="fixed left-0 right-0 z-50 md:hidden flex justify-center items-start px-4"
      style={{
        top: TOP_OFFSET_PX,
        animation:
          phase === 'enter'
            ? `tsaSlideDownTop ${ENTER_MS}ms ease-out both`
            : `tsaSlideUpTop ${EXIT_MS}ms ease-in both`,
      }}
    >
      <div className="w-full max-w-md bg-black/80 backdrop-blur-2xl text-white p-3 shadow-2xl rounded-xl border border-white/80">

        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <div className="bg-white/10 p-2 rounded-lg shrink-0">
              <Image src="/icon-72.png" alt="TSA" width={32} height={32} />
            </div>

            <div className="flex-1">
              <h5 className="font-bold text-sm">Install TSA App</h5>
              {iosSafari ? (
                <p className="text-xs text-white/80">iPhone: Share → Add to Home Screen</p>
              ) : deferredPrompt ? (
                <p className="text-xs text-white/80">Quick access & offline mode</p>
              ) : (
                <p className="text-xs text-white/80">Get faster access</p>
              )}
            </div>
          </div>

          <div className="flex gap-2 shrink-0">
            <button
              onClick={handleInstallClick}
              className="border border-white text-white bg-white/10 px-3 py-2 rounded-lg font-semibold text-xs hover:bg-white/20 transition flex items-center gap-1"
            >
              <Download className="w-4 h-4" />
              Install
            </button>

            <button
              onClick={handleDismiss}
              className="border border-white text-white bg-white/10 p-2 hover:bg-white/20 rounded-lg transition"
              aria-label="Dismiss"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}