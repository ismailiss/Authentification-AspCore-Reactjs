export const LOGIN_USER_REQUEST = 'LOGIN_USER_REQUEST';
export const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS';
export const LOGIN_USER_FAILURE = 'LOGIN_USER_FAILURE';
export const LOGOUT_USER_REQUEST = 'LOGIN_USER_LOGOUT';



export const loginUserRequest = (email, password) => ({
  type: LOGIN_USER_REQUEST,
  payload: {
    email,
    password
  }
});

export const loginUserSuccess = (token,msg,isAuthenticated,id) => ({
  type: LOGIN_USER_SUCCESS,
  payload: {
    token,
    msg,
    isAuthenticated,
    id
  }
});

export const loginUserFailure = (error,isAuthenticated) => ({
  type: LOGIN_USER_FAILURE,
  payload: {
    error
  }
});

export const logoutUserRequest = () => ({
  type: LOGOUT_USER_REQUEST,
  payload: {
  }
});
