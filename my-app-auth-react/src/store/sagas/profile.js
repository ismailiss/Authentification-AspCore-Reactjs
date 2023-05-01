import { takeLatest, call, put } from 'redux-saga/effects';
import {
  PROFILE_USER_REQUEST,
  profileUserSuccess,
  profileUserFailure
} from '../actionCreators/profile';
import { getProfile } from '../../utils/api';

function* profil(action) {
  try {
    const response = yield call(getProfile, action.payload.id);
    const email = response.data.user.email;
    const username = response.data.user.username;
    const lastName = response.data.user.lastName;
    const firstName = response.data.user.firstName;
    const birthDate = response.data.user.BirthDate;
    
    console.log(response);
    yield put(profileUserSuccess(email,username,lastName,firstName,birthDate));
  } catch (error) {
    yield put(profileUserFailure(error,false));
  }
}

export default function* profileSaga() {
  yield takeLatest(PROFILE_USER_REQUEST, profil);
}
