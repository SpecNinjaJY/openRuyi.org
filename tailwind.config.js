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
    },
  },
  plugins: [],
}