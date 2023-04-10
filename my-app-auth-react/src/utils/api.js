import axiosInstance from './axios';

export const loginUser = (email, password) => {
  return axiosInstance.post('/Login', {
    email,
    password
  });
}
