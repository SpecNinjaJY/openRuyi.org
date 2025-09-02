import { useEffect, useState, useMemo } from 'react';
import group1 from '@/assets/home/group1.svg'
import group2 from '@/assets/home/group2.svg'
import group3 from '@/assets/home/group3.svg'
import group4 from '@/assets/home/group4.svg'

import group5 from '@/assets/home/group5.svg'
import group6 from '@/assets/home/group6.svg'


const MasonryGallery = () => {
  // 1. 使用 useMemo 缓存图片数据，避免每次渲染创建新引用
  const imageData = useMemo(() => [
    { id: 1, url: group1, alt: '照片1', aspectRatio: 1.5 },
    { id: 2, url: group2, alt: '照片2', aspectRatio: 1.53 },
    { id: 3, url: group3, alt: '照片3', aspectRatio: 1.67 },
    { id: 4, url: group4, alt: '照片4', aspectRatio: 1.8 },
    { id: 5, url: group5, alt: '照片5', aspectRatio: 1.7 },
    { id: 6, url: group6, alt: '照片6', aspectRatio: 1.64 },
  
  ], []); // 空依赖数组：只初始化一次

  // 布局配置
  const containerWidth = window.innerWidth*0.8; // 固定区域宽度
  const columnCount = 3; // 列数
  const gap = 16; // 间距(px)
  const [columns, setColumns] = useState([]);

  // 2. 计算列宽（使用 useMemo 缓存计算结果）
  const columnWidth = useMemo(() => {
    return (containerWidth - (gap * (columnCount - 1))) / columnCount;
  }, [containerWidth, columnCount, gap]);

  // 3. 修复 useEffect 依赖项，避免无限循环
  useEffect(() => {
    // 初始化列数组
    const initialColumns = Array.from({ length: columnCount }, () => []);
    const columnHeights = new Array(columnCount).fill(0);

    // 分配图片到不同列
    imageData.forEach((image, index) => {
      const imageHeight = columnWidth / image.aspectRatio;
      
      // 找到当前高度最小的列
      const minHeight = Math.min(...columnHeights);
      const minIndex = columnHeights.indexOf(minHeight);
      
      // 添加到该列
      initialColumns[minIndex].push(index);
      // 更新列高度
      columnHeights[minIndex] += imageHeight + gap;
    });

    setColumns(initialColumns);
  }, [imageData, columnCount, columnWidth, gap]); // 只依赖必要的稳定值

  return (
    <div 
      className="mx-auto overflow-hidden"
      style={{ 
        width: `${containerWidth}px`,
        maxHeight: '800px',
        overflowY: 'auto',
        padding: `${gap}px`
      }}
    >
      <div 
        className="flex"
        style={{ gap: `${gap}px` }}
      >
        {/* 生成每一列 */}
        {columns.map((column, columnIndex) => (
          <div 
            key={columnIndex}
            className="flex flex-col gap-y-[16px]"
            style={{ width: `${columnWidth}px` }}
          >
            {/* 列中的图片 */}
            {column.map((imageIndex) => {
              const image = imageData[imageIndex];
              return (
                <div 
                  key={image.id}
                  className="rounded-lg overflow-hidden shadow-md transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                >
                  <img
                    src={image.url}
                    alt={image.alt}
                    className="w-full object-cover"
                    style={{ 
                      width: '100%',
                      height: `${columnWidth / image.aspectRatio}px`
                    }}
                  />
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MasonryGallery;
