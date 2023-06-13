import { takeLatest, call, put, select } from 'redux-saga/effects';
import {
  PROFILE_USER_REQUEST,
  profileUserSuccess,
  profileUserFailure
} from '../actionCreators/profile';
import { getProfile } from '../../utils/api';

function* profil(action) {
  try {

    const { token } = yield select((state) => state.auth);
    console.log(token);
    const response = yield call(getProfile, action.payload.id, token);
    const email = response.data.user.email;
    const username = response.data.user.username;
    const lastName = response.data.user.lastName;
    const firstName = response.data.user.firstName;
    const birthDate =new Date( response.data.user.birthDate);
    console.log(birthDate);
    var year = birthDate.getFullYear();
    var month = String(birthDate.getMonth() + 1).padStart(2, "0"); // Months are zero-based, so add 1
    var day = String(birthDate.getDate()).padStart(2, "0");

var formattedDate = year + "-" + month + "-" + day;
    console.log(response);
    yield put(profileUserSuccess(email,username,lastName,firstName,formattedDate));
  } catch (error) {
    yield put(profileUserFailure(error,false));
  }
}

export default function* profileSaga() {
  yield takeLatest(PROFILE_USER_REQUEST, profil);
}
