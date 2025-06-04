import { useState, useContext } from 'react';
import axios from '@/api/axiosInstance';
import { AuthContext } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom'; // ✅ thêm dòng này

export default function LoginPage() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate(); // ✅ thêm dòng này

  const [loginName, setLoginName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/admin/login', {
        login_name: loginName,
        password,
      });
      login(res.data.user, res.data.token);

      navigate('/users'); // ✅ chuyển hướng sau khi đăng nhập thành công
    } catch (err) {
      setError('Invalid credentials');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={loginName}
        onChange={(e) => setLoginName(e.target.value)}
        placeholder="Login Name"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button type="submit">Login</button>
      {error && <p>{error}</p>}
    </form>
  );
}
