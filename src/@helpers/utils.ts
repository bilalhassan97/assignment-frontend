export const logoutUser = (navigate: any) => {
  localStorage.removeItem("access_token");
  localStorage.removeItem("userId");

  navigate("/login");
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
