import { useParams } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useEffect, useState } from 'react';
import { fetchUserPhotoById } from '@/api';
import { format } from 'date-fns'; // Thêm thư viện format nếu anh dùng để định dạng ngày

function UserPhotos() {
  const { userId } = useParams();
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await fetchUserPhotoById(userId);
        setPhotos(data);
        console.log(data);
      } catch (error) {
        console.log(error.message);
      }
    })();
  }, [userId]);

  return (
    <div className="p-4 space-y-6">
      {photos.map((photo) => (
        <>
          <h1 className="text-3xl font-semibold">
            Photos uploaded by {photo.user?.first_name} {photo.user?.last_name}
          </h1>
          <Card key={photo._id} className="overflow-hidden">
            <div className="w-full bg-muted flex justify-center items-center h-[300px]">
              <img
                src={`/images/${photo.file_name}`}
                alt={photo.file_name}
                className="object-contain max-h-full"
              />
            </div>

            <CardContent className="space-y-2 mt-2">
              {photo.comments?.length > 0 && (
                <div className="mt-4">
                  <h3 className="text-lg font-medium mb-2">Comments:</h3>
                  {photo.comments.map((comment, i) => (
                    <div key={i} className="pl-4 space-y-1 mb-4">
                      <Separator className="my-2" />
                      <p className="text-sm font-semibold">
                        {comment.user?.first_name} {comment.user?.last_name}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {comment.comment}
                      </p>
                      <p className="text-xs text-gray-500">
                        {format(
                          new Date(comment.date_time),
                          'dd/MM/yyyy HH:mm'
                        )}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </>
      ))}
    </div>
  );
}

export default UserPhotos;
