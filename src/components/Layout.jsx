import React, { useState, useEffect, useRef } from 'react';
import { Outlet, Link } from 'react-router-dom';
import { Layout } from 'antd';
import Footer from './footer';
import LogoSvg from '@/assets/home/logo.svg';
import { useLanguage } from '../contexts/languageContext';
import './index.css'
import DropMenu from './dropmenu/dropmenu';
import { SearchOutlined } from '@ant-design/icons';
import ScrollToTop from './ScrollToTop';
// import Search from './Search';

const { Header: AntHeader, Content, Footer: AntFooter } = Layout;

const LayoutComponent = () => {

  const [activeKey, setActiveKey] = useState(null);
    const closeTimerRef = useRef(null);
      const dropdownRefs = useRef({});
  const { t } = useLanguage();


  const isDropdonw = () =>{
    return ['develop','tech','task','learning'].includes(activeKey)
  }


   // 路由变化时关闭所有抽屉
    useEffect(() => {
      setActiveKey(null);
      // 清除未执行的延迟计时器
      if (closeTimerRef.current) {
        clearTimeout(closeTimerRef.current);
      }
      // 组件卸载时清除计时器
      return () => {
        if (closeTimerRef.current) {
          clearTimeout(closeTimerRef.current);
        }
      };
    }, [location.pathname]);
  
    // --------------- 核心事件逻辑（修复activeKey问题）---------------
    // 1. 鼠标进入导航项（展开抽屉）
    const handleMouseEnter = (key) => {
      // 清除之前的延迟关闭计时器（避免切换时误关）
      if (closeTimerRef.current) {
        clearTimeout(closeTimerRef.current);
      }
      // 展开当前抽屉（无需关闭其他，后续离开时自动关闭）
      setActiveKey(key);
    };
  
    // 2. 鼠标离开导航项（延迟关闭抽屉，给时间进入抽屉）
    const handleMouseLeave = (key) => {
      // 延迟150ms关闭：足够用户从导航项滑到抽屉
      closeTimerRef.current = setTimeout(() => {
        // 检查鼠标是否已进入当前抽屉：若在抽屉内，不关闭
        const isMouseInDropdown = dropdownRefs.current[key]?.matches(':hover');
        if (!isMouseInDropdown) {
          setActiveKey(null);
        }
      }, 150);
    };
  
    // 3. 鼠标进入抽屉（保持抽屉展开）
    const handleDropdownMouseEnter = () => {
      // 清除延迟关闭计时器，避免抽屉被误关
      if (closeTimerRef.current) {
        clearTimeout(closeTimerRef.current);
      }
    };
  
    // 4. 鼠标离开抽屉（关闭抽屉）
    const handleDropdownMouseLeave = () => {
      setActiveKey(null);
    };

  return (
    <Layout className="min-h-screen flex flex-col">
      <ScrollToTop/>
      {/* 吸顶导航栏 */}
      <AntHeader 
        className={`sticky top-0 z-50 transition-all duration-300 flex justify-between items-center`}
      > 
        <Link to={'/'}>
            <img src={LogoSvg}/>
        </Link>
      
        <ul className="flex list-none flex-wrap text-[16px] gap-8 md:gap-16">{t('menulist', { returnObjects: true })?.map((t,index)=>
          <li key={index}  onMouseEnter={() => handleMouseEnter(t.key)} onMouseLeave={() => handleMouseLeave(t.key)} >
            <Link to={t.path}  style={{cursor: isDropdonw() ? 'default':'pointer'}}>
              {t.text}
            </Link>
            </li>
          )}</ul>

        {isDropdonw() && <div  
          className='bg-white w-full pt-6 px-12 h-[350px] absolute top-[74px] left-0 transition-all duration-300 translate-y-0 ease-in-out'
            onMouseEnter={handleDropdownMouseEnter} onMouseLeave={handleDropdownMouseLeave}
          >
            <DropMenu/>
        </div>}

        <div>
          <SearchOutlined  style={{fontSize:20}}/>

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
