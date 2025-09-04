import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Space, Typography } from 'antd';
import { useLanguage } from '../contexts/languageContext';

const TopNav= () => {
      const { t } = useLanguage();
  // 1. 状态管理：当前激活的抽屉key（null表示无激活）
  const [activeKey, setActiveKey] = useState('task');
  // 2. Ref：存储每个抽屉DOM，用于判断鼠标是否在抽屉内
  const dropdownRefs = useRef({});
  // 3. Ref：延迟关闭计时器，避免快速划过误关
  const closeTimerRef = useRef(null);
  // 4. 监听路由变化：路由切换时关闭所有抽屉
  const location = useLocation();

  // 导航数据源（可根据业务扩展）
  const navItems= [
    {
      key: 'home',
      type: 'link',
      label: t('menulist.0.text'),
      path: '/',
    },
    {
      key: 'develop',
      type: 'dropdown',
      label: t('menulist.1.text'),
    },
     {
      key: 'news',
      type: 'link',
      label: t('menulist.2.text'),
      path: '/news',
    },
    {
      key: 'tech',
      type: 'dropdown',
      label: t('menulist.3.text'),
      dropdownContent: (
        <div className="p-4 space-y-3 w-64">
          <Link to="/product/phone" className="dropdown-item block px-3 py-2 rounded transition-colors">
            智能手机
          </Link>
          <Link to="/product/laptop" className="dropdown-item block px-3 py-2 rounded transition-colors">
            笔记本电脑
          </Link>
          <Link to="/product/tablet" className="dropdown-item block px-3 py-2 rounded transition-colors">
            平板电脑
          </Link>
        </div>
      ),
    },
    {
      key: 'task',
      type: 'dropdown',
      label: t('menulist.4.text'),
      dropdownContent: (
        <div className="p-4 grid grid-cols-2 gap-3 w-80">
          <div className="space-y-2">
            <Typography.Title level={5} className="m-0 text-gray-700">帮助中心</Typography.Title>
            <Link to="/support/faq" className="dropdown-item block px-3 py-2 text-sm rounded transition-colors">
              常见问题
            </Link>
            <Link to="/support/manual" className="dropdown-item block px-3 py-2 text-sm rounded transition-colors">
              使用手册
            </Link>
          </div>
          <div className="space-y-2">
            <Typography.Title level={5} className="m-0 text-gray-700">联系我们</Typography.Title>
            <Link to="/support/phone" className="dropdown-item block px-3 py-2 text-sm rounded transition-colors">
              电话支持
            </Link>
            <Link to="/support/online" className="dropdown-item block px-3 py-2 text-sm rounded transition-colors">
              在线客服
            </Link>
          </div>
        </div>
      ),
    },
    {
      key: 'learning',
      type: 'dropdown',
    label: t('menulist.5.text'),
      dropdownContent: (
        <div className="p-4 grid grid-cols-2 gap-3 w-80">
          <div className="space-y-2">
            <Typography.Title level={5} className="m-0 text-gray-700">帮助中心</Typography.Title>
            <Link to="/support/faq" className="dropdown-item block px-3 py-2 text-sm rounded transition-colors">
              常见问题
            </Link>
            <Link to="/support/manual" className="dropdown-item block px-3 py-2 text-sm rounded transition-colors">
              使用手册
            </Link>
          </div>
          <div className="space-y-2">
            <Typography.Title level={5} className="m-0 text-gray-700">联系我们</Typography.Title>
            <Link to="/support/phone" className="dropdown-item block px-3 py-2 text-sm rounded transition-colors">
              电话支持
            </Link>
            <Link to="/support/online" className="dropdown-item block px-3 py-2 text-sm rounded transition-colors">
              在线客服
            </Link>
          </div>
        </div>
      ),
    },
    {
      key: 'download',
      type: 'link',
       label: t('menulist.6.text'),
      path: '/download',
    },
  ];

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
    <nav className="z-50">
      <div className="container mx-auto px-4 flex">
      
          {navItems.map((item) => {
            if (item.type === 'link') {
              // 点击跳转的导航项（Link组件）
              return (
                <Link
                  key={item.key}
                  to={item.path}
                  className="flex items-center px-4 py-2 rounded-md text-[#333] hover:text-[#0062FF]"
                >
                  <span>{item.label}</span>
                </Link>
              );
            }

            // 悬浮抽屉的导航项（含动画抽屉）
            return (
              <div
                key={item.key}
                className="relative group"
                onMouseEnter={() => handleMouseEnter(item.key)}
                onMouseLeave={() => handleMouseLeave(item.key)}
              >
                {/* 抽屉触发区（导航文字+图标） */}
                <div className="flex items-center px-4 py-2 cursor-pointer rounded-md text-[#333] hover:text-[#0062FF]">
                  <span>{item.label}</span>
                </div>

                {/* 抽屉内容（动画核心）：根据activeKey判断显隐 */}
                <div
                  ref={(el) => (dropdownRefs.current[item.key] = el)}
                  className={`
                    absolute top-full left-0 bg-white rounded-b-md shadow-lg overflow-hidden z-100
                    transition-all duration-300 ease-in-out
                    ${activeKey === item.key 
                      ? 'max-h-96 opacity-100 py-2'  // 展开：高度足够+显示+内边距
                      : 'max-h-0 opacity-0 py-0'      // 隐藏：高度0+透明+无内边距
                    }
                  `}
                  onMouseEnter={handleDropdownMouseEnter}
                  onMouseLeave={handleDropdownMouseLeave}
                >
                  {item.dropdownContent}
                </div>
              </div>
            );
          })}

      </div>

      {/* 自定义样式：抽屉项hover效果、Antd样式补充 */}
      <style>{`
        .dropdown-item {
          color: #333;
        }
        .dropdown-item:hover {
          background-color: #e6f4ff; /* Antd蓝色浅背景 */
          color: #1890ff; /* Antd主题色 */
        }
        /* 修复Antd Space组件默认间距 */
        .ant-space-horizontal {
          width: 100%;
          justify-content: flex-start;
        }
      `}</style>
    </nav>
  );
};

export default TopNav;
