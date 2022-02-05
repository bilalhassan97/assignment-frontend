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
