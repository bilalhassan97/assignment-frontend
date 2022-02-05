import { combineReducers } from "redux";

import app from "../app/AppReducers";
import auth from "../auth/AuthReducers";
import restaurant from "../restaurant/RestaurantReducers";
import collection from "../collection/CollectionReducers";

const restaurantHub = combineReducers({
  app,
  auth,
  restaurant,
  collection,
});

export default restaurantHub;
