import { AppActionTypes } from "../redux/actionTypes";

export const setAppLoading = (payload: any) => ({
  type: AppActionTypes.APP_LOADING,
  payload,
});
