import { Button, Input } from "@components";

interface LoginFormProps {
  onSubmit: any;
  control: any;
  errors: any;
  isValid: boolean;
}

const LoginForm: React.FC<LoginFormProps> = (props) => {
  const { onSubmit, control, errors, isValid } = props;

  return (
    <form className="flex flex-col space-y-8 py-4 w-full" onSubmit={onSubmit}>
      <Input
        name="email"
        control={control}
        variant="standard"
        label={"Email"}
        type="email"
        error={!!errors.email}
        errorMessage={errors?.email?.message}
        required
        fullWidth
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
        fullWidth
      />
      <Button
        variant="contained"
        color="primary"
        className="w-full mx-auto mt-16"
        aria-label="LOG IN"
        disabled={!isValid}
        type="submit"
      >
        Login
      </Button>
    </form>
  );
};

export default LoginForm;
