import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Typography, Space, Row, Col } from 'antd';
import { 
  ArrowLeftOutlined, 
  SearchOutlined, 
  HomeOutlined,
  FrownOutlined
} from '@ant-design/icons';
import { useLanguage } from '@/contexts/languageContext.jsx';

const { Title, Paragraph, Text } = Typography;

const NotFound = () => {
  const { t } = useLanguage();
  const [count, setCount] = useState(0);
  
  // 数字动画效果
  useEffect(() => {
    const timer = setInterval(() => {
      setCount(prev => (prev < 404 ? prev + 1 : 404));
    }, 5);
    
    return () => clearInterval(timer);
  }, []);
  
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-50 to-white dark:from-gray-800 dark:to-gray-900">
      {/* 导航栏（简化版） */}
      <header className="sticky top-0 z-40 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2">
              <path d="M12 2C6.477 2 2 6.477 2 12C2 17.523 6.477 22 12 22C17.523 22 22 17.523 22 12C22 6.477 17.523 2 12 2ZM16 13H13V16C13 16.5523 12.5523 17 12 17C11.4477 17 11 16.5523 11 16V13H8C7.44772 13 7 12.5523 7 12C7 11.4477 7.44772 11 8 11H11V8C11 7.44772 11.4477 7 12 7C12.5523 7 13 7.44772 13 8V11H16C16.5523 11 17 11.4477 17 12C17 12.5523 16.5523 13 16 13Z" fill="#165DFF"/>
            </svg>
            <span className="font-bold text-xl text-primary">OpenCommunity</span>
          </Link>
          <Button 
            icon={<ArrowLeftOutlined />} 
            onClick={() => window.history.back()}
            className="bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700"
          >
            {t('goBack')}
          </Button>
        </div>
      </header>
      
      {/* 主要内容区 */}
      <main className="flex-grow flex flex-col items-center justify-center py-12 px-4 text-center">
        <div className="container mx-auto max-w-4xl">
          {/* 404数字动画 */}
          <div className="relative mb-8 inline-block">
            <Title level={1} className="text-[clamp(8rem,20vw,16rem)] font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary m-0">
              {count}
            </Title>
            <div className="absolute -top-6 -right-6 bg-red-500 text-white rounded-full w-12 h-12 flex items-center justify-center animate-pulse">
              <FrownOutlined />
            </div>
          </div>
          
          <Title level={2} className="text-[clamp(1.5rem,3vw,2.5rem)] mb-4">
            {t('pageNotFound')}
          </Title>
          
          <Paragraph className="text-gray-600 dark:text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
            {t('pageNotFoundDescription')}
          </Paragraph>
          
          {/* 搜索框 */}
          <div className="max-w-md mx-auto mb-12">
            <div className="flex">
              <input
                type="text"
                placeholder={t('searchPlaceholder')}
                className="flex-grow px-4 py-3 rounded-l-lg border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-800"
              />
              <Button 
                type="primary" 
                className="rounded-l-none bg-primary hover:bg-primary/90"
              >
                <SearchOutlined />
              </Button>
            </div>
          </div>
          
          {/* 快捷导航 */}
          <div className="mb-16">
            <Text className="text-gray-500 dark:text-gray-400 mb-4 inline-block">
              {t('quickNavigation')}
            </Text>
            <Row justify="center" gutter={[16, 16]}>
              <Col xs={12} sm={6}>
                <Link to="/">
                  <Button 
                    block 
                    icon={<HomeOutlined />}
                    className="w-full h-12 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
                  >
                    {t('home')}
                  </Button>
                </Link>
              </Col>
              <Col xs={12} sm={6}>
                <Link to="/projects/popular">
                  <Button 
                    block 
                    className="w-full h-12 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
                  >
                    {t('popularProjects')}
                  </Button>
                </Link>
              </Col>
              <Col xs={12} sm={6}>
                <Link to="/docs">
                  <Button 
                    block 
                    className="w-full h-12 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
                  >
                    {t('documentation')}
                  </Button>
                </Link>
              </Col>
              <Col xs={12} sm={6}>
                <Link to="/contact">
                  <Button 
                    block 
                    className="w-full h-12 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
                  >
                    {t('contactUs')}
                  </Button>
                </Link>
              </Col>
            </Row>
          </div>
          
          {/* 帮助提示 */}
          <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-6 max-w-2xl mx-auto">
            <Paragraph className="mb-0">
              <Text strong>{t('stillNeedHelp')}</Text>
              {t('helpDescription')}
              <a href="/support" className="text-primary hover:underline">
                {t('contactSupport')}
              </a>
            </Paragraph>
          </div>
        </div>
      </main>
      
      {/* 页脚 */}
      <footer className="py-6 border-t border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-4 text-center">
          <Text className="text-gray-500 dark:text-gray-400 text-sm">
            © {new Date().getFullYear()} OpenCommunity. {t('allRightsReserved')}
          </Text>
        </div>
      </footer>
    </div>
  );
};

export default NotFound;
