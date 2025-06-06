import { useParams } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useEffect, useState } from 'react';
import {
  editComment,
  fetchUserDetail,
  fetchUserPhotoById,
  postComment,
} from '@/api';
import { format } from 'date-fns'; // Thêm thư viện format nếu anh dùng để định dạng ngày
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/authContext';

function UserPhotos() {
  const { userId } = useParams();
  const [photos, setPhotos] = useState([]);
  const [photosOwner, setPhotosOwner] = useState();
  const [comment, setComment] = useState();
  const { user, token } = useAuth();
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editedTexts, setEditedTexts] = useState({});

  const handleEdit = async (photoId, commentId) => {
    try {
      await editComment(photoId, commentId, editedTexts, token); // Gửi editedText và token

      const updatedPhotos = photos.map((photo) => {
        if (photo._id === photoId) {
          return {
            ...photo,
            comments: photo.comments.map((c) => {
              if (c._id === commentId) {
                return { ...c, comment: editedText };
              }
              return c;
            }),
          };
        }
        return photo;
      });

      setPhotos(updatedPhotos);
      setEditingCommentId(comment._id);
      setEditedTexts((prev) => ({ ...prev, [comment._id]: comment.comment }));
    } catch (error) {
      console.error('Edit failed:', error.message);
    }
  };

  const handleSendComment = async (photoId, comment, token) => {
    try {
      await postComment(photoId, comment, token);

      const updatedPhotos = photos.map((p) => {
        if (p._id === photoId) {
          return {
            ...p,
            comments: [
              ...(p.comments || []),
              {
                comment,
                user: {
                  _id: user?._id,
                  first_name: user?.first_name,
                  last_name: user?.last_name,
                },
                date_time: new Date().toISOString(),
              },
            ],
          };
        }
        return p;
      });

      setPhotos(updatedPhotos);
      setComment('');
    } catch (error) {
      console.error('Failed to post comment:', error.message);
    }
  };
  useEffect(() => {
    (async () => {
      try {
        const { data: photos } = await fetchUserPhotoById(userId);
        const { data: owner } = await fetchUserDetail(userId);
        setPhotos(photos);
        setPhotosOwner(owner);
        console.log(data);
      } catch (error) {
        console.log(error.message);
      }
    })();
  }, [userId]);

  return (
    <div className="p-4 space-y-6">
      <h1 className="text-3xl font-semibold">
        Photos uploaded by {photosOwner?.first_name} {photosOwner?.last_name}
      </h1>
      {photos.map((photo) => (
        <Card key={photo._id} className="overflow-hidden">
          <div className="w-full bg-muted flex justify-center items-center h-[300px]">
            <img
              src={`http://localhost:8081/images/${photo.file_name}`}
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
                    <div className="flex ">
                      <p className="text-sm font-semibold">
                        {comment.user?.first_name} {comment.user?.last_name}
                        {comment.user?._id === user?.userId && (
                          <>
                            {editingCommentId === comment._id ? (
                              <>
                                <input
                                  value={editedTexts}
                                  onChange={(e) =>
                                    setEditedTexts((prev) => ({
                                      ...prev,
                                      [comment._id]: e.target.value,
                                    }))
                                  }
                                />
                                <button
                                  onClick={() =>
                                    handleEdit(photo._id, comment._id)
                                  }
                                >
                                  Save
                                </button>
                              </>
                            ) : (
                              <Button
                                onClick={(e) => {
                                  setEditingCommentId(comment._id);
                                  setEditedTexts((prev) => ({
                                    ...prev,
                                    [comment._id]: e.target.value,
                                  }));
                                }}
                              >
                                Edit
                              </Button>
                            )}
                          </>
                        )}
                      </p>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {comment.comment}
                    </p>
                    <p className="text-xs text-gray-500">
                      {format(new Date(comment.date_time), 'dd/MM/yyyy HH:mm')}
                    </p>
                  </div>
                ))}
              </div>
            )}
            <input
              placeholder="Comment..."
              value={comment}
              onChange={(e) => {
                setComment(e.target.value);
              }}
            ></input>
            <Button
              onClick={() => handleSendComment(photo._id, comment, token)}
            >
              Send
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export default UserPhotos;
