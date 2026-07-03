import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Capture PWA installation prompt
let deferredPrompt: any = null;
window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
  window.dispatchEvent(new CustomEvent('pwa-installable', { detail: e }));
});

// Provide global helpers on window to access or clear the prompt
(window as any).getDeferredPrompt = () => deferredPrompt;
(window as any).clearDeferredPrompt = () => {
  deferredPrompt = null;
  window.dispatchEvent(new CustomEvent('pwa-installable', { detail: null }));
};

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
