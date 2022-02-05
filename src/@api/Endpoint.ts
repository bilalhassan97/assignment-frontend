export const loginUrl = () => {
  return encodeURI("auth/login");
};

export const signupUrl = () => {
  return encodeURI("auth/signup");
};

export const restaurantUrl = (payload: any) => {
  const {
    page = "",
    limit = "",
    name = "",
    day = "",
    hours = "",
    minutes = "",
  } = payload;
  return encodeURI(
    "restaurant?page=" +
      page +
      "&limit=" +
      limit +
      "&name=" +
      name +
      "&day=" +
      day +
      "&hours=" +
      hours +
      "&minutes=" +
      minutes
  );
};

export const getCollectionsUrl = (payload: any) => {
  const { page = "", limit = "" } = payload;
  return encodeURI("collection?page=" + page + "&limit=" + limit);
};

export const collectionUrl = () => {
  return encodeURI("collection");
};

export const collectionByIdUrl = (id: string) => {
  return encodeURI("collection/" + id);
};

export const removeSavedRestaurantUrl = (id: string) => {
  return encodeURI("savedRestaurant/" + id);
};

export const savedRestaurantUrl = () => {
  return encodeURI("savedRestaurant");
};

export const getSavedRestaurantsUrl = (payload: any) => {
  const { page = "", limit = "", collectionId = "" } = payload;
  return encodeURI(
    "savedRestaurant?page=" +
      page +
      "&limit=" +
      limit +
      "&collectionId=" +
      collectionId
  );
};
