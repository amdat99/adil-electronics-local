import userActionTypes from "./user.types";

export const signInSuccess = (user) => ({
  type: userActionTypes.SIGNIN_SUCCESS,
  payload: user,
});

export const signInFailure = (error) => ({
  type: userActionTypes.SIGNIN_FAILED,
  payload: error,
});

export const emailSignInPending = (signinData) => ({
  type: userActionTypes.EMAIL_SIGNIN_PENDING,
  payload: signinData,
});

export const signUpPending = (signUpData) => ({
  type: userActionTypes.SIGN_UP_START,
  payload: signUpData,
});

export const signUpSuccess = ({ user, additionalData }) => ({
  type: userActionTypes.SIGN_UP_SUCCESS,
  payload: { user, additionalData },
});

export const signUpFailure = (error) => ({
  type: userActionTypes.SIGN_UP_FAILURE,
  payload: error,
});

export const checkUserSession = () => ({
  type: userActionTypes.CHECK_USER_SESSION,
});

export const signOutPending = () => ({
  type: userActionTypes.SIGNOUT_PENDING,
});

export const signOutSuccess = () => ({
  type: userActionTypes.SIGNOUT_SUCCESS,
});

export const signOutFailure = () => ({
  type: userActionTypes.SIGNOUT_FAILED,
});

export const addProductPending = (productData) => ({
  type: userActionTypes.ADD_PRODUCT_PENDING,
  payload: productData,
});

export const addProductSuccess = (message) => ({
  type: userActionTypes.ADD_PRODUCT_SUCCESS,
  payload: message,
});

export const addProductFailure = (e) => ({
  type: userActionTypes.ADD_PRODUCT_FAILURE,
  payload: e,
});

export const setOnFetch = (data) => ({
  type: userActionTypes.ONFETCH,
  payload: data,
});

export const setDataServer = (server) => ({
  type: userActionTypes.DATA_SERVER,
  payload: server,
});

export const setFileServer = (server) => ({
  type: userActionTypes.FILE_SERVER,
  payload: server,
});
