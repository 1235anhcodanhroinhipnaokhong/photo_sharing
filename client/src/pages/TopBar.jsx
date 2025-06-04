import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchUserDetail } from '@/api';

function TopBar() {
  const { userId } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await fetchUserDetail(userId);
        setUser(data);
      } catch (error) {
        console.error('Failed to fetch user:', error.message);
      }
    })();
  }, [userId]);

  return (
    <header className="fixed top-0 left-0 right-0 bg-blue-800 shadow text-white p-4 z-50 ">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <h2 className="text-xl font-bold">Tran Van Toan</h2>
      </div>
    </header>
  );
}

export default TopBar;
