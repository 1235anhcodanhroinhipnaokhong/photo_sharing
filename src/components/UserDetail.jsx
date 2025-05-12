import {
  Typography,
  Box,
  List,
  ListItem,
  ListItemText,
  Button,
} from '@mui/material';
import { useParams, Link } from 'react-router-dom';
import models from '../modelData/models';

function UserDetail() {
  const { userId } = useParams();
  const user = models.userModel(userId);

  if (!user) return null;

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>
        User Info
      </Typography>

      <List>
        {Object.entries(user).map(([key, value]) => {
          if (key === '_id') return null;
          return (
            <ListItem key={key}>
              <ListItemText primary={key} secondary={value.toString()} />
            </ListItem>
          );
        })}
      </List>

      <Link to={`/photos/${userId}`} style={{ textDecoration: 'none' }}>
        <Button variant="contained" color="primary" sx={{ mt: 2 }}>
          View Uploaded Photos
        </Button>
      </Link>
    </Box>
  );
}

export default UserDetail;
