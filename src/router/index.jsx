import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from '@/pages/home/index';
import News from '@/pages/news/index';
import NewsDetail from '@/pages/news/newsDetail';
import Download from '@/pages/download/index';
import NotFound from '@/pages/404';
import Layout from '@/components/layout';

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
