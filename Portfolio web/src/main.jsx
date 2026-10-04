import React from 'react';
import { createRoot } from 'react-dom/client';
import SiteApp from './SiteApp.jsx';
import './style.css';
import 'lenis/dist/lenis.css';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <SiteApp />
  </React.StrictMode>
);
