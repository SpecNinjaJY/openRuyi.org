import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link, useLocation } from 'react-router-dom';
import {  Breadcrumb, Typography, Button,  Space} from 'antd';
import ReactMarkdown from 'react-markdown'; // Markdown解析库
import remarkGfm from 'remark-gfm'; // 支持GFM（表格、删除线等）
import { useLanguage } from '../../contexts/languageContext';


// 解构组件
const { Title, Text } = Typography;

// 模拟新闻数据（实际项目中从接口获取）
const mockNewsData = [
  {
    id: 'news-1',
    title: '新时代科技发展规划正式发布',
    category: 'technology',
    categoryName: '科技前沿',
    author: '张三',
    publishTime: '2025-09-01 09:30:00',
    viewCount: 5289,
    content: `# 新时代科技发展规划正式发布

为推动科技创新高质量发展，国家发改委于9月1日正式发布《新时代科技发展规划（2025-2030年）》，明确未来五年科技发展的核心目标与重点任务。

## 一、规划核心目标
1. 研发投入强度提升至2.8%以上
2. 高新技术企业数量突破50万家
3. 关键核心技术自主可控率达到75%
4. 科技成果转化率提升至60%

## 二、重点发展领域
### 1. 人工智能
- 推进通用人工智能大模型研发与产业化应用
- 建立AI安全监管体系，防范技术风险
- 培养AI专业人才超100万人次

### 2. 生物医药
| 领域       | 目标任务                  | 时间节点   |
|------------|---------------------------|------------|
| 创新药研发 | 获批1类新药超50个         | 2028年     |
| 基因治疗   | 覆盖罕见病治疗领域80%以上 | 2030年     |
| 疫苗研发   | 建立全球领先的疫苗生产基地 | 2027年     |

## 三、保障措施
- 加大财政支持：设立1000亿元科技创新基金
- 优化人才政策：给予顶尖科技人才"绿色通道"
- 完善知识产权保护：建立跨区域知识产权维权机制

> 发改委负责人表示，该规划将为我国建设科技强国提供重要支撑，助力实现高水平科技自立自强。
`
  },
  {
    id: 'news-2',
    title: '一季度经济增长数据超出预期',
    category: 'economy',
    categoryName: '经济动态',
    author: '李四',
    publishTime: '2025-09-02 14:15:00',
    viewCount: 3652,
    content: `# 一季度经济增长数据超出预期

国家统计局于4月15日发布2025年一季度经济数据，国内生产总值（GDP）同比增长6.2%，超出市场预期的5.8%，实现经济开门红。

## 一、核心数据亮点
- **GDP总量**：28.6万亿元，同比增长6.2%
- **工业增加值**：同比增长5.8%，其中高端制造业增长12.3%
- **消费市场**：社会消费品零售总额同比增长8.5%，新能源汽车销量增长45.2%
- **固定资产投资**：同比增长4.7%，基建投资增长6.1%

## 二、增长动力分析
1. **政策发力**：年初以来实施的减税降费政策累计为市场主体减负超3000亿元
2. **产业升级**：高端制造业、数字经济等新动能贡献度提升至38%
3. **内需回暖**：消费信心指数回升至105.3，恢复至2019年同期水平

## 三、未来展望
经济学家指出，一季度经济数据显示我国经济韧性持续增强，但仍需关注外部环境不确定性、部分行业复苏不均衡等问题。下一阶段，需继续加大对实体经济的支持力度，推动经济实现质的有效提升和量的合理增长。
`
  },
  {
    id: 'news-3',
    title: '全国文化遗产保护工作会议召开',
    category: 'culture',
    categoryName: '文化生活',
    author: '王五',
    publishTime: '2025-09-03 10:00:00',
    viewCount: 2178,
    content: `# 全国文化遗产保护工作会议召开

9月3日，全国文化遗产保护工作会议在京召开，会议总结了近年来我国文化遗产保护成果，并部署下一阶段重点工作。

## 一、保护成果回顾
1. 全国重点文物保护单位增至2500处
2. 世界文化遗产数量达到56项，位居世界第二
3. 非物质文化遗产代表性项目名录收录10万余项
4. 文物修复技术水平显著提升，累计修复文物超3万件

## 二、下一阶段重点任务
- 实施"文物活起来"工程，推动博物馆数字化建设
- 加强历史文化名城、名镇、名村保护，防止过度商业化
- 完善非遗传承机制，支持非遗工坊建设，带动乡村振兴
- 建立文化遗产保护法治体系，加大文物违法犯罪打击力度

## 三、创新保护模式
会议提出，将运用大数据、人工智能等现代技术，构建"智慧文保"体系，实现文化遗产保护的科学化、精准化。同时，鼓励社会力量参与文化遗产保护，形成政府主导、社会协同的保护格局。
`
  }
];

const NewsDetail = () => {
  const { t } = useLanguage();
  const { newsId } = useParams(); // 从路由获取当前新闻ID
  const navigate = useNavigate(); // 路由导航
  const [currentNews, setCurrentNews] = useState(null); // 当前新闻数据
  const [prevNews, setPrevNews] = useState(null); // 上一篇新闻
  const [nextNews, setNextNews] = useState(null); // 下一篇新闻
  const [loading, setLoading] = useState(true); // 加载状态

  const { fromHome } = useLocation().state

  // 初始化：获取当前新闻及上下篇数据
  useEffect(() => {
    if (newsId) {
       
      // 1. 查找当前新闻
      const targetNews = mockNewsData.find(news => news.id === newsId);
       
      if (targetNews) {
        setCurrentNews(targetNews);
        
        // 2. 查找上一篇（ID排序前一个）
        const currentIndex = mockNewsData.findIndex(news => news.id === newsId);
        if (currentIndex > 0) {
          setPrevNews(mockNewsData[currentIndex - 1]);
        }
        
        // 3. 查找下一篇（ID排序后一个）
        if (currentIndex < mockNewsData.length - 1) {
          setNextNews(mockNewsData[currentIndex + 1]);
        }
      }
    }
    setLoading(false);
  }, [newsId]);

  // 处理上下篇跳转
  const handleNav = (targetId) => {
    if (targetId) {
      navigate(`/newsdetail/${targetId}`,{state:{fromHome:fromHome}}); // 跳转到目标新闻详情页
      window.scrollTo(0, 0); // 跳转后滚动到顶部
    }
  };


  return (
    loading || !currentNews ?<Title level={3} className="text-gray-600">加载中...</Title>:<div className="bg-[#f6f9ff]">
      {/* 1. 面包屑导航区域 */}
      <div>
        <div className="container mx-auto px-4 h-16 flex items-center">
          <Breadcrumb separator=">">
            {/* 一级：回到新闻列表页 */}
            <Breadcrumb.Item>
              <Link to={fromHome?"/" : "/news"} className="text-blue-600 hover:text-blue-800">
                {fromHome?t('latestNews'):t('news')}
              </Link>
            </Breadcrumb.Item>
            {/* 二级：当前新闻标题（超出时省略） */}
            <Breadcrumb.Item className="max-w-[500px] overflow-hidden text-ellipsis whitespace-nowrap">
              {currentNews.title}
            </Breadcrumb.Item>
          </Breadcrumb>
        </div>
      </div>

    
      <div className="container mx-auto px-4 py-8 bg-white shadow-sm rounded-lg"> 
        <div className="text-center">
            <span className="mb-3 text-black md:text-[36px] text-[20px] font-semibold inline-block">
              {currentNews.title}
            </span>
            <Space size="middle" className="text-gray-500 mb-3 flex items-center justify-center">
                <Text className='text-[#666]'>{currentNews.categoryName}</Text>
                    <span className='text-[#999]'>{'|'}</span>
                <Text className='text-[#666]'>{currentNews.author}</Text>
                    <span className='text-[#999]'>{'|'}</span>
                <Text className='text-[#666]'>{currentNews.publishTime}</Text>
            </Space>
    
        </div>


        <div className="bg-white p-6 md:p-8 ">
            <ReactMarkdown
            remarkPlugins={[remarkGfm]} // 支持表格、删除线等GFM语法 
            >
            {currentNews?.content}
            </ReactMarkdown>
        </div>
      </div>

          <div className="container p-4 flex flex-col justify-start">
              <div>
                  <Button
                    type="link"
                    classNames={'w-full'}
                    onClick={() => handleNav(prevNews?.id)}
                    disabled={!prevNews} // 无数据时禁用
                    className="w-full justify-start border-none"
                  >
                    <div className='w-full flex text-[16px]'>
                      <Text className="text-[#333] block mb-1 mr-2">上一篇：</Text>
                      <Text className="text-[#333] hover:text-blue-600">
                        {prevNews ? prevNews.title : '没有更多了'}
                      </Text>
                    </div>
                  </Button> 
              </div>
              <div>
                     <Button
                    type="link"
                        
                    onClick={() => handleNav(nextNews?.id)}
                    disabled={!nextNews} // 无数据时禁用
                    className="w-full justify-start border-none"
                  >
                    <div className='w-full flex text-[16px]'>
                      <Text className="text-[#333] block mb-1 mr-2">下一篇：</Text>
                      <Text className="text-[#333] hover:text-blue-600">
                        {nextNews ? nextNews.title : '没有更多了'}
                      </Text>
                    </div>
                  </Button>
              </div>
            </div>

    </div>
  );
};

export default NewsDetail;
