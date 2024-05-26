import { Navigate, createBrowserRouter } from 'react-router-dom';
import RootLayout from './pages/Layout/RootLayout';
import Landing from './pages/Landing/Landing';
import { Dashboard } from './pages/Dashboard/Dashboard';
import Books from './pages/Book/Books';
import AddBook from './pages/Book/AddBook';
import BookOutlet from './pages/Book/BookOutlet';
import MemberOutlet from './pages/Member/MemberOutlet';
import Members from './pages/Member/Members';
import AddMember from './pages/Member/AddMember';
import IssueOutlet from './pages/Issue/IssueOutlet';
import Issues from './pages/Issue/Issues';
import AddIssue from './pages/Issue/AddIssue';

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
        path: 'dashboard',
        element: <Dashboard/>,
        children: [
          {
            index: true,
            element: <Navigate to='books' />,
          },
          {
            id: 'books',
            path: 'books',
            element: <BookOutlet/>,
            children: [
              {
                id: 'viewBooks',
                index: true,
                element: <Books />,
              },
              {
                id: 'addBook',
                path: 'add',
                element: <AddBook/>,
              },
            ]
          },
          {
            id: 'members',
            path: 'members',
            element: <MemberOutlet/>,
            children: [
              {
                id: 'viewMember',
                index: true,
                element: <Members />,
              },
              {
                id: 'addMember',
                path: 'add',
                element: <AddMember/>,
              },
            ]
          },
          {
            id: 'issues',
            path: 'issues',
            element: <IssueOutlet/>,
            children: [
              {
                id: 'viewIssue',
                index: true,
                element: <Issues />,
              },
              {
                id: 'addIssue',
                path: 'add',
                element: <AddIssue/>,
              },
            ]
          },
        ]
      }
    ],
  },
];

export const appRouter = createBrowserRouter(appRoutes);
