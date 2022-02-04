import ScheduleIcon from "@mui/icons-material/Schedule";

import { ImageAsset } from "@components";

interface RestaurantCardProps {
  restaurant: Restaurant;
  restaurantRef: any;
}

const RestaurantCard: React.FC<RestaurantCardProps> = (props) => {
  const {
    restaurant: { name, schedule },
    restaurantRef,
  } = props;

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
        <p className="font-medium text-lg">{name}</p>
        <ScheduleIcon className="text-3xl" />
        <div className="flex flex-wrap justify-center mt-2 text-white text-center text-sm">
          {schedule.map(
            ({ day, startHours, startMinutes, endHours, endMinutes }) => (
              <p
                className="bg-primary shadow-md rounded-full px-2 py-1 mb-2 mr-2"
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
