import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// 全局滚动到顶部组件：路由变化时触发
const ScrollToTop = () => {
  const location = useLocation(); // 获取当前路由位置

  // 监听路由 pathname 变化（路由切换时执行）
  useEffect(() => {
    // 滚动到页面顶部（x=0, y=0），behavior: 'smooth' 可选，实现平滑滚动
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth', // 移除则为瞬间跳转，保留则为平滑滚动
    });
  }, [location.pathname]); // 依赖：仅当路由路径变化时执行

  return null; // 无 UI 渲染，仅做逻辑处理
};

export default ScrollToTop;
