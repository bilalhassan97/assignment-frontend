import { call, put, takeLatest } from "redux-saga/effects";

import { axiosInstance } from "@api/axios";
import {
  getSavedRestaurantsUrl,
  removeSavedRestaurantUrl,
  restaurantUrl,
  savedRestaurantUrl,
} from "@api/Endpoint";
import { RestaurantActionTypes } from "../redux/actionTypes";
import {
  getRestaurantsSuccess,
  removeSavedRestaurantSuccess,
} from "./RestaurantActions";
import { toast } from "react-toastify";

function* getRestaurantsSaga(action: Action) {
  try {
    const payload = action.payload;

    const url = restaurantUrl(payload);

    const response: ResponseGenerator = yield call(axiosInstance.get, url);

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

function* saveRestaurantSaga(action: Action) {
  try {
    const { payload: requestPayload } = action.payload;

    const url = savedRestaurantUrl();

    const response: ResponseGenerator = yield call(
      axiosInstance.post,
      url,
      requestPayload
    );

    if (response.status === 200) {
      const successMessage = response.data.message;
      toast.success(successMessage);
    } else {
      const errorMessage = response.response.data.message;
      toast.error(errorMessage);
    }
  } catch (err: any) {
    const errorMessage = err.response.data.message;
    toast.error(errorMessage);
    console.log("err: ", err);
  }
}

function* getSavedRestaurantsSaga(action: Action) {
  try {
    const payload = action.payload;

    const url = getSavedRestaurantsUrl(payload);

    const response: ResponseGenerator = yield call(axiosInstance.get, url);

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

function* removeSavedRestaurantSaga(action: Action) {
  try {
    const { id } = action.payload;

    const url = removeSavedRestaurantUrl(id);

    const response: ResponseGenerator = yield call(axiosInstance.delete, url);

    if (response.status === 200) {
      yield put(removeSavedRestaurantSuccess(action.payload));
      const successMessage = response.data.message;
      toast.success(successMessage);
    } else {
      const errorMessage = response.response.data.message;
      console.log("error: ", errorMessage);
    }
  } catch (err) {
    console.log("err: ", err);
  }
}

export function* restaurantSagas() {
  yield takeLatest(RestaurantActionTypes.GET_RESTAURANTS, getRestaurantsSaga);
  yield takeLatest(RestaurantActionTypes.SAVE_RESTAURANT, saveRestaurantSaga);
  yield takeLatest(
    RestaurantActionTypes.GET_SAVED_RESTAURANTS,
    getSavedRestaurantsSaga
  );
  yield takeLatest(
    RestaurantActionTypes.REMOVE_SAVED_RESTAURANT,
    removeSavedRestaurantSaga
  );
}
