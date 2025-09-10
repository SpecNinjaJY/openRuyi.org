import React, { useState } from 'react';
import { ClockCircleOutlined, LinkOutlined, UserOutlined, DownOutlined, UpOutlined, EnvironmentOutlined } from '@ant-design/icons';
import 'tailwindcss/tailwind.css'
import dayjs from 'dayjs';
import emptyLogo from '@/assets/news/empty.svg'
import { useLanguage } from '../../contexts/languageContext';
// 示例会议数据


const MeetingAccordion = (props) => {
     const { t } = useLanguage();
    const {data,date} = props
  // 存储当前展开的会议ID（null 表示全部收起）
  const [expandedId, setExpandedId] = useState(null);

  // 切换手风琴展开/收起状态
  const toggleAccordion = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };
  
  return (
    <div className="mx-auto py-4 rounded-sm bg-white max-h-[697px] w-full">
      <div className="space-y-3">
        {(data.length >0 && data.filter(d=>d.date=== dayjs(date).format('YYYY-MM-DD'))?.length>0) ? data.filter(d=>d.date=== dayjs(date).format('YYYY-MM-DD')).map((meeting) => {
          const isExpanded = expandedId === meeting.id;
          return (
            // 手风琴单个面板容器
            <div 
              key={meeting.id} 
              className="bg-white rounded-lg shadow-lg w-[90%] mx-auto overflow-hidden transition-all duration-300 ease-in-out "
            >
              {/* 1. 手风琴头部（点击区域）- 展示基础信息 */}
              <button
                onClick={() => toggleAccordion(meeting.id)}
                className="w-full px-5 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors custom-button relative"
              >
                {/* 左侧：会议基础信息 */}
                <div className="flex-1 min-w-0">
                  {/* 会议名称 */}
                  <h4 className="font-medium text-[16px] text-[#333] truncate">{meeting.name}</h4>
                  {/* 时间、地点、类型 - 横向排列 */}
                  <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm text-[#666]">
                    <div className="flex items-center gap-1">
                      <ClockCircleOutlined className="text-gray-400" size={14} />
                      <span>{meeting.time}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <EnvironmentOutlined  className="text-gray-400" size={14} />
                      <span>{meeting.location}</span>
                    </div>
                   
                  </div>
                </div>

                {/* 右侧：展开/收起图标 */}
                <div className="ml-4 text-gray-500 transition-transform duration-300">
                  {isExpanded ? <UpOutlined /> : <DownOutlined />}
                </div>
                <div style={{background:meeting.code == 1 ? '#0062ff':meeting.code == 2 ? '#CA4EFF': '#FF6F00'}} className="text-white absolute text-center w-[64px] top-0 right-0 px-1 rounded-tr-md rounded-bl-md">{meeting.type}</div>
              </button>

              {/* 2. 手风琴内容（详情区域）- 展开时显示 */}
              <div 
                className={`px-5 overflow-hidden ${
                  isExpanded ? 'max-h-52 opacity-100' : 'max-h-0 opacity-0'
                } transition-all duration-300 ease-in-out overflow-hidden`}
              >
                <div className="border-t border-gray-100 py-4">
                  <h5 className="text-sm font-medium text-gray-700 mb-3">{t('meetingdetail')}</h5>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                    {/* 会议号 */}
                    <div className="flex items-center gap-2">
                      <UserOutlined className="text-gray-400 w-4 text-center" />
                      <span className="text-gray-600">{t('meetingId')}：</span>
                      <span className="font-mono text-gray-900">{meeting.meetingId}</span>
                    </div>
                    {/* 主持人（可选） */}
                    {meeting.host && (
                      <div className="flex items-center gap-2">
                        <UserOutlined className="text-gray-400 w-4 text-center" />
                        <span className="text-gray-600">{t('person')}：</span>
                        <span className="text-gray-900">{meeting.host}</span>
                      </div>
                    )}
                    {/* 会议链接 */}
                    <div className="flex items-center gap-2 md:col-span-2">
                      <LinkOutlined className="text-gray-400 w-4 text-center" />
                      <span className="text-gray-600">{t('meetinglink')}：</span>
                      <a 
                        href={meeting.link} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:underline truncate max-w-xs"
                      >
                        {meeting.link}
                      </a>
                    </div>
                  </div>

                  {/* 快捷操作按钮（可选） */}
                  <div className="mt-4 flex gap-2">
                    <button 
                      onClick={() => window.open(meeting.link, '_blank')}
                      className="px-3 py-1.5 bg-blue-500 text-white text-sm rounded hover:bg-blue-600 transition-colors"
                    >
                      {t('joinMeet')}
                    </button>
                    <button 
                      onClick={() => navigator.clipboard.writeText(meeting.meetingId)}
                      className="px-3 py-1.5 bg-gray-100 text-gray-700 text-sm rounded hover:bg-gray-200 transition-colors"
                    >
                      {t('复制会议号')}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        }):  <div className="flex flex-col py-16 bg-#f6f9ff w-full items-center">
                <img src={emptyLogo} width={110} height={110}/>
                <span className="text-[#999] text-lg mt-5 ">{t('emptyarrange')}</span>
              </div>}
      </div>
    </div>
  );
};

export default MeetingAccordion;
    