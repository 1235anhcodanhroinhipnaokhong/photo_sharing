import { useContext, useEffect } from 'react';
import { AuthContext } from '@/context/authContext';
import { useNavigate, useLocation } from 'react-router-dom';

function ProtectedLayout({ children }) {
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!token && location.pathname !== '/login') {
      navigate('/login');
    }
  }, [token, navigate, location]);

  if (!token) return null;

  return children;
}

export default ProtectedLayout;
