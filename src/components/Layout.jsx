import React, { useState, useRef, useEffect } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { Button, Drawer, Layout, Menu } from 'antd';
import Footer from './footer';
import LogoSvg from '@/assets/home/logo.svg';
import { useLanguage } from '@/contexts/languageContext';
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
  const [openKeys, setOpenKeys] = useState([]);
   const navigate = useNavigate();
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
    const handleMouseLeave = () => {
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
        if(window.innerWidth > 768){
          setMobileMenuOpen(false)
          setOpenKeys([])
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


    // 渲染菜单项
  const renderMenuItems = (items) => {
    return items.map(item => {
      // 有子菜单的项
      if (item.children && item.children.length > 0) {
        return {
          key: item.key,
          icon: item.icon,
          label: item.label,
          children: renderSubMenuItems(item.children)
        };
      }
      
      // 路由链接项
      if (item.isRoute) {
        return {
          key: item.key,
          icon: item.icon,
          label: <Link to={item.path}>{item.label}</Link>
        };
      }
      
      // 普通项
      return {
        key: item.key,
        icon: item.icon,
        label: item.label
      };
    });
  };


    // 渲染子菜单项（外部链接）
  const renderSubMenuItems = (subItems) => {
    return subItems.map(item => ({
      key: item.key,
      label: <a href={item.url} target="_blank" rel="noopener noreferrer">{item.label}</a>,
    }));
  };

  // 菜单数据配置
const menuItems = [
  {
    key: 'download',
    label: t('menulist.0.text'),
    isRoute: true, // 标识为路由链接
    path: '/download' // 路由路径
  },
  {
    key: 'develop',
    label: t('menulist.1.text'),
    children: [
      { 
        key: 'RuyiBuild', 
        label: t('developlist.0')+' - RuyiBuild', 
        url: 'https://build.openruyi.cn' 
      },
      { 
        key: 'RuyiAVA', 
        label: t('developlist.1') + ' - RuyiAVA', 
        url: 'https://lava.openruyi.cn' 
      },
      { 
        key: 'RuyiCI', 
        label: t('developlist.2')+ ' - RuyiCI', 
        url: 'https://ci.openruyi.cn' 
      },
      { 
        key: 'RuyiPort', 
        label:t('developlist.3')+ ' - RuyiPort', 
        url: 'https://port.openruyi.cn' 
      }
    ]
  },
  {
    key: 'news',
    label: t('menulist.2.text'),
    isRoute: true, // 标识为路由链接
    path: '/news' // 路由路径
  }
];


  // 处理菜单点击事件
  const handleMenuClick = ({ key, item }) => {
    const menuItem = menuItems.find(item => item.key === key);
    
    // 如果是路由链接，跳转到对应路由并关闭菜单
    if (menuItem?.isRoute && menuItem.path) {
      navigate(menuItem.path);
       setMobileMenuOpen(false);
    }
    
    // 如果是外部链接，在新窗口打开
    if (item?.props?.url) {
      window.open(item.props.url, '_blank');
        setMobileMenuOpen(false);
    }
  };

  // 处理子菜单展开/折叠
  const handleOpenChange = (keys) => {
    setOpenKeys(keys);
  };



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
          <li className='w-[105px] text-center' key={index}  onMouseEnter={() => handleMouseEnter(t.key)} onMouseLeave={() => handleMouseLeave(t.key)} >
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
            <Menu
              mode="inline"
              items={renderMenuItems(menuItems)}
              openKeys={openKeys}
              onOpenChange={handleOpenChange}
              onClick={handleMenuClick}
              className="mt-4"
            />
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
