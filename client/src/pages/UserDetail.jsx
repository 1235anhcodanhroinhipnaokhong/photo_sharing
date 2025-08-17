import { useParams, Link } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useEffect, useState } from 'react';
import { fetchUserDetail } from '@/api';

function UserDetail() {
  const { userId } = useParams();
  const [user, setUser] = useState();

  useEffect(() => {
    (async () => {
      try {
        const { data: user } = await fetchUserDetail(userId);
        setUser(user);
      } catch (error) {
        console.log(error.message);
      }
    })();
  }, [userId]);

  if (!user) return null;

  return (
    <Card className="p-6 space-y-4">
      <p className="text-2xl font-semibold text-foreground">
        {user.first_name} {user.last_name} Info
      </p>

      <Separator />

      <div className="space-y-2">
        <p>
          Name: {user.first_name} {user.last_name}
        </p>
        <p>Address: {user.location}</p>
        <p>Description: {user.description}</p>
        <p>Occupation: {user.occupation}</p>
      </div>

      <Link to={`/users/${user._id}/photos`}>
        <Button className="mt-4 bg-blue-800">View Uploaded Photos</Button>
      </Link>
      <Link to={`/users/${user._id}/posts`}>
        <Button className="mt-4 bg-blue-800">View Posts</Button>
      </Link>
      {/* <Button onClick>View posts</Button> */}
    </Card>
  );
}

export default UserDetail;
