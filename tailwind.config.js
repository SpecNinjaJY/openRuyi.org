/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",  // 匹配你的 React 组件文件
  ],
  theme: {
    extend: {
       maxWidth: {
        '8xl': '90rem', // 自定义 1440px
        '9xl': '95rem', // 自定义 1440px
      },
       aspectRatio: {
          // 自定义比例：键名（类名）→ 比例值
          '4/3': '4/3',       // 4:3 常用比例（如老电视、文档）
          '5/4': '5/4',       // 5:4 照片比例
          '1.85/1': '1.85/1', // 电影宽屏比例（1.85:1）
          '9/16': '9/16',     // 竖版视频（如抖音、快手）
      },
    },
    screens: {
        'xs': '360px',    // 超小屏手机（如小屏安卓机）
        'sm': '640px',    // 小屏手机（如 iPhone SE）
        'md': '768px',    // 平板竖屏 / 大屏手机
        'lg': '1024px',   // 平板横屏 / 小屏电脑
        'xl': '1280px',   // 主流电脑屏
        '2xl': '1536px',  // 大屏显示器
    },
  },
  plugins: [],
}