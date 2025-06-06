import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchUserDetail } from '@/api';
import { useAuth } from '@/context/authContext';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import UploadPhoto from '@/components/UploadPhoto';

function TopBar() {
  const { userId } = useParams();
  const { logout, user, token } = useAuth();

  return (
    <header className="fixed top-0 left-0 right-0 bg-blue-800 shadow text-white p-4 z-50 ">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <h2 className="text-xl font-bold">Tran Van Toan</h2>
        {user && (
          <div className="flex gap-3 items-center">
            <Dialog>
              <form>
                <DialogTrigger asChild>
                  <Plus
                    onClick={user._id === userId ? () => {} : undefined}
                    className=""
                  ></Plus>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Upload Photo</DialogTitle>
                    <DialogDescription>
                      Share your photo to others
                    </DialogDescription>
                  </DialogHeader>
                  <UploadPhoto token={token} />
                </DialogContent>
              </form>
            </Dialog>

            <p>
              {user.first_name} {user.last_name}
            </p>
            <Button onClick={logout}>Logout</Button>
          </div>
        )}
      </div>
    </header>
  );
}

export default TopBar;
