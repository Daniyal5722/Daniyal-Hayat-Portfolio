import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import { registerSW } from 'virtual:pwa-register';
import App from './App.tsx';
import './index.css';

// Suppress benign Vite HMR websocket connection messages in container preview environment
if (typeof window !== 'undefined') {
  const originalError = console.error;
  const originalWarn = console.warn;
  console.error = (...args: unknown[]) => {
    if (typeof args[0] === 'string' && args[0].includes('[vite]')) {
      return;
    }
    originalError.apply(console, args);
  };
  console.warn = (...args: unknown[]) => {
    if (typeof args[0] === 'string' && args[0].includes('[vite]')) {
      return;
    }
    originalWarn.apply(console, args);
  };
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
