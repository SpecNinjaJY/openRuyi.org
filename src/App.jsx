import React from 'react';
import { ConfigProvider } from 'antd';
import Router from './router';

function App() {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#165DFF',
          fontFamily: 'Inter, system-ui, sans-serif',
        },
        components: {
          Button: {
            borderRadius: 6,
          },
          Card: {
            borderRadius: 8,
          },
        },
      }}
    >
      <Router />
    </ConfigProvider>
  );
}

export default App;
