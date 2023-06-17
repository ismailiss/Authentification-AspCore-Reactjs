import {
    LOGIN_USER_REQUEST,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAILURE,
    LOGOUT_USER_REQUEST
  } from '../actionCreators/auth';
  
  const initialState = {
    token: null,
    isLoading: false,
    error: null,
    msg : '',
    isAuthenticated:false,
    id:'',
    notification:{}

  };
  
  const authReducer = (state = initialState, action) => {
  console.log(action.payload);
    switch (action.type) {
      case LOGIN_USER_REQUEST:
        return {
          ...state,
          isLoading: true,
          error: null
        };
      case LOGIN_USER_SUCCESS:
        return {
          ...state,
          isLoading: false,
          token: action.payload.token,
          msg:action.payload.msg,
          isAuthenticated:true,
          id:action.payload.id,
          notification:action.payload.notification

        };
      case LOGIN_USER_FAILURE:
        return {
          ...state,
          isLoading: false,
          error: action.payload.error.message,
          isAuthenticated:false,          
          notification:action.payload.notification

        };
        
      case LOGOUT_USER_REQUEST:
        return {
          ...state,
          isLoading: false,
          error: null,
          msg:null,
          isAuthenticated:false,
          id:'',
          notification:{
          }       
         };
      default:
        return state;
    }
  };
  export default authReducer;