import React, { useState, useRef, useEffect } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { Drawer, Layout } from 'antd';
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
  const location = useLocation();
  const [activeKey, setActiveKey] = useState();
  const closeTimerRef = useRef(null);
  const { t } = useLanguage();

  const isDropdonw = () =>{
    return ['project','develop','tech','task','learning'].includes(activeKey)
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

    console.log(activeKey)

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
            <Link to={t.path}  style={{color:activeKey == t.key? '#0062ff':'#333', cursor: isDropdonw() ? 'default':'pointer'}}>
              {t.text}
            </Link>
            </li>
          )}</ul>

        {
            <Drawer
     
            placement={'top'}
            open={isDropdonw()}
            //open={true}
            onClose={handleMouseLeave}
            mask={false} // 关闭遮罩，避免遮挡页面（可根据需求开启）
    
            className="transition-all duration-300" // 增强过渡动画
            onMouseEnter={handleDropdownMouseEnter}
            onMouseLeave={handleDropdownMouseLeave}
          >
             <DropMenu activeKey={activeKey}/>

          </Drawer>
        
        // isDropdonw() && <div  
        //   className='bg-white w-full pt-6 px-12 h-[350px] absolute top-[74px] left-0'
        //     onMouseEnter={handleDropdownMouseEnter} onMouseLeave={handleDropdownMouseLeave}
        //   >
        //     <DropMenu/>
        // </div>
        
        }

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
