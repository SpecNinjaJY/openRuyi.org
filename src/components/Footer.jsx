import React, { useState } from 'react';
import { Typography, Input, Button, Form, message, Spin } from 'antd';
import {  
  MailOutlined,
  UserOutlined
} from '@ant-design/icons';
import { useLanguage } from '../contexts/languageContext';
import LogoSvg from '@/assets/home/logo.svg';
import axios from 'axios';

const { Text} = Typography;

const Footer = () => {
  const { t } = useLanguage();
  const [form] = Form.useForm();
  const [isSubmitting, setIsSubmitting] = useState(false); // 提交加载状态

  const [messageApi, contextHolder] = message.useMessage();


      // 表单提交逻辑
  const handleSubmit = async () => {
    try {
      // 1. 表单验证（触发所有字段规则校验）
      const values = await form.validateFields();
      
      // 2. 开启加载状态
      setIsSubmitting(true);
      
      // 3. 向后端发送 POST 请求（携带用户信息 + 订阅时间）
      const response = await axios.post('/api/subscribe', {
        ...values,
        subscribeTime: new Date().toLocaleString('zh-CN', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        }), // 格式化订阅时间
      }, {
        headers: { 'Content-Type': 'application/json' },
        timeout: 15000, // 15秒超时保护
      });

      // 4. 提交成功处理
      if (response.data.success) {
      
        messageApi.open({
            type: 'success',
            content: '订阅成功！',
        });
        form.resetFields(); // 重置表单
      } else {
        message.error(`提交失败：${response.data.message}`, 3);
      }
    } catch (error) {
      // 5. 错误处理（表单验证失败/网络异常/后端错误）
      if (axios.isAxiosError(error)) {
        // 网络错误或后端响应错误
         messageApi.open({
            type: 'error',
            content:  error.response 
            ? `服务异常：${error.response.data.message || '请稍后重试'}`
            : '网络异常，请检查网络连接',
          });
       
      } else {
        // 表单验证失败（AntD Form 自动提示，此处仅兜底）
         messageApi.open({
            type: 'error',
            content: '表单填写有误，请检查字段格式',
          });
      }
    } finally {
      // 6. 关闭加载状态
      setIsSubmitting(false);
    }
  };



  return (
    <footer className="bg-white dark:bg-gray-800/80 border-t border-gray-200 dark:border-gray-700">
        {contextHolder}
      <div className="container mx-auto px-4 py-12">
       
        <div className='flex items-center justify-between'>
          <div><img src={LogoSvg}/></div>
          <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0">
        </div>
        </div>  

        <div className='text-[#333] text-[20px] mt-[100px] font-semibold'>{t('subscribeMes')}</div>
        
        <div className='text-[#666] text-[16px] w-[55%] mt-10 leading-[30px]'>{t('subnotify')}</div>

         {/* 订阅区域 */}
        <div className="mb-4 bg-primary/5 rounded-2xl py-8 md:py-10">
         <Form
        form={form}
        layout="inline"
        className='h-16'
        initialValues={{ name: '', email: '' }}
        colon={false} // 隐藏表单标签冒号，优化样式
      >
        {/* 姓名（必填） */}
        <Form.Item
          name="name"
          rules={[
            { required: true, message: '请输入您的姓名' },
            { min: 2, max: 100, message: '姓名长度需在 2-100 个字符之间' },
          ]}
          className='w-[220px]'
        >
          <Input  placeholder={t('yourname')} className="flex-grow rounded-sm" maxLength={100}   prefix={<UserOutlined className="text-gray-400" />}/>
        </Form.Item>

      
        {/* 邮箱（可选 + 格式验证） */}
        <Form.Item
          name="email"
          rules={[
            { type: 'email', message: '请输入正确的邮箱格式' },
          ]}
          className='w-[220px]'
        >
          <Input   prefix={<MailOutlined className="text-gray-400" />}  placeholder={t('yourEmail')}  className="flex-grow rounded-sm"  maxLength={50} />
        </Form.Item>
         <Form.Item>
          <Button
             color="primary"  variant="outlined"
              className="bg-primary hover:bg-primary/90 rounded-sm w-[180px]"
            onClick={handleSubmit}
            loading={isSubmitting}
            block
          
          >
            {isSubmitting ? <Spin size="small" /> : null}    {t('subscribe')}
          </Button>
        </Form.Item>
        </Form>
        </div>
        
        {/* 版权和底部信息 */}
        <div className="flex flex-col md:flex-row justify-center items-center">
          <Text className="text-[#999] text-sm mb-2 md:mb-0 mr-10">
            {'Copyright © 2025 openRuyi'}
            {/* © {new Date().getFullYear()} OpenRuyi {t('allRightsReserved')} */}
          </Text>
          <div className="flex flex-wrap justify-center text-[#999] text-sm">
            {'备案号：京ICP备05046678号-71'}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
