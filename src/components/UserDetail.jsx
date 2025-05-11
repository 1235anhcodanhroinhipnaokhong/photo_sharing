import React from 'react';
import { Typography } from '@mui/material';
import model from '../modelData/models';
import { useParams, Link } from 'react-router-dom';

function UserDetail() {
  const { userId } = useParams();
  const user = model.userModel(userId);

  return (
    <Typography variant="body1">
      {user ? (
        <div>
          <h1>User Info</h1>
          <ul>
            {Object.entries(user).map(([key, value]) => {
              return (
                <li key={userId}>
                  {key} : {value}
                </li>
              );
            })}
          </ul>
          <Link to={`/photos/${userId}`}>Photos which that user uploaded</Link>
        </div>
      ) : null}
    </Typography>
  );
}
export default UserDetail;
