import React, { useState, useEffect } from 'react';
import { Outlet, Link } from 'react-router-dom';
import { Layout } from 'antd';
import Footer from './Footer';
import LogoSvg from '@/assets/home/logo.svg';
import { useLanguage } from '../contexts/LanguageContext';
import './index.css'
// import Search from './Search';

const { Header: AntHeader, Content, Footer: AntFooter } = Layout;

const LayoutComponent = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
   const { t } = useLanguage();
  // 监听滚动事件，实现吸顶导航
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <Layout className="min-h-screen flex flex-col">
      {/* 吸顶导航栏 */}
      <AntHeader 
        className={`sticky top-0 z-50 transition-all duration-300 flex justify-between items-center`}
      >
        <img src={LogoSvg}/>
        <ul className="flex list-none flex-wrap gap-8 md:gap-16">{t('menulist', { returnObjects: true })?.map((t,index)=>
          <li className='menuItem' key={index}>
            <Link to={t.path}>
              {t.text}
            </Link>
            
            
            </li>
          )}</ul>

        <div>


        </div>
        
      </AntHeader>
      
      
      {/* 主内容区 */}
      <Content >
        <Outlet />
      </Content>
      
      {/* 页脚 */}
      <AntFooter>
        <Footer />
      </AntFooter>
    </Layout>
  );
};

export default LayoutComponent;
