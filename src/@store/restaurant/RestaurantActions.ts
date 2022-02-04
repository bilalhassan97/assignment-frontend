import { RestaurantActionTypes } from "../redux/actionTypes";

export const getRestaurants = (payload: any) => ({
  type: RestaurantActionTypes.GET_RESTAURANTS,
  payload,
});

export const getRestaurantsSuccess = (payload: any) => ({
  type: RestaurantActionTypes.GET_RESTAURANTS_SUCCESS,
  payload,
});

export const setRestaurantLoader = (payload: any) => ({
  type: RestaurantActionTypes.SET_RESTAURANT_LOADER,
  payload,
});
