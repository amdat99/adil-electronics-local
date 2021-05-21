import {takeLatest, put, all, call} from 'redux-saga/effects';





import {
  signInSuccess,
  signInFailure,
  signUpFailure,
  addProductSuccess

} from './user.actions';


import userActionTypes from './user.types';


// import {sendProfileChange } from "../../sockets/sockets"



export function* signInWithEmail({payload: {userName, password}}) {
  try {
 
    const response = yield fetch('http://localhost:7500/fetchuser',{
   
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userName:userName,
        password:password,
      }),
    }
  );
  const data = yield response.json();
  console.log(data);
 {
   
  if(data !== "wrong credentials"){
    yield put(signInSuccess(data));

    if(data === "wrong credentials"){
      yield put(signInFailure(data))
    }

  }  
  }
  } catch (error) {
    yield put(signInFailure(error));
  }
}




export function* registerUserAsync({
  payload: {  userName,password },
}) {
  console.log('ss',{payload: {userName, password}})

  try {
   
        const response = yield fetch('http://localhost:7500/adduser',{
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          password:password,
          userName: userName,
          
        }),
      }
    );
    const data = yield response.json();
    console.log(data);
    if (data.email) {
      yield put(signInSuccess(data));
   
    }
  } catch (e) {
    yield put(signUpFailure(e))
  }
}

export function* addProductAsync({
  payload: {  serialNumber, invoiceNumber,modal,accessid},
}) {
  console.log('ss',{payload: {serialNumber, invoiceNumber,modal,accessid}})

  try {
   
        const response = yield fetch('http://localhost:7500/addproduct',{
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          serialNumber: serialNumber,
          invoiceNumber: invoiceNumber,
          modal: modal,
          accessid: accessid
          
        }),
      }
    );
    const data = yield response.json();
    console.log(data);
    if (data.invoiceNumber) {
      yield put(addProductSuccess(data));
   
    }
  } catch (e) {
    yield put(signUpFailure(e))
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
    call(onAddProductPending)
  ]);
}
