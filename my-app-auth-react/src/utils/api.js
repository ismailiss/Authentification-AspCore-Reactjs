import axiosInstance from './axios';

export const loginUser = (email, password) => {
  return axiosInstance.post('/Login', {
    email,
    password
  });
}
export const getProfile = (id,token) => {
  return axiosInstance.get('/GetUserProfile/'+id,  {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
