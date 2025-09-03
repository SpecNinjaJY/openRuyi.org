import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from '../pages/Home/Home';
// import Develop from '../pages/Develop';
import News from '../pages/News/News';
import NewsDetail from '../pages/News/NewsDetail';
// import Learning from '../pages/Learning';
import NotFound from '../pages/404';
import Layout from '../components/Layout';

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
    //   { path: '/learning', element: <Learning /> },
    ]
  }
]);

const Router = () => <RouterProvider router={router} />;

export default Router;
