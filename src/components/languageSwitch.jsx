import React from 'react';
import { Dropdown, Menu, Avatar } from 'antd';
import { GlobalOutlined } from '@ant-design/icons';
import { useLanguage } from '@/contexts/languageContext.jsx';

const LanguageSwitch = () => {
  const { language, changeLanguage } = useLanguage();
  
  // 语言选项配置
  const languageOptions = [
    { key: 'zh', label: '中文', icon: '🇨🇳' },
    { key: 'en', label: 'English', icon: '🇺🇸' }
  ];
  
  // 生成下拉菜单
  const menu = (
    <Menu 
      onClick={({ key }) => changeLanguage(key)}
      selectedKeys={[language]}
    >
      {languageOptions.map(option => (
        <Menu.Item key={option.key} className="flex items-center">
          <span className="mr-2">{option.icon}</span>
          {option.label}
        </Menu.Item>
      ))}
    </Menu>
  );
  
  // 当前选中的语言信息
  const currentLang = languageOptions.find(option => option.key === language);
  
  return (
    <Dropdown 
      overlay={menu} 
      placement="bottomRight"
      arrow
    >
      <div className="flex items-center cursor-pointer px-2 py-1 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
        <Avatar 
          icon={<GlobalOutlined />} 
          size="small" 
          className="mr-1 bg-primary/10 text-primary"
        />
        <span className="hidden sm:inline">{currentLang?.label}</span>
      </div>
    </Dropdown>
  );
};

export default LanguageSwitch;
