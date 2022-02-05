import { RestaurantActionTypes } from "../redux/actionTypes";

const INITIAL_STATE: RestaurantState = {
  loading: false,
  restaurants: [],
  totalRestaurants: 0,
};

const RestaurantReducer = (
  state: RestaurantState = INITIAL_STATE,
  action: Action
): RestaurantState => {
  switch (action.type) {
    case RestaurantActionTypes.GET_RESTAURANTS:
      if (action.payload.page === 1) {
        return {
          ...state,
          restaurants: [],
          totalRestaurants: 0,
          loading: true,
        };
      }
      return { ...state, loading: true };

    case RestaurantActionTypes.GET_RESTAURANTS_SUCCESS:
      if (action.payload.page === 1) {
        return {
          ...state,
          restaurants: action.payload.restaurants,
          totalRestaurants: action.payload.totalRestaurants,
        };
      }
      return {
        ...state,
        restaurants: [...state.restaurants, ...action.payload.restaurants],
        totalRestaurants: action.payload.totalRestaurants,
      };

    case RestaurantActionTypes.REMOVE_SAVED_RESTAURANT_SUCCESS:
      return {
        ...state,
        restaurants: state.restaurants.filter(
          (item) => action.payload.id !== item._id
        ),
      };

    case RestaurantActionTypes.SET_RESTAURANT_LOADER:
      return {
        ...state,
        loading: action.payload,
      };

    default:
      return state;
  }
};

export default RestaurantReducer;
