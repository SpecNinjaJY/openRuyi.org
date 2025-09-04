import React, { useState } from 'react';
import { Button, Calendar,Flex,Select,Tabs  } from 'antd';
import dayjs from 'dayjs';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import '../index.css'
import { useLanguage } from '../../contexts/LanguageContext';
import MeetingAccordion from './MeetingAccordion';

const meetings = [
    {
    id: 'm1',
    name: '产品需求评审会 V2.0',
    date:'2025-09-04',
      code:1,
    time: '10:00-11:30',
    location: '线上腾讯会议',
    type: '会议',
    meetingId: '876 5432 1987',
    link: 'https://meeting.tencent.com/dm/abc123xyz',
    host: '张产品经理',

  },
  {
    id: 'm2',
    name: '前端架构优化讨论会',
    date:'2025-09-05',
      code:1,
    time: '14:00-16:00',
    location: '公司3楼会议室A',
    type: '会议',
    meetingId: '987 6543 2109',
    link: 'https://zoom.us/j/98765432109?pwd=abcdef',
    host: '李前端负责人'
  },
  {
    id: 'm3',
    name: 'Q4 项目规划启动会',
    time: '09:30-11:00',
    date:'2025-09-06',
    code:1,
    location: '线上飞书会议',
    type: '会议',
    meetingId: '7654-3210-9876',
    link: 'https://meet.larksuite.com/j/765432109876',
    host: '王项目经理'
  }
]

const org =[
    {
    id: 'm5',
    name: '需求评审会 V2.0',
    date:'2025-09-06',
    time: '10:00-11:30',
    location: '线上腾讯会议',
    type: '社区',
    code:2,
    meetingId: '876 5432 1987',
    link: 'https://meeting.tencent.com/dm/abc123xyz',
    host: '张产品经理',

  },
  {
    id: 'm5',
    name: '架构优化讨论会',
    date:'2025-09-08',
    time: '14:00-16:00',
    location: '公司3楼会议室A',
    type: '社区',
    code:2,
    meetingId: '987 6543 2109',
    link: 'https://zoom.us/j/98765432109?pwd=abcdef',
    host: '李前端负责人'
  },
]

const activity = [
    {
    id: 'm7',
    name: '架构优化讨论会',
    date:'2025-09-10',
    time: '14:00-16:00',
    location: '公司3楼会议室A',
    type: '活动赛事',
    code:3,
    meetingId: '987 6543 2109',
    link: 'https://zoom.us/j/98765432109?pwd=abcdef',
    host: '李前端负责人'
  }
]


const getListData = value => {

  let formatDate = value.format('YYYY-MM-DD')
  let listData = []; 

  if(meetings.length > 0 && meetings.some(f=>f.date === formatDate)){
    listData.push({color:'#0062FF'})
  }
  if(org.length > 0 && org.some(f=>f.date === formatDate)){
    listData.push({color:'#CA4EFF'})
  }
  if(activity.length > 0 && activity.some(f=>f.date === formatDate)){
    listData.push({color:'#FF6F00'})
  }
  return listData || [];
};

const ActivityArrange = () =>{

    const { t } = useLanguage();
    /* 日历功能 */
  const dateCellRender = value => {
    const listData = getListData(value);
    return (
      <Flex gap={8} className='absolute bottom-5 left-[40%]'>
        {
            listData?.map((l,index)=><div key={index} style={{background:l.color}} className={`w-[10px] h-[10px] rounded-small`}></div>)
        }
      </Flex>
    );
  };
  const cellRender = (current, info) => {
    if (info.type === 'date') return dateCellRender(current);

    return info.originNode;
  };

   // 1. 管理当前日历显示的日期（初始为当前日期）
  const [currentDate, setCurrentDate] = useState(dayjs());
  // 2. 年份选择范围（可根据需求调整，这里设置前后5年）
  const yearRange = Array.from({ length: 11 }, (_, i) => dayjs().year() - 5 + i);

  // 3. 切换上月：当前日期减1个月
  const handlePrevMonth = () => {
    setCurrentDate(prev => dayjs(prev).subtract(1, 'month'));
  };

  // 4. 切换下月：当前日期加1个月
  const handleNextMonth = () => {
    setCurrentDate(prev => dayjs(prev).add(1, 'month'));
  };

  // 5. 年份变更：更新年份，保留当前月份
  const handleYearChange = (year) => {
    setCurrentDate(prev => dayjs(prev).year(year));
  };

  // 6. 月份变更：更新月份，保留当前年份
  const handleMonthChange = (month) => {
    setCurrentDate(prev => dayjs(prev).month(month));
  };


    const renderCustomHeader = () => {
    return (
      <div className="flex items-center justify-center w-full px-2 mb-3">
        {/* 中间：年月选择器（保留核心功能，删除面板切换） */}
        <Button
            icon={<LeftOutlined />}
            
            onClick={handlePrevMonth}
            className="p-1 bg-[#f6f9ff] border-[#e5e5e5] rounded-[4px] w-[60px] mr-4" // 圆形按钮样式（可选）
        />
          {/* 年份选择下拉框 */}
          <Select
            value={currentDate.year()}
            onChange={handleYearChange}
            style={{ width: 190,marginRight:16,borderRadius:4 }}
         
            showSearch={false} // 关闭搜索（可选）
          >
            {yearRange.map(year => (
              <Option key={year} value={year}>
                {year}年
              </Option>
            ))}
          </Select>

          {/* 月份选择下拉框 */}
          <Select
            value={currentDate.month()}
            onChange={handleMonthChange}
            style={{ width: 190 }}
        
            showSearch={false}
          >
            {Array.from({ length: 12 }, (_, i) => (
              <Option key={i} value={i}>
                {i + 1}月
              </Option>
            ))}
          </Select>
          <Button
            icon={<RightOutlined />}
            onClick={handleNextMonth}
            className="p-1 bg-[#f6f9ff] border-[#e5e5e5] w-[60px] ml-4 rounded-[4px]"
          />

      </div>
    );
  };


const items = [
  {
    key: '1',
    label: t('tabs1'),
    children: <MeetingAccordion date={currentDate} data={[...meetings,...org,...activity]}/>,
  },
  {
    key: '2',
    label: t('tabs2'),
    children: <MeetingAccordion date={currentDate} data={meetings} />,
  },
  {
    key: '3',
    label: t('tabs3'),
    children: <MeetingAccordion date={currentDate} data={org} />,
  },
    {
    key: '4',
    label: t('tabs4'),
    children: <MeetingAccordion date={currentDate} data={activity}/>,
  }
];


    return (
        <div className="w-full flex">
            <div className='w-[60%]'>
                {renderCustomHeader()}
                <Calendar cellRender={cellRender}  value={currentDate}
                    className="custom-calendar"
                    onSelect={(date) => {
                    console.log('选中的日期：', date.format('YYYY-MM-DD'));
                    // 可选：选中日期后，保持当前月份不变（仅更新日期）
                    setCurrentDate(date);
                    }}
       
                headerRender={()=>null}  />
            </div>
            <div className='ml-[60px] w-[36%]'>
                <Tabs defaultActiveKey="1"   className="custom-no-underline-tabs"  items={items}  />
            </div>

        </div>
    )
}

export default ActivityArrange