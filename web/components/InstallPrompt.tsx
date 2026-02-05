'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { Download, X } from 'lucide-react';
import Image from 'next/image';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>;
}

const DISMISS_KEY = 'pwa-prompt-dismissed';

// ✅ slightly less delay
const SHOW_MS = 2100;
const EXIT_MS = 250;
const ENTER_MS = 280;
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
  return Number.isFinite(last) && Date.now() - last < 5 * 60 * 1000; // 5 minutes
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

  const handleInstallClick = async () => {
    const w = safeWindow();
    if (!w) return;

    if (iosSafari) return;

    if (deferredPrompt) {
      await deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;

      if (outcome === 'accepted') {
        setPhase('exit');
        w.setTimeout(() => setRender(false), EXIT_MS);
      }
      setDeferredPrompt(null);
    }
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
      className="fixed left-0 right-0 z-[999999] md:hidden flex justify-center items-start px-4"
      style={{
        top: TOP_OFFSET_PX,
        animation:
          phase === 'enter'
            ? `tsaSlideDownTop ${ENTER_MS}ms ease-out both`
            : `tsaSlideUpTop ${EXIT_MS}ms ease-in both`,
      }}
    >
      <div
        className="w-full max-w-[320px] shadow-2xl rounded-xl"
        // ✅ more inner space from border
        style={{
          padding: '12px', // was p-3
          backgroundColor: 'rgba(0,0,0,0.88)',
          // ✅ thinner border
          border: '1.25px solid rgba(255,255,255,0.75)',
          backdropFilter: 'blur(18px)',
          WebkitBackdropFilter: 'blur(18px)',
        }}
      >
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <div
              className="p-2 rounded-lg shrink-0"
              style={{ backgroundColor: 'rgba(255,255,255,0.10)' }}
            >
              <Image src="/icon-72.png" alt="TSA" width={32} height={32} />
            </div>

            {/* ✅ tiny vertical padding so text doesn't feel glued */}
            <div className="flex-1 min-w-0 py-0">
              <h5 className="font-bold text-sm text-white leading-tight">Install TSA App</h5>

              {iosSafari ? (
                <p className="text-xs text-white/80">iPhone: Share → Add to Home Screen</p>
              ) : (
                <p className="text-xs text-white/80">Quick access & offline mode</p>
              )}
            </div>
          </div>

          <div className="flex gap-2 shrink-0">
            <button
              onClick={handleInstallClick}
              className="px-3 py-2 rounded-lg font-semibold text-xs transition flex items-center gap-1"
              style={{
                border: '1px solid rgba(255,255,255,0.75)',
                backgroundColor: 'rgba(255,255,255,0.10)',
                color: '#fff',
              }}
            >
              <Download className="w-4 h-4" />
              Install
            </button>

            <button
              onClick={handleDismiss}
              className="p-2 rounded-lg transition"
              style={{
                border: '1px solid rgba(255,255,255,0.55)',
                backgroundColor: 'rgba(255,255,255,0.10)',
                color: '#fff',
              }}
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
