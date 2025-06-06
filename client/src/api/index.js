import axiosInstance from './axiosInstance';
import axios from 'axios';
const url = 'http://localhost:8081';

export const fetchUsersList = () => axiosInstance.get(`${url}/users`);
export const fetchUserDetail = (userId) =>
  axiosInstance.get(`${url}/users/${userId}`);
export const fetchUserPhotoById = (userId) =>
  axiosInstance.get(`${url}/photos/${userId}`);
export const postComment = async (photoId, comment, token) => {
  try {
    const res = await axios.post(
      `http://localhost:8081/photos/add-comment/${photoId}`,
      { photoId, comment },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );
  } catch (error) {
    console.log('Error posting comment:', error.message);
  }
};

export const editComment = (photoId, commentId, newComment, token) => {
  return axios.put(
    `http://localhost:8081/photos/edit-comment/${photoId}/${commentId}`,
    { newComment },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};
