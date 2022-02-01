import { all } from "redux-saga/effects";

import { authSagas } from "@store/auth/AuthSaga";

export default function* rootSaga() {
  yield all([authSagas()]);
}
