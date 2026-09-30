import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import { registerSW } from 'virtual:pwa-register';
import App from './App.tsx';
import './index.css';


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
