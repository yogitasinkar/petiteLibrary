import { Navigate, createBrowserRouter } from 'react-router-dom';
import RootLayout from './pages/Layout/RootLayout';
import Landing from './pages/Landing/Landing';
import { Dashboard } from './pages/Dashboard/Dashboard';
import Books from './pages/Books/Books';

const appRoutes = [
  {
    id: 'root',
    path: '/',
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Navigate to={'landing'} />,
      },
      {
        id: 'landing',
        path: 'landing',
        element: <Landing />,
      },
      {
        id: 'dashboard',
        path: '/dashboard',
        element: <Dashboard/>,
        children: [
          {
            index: true,
            element: <Navigate to='books' />,
          },
          {
            id: 'books',
            path: 'books',
            element: <Books/>
          },
          {
            id: 'members',
            path: 'members',
            element: <div>Members</div>
          },
        ]
      }
    ],
  },
];

export const appRouter = createBrowserRouter(appRoutes);
