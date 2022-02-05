import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";

import { Header, Loader } from "@components";
import { login } from "@store/auth/AuthActions";
import LoginForm from "./components/LoginForm";

interface LoginProps {}

const defaultValues = {
  email: "",
  password: "",
};

const Login: React.FC<LoginProps> = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const schema = yup.object().shape({
    email: yup.string().email().required("Email is required!"),
    password: yup
      .string()
      .required("Password is required!")
      .min(6, "Password must be greater than 6 characters!"),
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
      email: data.email,
      password: data.password,
    };

    dispatch(login({ form, navigate }));
  }

  const { loading }: any = useSelector<any>(
    ({ restaurantHub }) => restaurantHub.app
  );

  return (
    <div>
      <Loader loading={loading} />
      <Header />
      <div
        className="lg:bg-[url(assets/images/loginBackgroundImageBlurred.jpg)] bg-cover flex items-center justify-center py-8 px-[10vw] lg:px-[15vw]"
        style={{ minHeight: "calc(100vh - 80px)" }}
      >
        <div className="flex items-stretch rounded-3xl lg:shadow-md bg-white w-full">
          <div className="hidden lg:bg-[url(assets/images/loginCardImage.jpg)] bg-cover lg:block w-1/3 rounded-tl-3xl rounded-bl-3xl"></div>
          <div className="w-full lg:w-2/3 flex flex-col items-center justify-center px-2 py-4 lg:px-[12vw] lg:py-20">
            <h1 className="text-2xl font-bold">Login</h1>
            <p>Enter your email ID and password here and join us</p>
            <LoginForm
              onSubmit={handleSubmit(onSubmit)}
              control={control}
              errors={errors}
              isValid={isValid}
            />
            <p>
              Do you have a account?
              <Link to="/signup">
                <span className="text-primary font-bold"> Register Now</span>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
