import axiosInstance from './axiosInstance';

const url = 'http://localhost:8081';

export const fetchUsersList = () => axiosInstance.get(`${url}/users`);
export const fetchUserDetail = (userId) =>
  axiosInstance.get(`${url}/users/${userId}`);
export const fetchUserPhotoById = (userId) =>
  axiosInstance.get(`${url}/photos/${userId}`);
