import { useLanguage } from "../../contexts/languageContext";
import downloadbanner from '@/assets/download/banner.svg'
import './index.css'
import { useEffect, useState } from "react";
import { message, Space, Table, Tooltip, Typography } from "antd";
import {  CopyTwoTone } from "@ant-design/icons";



const { Title, Text } = Typography;


const Download = () =>{
  const { t } = useLanguage();
  const [messageApi, contextHolder] = message.useMessage();
    // 状态：判断是否为移动端（<768px）
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

const columns = [
  {
    title: t('column.0'),
    dataIndex: 'name',
    key: 'name',
    render: text => <a>{text}</a>,
  },
  {
    title: t('column.1'),
    dataIndex: 'type',
    key: 'type',
  },
  {
    title: t('column.2'),
    dataIndex: 'size',
    key: 'size',
  },
  {
    title: t('column.3'),
    dataIndex: 'shacode',
    key: 'shacode',
    render:(value)=><Tooltip title={value}>
        <Space gap={8}>
            <div className="text-[#0062ff]">{'SHA256'}</div>
            <CopyTwoTone onClick={() => copyToClipboard(value)} className="cursor-pointer" color="#0062ff"/>
        </Space>
    </Tooltip>
  },
  
  {
    title: t('column.4'),
    dataIndex:'download',
    key: 'action',
    render: (_, record) => (
        <a className="text-[#0062ff] cursor-pointer">{t('menulist.6.text')}</a>
        
    ),
  },
];


// 2. 复制函数：接收需复制的文本，返回 Promise
const copyToClipboard = async (text) => {
   
  try {
    // 调用原生 Clipboard API 复制文本
    await navigator.clipboard.writeText(text);

   
     messageApi.open({
      type: 'success',
      content: '复制成功！',
    });
      console.log(text)
  } catch (err) {
    // 复制失败（如浏览器不支持、无权限）
     messageApi.open({
      type: 'error',
      content: '复制失败，请手动复制',
    });
    console.error('复制错误：', err);
  }
};


const data = [
  {
    key: '1',
    name: '边缘计算',
    type: 'Offline ISO',
    size: '1GB',
    shacode:'detrkelr3434534l3kj45l3k4j5lk3j45l3k45j345'
  },
  {
    key: '2',
    name: '云计算',
    type: 'QCOW2',
    size: '4.4GB',
     shacode:'detrkelr3434534l3kj45l3k4j5lk3j45l3k45j345'
  },
  {
    key: '3',
    name: '嵌入式',
    type: 'RISCV_VIRT_CODE.fd',
    size: '3GB',
     shacode:'detrkelr3434534l3kj45l3k4j5lk3j45l3k45j345'
  },
];

 // 移动端卡片布局渲染
  const renderMobileCards = () => (
    <div className="grid grid-cols-1 gap-4 p-2">
      {data.map((item) => (
        // 卡片容器：阴影+圆角+自适应宽度
        <div 
          key={item.id} 
          className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden"
        >
          {/* 卡片头部：商品名称（突出显示） */}
          <div className="bg-[#5C9BFF] px-4 py-3">
            <span level={5} className="m-0 text-white font-semibold">
              {item.name}
            </span>
          </div>
          
          {/* 卡片内容：字段竖直排列（标签+值） */}
          <div className="p-4 space-y-3">
            {columns.map((col) => (
              <div key={col.key} className="flex flex-col">
                {/* 字段标签：灰色小字 */}
                <Text className="text-gray-500 text-sm mb-1">
                  {col.title}
                </Text>
                {/* 字段值：黑色粗体 */}
                <Text className="text-gray-800 font-medium">

                  {col.dataIndex == 'shacode'? 
                  <Space gap={8}>
                      <div className="text-[#0062ff]">{'SHA256'}</div>
                      <CopyTwoTone onClick={() => copyToClipboard(item[col.dataIndex])} className="cursor-pointer" color="#0062ff"/>
                  </Space>
                  : 
                  col.dataIndex == 'download'? 
                    <a className="text-[#0062ff] cursor-pointer">{t('menulist.6.text')}</a>
                  :
                  item[col.dataIndex]}
                </Text>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );


 // 监听窗口 resize 事件，更新移动端状态
  useEffect(() => {
    const handleResize = () => {
      // 防抖优化：避免频繁触发
      clearTimeout(window.resizeTimer);
      window.resizeTimer = setTimeout(() => {
        setIsMobile(window.innerWidth < 768);
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

    return <div className="bg-[#f6f9ff] pb-10">
         {contextHolder}
         <div className='relative overflow-hidden bg-cover bg-center lg:h-[250px] h-[150px]' style={{backgroundImage:`url(${downloadbanner})`}}>
            <span className='absolute font-semibold left-[60px] top-1/4 lg:text-[36px] text-[24px] text-[#333]'>{t('downtitle')}</span>
            <span className="absolute left-[60px] lg:top-1/2 top-[40%] text-[14px] text-[#333] mt-5">{t('downsubtl')}</span>
        </div>

        <div className="container mt-[80px]">
            <div className="text-black font-medium text-[20px] mb-6">{t('title1')}</div>
            <div className="bg-white rounded-lg  p-4 flex flex-col mb-5">
                <span className="text-[16px] text-[#333]">{t('t1subs1')}</span>
                <span className="md:text-[14px] text-[12px] text-[#666] my-5">{t('t1des1')}</span>
                {isMobile ?renderMobileCards() :<Table columns={columns} dataSource={data} pagination={false} />}
            </div>


            <div className="bg-white rounded-lg p-4 flex flex-col">
                <span className="text-[16px] text-[#333]">{t('t1subs2')}</span>
                <span className="md:text-[14px] text-[12px] text-[#666] my-5">{t('t1des2')}</span>
                 {isMobile ?renderMobileCards() :<Table columns={columns} dataSource={data} pagination={false} />}
            </div>


        </div>

    </div>
}

export default Download