import { all, call } from "redux-saga/effects";
// import { fetchCollectionsPendingAsync } from './shop/shop.actions';

import { userSagas } from "./user/user.sagas";

export default function* rootSaga() {
  yield all([call(userSagas)]);
}
