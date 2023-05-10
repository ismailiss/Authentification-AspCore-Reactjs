import {
  PROFILE_USER_REQUEST,
  PROFILE_USER_SUCCESS,
  PROFILE_USER_FAILURE,
  EDIT_PROFILE_USER_REQUEST,
  EDIT_PROFILE_USER_SUCCESS
  } from '../actionCreators/profile';


  const initialState = {
    isLoading: false,
    Email: '',
    Username: '',
    LastName : '',
    FirstName: '',
    BirthDate : '',
    error : '',

  };
  
  const profileReducer = (state = initialState, action) => {
      console.log(state);
      console.log(action);

    switch (action.type) {
      case PROFILE_USER_REQUEST:
        return {
          ...state,
          isLoading: true,
          error: null
        };
      case PROFILE_USER_SUCCESS:
        return {
          ...state,
          isLoading: false,
          Email: action.payload.email,
          Username:action.payload.username,
          LastName:action.payload.lastName,
          FirstName:action.payload.firstName,
          BirthDate:action.payload.birthDate,
          error : ''
  
        };
      case PROFILE_USER_FAILURE:
        return {
          ...state,
          isLoading: false,
          error: action.payload.error
        };
        
      case EDIT_PROFILE_USER_REQUEST:
        return {
          ...state,
          isLoading: true
        };
        case EDIT_PROFILE_USER_SUCCESS:
          return {
            ...state,
            isLoading: true
          };
      default:
        return state;
    }
  };
  export default profileReducer;