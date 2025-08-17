import axiosInstance from './axiosInstance';
import axios from 'axios';
const url = 'http://localhost:8081';

export const fetchUsersList = () => axiosInstance.get(`${url}/users`);
export const fetchUserDetail = (userId) =>
  axiosInstance.get(`${url}/users/${userId}`);
export const fetchPostDetail = (userId) =>
  axiosInstance.get(`${url}/users/${userId}/posts`);
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

export const editComment = (photoId, commentId, body, token) => {
  return axios.put(`/comments/${photoId}/${commentId}`, body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const editPhoto = (photoId, body, token) => {
  return axios.put(`/photos/edit-photo/${photoId}`, body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
