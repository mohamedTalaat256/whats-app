import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import GuestLayout from './layouts/GuestLayout'
import LoginPage from './views/auth/Login';
import Page404 from './views/Page404';
import MainLayout from './layouts/main/MainLayout';
import ChatsScreen from './views/chat/ChatsScreen';
// ----------------------------------------------------------------------

export default function Router() {
  const routes = useRoutes([
    {
      path: '/',
      element: <MainLayout />,
      children: [
        { element: <Navigate to="/app" />, index: true },
        { path: 'app', element: <ChatsScreen /> },


        
        
      ],
    },
    {
      path: '/',
      element: <GuestLayout/>,
      children: [
     //   { path: '/guest', element: <HomePage /> },
        { path: 'login', element: <LoginPage/>},
      ]
    },
    
    {
      path: '*',
      element: <Page404 />,
    },
  ]);

  return routes;
}
