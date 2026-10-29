import React from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import SiteApp from './SiteApp.jsx';
import './style.css';
import 'lenis/dist/lenis.css';

const path = window.location.pathname.replace(/\/$/, '') || '/';
const root = document.getElementById('root');
const app = (
  <React.StrictMode>
    <SiteApp path={path} />
  </React.StrictMode>
);

// Production pages arrive pre-rendered (see prerender.js); the dev server serves an empty shell.
if (root.hasChildNodes()) hydrateRoot(root, app);
else createRoot(root).render(app);
