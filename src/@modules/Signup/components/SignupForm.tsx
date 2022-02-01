import { Button, Input } from "@components";

interface SignupFormProps {
  onSubmit: any;
  control: any;
  errors: any;
  isValid: boolean;
}

const SignupForm: React.FC<SignupFormProps> = (props) => {
  const { onSubmit, control, errors, isValid } = props;

  return (
    <form className="flex flex-col space-y-8 py-4 w-full" onSubmit={onSubmit}>
      <Input
        name="name"
        control={control}
        variant="standard"
        label={"Name"}
        error={!!errors.name}
        errorMessage={errors?.name?.message}
        required
      />
      <Input
        name="surname"
        variant="standard"
        control={control}
        label={"Surname"}
        error={!!errors.surname}
        errorMessage={errors?.surname?.message}
        required
      />
      <Input
        name="email"
        control={control}
        variant="standard"
        label={"Email"}
        type="email"
        error={!!errors.email}
        errorMessage={errors?.email?.message}
        required
      />
      <Input
        name="password"
        variant="standard"
        control={control}
        label={"Password"}
        type="password"
        error={!!errors.password}
        errorMessage={errors?.password?.message}
        required
      />
      <Button
        variant="contained"
        color="primary"
        className="w-full mx-auto mt-16"
        aria-label="LOG IN"
        disabled={!isValid}
        type="submit"
      >
        Sign Up
      </Button>
    </form>
  );
};

export default SignupForm;
