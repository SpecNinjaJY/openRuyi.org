import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';
import CommunityCarousel from '../../components/home/CommunityCarousel';
import HomeTitle from '../../components/home/HomeTitle';
import Arrow from '@/assets/home/arrow.svg'
import MasonryGallery from '../../components/home/MasonryGallery';
import NewItem from '../../components/home/NewsItem';
import ActivityArrange from '../../components/home/Arrange';
import './index.css'


// 模拟最新动态数据
const latestNews = [
  {
    id: 1,
    title: "vite 4.0 正式发布，带来多项性能优化",
    date: "2023-10-15",
    desc: "Vite团队111111111111111111111111111111111111111111111111111111111111",
    avatar: "https://picsum.photos/id/10/40/40",
     type:'行业动态'
  },
  {
    id: 2,
    title: "React 18 新特性详解与实践指南",
    date: "2023-10-10",
    desc: "React团队  22222222222222222222222222222222222222222222222222222222222222222",
    avatar: "https://picsum.photos/id/11/40/40",
     type:'行业动态'
  },
  {
    id: 3,
    title: "2023年前端技术趋势预测",
    date: "2023-10-05",
    desc: "技术观察家  77777777777777777777777777777777777777777777777777777777777777777",
    avatar: "https://picsum.photos/id/12/40/40",
      type:'技术产品'
  },
   {
    id: 4,
    title: "vite 4.0 正式发布，带来多项性能优化",
    date: "2023-10-15",
    desc: "Vite团队111111111111111111111111111111111111111111111111111111111111",
    avatar: "https://picsum.photos/id/10/40/40",
      type:'技术产品'
  },
  {
    id: 5,
    title: "React 18 新特性详解与实践指南",
    date: "2023-10-10",
    desc: "React团队22222222222222222222222222222222222222222222222222222222222222222",
    avatar: "https://picsum.photos/id/11/40/40",
     type:'基础软件动态'
  },
  {
    id: 6,
    title: "2023年前端技术趋势预测",
    date: "2023-10-05",
    desc: "技术观察家77777777777777777777777777777777777777777777777777777777777777777",
    avatar: "https://picsum.photos/id/12/40/40",
     type:'基础软件动态'
  }
];





const Home = () => {
  const { t } = useLanguage();
  
  return (
    <div className="space-b-16">
      <CommunityCarousel/>

      {/* 如意系列 */}
      <section className="py-12 bg-[#f6f9ff]">
        <div className="container px-4 flex items-baseline justify-between">
          <HomeTitle title1={t('heroTitle')} title2={t('heroSubtitle')} />
          <span className='text-[#0062ff] cursor-pointer flex items-center justify-center'>
            <span>{t('viewAll')}</span>
            <img src={Arrow} className='mb-[2px]'/>
          </span>
        </div>
        <MasonryGallery/>

      </section>
      
      {/* 新闻数据 */}
      <section className="py-12 bg-[#f6f9ff]">
        <div className="container px-4 flex justify-between">
          <HomeTitle title1={t('latestNews')} title2={t('latestNewsDesc')} />
          <span className='text-[#0062ff] cursor-pointer flex items-center justify-center'>
            <span>{t('moreNews')}</span>
            <img src={Arrow} className='mb-[2px]'/>
          </span>
        </div>
         <div className="container px-4 flex flex-wrap items-baseline justify-between">
             {
              latestNews?.map((l,index)=><NewItem key={index} title={l.title} desc={l.desc} url={l.avatar} date={l.date} type={l.type} />)
            }
         </div>
       
      </section>
      
      
      
      {/* 活动日程 */}
      <section className="py-12 bg-[#f6f9ff]">
        <div className="container px-4 flex justify-between">
             <HomeTitle title1={t('arrange')} title2={t('arrangeDesc')} />
        </div>
        <div className='container'>
            <ActivityArrange/>
        </div>
      </section>

      {/* 合作伙伴 */}
      <section className="py-12 bg-[#f6f9ff]">
          <div className="container px-4 flex justify-between">
              <HomeTitle title1={t('cooperate')} title2={t('cooperatetitle')} />
          </div>
          <div className='container'>
            <div className='text-[#666] text-[16px] mb-3'>{t('jointly')}</div>
              <div className="logolist"> 
                {
                    [...Array(17).keys()].map(i => i + 1).map((iteml,indexl)=>{
                      return <div 
                      className="logoItem" 
                      key={indexl}
                      style={{backgroundImage:"url(/logolist/1/"+iteml+".png)"}}></div>
                    })
                  }
              </div>


              <div className='text-[#666] text-[16px] mb-3 mt-7'>{t('build')}</div>
              <div className="logolist"> 
                {
                    [...Array(4).keys()].map(i => i + 1).map((iteml,indexl)=>{
                      return <div 
                      className="logoItem" 
                      key={indexl}
                      style={{backgroundImage:"url(/logolist/2/"+iteml+".png)"}}></div>
                    })
                  }
              </div>

              <div className='text-[#666] text-[16px] mb-3 mt-7'>{t('friendly')}</div>
              <div className="logolist"> 
                {
                    [...Array(3).keys()].map(i => i + 1).map((iteml,indexl)=>{
                      return <div 
                      className="logoItem" 
                      key={indexl}
                      style={{backgroundImage:"url(/logolist/3/"+iteml+".png)"}}></div>
                    })
                  }
              </div>
          </div>
      </section>

    </div>
  );
};

export default Home;
