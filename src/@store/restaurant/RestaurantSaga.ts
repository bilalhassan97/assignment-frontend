import { call, put, takeLatest } from "redux-saga/effects";

import { axiosInstance } from "@api/axios";
import { restaurantUrl } from "@api/Endpoint";
import { RestaurantActionTypes } from "../redux/actionTypes";
import { getRestaurantsSuccess } from "./RestaurantActions";

function* getRestaurantsSaga(action: Action) {
  try {
    const { payload } = action.payload;

    const url = restaurantUrl(payload);

    const response: ResponseGenerator = yield call(axiosInstance.get, url);

    console.log("response", response);

    if (response.status === 200) {
      const payload = response.data.data;
      yield put(getRestaurantsSuccess(payload));
    } else {
      const errorMessage = response.response.data.message;
      console.log("error:" + errorMessage);
    }
  } catch (err) {
    console.log("err: ", err);
  }
}

export function* restaurantSagas() {
  yield takeLatest(RestaurantActionTypes.GET_RESTAURANTS, getRestaurantsSaga);
}
