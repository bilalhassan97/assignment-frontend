import { AuthActionTypes } from "../redux/actionTypes";

const INITIAL_STATE: AuthState = {
  loading: false,
};

const AuthReducer = (
  state: AuthState = INITIAL_STATE,
  action: Action
): AuthState => {
  switch (action.type) {
    case AuthActionTypes.SET_AUTH_LOADER:
      return {
        ...state,
        loading: action.payload,
      };

    default:
      return state;
  }
};

export default AuthReducer;
