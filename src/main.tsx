import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app';
import './index.css';

if (['msw'].includes(import.meta.env.MODE)) {
  import('./mocks/browser');
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
