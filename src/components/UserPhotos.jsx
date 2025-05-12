import {
  Typography,
  Box,
  Card,
  CardContent,
  CardMedia,
  Divider,
} from '@mui/material';
import { useParams } from 'react-router-dom';
import models from '../modelData/models';

function UserPhotos() {
  const { userId } = useParams();
  const photos = models.photoOfUserModel(userId);

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>
        Photos uploaded by user
      </Typography>

      {photos.map((photo) => (
        <Card key={photo._id} sx={{ mb: 3 }}>
          <CardMedia
            component="img"
            height="300"
            image={`/images/${photo.file_name}`}
            alt={photo.file_name}
            sx={{ objectFit: 'contain', backgroundColor: '#fafafa' }}
          />
          <CardContent>
            {Object.entries(photo).map(([key, value]) => {
              if (key === 'file_name' || key === 'user_id' || key === '_id')
                return null;
              if (key === 'comments' && Array.isArray(value)) {
                return (
                  <Box key="comments" mt={2}>
                    <Typography variant="h6">Comments:</Typography>
                    {value.map((comment, i) => {
                      return (
                        <Box key={i} sx={{ mb: 1, pl: 2 }}>
                          <Divider sx={{ mb: 1 }} />
                          {Object.entries(comment).map(([k, v]) => {
                            if (k === '_id' || k === 'photo_id') return null;
                            if (k === 'user')
                              return (
                                <div>{v.first_name + ' ' + v.last_name}</div>
                              );
                            return (
                              <Typography key={k} variant="body2">
                                <strong>{k}:</strong> {v.toString()}
                              </Typography>
                            );
                          })}
                        </Box>
                      );
                    })}
                  </Box>
                );
              }

              return (
                <Typography key={key} variant="body2">
                  <strong>{key}:</strong> {value.toString()}
                </Typography>
              );
            })}
          </CardContent>
        </Card>
      ))}
    </Box>
  );
}

export default UserPhotos;
