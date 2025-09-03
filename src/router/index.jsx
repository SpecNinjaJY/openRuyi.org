import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from '../pages/Home';
// import Develop from '../pages/Develop';
import News from '../pages/News';
// import Technology from '../pages/Technology';
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
    //   { path: '/technology', element: <Technology /> },
    //   { path: '/learning', element: <Learning /> },
    ]
  }
]);

const Router = () => <RouterProvider router={router} />;

export default Router;
