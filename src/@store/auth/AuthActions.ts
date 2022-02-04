import { AuthActionTypes } from "../redux/actionTypes";

export const login = (payload: any) => ({
  type: AuthActionTypes.LOGIN,
  payload,
});

export const signup = (payload: any) => ({
  type: AuthActionTypes.SIGNUP,
  payload,
});

export const setAuthLoader = (payload: any) => ({
  type: AuthActionTypes.SET_AUTH_LOADER,
  payload,
});
