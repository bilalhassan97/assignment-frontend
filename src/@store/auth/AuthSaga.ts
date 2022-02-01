import { call, takeLatest } from "redux-saga/effects";

import { axiosInstance } from "@api/axios";
import { loginUrl, signupUrl } from "@api/Endpoint";
import { AuthActionTypes } from "../redux/actionTypes";
import { toast } from "react-toastify";

function* loginSaga(action: Action) {
  try {
    const { form: requestPayload, navigate } = action.payload;

    const url = loginUrl();

    const response: ResponseGenerator = yield call(
      axiosInstance.post,
      url,
      requestPayload
    );

    if (response.status === 200) {
      const successMessage = response.data.message;
      localStorage.setItem("access_token", response.data.data.accessToken);
      localStorage.setItem("userId", response.data.data._id);
      navigate("/user");
      toast.success(successMessage);
    } else {
      const errorMessage = response.response.data.message;
      toast.error(errorMessage);
    }
  } catch (err) {
    console.log("err: ", err);
  }
}

function* signupSaga(action: Action) {
  try {
    const { form: requestPayload, navigate } = action.payload;

    const url = signupUrl();

    const response: ResponseGenerator = yield call(
      axiosInstance.post,
      url,
      requestPayload
    );

    if (response.status === 200) {
      const successMessage = response.data.message;
      localStorage.setItem("access_token", response.data.data.accessToken);
      localStorage.setItem("userId", response.data.data._id);
      navigate("/user");
      toast.success(successMessage);
    } else {
      const errorMessage = response.response.data.message;
      toast.error(errorMessage);
    }
  } catch (err) {
    console.log("err: ", err);
  }
}

export function* authSagas() {
  yield takeLatest(AuthActionTypes.LOGIN, loginSaga);
  yield takeLatest(AuthActionTypes.SIGNUP, signupSaga);
}
