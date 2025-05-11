import {
  createBrowserRouter,
  RouterProvider,
  useLocation,
} from 'react-router-dom';
import './App.css';
import RootLayout from './layouts/RootLayout.jsx';
import UserList from './components/UserList';
import UserDetail from './components/UserDetail';
import UserPhotos from './components/UserPhotos';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, element: <UserList /> },
      { path: 'users', element: <UserList /> },
      { path: 'users/:userId', element: <UserDetail /> },
      { path: 'photos/:userId', element: <UserPhotos /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
