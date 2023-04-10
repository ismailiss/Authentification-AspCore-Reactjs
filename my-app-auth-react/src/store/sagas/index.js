import { takeLatest, call, put } from 'redux-saga/effects';
import {
  LOGIN_USER_REQUEST,
  loginUserSuccess,
  loginUserFailure
} from '../actionCreators';
import { loginUser } from '../../utils/api';

function* login(action) {
  try {
    const response = yield call(loginUser, action.payload.email, action.payload.password);
    const token = response.data.token;
    const msg = response.data.msg

    yield put(loginUserSuccess(token,msg,true));
  } catch (error) {
    yield put(loginUserFailure(error,false));
  }
}

export default function* authSaga() {
  yield takeLatest(LOGIN_USER_REQUEST, login);
}
