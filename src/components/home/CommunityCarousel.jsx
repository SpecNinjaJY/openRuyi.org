import React, { useState, useEffect } from 'react';
import { Carousel, Typography} from 'antd';
import { useLanguage } from '@/contexts/languageContext.jsx';
import GroupSvg from '@/assets/home/group.svg';

const { Title, Paragraph } = Typography;

const CommunityCarousel = () => {
  const { t } = useLanguage();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const carouselRef = React.useRef<Carousel>(null);

  // 轮播数据 - 实际项目中可从API获取
  const carouselData = [
    {
      id: 1,
      titleKey: 'carousel.title1',
      descriptionKey: 'carousel.desc1',
      imageUrl: GroupSvg,
      link: '/community'
    }
  ];

  // 处理轮播变化
  const handleCarouselChange = (current) => {
    setIsAnimating(true);
    setCurrentSlide(current);
    
    // 动画结束后重置状态
    setTimeout(() => {
      setIsAnimating(false);
    }, 500);
  };

  // 手动切换轮播
  const navigateSlide = (direction) => {
    if (carouselRef.current) {
      direction === 'prev' 
        ? carouselRef.current.prev() 
        : carouselRef.current.next();
    }
  };

  // 自动播放效果
  useEffect(() => {
    const interval = setInterval(() => {
      navigateSlide('next');
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative overflow-hidden lg:h-[450px] h-[250px]">
      {/* 轮播组件 */}
      {/* <Carousel
        autoplay={false} // 已通过useEffect实现更可控的自动播放
        infinite
        speed={500}
        effect="fade"
        beforeChange={handleCarouselChange}
        className="relative h-[400px] md:h-[500px] lg:h-[600px]"
      >
        {carouselData.map((item) => (
           */}
          <div key={carouselData[0].id} className="relative h-full">
            {/* 背景图片 */}
            <div 
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out h-full"
              style={{ 
                backgroundImage: `url(${carouselData[0].imageUrl})`,
                transform: isAnimating ? 'scale(1.05)' : 'scale(1)'
              }}
            >
              {/* 渐变遮罩，提升文字可读性 */}
              <div className="h-full absolute inset-0 text-[#1F4697] lg:text-[60px] md:text-[40px] xs:text-[30px] font-bold top-10 left-10">
                {t('name')}
              </div>
               <div className="h-full absolute inset-0 text-[#1F4697] lg:text-[24px] md:text-[18px] xs:text-[16px] lg:top-1/3 top-[40%] left-10">
                {t('namedes')}
              </div>
            </div>
            
            {/* 轮播内容 */}
            {/* <div className="relative h-full flex items-center">
              <div className="container mx-auto px-6 md:px-12 h-[450px]">
              </div>
            </div> */}
          </div>
        {/* ))}
      </Carousel> */}
      
      
      {/* 指示器 */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex space-x-2">
        {carouselData.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              if (carouselRef.current) {
                carouselRef.current.goTo(index);
              }
            }}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              currentSlide === index 
                ? 'bg-primary w-8' 
                : 'bg-white/50 hover:bg-white/80'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default CommunityCarousel;
