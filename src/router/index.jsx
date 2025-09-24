import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from '@/pages/home/index.jsx';
import News from '@/pages/news/index.jsx';
import NewsDetail from '@/pages/news/newsDetail.jsx';
import Download from '@/pages/download/index.jsx';
import NotFound from '@/pages/404.jsx';
import Layout from '@/components/layout.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <NotFound />,
    children: [
      { path: '/', element: <Home /> },
    //   { path: '/develop', element: <Develop /> },
  { path: '/news', element: <News /> },
  { path: '/newsdetail/:newsId', element: <NewsDetail /> },
  { path: '/download', element: <Download /> },
    ]
  }
]);

const Router = () => <RouterProvider router={router} />;

export default Router;
