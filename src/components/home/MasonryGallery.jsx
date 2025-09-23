import { useMemo } from 'react';
import group1 from '@/assets/home/other1.svg'
import group2 from '@/assets/home/other2.svg'
import group3 from '@/assets/home/other3.svg'
import group4 from '@/assets/home/other4.svg'
import { useLanguage } from '@/contexts/languageContext.jsx';


const MasonryGallery = () => {
    const { t } = useLanguage();
  // 1. 使用 useMemo 缓存图片数据，避免每次渲染创建新引用
  const imageData = useMemo(() => [
    { id: 1, url: group1, alt: '照片1' },
    { id: 2, url: group2, alt: '照片2'},
    { id: 3, url: group3, alt: '照片3' },
    { id: 4, url: group4, alt: '照片4'}
  
  ], []); // 空依赖数组：只初始化一次


  return (
    <div className="flex container justify-between flex-wrap gap-2">

            {imageData.map((image,id) => <div 
                  key={image.id}
                  className="lg:w-[22%] xs:w-[45%] relative border-2 aspect-4/3 bg-no-repeat bg-cover bg-center flex flex-col p-8 rounded-md border-transparent transition-all duration-200 hover:border-[#0062ff] cursor-pointer"
                  style={{cursor:id>2 && 'not-allowed',border:id>2&& 'none',backgroundImage:`url(${image.url})`}}
                  >
                  
                  {id<=2?<>
                    <div className='text-[#333] lg:text-[24px] text-[18px]  mb-3'>
                    {t(`child${id+1}.0`)}
                  </div>
                   <div className='text-[#333] lg:text-[14px] text-[12px]'>
                    {t(`child${id+1}.1`)}
                  </div>
                  </>:<>
                    <div className='text-[#999] lg:text-[24px] text-[18px]'>{t('wait')}</div>
                  </>}
                  
                </div>
              
            ) 
          }
    </div>
        )
}

export default MasonryGallery;
