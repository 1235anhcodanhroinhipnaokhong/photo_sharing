import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';

import RootLayout from './layouts/RootLayout.jsx';
import UserList from './pages/UserList.jsx';
import UserDetail from './pages/UserDetail.jsx';
import UserPhotos from './pages/UserPhotos.jsx';
import ProtectedLayout from './pages/ProtectedLayout.jsx';
import LoginPage from './pages/LoginPage.jsx';
import { AuthProvider } from './context/authContext.jsx';

// Tạo một layout bao toàn bộ App bằng AuthProvider
function AppLayout() {
  return (
    <AuthProvider>
      <Outlet />
    </AuthProvider>
  );
}

const router = createBrowserRouter([
  {
    path: '',
    element: <AppLayout />, // Bao toàn bộ app bằng AuthProvider
    children: [
      {
        path: '/login',
        element: <LoginPage />, // Trang login không cần bảo vệ
      },
      {
        path: '/users',
        element: (
          <ProtectedLayout>
            <RootLayout />
          </ProtectedLayout>
        ),
        children: [
          { path: '', element: <UserList /> },
          { path: ':userId', element: <UserDetail /> },
          { path: ':userId/photos', element: <UserPhotos /> },
        ],
      },
      {
        path: '*',
        element: <LoginPage />, // fallback cho mọi route sai
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
