import { combineReducers } from "redux";

import app from "../app/AppReducers";
import auth from "../auth/AuthReducers";

const Travelfine = combineReducers({
  app,
  auth,
});

export default Travelfine;
