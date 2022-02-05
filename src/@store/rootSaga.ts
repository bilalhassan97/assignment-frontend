import { all } from "redux-saga/effects";

import { authSagas } from "@store/auth/AuthSaga";
import { restaurantSagas } from "@store/restaurant/RestaurantSaga";

export default function* rootSaga() {
  yield all([authSagas(), restaurantSagas()]);
}
