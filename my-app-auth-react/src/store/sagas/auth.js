import { takeLatest, call, put } from 'redux-saga/effects';
import {
  LOGIN_USER_REQUEST,
  loginUserSuccess,
  loginUserFailure,
  logoutUserRequest,
  LOGOUT_USER_REQUEST
} from '../actionCreators/auth';
import { loginUser } from '../../utils/api';

function* login(action) {
  try {
    console.log('login');

    const response = yield call(loginUser, action.payload.email, action.payload.password);
    const token = response.data.token;
    const msg = response.data.msg;
    const id = response.data.id;
    const notification={
      type:'success',
      text:'login ok'
    }
    localStorage.setItem('token', token);
    localStorage.setItem('msg', msg);
    localStorage.setItem('id', id);

    yield put(loginUserSuccess(token, msg, true, id,notification));
  } catch (error) {
    yield put(loginUserFailure(error, false,{
      type:'error',
      text:'somthing went wrong'
    }));
  }
}
function logout() {
  console.log('logout');

  // Clear the token from the local storage.
  localStorage.removeItem('token');
  localStorage.removeItem('msg');
  localStorage.removeItem('id');
  // Perform any other necessary cleanup actions.
}

function* authFlow() {
  // Check for an existing token in the local storage.
  console.log('authFlow');

  const token = localStorage.getItem('token');
  const msg = localStorage.getItem('msg');
  const id = localStorage.getItem('id');
  if (token) {
    // If a token is found, dispatch a success action with the token value.

    yield put(loginUserSuccess(token, msg, true, id));
  } else {
    // If no token is found, dispatch a failure action.
    localStorage.removeItem('token');
    localStorage.removeItem('msg');
    localStorage.removeItem('id');
    yield put(logoutUserRequest("", false));
  }
}
export default function* authSaga() {
  // Watch for login and logout actions.
  console.log('authSaga');

  yield takeLatest(LOGIN_USER_REQUEST, login);
  yield takeLatest(LOGOUT_USER_REQUEST, logout);

  // Check for an existing token on app startup.
  yield call(authFlow);
}
/*export default function* authSaga() {

  yield takeLatest(LOGIN_USER_REQUEST, login);
}*/
