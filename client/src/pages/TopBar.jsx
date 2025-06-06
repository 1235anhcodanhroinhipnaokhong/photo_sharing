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
import { Separator } from '@/components/ui/separator';

function TopBar() {
  const { userId } = useParams();
  const { logout, user, token } = useAuth();
  if (user) console.log(user);

  const [userDetail, setUserDetail] = useState();
  useEffect(() => {
    (async () => {
      if (!user?.userId) return; // kiểm tra ID hợp lệ
      try {
        const { data } = await fetchUserDetail(user.userId); // <-- sửa ở đây
        setUserDetail(data);
      } catch (error) {
        console.log(error.message);
      }
    })();
  }, [user]);

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
            {userDetail && (
              <Dialog>
                <form>
                  <DialogTrigger>
                    {userDetail.first_name} {userDetail.last_name}
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Profile</DialogTitle>
                      <DialogDescription>Your information</DialogDescription>
                    </DialogHeader>

                    <Separator />

                    <div className="space-y-2">
                      <p>
                        Name: {userDetail.first_name} {userDetail.last_name}
                      </p>
                      <p>Address: {userDetail.location}</p>
                      <p>Description: {userDetail.description}</p>
                      <p>Occupation: {userDetail.occupation}</p>
                    </div>
                  </DialogContent>
                </form>
              </Dialog>
            )}

            <Button onClick={logout}>Logout</Button>
          </div>
        )}
      </div>
    </header>
  );
}

export default TopBar;
