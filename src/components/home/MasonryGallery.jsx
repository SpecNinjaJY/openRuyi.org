import { useEffect, useState, useMemo } from 'react';
import group1 from '@/assets/home/other1.svg'
import group2 from '@/assets/home/other2.svg'
import group3 from '@/assets/home/other3.svg'
import group4 from '@/assets/home/other4.svg'


const MasonryGallery = () => {
  // 1. 使用 useMemo 缓存图片数据，避免每次渲染创建新引用
  const imageData = useMemo(() => [
    { id: 1, url: group1, alt: '照片1' },
    { id: 2, url: group2, alt: '照片2'},
    { id: 3, url: group3, alt: '照片3' },
    { id: 4, url: group4, alt: '照片4'}
  
  ], []); // 空依赖数组：只初始化一次


  return (
    <div className="mx-auto flex container gap-4 cursor-pointer">

            {imageData.map((image) => <div 
                  key={image.id}
                  className="rounded-lg overflow-hidden transform transition-all duration-100 hover:shadow-md hover:border-[2px] hover:border-[#0062ff]"
                >
                  <img
                    src={image.url}
                    alt={image.alt}
                    className="w-full object-cover"
                   
                  />
                </div>
              
            ) 
          }
    </div>
        )
}

export default MasonryGallery;
