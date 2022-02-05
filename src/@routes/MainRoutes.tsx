import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home, Login, Signup, User } from "@modules";
import App from "App";
import { CheckAuth } from "@hocs";

interface RoutesProps {}

const MainRoutes: React.FC<RoutesProps> = (props) => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Home />} />
          <Route
            path="login"
            element={<CheckAuth authComponent component={Login} />}
          />
          <Route
            path="signup"
            element={<CheckAuth authComponent component={Signup} />}
          />
          <Route path="user" element={<CheckAuth component={User} />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default MainRoutes;
