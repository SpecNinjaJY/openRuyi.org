import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, Button, Space } from 'antd';
import { 
  MenuOutlined, 
  SearchOutlined
} from '@ant-design/icons';
import LanguageSwitch from './LanguageSwitch';
import { useLanguage } from '../contexts/LanguageContext';


const Header = ({ isScrolled, mobileMenuOpen, setMobileMenuOpen, searchOpen, setSearchOpen }) => {
  const { t } = useLanguage();
  
  return (
    <div className="flex items-center justify-between h-16">
      {/* Logo */}
      <div className="flex items-center">
          
      </div>
      
      {/* 桌面端导航 */}
      
      
      {/* 操作区 */}
      <div className="flex items-center space-x-3">
        {/* 搜索按钮 */}
        <Button 
          icon={<SearchOutlined />} 
          onClick={() => setSearchOpen(true)}
          className="rounded-full"
          size="middle"
        />
        
        {/* 语言切换 */}
        <LanguageSwitch />
        
        {/* 移动端菜单按钮 */}
        <Button 
          icon={<MenuOutlined />} 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden rounded-full"
          size="middle"
        />
        
        {/* 加入按钮 */}
        <Button 
          type="primary" 
          className="hidden md:inline-flex bg-primary hover:bg-primary/90"
        >
          {t('joinNow')}
        </Button>
      </div>
    </div>
  );
};

export default Header;
