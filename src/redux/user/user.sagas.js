import { takeLatest, put, all, call } from "redux-saga/effects";

import {
  signInSuccess,
  signInFailure,
  signUpFailure,
  addProductSuccess,
  setOnFetch,
} from "./user.actions";

import userActionTypes from "./user.types";

import { dataServer } from "./user.reducer";

// import {sendProfileChange } from "../../sockets/sockets"

export function* signInWithEmail({ payload: { userName, password } }) {
  try {
    const response = yield fetch(dataServer + "fetchuser", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userName: userName,
        password: password,
      }),
    });
    const data = yield response.json();
  
      if(data[0].userid){
      if (data !== "wrong credentials" || data !== []  ) {
        yield put(signInSuccess(data));
    }
        if (data === "wrong credentials") {
          yield put(signInFailure(data));
        }
      
      }
  } catch (error) {
    yield put(signInFailure(error));
  }
}

export function* registerUserAsync({ payload: { userName, password } }) {
  try {
    const response = yield fetch(dataServer + "adduser", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        password: password,
        userName: userName,
      }),
    });
    const data = yield response.json();

    if (data.name) {
      yield put(signInSuccess(data.name));
    }
  } catch (e) {
    yield put(signUpFailure(e));
  }
}

export function* addProductAsync({
  payload: { serialNumber, invoiceNumber, modal, accessid },
}) {
  try {
    const response = yield fetch(dataServer + "addproduct", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        serialNumber: serialNumber,
        invoiceNumber: invoiceNumber,
        modal: modal,
        accessid: accessid,
      }),
    });
    const data = yield response.json();
    console.log(data);
    if (data) {
      yield put(setOnFetch(Math.random()));
    }
  } catch (e) {
    yield put(signUpFailure(e));
  }
}

export function* onEmailSignInPending() {
  yield takeLatest(userActionTypes.EMAIL_SIGNIN_PENDING, signInWithEmail);
}

export function* onSignUpPending() {
  yield takeLatest(userActionTypes.SIGN_UP_START, registerUserAsync);
}

export function* onAddProductPending() {
  yield takeLatest(userActionTypes.ADD_PRODUCT_PENDING, addProductAsync);
}

export function* userSagas() {
  yield all([
    call(onEmailSignInPending),
    call(onSignUpPending),
    call(onAddProductPending),
  ]);
}
