import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import models from '../modelData/models';
import { Link } from 'react-router-dom';
import { fetchUsersList } from '../api/index';
import { useEffect, useState } from 'react';
export default function UserList() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    (async () => {
      try {
        const { data } = await fetchUsersList();
        setUsers(data);
        console.log(data);
      } catch (error) {
        console.log(error.message);
      }
    })();
  }, []);

  return (
    <Card className="p-4">
      <CardHeader>
        <h2 className="text-2xl font-semibold">User List</h2>
      </CardHeader>

      <CardContent className="space-y-4">
        {users.map((user, index) => (
          <div key={user._id}>
            <Link
              to={`/users/${user._id}`}
              className="block hover:bg-muted/50 transition-colors rounded-md p-3"
            >
              <p className="text-lg font-medium">
                {user.first_name} {user.last_name}
              </p>
              <p className="text-sm text-muted-foreground">{user.occupation}</p>
            </Link>
            {index !== users.length - 1 && <Separator className="my-2" />}
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
