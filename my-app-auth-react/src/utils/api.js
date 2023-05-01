import axiosInstance from './axios';

export const loginUser = (email, password) => {
  return axiosInstance.post('/Login', {
    email,
    password
  });
}
export const getProfile = (id) => {
  return axiosInstance.get('/'+id);
}
