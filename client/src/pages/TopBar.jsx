import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchUserDetail } from '@/api';
import { useAuth } from '@/context/authContext';
import { Button } from '@/components/ui/button';

function TopBar() {
  const { userId } = useParams();
  const { logout, user } = useAuth();
  return (
    <header className="fixed top-0 left-0 right-0 bg-blue-800 shadow text-white p-4 z-50 ">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <h2 className="text-xl font-bold">Tran Van Toan</h2>
        <div className="flex gap-3 items-center">
          <p>
            {user.first_name} {user.last_name}
          </p>
          <Button onClick={logout}>Logout</Button>
        </div>
      </div>
    </header>
  );
}

export default TopBar;
