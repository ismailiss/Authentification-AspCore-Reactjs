export const PROFILE_USER_REQUEST = 'PROFILE_USER_REQUEST';
export const PROFILE_USER_SUCCESS = 'PROFILE_USER_SUCCESS';
export const PROFILE_USER_FAILURE = 'PROFILE_USER_FAILURE';
export const EDIT_PROFILE_USER_REQUEST = 'EDIT_PROFILE_USER';
export const EDIT_PROFILE_USER_SUCCESS = 'EDIT_PROFILE_USER_SUCCESS';





export const profileUserRequest = (id) => ({
  type: PROFILE_USER_REQUEST,
  payload: {
    id
  }
});

export const profileUserSuccess = (email,username,lastName,firstName,birthDate) => ({
  type: PROFILE_USER_SUCCESS,
  payload: {
    email,
    username,
    lastName,
    firstName,
    birthDate
  }
});

export const profileUserFailure = (error,isAuthenticated) => ({
  type: PROFILE_USER_FAILURE,
  payload: {
    error
  }
});

export const editProfileUserRequest = ( firstName, lastName, email, username,birthDate) => ({
  type: EDIT_PROFILE_USER_REQUEST,
  payload: {
    firstName,
     lastName,
      email, 
      username,
      birthDate
  }
});
