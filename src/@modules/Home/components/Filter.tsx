import { useForm } from "react-hook-form";
// import { useDispatch } from "react-redux";

import { Input, Button, DateTimePicker } from "@components";
// import { getRestaurants } from "@store/restaurant/RestaurantActions";

interface FilterProps {
  handleFilterChange: any;
}

const days = ["Sun", "Mon", "Tues", "Wed", "Thu", "Fri", "Sat"];

const defaultValues = {
  dateTime: "",
  name: "",
};

const Filter: React.FC<FilterProps> = (props) => {
  const { handleFilterChange } = props;

  // const dispatch = useDispatch();
  const methods = useForm({
    mode: "all",
    defaultValues,
  });
  const { control, handleSubmit } = methods;

  function onSubmit(data: any) {
    const { dateTime, name } = data;
    let day, hours, minutes;
    if (dateTime) {
      day = days[dateTime?.getDay()];
      hours = dateTime?.getHours();
      minutes = dateTime?.getMinutes();
    }
    const filter = {
      day,
      hours: !isNaN(hours) ? hours : undefined,
      minutes: !isNaN(minutes) ? minutes : undefined,
      name: name !== "" ? name : undefined,
    };
    // const payload = {
    //   page: 1,
    //   limit: 5,
    //   ...filter,
    // };
    handleFilterChange(filter);
    // dispatch(getRestaurants({ payload }));
  }

  return (
    <div className="px-[15vw] py-20 lg:py-40 h-full bg-[url(assets/images/filterBackground.jpg)] bg-cover">
      <form
        className="flex flex-col lg:flex-row space-y-8 lg:space-y-0 lg:space-x-8 py-4 w-full"
        onSubmit={handleSubmit(onSubmit)}
      >
        <DateTimePicker
          name="dateTime"
          control={control}
          variant="filled"
          fullWidth={true}
          className="w-full mb-2 lg:mb-0 lg:ml-2"
          label="Date"
          type="dateTime"
          minDateTime={new Date()}
        />
        <Input
          name="name"
          control={control}
          variant="filled"
          label={"Restaurant Name"}
          fullWidth
        />
        <Button
          color="secondary"
          className="w-full mx-auto mt-16"
          type="submit"
        >
          Search
        </Button>
      </form>
    </div>
  );
};

export default Filter;
