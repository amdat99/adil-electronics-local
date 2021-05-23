import { createSelector } from "reselect";

const selectUser = (state) => state.user;

export const selectCurrentUser = createSelector(
  [selectUser],
  (user) => user.currentUser
);

export const selectErrorMessage = createSelector(
  [selectUser],
  (user) => user.error
);

export const onFetch = createSelector([selectUser], (user) => user.onFetch);

export const selectDataServer = createSelector(
  [selectUser],
  (user) => user.dataServer
);

export const selectFileServer = createSelector(
  [selectUser],
  (user) => user.fileServer
);
