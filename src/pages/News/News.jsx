
import LogoSvg from '@/assets/news/newsbanner.svg';
import { useLanguage } from '../../contexts/LanguageContext';
import { 
  Layout, Card, Input, Select, DatePicker, Pagination, 
  Typography, Space, Row, Col, Tag, Divider 
} from 'antd';
import { useEffect, useState } from 'react';
import { 
  SearchOutlined 
} from '@ant-design/icons';
import './index.css'
import emptyLogo from '@/assets/news/empty.svg'


const { Title, Text } = Typography;
const { Option } = Select;
const { RangePicker } = DatePicker;

// 模拟新闻分类数据
const newsCategories = [
  { id: 'all', name: '全部分类' },
  { id: 'politics', name: '时政新闻' },
  { id: 'economy', name: '经济动态' },
  { id: 'technology', name: '科技前沿' },
  { id: 'culture', name: '文化生活' },
  { id: 'sports', name: '体育赛事' }
];

// 模拟作者数据
const newsAuthors = [
  { id: 'all', name: '全部作者' },
  { id: 'author1', name: '张三' },
  { id: 'author2', name: '李四' },
  { id: 'author3', name: '王五' },
  { id: 'author4', name: '赵六' }
];

// 生成模拟新闻数据（100条）
const generateMockNews = () => {
  const mockNews = [];
  const categories = ['politics', 'economy', 'technology', 'culture', 'sports'];
  const authors = ['author1', 'author2', 'author3', 'author4'];
  const titles = [
    '新时代科技发展规划正式发布',
    '一季度经济增长数据超出预期',
    '人工智能技术在医疗领域取得新突破',
    '全国文化遗产保护工作会议召开',
    '奥运会预选赛中国代表团表现优异'
  ];
  
  for (let i = 1; i <= 100; i++) {
    const randomCat = categories[Math.floor(Math.random() * categories.length)];
    const randomAuthor = authors[Math.floor(Math.random() * authors.length)];
    const randomTitle = titles[Math.floor(Math.random() * titles.length)];
    
    // 生成随机日期（近3个月内）
    const end = new Date();
    const start = new Date(end.setMonth(end.getMonth() - 3));
    const randomDate = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    
    mockNews.push({
      id: `news-${i}`,
      title: `${randomTitle}（${i}）`,
      content: '这是一篇关于' + newsCategories.find(c => c.id === randomCat)?.name + 
               '的详细报道，内容涵盖事件背景、发展过程及专家解读，为读者提供全面的信息参考33333333333333333333333333333333333333333333333333333333333333333333333333333333333333。',
      category: randomCat,
      author: randomAuthor,
      publishTime: randomDate,
      viewCount: Math.floor(Math.random() * 10000) + 1000 // 随机浏览量
    });
  }
  
  return mockNews;
};













const News = () =>{
    const { t } = useLanguage();
     // 状态管理
  const [newsList, setNewsList] = useState([]); // 全部新闻数据
  const [filteredNews, setFilteredNews] = useState([]); // 筛选后新闻
  const [currentPage, setCurrentPage] = useState(1); // 当前页码
  const [pageSize] = useState(10); // 每页条数
  const [totalCount, setTotalCount] = useState(0); // 总条数
  
  // 筛选条件状态
  const [filterParams, setFilterParams] = useState({
    category: 'all', // 分类筛选
    author: 'all', // 作者筛选
    dateRange: null, // 时间范围筛选
    searchKey: '' // 关键词搜索
  });

     useEffect(() => {
    const mockNews = generateMockNews();
    setNewsList(mockNews);
    setFilteredNews(mockNews);
    setTotalCount(mockNews.length);
  }, []);

  // 筛选条件变化时重新过滤数据
  useEffect(() => {
    let result = [...newsList];
    
    // 1. 分类筛选
    if (filterParams.category !== 'all') {
      result = result.filter(news => news.category === filterParams.category);
    }
    
    // 2. 作者筛选
    if (filterParams.author !== 'all') {
      result = result.filter(news => news.author === filterParams.author);
    }
    
    // 3. 时间范围筛选
    if (filterParams.dateRange && filterParams.dateRange.length === 2) {
      const [startDate, endDate] = filterParams.dateRange;
      result = result.filter(news => {
        const newsTime = news.publishTime;
        return newsTime >= startDate && newsTime <= endDate;
      });
    }
    
    // 4. 关键词搜索（标题+内容）
    if (filterParams.searchKey.trim()) {
      const searchStr = filterParams.searchKey.toLowerCase();
      result = result.filter(news => 
        news.title.toLowerCase().includes(searchStr) || 
        news.content.toLowerCase().includes(searchStr)
      );
    }
    
    // 更新筛选结果和总条数
    setFilteredNews(result);
    setTotalCount(result.length);
    setCurrentPage(1); // 重置到第一页
  }, [filterParams, newsList]);

  // 处理筛选条件变化
  const handleFilterChange = (type, value) => {
    setFilterParams(prev => ({
      ...prev,
      [type]: value
    }));
  };

  // 处理分页变化
  const handlePageChange = (page, pageSize) => {
    setCurrentPage(page);
  };

  // 获取当前页显示的数据
  const getCurrentPageData = () => {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return filteredNews.slice(startIndex, endIndex);
  };

  // 格式化日期显示
  const formatDate = (date) => {
    return new Intl.DateTimeFormat('zh-CN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  // 获取分类名称
  const getCategoryName = (categoryId) => {
    return newsCategories.find(c => c.id === categoryId)?.name || '';
  };

  // 获取作者名称
  const getAuthorName = (authorId) => {
    return newsAuthors.find(a => a.id === authorId)?.name || '';
  };







    return <div className="space-b-16">
        <div className='relative'>
            <img src={LogoSvg} className='w-full'/>
            <span className='absolute left-[60px] top-1/3 text-[36px] text-[#333]'>{t('news')}</span>
        </div>
         <section className="py-12 bg-[#f6f9ff]">
            <div className="container px-4 flex justify-between">
                 <Row gutter={[16, 16]} className='w-[70%]'>
                    {/* 关键词搜索 */}
                    <Col xs={24} sm={12} md={6}>
                        <Input
                        placeholder="输入标题或内容关键词"
                        value={filterParams.searchKey}
                        onChange={(e) => handleFilterChange('searchKey', e.target.value)}
                        onPressEnter={() => {}}
                        prefix={<SearchOutlined />}
                        />
            
                    </Col>

                    {/* 分类筛选 */}
                    <Col xs={24} sm={12} md={6}>
                        <Select
                         className="custom-no-bg-select" 
                        style={{ width: '100%' }}
                        value={filterParams.category}
                        onChange={(value) => handleFilterChange('category', value)}
                        placeholder="请选择分类"
                        >
                        {newsCategories.map(category => (
                            <Option key={category.id} value={category.id}>
                            {category.name}
                            </Option>
                        ))}
                        </Select>
            
                    </Col>

                    {/* 作者筛选 */}
                    <Col xs={24} sm={12} md={6}>
                    
                        <Select
                         className="custom-no-bg-select" 
                        style={{ width: '100%' }}
                        value={filterParams.author}
                        onChange={(value) => handleFilterChange('author', value)}
                        placeholder="请选择作者"
                        >
                        {newsAuthors.map(author => (
                            <Option key={author.id} value={author.id}>
                            {author.name}
                            </Option>
                        ))}
                        </Select>
                    
                    </Col>

                    {/* 时间范围筛选 */}
                    <Col xs={24} sm={12} md={6}>
                    
                        <RangePicker
                         className="custom-no-bg-range-picker"
                        style={{ width: '100%' }}
                        value={filterParams.dateRange}
                        onChange={(date) => handleFilterChange('dateRange', date)}
                        placeholder={['开始日期', '结束日期']}
                        format="YYYY-MM-DD"
                        />
                
                    </Col>
                </Row>
            </div>
            <div className="container px-4 flex flex-wrap items-baseline justify-between">
                         {getCurrentPageData().length > 0 ? (
            <div className="space-y-4 w-full">
              {getCurrentPageData().map((news,index) => (
               
                  <Row key={index} gutter={[24, 16]} className='mt-10 cursor-pointer'>
                    <Col xs={24} md={18}>
                      {/* 新闻标题 */}
                      <Title level={5} style={{fontSize:22,fontWeight:500}} className=" mb-4 text-[#333] hover:text-[#0062ff] cursor-pointer transition-colors">
                        {news.title}
                      </Title>

                    <Space size="small" className="text-gray-500 mb-[18px]">
                        <Tag color="#0062ff" size="small">
                          {getCategoryName(news.category)}
                        </Tag>
                      </Space>
                      
                      {/* 新闻摘要 */}
                      <Text className="text-[#666] text-[16px] line-clamp-3 mb-4 block">
                        {news.content}
                      </Text>
                      
                      {/* 新闻信息标签 */}
                      <Space size="small" >
                        
                        <Space size="middle" className="flex items-center">
                          <Text className="text-[14px] text-[#666]">{getAuthorName(news.author)}</Text>
                        </Space>

                        <Space size="middle" className="flex items-center">
                            <span className="text-[14px] text-[#666] h-3">{'|'}</span>
                        </Space>

                        <Space size="middle" className="flex items-center">  
                          <Text className="text-[14px] text-[#666]">{formatDate(news.publishTime)}</Text>
                        </Space>
                       
                      </Space>
                    </Col>
                    
                    {/* 新闻缩略图（仅在中等屏幕以上显示） */}
                    <Col xs={0} md={6}>
                      <div 
                        className="w-full h-[200px] bg-cover bg-center rounded-md"
                        style={{ 
                          backgroundImage: `url(https://picsum.photos/id/${(news.id.slice(-2) % 100) + 10}/400/300)`,
                          boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
                        }}
                      />
                    </Col>
                  </Row>
      
              ))}
            </div>
          ) : (
            // 无数据提示
            <div className="flex flex-col py-16 bg-#f6f9ff w-full items-center">
              <img src={emptyLogo} width={110} height={110}/>
              <Text className="text-[#999] text-lg mt-5 ">{t('empty')}</Text>
            </div>
          )}
            </div>

             {/* 分页区域 */}
            { totalCount >0 && <div className="container flex justify-end mt-8 relative px-3">
              <Pagination
                current={currentPage}
                pageSize={pageSize}
                total={totalCount}
                onChange={handlePageChange}
                showSizeChanger={false}
                showQuickJumper
                showTotal={(total) => `共 ${total} 条新闻`}
                className="mt-4"
              />
            </div>}
        
      </section>

    </div>
}
export default News