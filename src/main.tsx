import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import { registerSW } from 'virtual:pwa-register';
import App from './App.tsx';
import './index.css';

// Suppress benign Vite HMR websocket connection messages in container preview environment
if (typeof window !== 'undefined') {
  const suppress = (...args: unknown[]) => {
    const msg = args.map(arg => String(arg).toLowerCase()).join(' ');
    const patterns = [
      '[vite] failed to connect to websocket',
      '[vite] connecting...',
      '[vite] server connection lost',
      'websocket connection to',
      '[vite] error',
      '[vite] reconnecting...',
      'failed to load resource: net::err_connection_refused'
    ];
    return patterns.some(p => msg.includes(p));
  };

  const originalLog = console.log;
  const originalWarn = console.warn;
  const originalError = console.error;
  const originalDebug = console.debug;

  console.log = (...args: unknown[]) => { if (!suppress(...args)) originalLog.apply(console, args); };
  console.warn = (...args: unknown[]) => { if (!suppress(...args)) originalWarn.apply(console, args); };
  console.error = (...args: unknown[]) => { if (!suppress(...args)) originalError.apply(console, args); };
  console.debug = (...args: unknown[]) => { if (!suppress(...args)) originalDebug.apply(console, args); };
}

// Auto-register service worker for progressive offline capabilities
if ('serviceWorker' in navigator && typeof window !== 'undefined') {
  try {
    registerSW({
      immediate: true,
      onRegisterError(error: unknown) {
        console.debug('Service worker registration status:', error);
      }
    });
  } catch {
    // Ignore in sandboxed previews
  }
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
