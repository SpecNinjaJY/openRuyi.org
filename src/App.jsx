import React, { useEffect } from 'react';
import { ConfigProvider } from 'antd';
import Router from '@/router/index.jsx';
import zhCN from 'antd/locale/zh_CN';


function App() {



  return (
    <ConfigProvider locale={zhCN}
      theme={{
        token: {
          colorPrimary: '#165DFF',
          fontFamily: 'Inter, system-ui, sans-serif',
        },
        components: {
          Button: {
            borderRadius: 4,
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
