import { combineReducers } from "redux";

import app from "../app/AppReducers";
import auth from "../auth/AuthReducers";
import restaurant from "../restaurant/RestaurantReducers";

const restaurantHub = combineReducers({
  app,
  auth,
  restaurant,
});

export default restaurantHub;
