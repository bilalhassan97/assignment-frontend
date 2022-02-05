import ScheduleIcon from "@mui/icons-material/Schedule";

import { ImageAsset } from "@components";
import BookmarkAddIcon from "@mui/icons-material/BookmarkAdd";
import { Tooltip } from "@mui/material";
import { toast } from "react-toastify";

interface RestaurantCardProps {
  restaurant: Restaurant;
  restaurantRef: any;
  onSave: any;
}

const RestaurantCard: React.FC<RestaurantCardProps> = (props) => {
  const {
    restaurant: { _id, name, schedule },
    restaurantRef,
    onSave,
  } = props;

  const isAuthenticated =
    localStorage.getItem("userId") && localStorage.getItem("access_token");

  const saveClickHandler = () => {
    if (!isAuthenticated) {
      return toast.error("You need to log in first!");
    }
    onSave(_id);
  };

  return (
    <div
      className="flex flex-col items-center h-[30rem] overflow-y-auto hideScrollbar rounded-xl shadow-lg"
      ref={restaurantRef}
    >
      <ImageAsset
        src="restaurant"
        className="w-full h-2/4 object-cover rounded-t-xl"
      />
      <div className="flex flex-col px-2 space-y-1.5 py-2 w-full items-center">
        <div className="flex items-center justify-center w-full">
          <p className="font-medium text-lg text-center truncate w-full">
            {name}
          </p>
          <Tooltip title="Save Restaurant">
            <BookmarkAddIcon
              className="cursor-pointer"
              onClick={saveClickHandler}
            />
          </Tooltip>
        </div>
        <ScheduleIcon className="text-3xl" />
        <div className="flex flex-wrap justify-center mt-2 text-white text-center text-sm">
          {schedule.map(
            ({ day, startHours, startMinutes, endHours, endMinutes }) => (
              <p
                className=" bg-gradient-to-r from-primary  to-pink-500 shadow-md rounded-full px-2 py-1 mb-2 mr-2"
                key={day}
              >
                {day}, {startHours === 0 ? "00" : startHours}:
                {startMinutes === 0 ? "00" : startMinutes}
                {" - "}
                {endHours === 0 ? "00" : endHours}:
                {endMinutes === 0 ? "00" : endMinutes}
              </p>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default RestaurantCard;
