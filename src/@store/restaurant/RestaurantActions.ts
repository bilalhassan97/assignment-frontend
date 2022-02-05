import { RestaurantActionTypes } from "../redux/actionTypes";

export const getRestaurants = (payload: any) => ({
  type: RestaurantActionTypes.GET_RESTAURANTS,
  payload,
});

export const getRestaurantsSuccess = (payload: any) => ({
  type: RestaurantActionTypes.GET_RESTAURANTS_SUCCESS,
  payload,
});

export const saveRestaurant = (payload: any) => ({
  type: RestaurantActionTypes.SAVE_RESTAURANT,
  payload,
});

export const getSavedRestaurants = (payload: any) => ({
  type: RestaurantActionTypes.GET_SAVED_RESTAURANTS,
  payload,
});

export const getSavedRestaurantsSuccess = (payload: any) => ({
  type: RestaurantActionTypes.GET_RESTAURANTS_SUCCESS,
  payload,
});

export const removeSavedRestaurant = (payload: any) => ({
  type: RestaurantActionTypes.REMOVE_SAVED_RESTAURANT,
  payload,
});

export const removeSavedRestaurantSuccess = (payload: any) => ({
  type: RestaurantActionTypes.REMOVE_SAVED_RESTAURANT_SUCCESS,
  payload,
});

export const setRestaurantLoader = (payload: any) => ({
  type: RestaurantActionTypes.SET_RESTAURANT_LOADER,
  payload,
});
