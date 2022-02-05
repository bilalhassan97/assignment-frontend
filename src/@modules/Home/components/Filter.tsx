import { useForm } from "react-hook-form";

import { Input, Button, DateTimePicker } from "@components";

interface FilterProps {
  handleFilterChange: any;
}

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const defaultValues = {
  dateTime: "",
  name: "",
};

const Filter: React.FC<FilterProps> = (props) => {
  const { handleFilterChange } = props;

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
    handleFilterChange(filter);
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
