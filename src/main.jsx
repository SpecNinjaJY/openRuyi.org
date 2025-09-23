import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import '@/i18n/index.js';
import { LanguageProvider } from '@/contexts/languageContext.jsx';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <LanguageProvider>
            <App />
        </LanguageProvider>
   
  </React.StrictMode>,
);
