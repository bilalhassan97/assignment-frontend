export const logoutUser = (navigate: any, dispatch: any) => {
  localStorage.removeItem("access_token");
  localStorage.removeItem("userId");

  navigate.push("/login");
};

export const getFormattedDate = (current_datetime: Date) => {
  let formatted_date =
    current_datetime.getDate() +
    "/" +
    (current_datetime.getMonth() + 1) +
    "/" +
    current_datetime.getFullYear();
  return formatted_date;
};
