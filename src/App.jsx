import React, { useEffect } from 'react';
import { ConfigProvider } from 'antd';
import Router from './router';
import zhCN from 'antd/locale/zh_CN';


function App() {

  useEffect(() => {
    // 定义组件内的宽度处理函数
    const handleComponentResize = () => {
      const viewportWidth = window.innerWidth;
      console.log("React 中监听：当前可视区域宽度", viewportWidth);
      // 可在这里添加组件内的响应逻辑（如修改状态、调整样式）
    };

    // 绑定防抖后的监听
    window.addEventListener("resize", handleComponentResize);

    // 组件卸载时移除监听
    return () => {
      window.removeEventListener("resize", handleComponentResize);
    };
  }, []);

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
