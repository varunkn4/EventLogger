import { takeLatest, all } from 'redux-saga/effects';
import verifyAuth from '../pages/login/saga';


function* actionWatcher() {
  yield takeLatest('LOGIN:DO_LOGIN', verifyAuth);   
}

export default function* rootSaga() {
   yield all([
     actionWatcher()
   ]);
}

