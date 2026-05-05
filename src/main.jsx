import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
// ismal
import './styles.css';
import './global-theme.css';
import App from './App.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
)

//npm install i18next react-i18next i18next-browser-languagedetector i18next-http-backend