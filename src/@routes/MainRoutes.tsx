import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login, Signup } from "@modules";
import App from "App";

interface RoutesProps {}

const MainRoutes: React.FC<RoutesProps> = (props) => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default MainRoutes;
