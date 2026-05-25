import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter } from 'react-router';
import './index.css';
import App from './App.tsx';
import AuthGuard from './components/AuthGuard';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HashRouter>
      <AuthGuard>
        <App />
      </AuthGuard>
    </HashRouter>
  </StrictMode>,
);
