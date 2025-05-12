import {
  Divider,
  List,
  ListItem,
  ListItemText,
  Typography,
  Box,
} from '@mui/material';
import models from '../modelData/models';
import { Link } from 'react-router-dom';

function UserList() {
  const users = models.userListModel();

  return (
    <Box p={3}>
      <Typography variant="h5" gutterBottom>
        User List
      </Typography>

      <List component="nav">
        {users.map((user) => (
          <Box key={user._id}>
            <Link
              to={`/users/${user._id}`}
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <ListItem button>
                <ListItemText
                  primary={`${user.first_name} ${user.last_name}`}
                  secondary={user.occupation}
                />
              </ListItem>
            </Link>
            <Divider />
          </Box>
        ))}
      </List>
    </Box>
  );
}

export default UserList;
