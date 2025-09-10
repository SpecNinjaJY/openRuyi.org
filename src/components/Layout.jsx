import React, { useState, useRef, useEffect } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { Button, Drawer, Layout } from 'antd';
import Footer from './footer';
import LogoSvg from '@/assets/home/logo.svg';
import { useLanguage } from '../contexts/languageContext';
import './index.css'
import DropMenu from './dropmenu/dropmenu';
import ScrollToTop from './ScrollToTop';
import LanguageSwitch from './languageSwitch';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';

const { Header: AntHeader, Content, Footer: AntFooter } = Layout;

const LayoutComponent = () => {
  const location = useLocation();
  const [activeKey, setActiveKey] = useState();
  const closeTimerRef = useRef(null);
  const { t } = useLanguage();
  const [mobileMenuOpen,setMobileMenuOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  const isDropdonw = () =>{
    return ['project','develop','tech'].includes(activeKey)
  }


   // 路由变化时关闭所有抽屉
    useEffect(() => {
          if(location.pathname == '/news'|| location.pathname.includes('newsdetail')){
            setActiveKey('news')
          }
          else if(location.pathname == '/download'){
            setActiveKey('download')
          }
          else {
              setActiveKey(null);
          }

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
     
      setActiveKey(key);
    };
  
    // 2. 鼠标离开导航项（延迟关闭抽屉，给时间进入抽屉）
    const handleMouseLeave = (key) => {
      closeTimerRef.current = setTimeout(() => {

           if(location.pathname == '/news'|| location.pathname.includes('newsdetail')){
            setActiveKey('news')
          }
          else if(location.pathname == '/download'){
            setActiveKey('download')
          }
          else {
              setActiveKey(null);
          }
        
        //}
      }, 200);
    };
  
    const handleDropdownMouseEnter = () => {
      // 清除延迟关闭计时器，避免抽屉被误关
      if (closeTimerRef.current) {
        clearTimeout(closeTimerRef.current);
      }
    };

    const handleDropdownMouseLeave = () => {
          if(location.pathname == '/news'|| location.pathname.includes('newsdetail')){
            setActiveKey('news')
          }
          else if(location.pathname == '/download'){
            setActiveKey('download')
          }
          else {
              setActiveKey(null);
          }
        
    };



       // 监听窗口 resize 事件，更新移动端状态
  useEffect(() => {
    const handleResize = () => {
      // 防抖优化：避免频繁触发
      clearTimeout(window.resizeTimer);
      window.resizeTimer = setTimeout(() => {
        setIsMobile(window.innerWidth < 768);
        if(window.innerWidth < 768){
          setMobileMenuOpen(false)
        }
      }, 100);
    };

    // 初始加载时执行一次
    handleResize();
    // 绑定 resize 事件
    window.addEventListener('resize', handleResize);

    // 组件卸载时清理事件和定时器
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(window.resizeTimer);
    };
  }, []);


  return (
    <Layout className="min-h-screen flex flex-col">
      <ScrollToTop/>
      {/* 吸顶导航栏 */}
      <AntHeader 
        className={`sticky top-0 z-50 transition-all duration-300 flex justify-between items-center`}
      > 
          {/* 移动端菜单按钮 */}
            <Button  
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden"
              icon={mobileMenuOpen ?<MenuFoldOutlined />:<MenuUnfoldOutlined />}
            />

        <Link to={'/'}>
            <img src={LogoSvg}/>
        </Link>
      
        <ul className="list-none flex-wrap text-[16px] hidden md:flex gap-4 md:gap-8">{t('menulist', { returnObjects: true })?.map((t,index)=>
          <li className='w-[60px]' key={index}  onMouseEnter={() => handleMouseEnter(t.key)} onMouseLeave={() => handleMouseLeave(t.key)} >
            <Link to={t.path} onClick={()=>t.url && window.open(t.url) }  style={{color:activeKey == t.key? '#0062ff':'#333', cursor: isDropdonw() ? 'default':'pointer'}}>
              {t.text}
            </Link>
            </li>
          )}</ul>

        {
          <Drawer
            placement={'top'}
            open={isDropdonw()}
            style={{height:250}}
            //open={true}
            //onClose={handleMouseLeave}
            mask={false} // 关闭遮罩，避免遮挡页面（可根据需求开启）
            className="transition-all duration-300" // 增强过渡动画
            onMouseEnter={handleDropdownMouseEnter}
            onMouseLeave={handleDropdownMouseLeave}
          >
             <DropMenu 
              activeKey={activeKey}  />
          </Drawer>        
        }

        <Drawer
            placement={'left'}
            open={ mobileMenuOpen && isMobile}
            style={{width:'100vw'}}
            mask={false} 
            className="transition-all duration-300" 
          >
             <ul className="list-none flex-wrap text-[16px] hidden md:flex gap-4 md:gap-8">{t('menulist', { returnObjects: true })?.map((t,index)=>
          <li className='w-[60px]' key={index}  onMouseEnter={() => handleMouseEnter(t.key)} onMouseLeave={() => handleMouseLeave(t.key)} >
            <Link to={t.path} onClick={()=>t.url && window.open(t.url) }  style={{color:activeKey == t.key? '#0062ff':'#333', cursor: isDropdonw() ? 'default':'pointer'}}>
              {t.text}
            </Link>
            </li>
          )}</ul>
             
        </Drawer>   

          <div className="flex items-center space-x-3">
            {/* 语言切换 */}
            <LanguageSwitch />
            
          
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
