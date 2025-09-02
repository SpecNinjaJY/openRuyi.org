import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import './i18n';
import { LanguageProvider } from './contexts/LanguageContext';
import theme from './theme'
import { ConfigProvider } from 'antd';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <ConfigProvider theme={theme}>
           <LanguageProvider>
            <App />
           </LanguageProvider>
      </ConfigProvider>
   
  </React.StrictMode>,
);
