import { call, put, takeLatest } from "redux-saga/effects";
import { toast } from "react-toastify";

import { axiosInstance } from "@api/axios";
import {
  getCollectionsUrl,
  collectionUrl,
  collectionByIdUrl,
} from "@api//Endpoint";
import { CollectionActionTypes } from "../redux/actionTypes";
import {
  deleteCollectionSuccess,
  getCollectionByIdSuccess,
  getCollections,
  getCollectionsSuccess,
} from "./CollectionActions";

function* createCollectionSaga(action: Action) {
  try {
    const { form: requestPayload } = action.payload;

    const url = collectionUrl();

    const response: ResponseGenerator = yield call(
      axiosInstance.post,
      url,
      requestPayload
    );

    if (response.status === 200) {
      const successMessage = response.data.message;
      const payload = {
        page: 1,
        limit: 10,
      };
      yield put(getCollections(payload));
      toast.success(successMessage);
    } else {
      const errorMessage = response.response.data.message;
      toast.error(errorMessage);
    }
  } catch (err: any) {
    const errorMessage = err.response.data.message;
    console.log("err: ", err);
    toast.error(errorMessage);
  }
}

function* getCollectionsSaga(action: Action) {
  try {
    const requestPayload = action.payload;

    const url = getCollectionsUrl(requestPayload);

    const response: ResponseGenerator = yield call(axiosInstance.get, url);

    if (response.status === 200) {
      const payload = response.data.data;
      yield put(getCollectionsSuccess(payload));
    } else {
      const errorMessage = response.response.data.message;
      console.log("error: ", errorMessage);
    }
  } catch (err) {
    console.log("err: ", err);
  }
}

function* getCollectionByIdSaga(action: Action) {
  try {
    const { id } = action.payload;
    const url = collectionByIdUrl(id);

    const response: ResponseGenerator = yield call(axiosInstance.get, url);

    if (response.status === 200) {
      const payload = response.data.data;
      yield put(getCollectionByIdSuccess(payload));
    } else {
      const errorMessage = response.response.data.message;
      console.log("error: ", errorMessage);
    }
  } catch (err) {
    console.log("err: ", err);
  }
}

function* updateCollectionSaga(action: Action) {
  try {
    const { id, form: requestPayload } = action.payload;

    const url = collectionByIdUrl(id);

    const response: ResponseGenerator = yield call(
      axiosInstance.put,
      url,
      requestPayload
    );

    if (response.status === 200) {
      const successMessage = response.data.message;
      const payload = {
        page: 1,
        limit: 10,
      };
      yield put(getCollections(payload));
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

function* deleteCollectionSaga(action: Action) {
  try {
    const { id } = action.payload;

    const url = collectionByIdUrl(id);

    const response: ResponseGenerator = yield call(axiosInstance.delete, url);

    if (response.status === 200) {
      yield put(deleteCollectionSuccess(action.payload));

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

export function* collectionSagas() {
  yield takeLatest(
    CollectionActionTypes.CREATE_COLLECTION,
    createCollectionSaga
  );
  yield takeLatest(CollectionActionTypes.GET_COLLECTIONS, getCollectionsSaga);
  yield takeLatest(
    CollectionActionTypes.GET_COLLECTION_BY_ID,
    getCollectionByIdSaga
  );
  yield takeLatest(
    CollectionActionTypes.UPDATE_COLLECTION,
    updateCollectionSaga
  );
  yield takeLatest(
    CollectionActionTypes.DELETE_COLLECTION,
    deleteCollectionSaga
  );
}
