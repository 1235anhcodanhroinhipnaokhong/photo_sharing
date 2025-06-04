import axios from 'axios';

const url = 'http://localhost:8081';

export const fetchUsersList = () => axios.get(`${url}/users`);
export const fetchUserDetail = (userId) => axios.get(`${url}/users/${userId}`);
export const fetchUserPhotoById = (userId) =>
  axios.get(`${url}/photos/${userId}`);
