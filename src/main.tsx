import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import { registerSW } from 'virtual:pwa-register';
import App from './App.tsx';
import './index.css';

// Suppress benign Vite HMR websocket connection messages in container preview environment
if (typeof window !== 'undefined') {
  const suppress = (...args: unknown[]) => {
    const msg = typeof args[0] === 'string' ? args[0] : '';
    if (
      msg.includes('[vite] failed to connect to websocket') || 
      msg.includes('[vite] connecting...') ||
      msg.includes('[vite] server connection lost') ||
      msg.includes('WebSocket connection to')
    ) {
      return true;
    }
    return false;
  };

  const originalLog = console.log;
  const originalWarn = console.warn;
  const originalError = console.error;

  console.log = (...args: unknown[]) => { if (!suppress(...args)) originalLog.apply(console, args); };
  console.warn = (...args: unknown[]) => { if (!suppress(...args)) originalWarn.apply(console, args); };
  console.error = (...args: unknown[]) => { if (!suppress(...args)) originalError.apply(console, args); };
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
