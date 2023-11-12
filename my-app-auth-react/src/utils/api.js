import axiosInstance from "./axios";

export const loginUser = (email, password) => {
  return axiosInstance.post("/Login", {
    email,
    password,
  });
};
export const getProfile = (id, token) => {
  return axiosInstance.get("/GetUserProfile/" + id, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const editProfileApi = (
  id,
  token,
  firstName,
  lastName,
  email,
  username,
  birthDate
) => {
  return axiosInstance.post(
    "/updateUserProfile/" + id,
    { firstName, lastName, email, username, birthDate },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};
