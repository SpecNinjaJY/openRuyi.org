import { useLanguage } from "../../contexts/languageContext";
import downloadbanner from '@/assets/download/banner.svg'
import './index.css'
import { useState } from "react";
import { message, Space, Table, Tooltip } from "antd";
import {  CopyTwoTone } from "@ant-design/icons";
const Download = () =>{
  const { t } = useLanguage();
  const [activeBtn,setActive] = useState(1)
  const [messageApi, contextHolder] = message.useMessage();

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

    return <div className="bg-[#f6f9ff] pb-10">
         {contextHolder}
         <div className='relative'>
            <img src={downloadbanner} className='w-full'/>
            <span className='absolute font-semibold left-[60px] top-1/3 text-[36px] text-[#333]'>{t('downtitle')}</span>
            <span className="absolute left-[60px] top-1/2 text-[14px] text-[#333] mt-5">{t('downsubtl')}</span>
        </div>

        {/* <div className="container flex justify-between mt-10 mb-[60px]">
            <div onClick={()=>setActive(1)} className={`w-[49%] bg-white h-16 flex items-center transition-colors justify-center text-[#666] text-[16px] cursor-pointer rounded-lg typeBtn ${activeBtn === 1 ? 'isActive':''}`}>
                {'openRuyiOS'}
            </div>
            <div  onClick={()=>setActive(2)} className="w-[49%] bg-white h-16 flex items-center transition-colors justify-center text-[#666] text-[16px] cursor-pointer rounded-lg typeBtn">
                {'RuyiSDK'}
            </div>
        </div> */}

        <div className="container mt-[80px]">
            <div className="text-black font-medium text-[20px] mb-6">{t('title1')}</div>
            <div className="bg-white rounded-lg  p-4 flex flex-col mb-5">
                <span className="text-[16px] text-[#333]">{t('t1subs1')}</span>
                <span className="text-[14px] text-[#666] my-5">{t('t1des1')}</span>
                <Table columns={columns} dataSource={data} pagination={false} />
            </div>


            <div className="bg-white rounded-lg p-4 flex flex-col">
                <span className="text-[16px] text-[#333]">{t('t1subs2')}</span>
                <span className="text-[14px] text-[#666] my-5">{t('t1des2')}</span>
                <Table columns={columns} dataSource={data} pagination={false} />
            </div>


        </div>

    </div>
}

export default Download