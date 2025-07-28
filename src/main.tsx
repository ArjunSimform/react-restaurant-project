import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { Toaster } from 'sonner';

import * as Sentry from '@sentry/react';

Sentry.init({
  dsn: 'https://42b7d2a705dac87f043e926f86fb0ee0@o4509745335238656.ingest.us.sentry.io/4509745336483840',
  // Setting this option to true will send default PII data to Sentry.
  // For example, automatic IP address collection on events
  sendDefaultPii: true,
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
    <Toaster richColors position="top-right" />{' '}
  </StrictMode>
);
