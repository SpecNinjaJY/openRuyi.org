import React from 'react';
import { Link } from 'react-router-dom';
import { Layout, Row, Col, Space, Typography, Divider, Input, Button } from 'antd';
import { 
  GithubOutlined, 
  TwitterOutlined, 
  LinkedinOutlined, 
  MailOutlined,
  YoutubeOutlined,
  ArrowRightOutlined,
  UserOutlined
} from '@ant-design/icons';
import { useLanguage } from '../contexts/LanguageContext';
import LogoSvg from '@/assets/home/logo.svg';

const { Text, Title, Paragraph } = Typography;
const { Footer: AntFooter } = Layout;


// 社交媒体链接
const socialLinks = [
  { icon: <GithubOutlined />, url: 'https://github.com', label: 'GitHub' },
  { icon: <TwitterOutlined />, url: 'https://twitter.com', label: 'Twitter' },
  { icon: <LinkedinOutlined />, url: 'https://linkedin.com', label: 'LinkedIn' },
  { icon: <YoutubeOutlined />, url: 'https://youtube.com', label: 'YouTube' }
];




const Footer = () => {
  const { t } = useLanguage();

  const footerLinks = [
    { text: t('footer1'), href: '/brand' },
    { text: t('footer2'), href: '/privacy-policy' },
    { text: t('footer3'), href: '/legal-statement' },
    { text: t('footer4'), href: '/about-us' }
  ];

  return (
    <footer className="bg-white dark:bg-gray-800/80 border-t border-gray-200 dark:border-gray-700">
      <div className="container mx-auto px-4 py-12">
       
        <div className='flex items-center justify-between'>
          <div><img src={LogoSvg}/></div>
          <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0">
          {/* 渲染导航链接，添加竖线分隔符 */}
          {footerLinks.map((link, index) => (
            <React.Fragment key={link.text}>
              <a 
                href={link.href} 
                className="text-[#666] hover:text-[#999] transition-colors duration-300 px-3 py-2"
                aria-label={link.text}
              >
                {link.text}
              </a>
              {/* 除最后一个元素外，添加竖线分隔符 */}
              {index !== footerLinks.length - 1 && (
                <span className="text-gray-500">|</span>
              )}
            </React.Fragment>
          ))}
        </div>
        </div>  


        <div className='text-[#333] text-[20px] mt-[100px] font-semibold'>{t('subscribeMes')}</div>

        <div className='text-[#666] text-[16px] w-[55%] mt-10 leading-[30px]'>{t('subnotify')}</div>
      
        
       

         {/* 订阅区域 */}
        <div className="mb-12 bg-primary/5 rounded-2xl py-8 md:py-10">
          <Row align="middle" gutter={[8, 24]}>
        
            <Col xs={24} md={8}>
              <div className="flex flex-col sm:flex-row gap-3">
                 <Input 
                  placeholder={t('yourname')} 
                  className="flex-grow"
                  prefix={<UserOutlined className="text-gray-400" />}
                />
                <Input 
                  placeholder={t('yourEmail')} 
                  className="flex-grow"
                  prefix={<MailOutlined className="text-gray-400" />}
                />
                <Button 
                  color="primary"  variant="outlined"
                  className="bg-primary hover:bg-primary/90 rounded"
                >
                  {t('subscribe')} <ArrowRightOutlined className="ml-1" />
                </Button>
              </div>
            </Col>
          </Row>
        </div>
        
        {/* 版权和底部信息 */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          <Text className="text-[#999] text-sm mb-2 md:mb-0">
            © {new Date().getFullYear()} OpenRuyi {t('allRightsReserved')}
          </Text>
          <div className="flex flex-wrap justify-center text-[#999] text-sm">
            {'备案号：京ICP备05046678号-65'}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
