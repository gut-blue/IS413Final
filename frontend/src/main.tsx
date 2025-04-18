// src/main.tsx
import React from 'react';
import ReactDOM from 'react-dom/client'; // ← note '/client'
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';

const rootEl = document.getElementById('root');
if (!rootEl) throw new Error('Failed to find root element');

ReactDOM.createRoot(rootEl) // createRoot lives here in React 18+
  .render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
