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

export const loginUserSuccess = (token,msg,isAuthenticated,id,notification) => ({
  type: LOGIN_USER_SUCCESS,
  payload: {
    token,
    msg,
    isAuthenticated,
    id,
    notification
  }
});

export const loginUserFailure = (error,isAuthenticated,notification) => ({
  type: LOGIN_USER_FAILURE,
  payload: {
    error,
    notification
  }
});

export const logoutUserRequest = () => ({
  type: LOGOUT_USER_REQUEST,
  payload: {
  }
});
