// 定义全局主题配置，primaryColor 为核心
export default {
  token: {
    // 核心：自定义全局主色（示例：深紫色，可替换为任意色值）
    colorPrimary: '#0062FF', 
    // 可选：同步修改其他关联颜色（与主色协调）
    colorError: '#F53F3F', // 错误色
    // 其他可自定义 Token：https://ant.design/docs/react/customize-theme-cn#%E4%BD%BF%E7%94%A8-Token-%E8%AE%BE%E7%BD%AE%E4%B8%BB%E9%A2%98
  },
  // 可选：配置组件专属样式（如 Button、Input 等）
  components: {
    Button: {
      fontSizeSM: 14, // 小号按钮字体大小
      borderRadius: 4, // 按钮圆角
    },
    Input: {
      borderRadius: 4, // 输入框圆角
    },
  },
};
