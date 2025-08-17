import { useParams, Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useEffect, useState } from 'react';
import { fetchPostDetail, fetchUserDetail } from '@/api';
function PostDetail() {
  const { userId } = useParams();
  const [posts, setPosts] = useState();
  const [user, setUser] = useState();
  useEffect(() => {
    (async () => {
      try {
        const { data: postsData } = await fetchPostDetail(userId);
        setPosts(postsData);
        const { data: userData } = await fetchUserDetail(userId);
        setUser(userData);
        console.log(postsData);
      } catch (error) {
        console.log(error.message);
      }
    })();
  }, [userId]);

  if (!user) return <p>Loading user...</p>;

  return (
    <Card className="p-6 space-y-4">
      <p className="text-2xl font-semibold text-foreground">
        {user.first_name} {user.last_name} Posts Info
      </p>
      {posts?.length > 0 &&
        posts.map((post) => (
          <div key={post._id} className="space-y-2">
            <p className="text-lg font-semibold">{post.title}</p>
            <p className="text-sm text-muted-foreground">{post.description}</p>
            <Separator />
          </div>
        ))}
      {/* <Button asChild>
        <Link to={`/users/${userId}`}>Back to User Detail</Link> */}
      {/* </Button> */}
    </Card>
  );
}

export default PostDetail;
