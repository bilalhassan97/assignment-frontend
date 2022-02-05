import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";

import { Header, Loader } from "@components";
import { signup } from "@store/auth/AuthActions";
import SignupForm from "./components/SignupForm";

interface SignupProps {}

const defaultValues = {
  name: "",
  surname: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const Signup: React.FC<SignupProps> = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const schema = yup.object().shape({
    name: yup.string().required("Name is required!"),
    surname: yup.string().required("Surname is required!"),
    email: yup.string().email().required("Email is required!"),
    password: yup
      .string()
      .required("Password is required!")
      .min(6, "Password must be greater than 6 characters!"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "Confirm Password Doesn't Match!"),
  });
  const methods = useForm({
    mode: "all",
    defaultValues,
    resolver: yupResolver(schema),
  });
  const { control, handleSubmit, formState } = methods;
  const { isValid, errors } = formState;

  function onSubmit(data: any) {
    const form = {
      surname: data.surname,
      email: data.email,
      password: data.password,
      name: data.name,
    };
    dispatch(signup({ form, navigate }));
  }

  const { loading }: any = useSelector<any>(
    ({ restaurantHub }) => restaurantHub.app
  );

  return (
    <div>
      <Header />
      <Loader loading={loading} />
      <div
        className="bg-cover lg:bg-[url(assets/images/signupBackgroundImageBlurred.jpg)] flex items-center justify-center py-20 px-[10vw] lg:px-[15vw]"
        style={{ minHeight: "calc(100vh - 80px)" }}
      >
        <div className="flex items-stretch rounded-3xl lg:shadow-md bg-white w-full">
          <div className="hidden lg:bg-[url(assets/images/signupCardImage.jpg)] bg-cover lg:block w-1/3 rounded-tl-3xl rounded-bl-3xl"></div>
          <div className="w-full lg:w-2/3 flex flex-col items-center justify-center px-2 py-4 lg:px-[12vw] lg:py-20 space-y-3">
            <h1 className="text-2xl font-bold">Signup</h1>
            <p>Enter your email ID and password here and join us</p>
            <SignupForm
              onSubmit={handleSubmit(onSubmit)}
              control={control}
              errors={errors}
              isValid={isValid}
            />
            <p>
              Already have an account?
              <Link to="/login">
                <span className="text-primary font-bold"> Login Now</span>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
