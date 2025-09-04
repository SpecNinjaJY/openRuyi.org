import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import './i18n';
import { LanguageProvider } from './contexts/languageContext';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <LanguageProvider>
   
            <App />
        </LanguageProvider>
   
  </React.StrictMode>,
);
