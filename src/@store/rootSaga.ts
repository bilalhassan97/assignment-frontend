import { all } from "redux-saga/effects";

import { authSagas } from "@store/auth/AuthSaga";
import { restaurantSagas } from "@store/restaurant/RestaurantSaga";
import { collectionSagas } from "@store/collection/CollectionSaga";

export default function* rootSaga() {
  yield all([authSagas(), restaurantSagas(), collectionSagas()]);
}
