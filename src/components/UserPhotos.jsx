import { useState, useEffect } from 'react';
import { Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import model from '../modelData/models';
function UserPhotos() {
  const { userId } = useParams();
  const photos = model.photoOfUserModel(userId);
  return (
    <Typography variant="body1">
      <h2>Photos which that user uploaded</h2>
      {photos.map((photo) => (
        <ul key={photo._id}>
          {Object.entries(photo).map(([key, value]) => {
            return (
              <li key={key}>
                {key === 'file_name' ? (
                  <img
                    src={`/images/${value}`}
                    alt={value}
                    style={{ maxWidth: '200px', height: 'auto' }}
                  />
                ) : key === 'comments' ? (
                  <ul>
                    {Array.isArray(value) &&
                      value.map((comment, index) => (
                        <li key={index}>
                          <ul>
                            {Object.entries(comment).map(
                              ([commentKey, commentVal], i) => (
                                <li key={i}>
                                  {commentKey} : {commentVal.toString()}
                                </li>
                              )
                            )}
                          </ul>
                        </li>
                      ))}
                  </ul>
                ) : (
                  `${key} : ${value.toString()}`
                )}
              </li>
            );
          })}
        </ul>
      ))}
    </Typography>
  );
}

export default UserPhotos;
