import { AppActionTypes } from "../redux/actionTypes";

const INITIAL_STATE: AppState = {
  loading: false,
};

const AppReducer = (
  state: AppState = INITIAL_STATE,
  actions: Action
): AppState => {
  switch (actions.type) {
    case AppActionTypes.APP_LOADING:
      return {
        ...state,
        loading: actions.payload,
      };

    default:
      return state;
  }
};

export default AppReducer;
