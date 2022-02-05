import { Navigate } from "react-router-dom";

interface Props {
  component: React.ComponentType;
  authComponent?: boolean;
}

const PrivateRoute: React.FC<Props> = (props) => {
  const { component: RouteComponent, authComponent } = props;

  const isAuthenticated =
    localStorage.getItem("userId") && localStorage.getItem("access_token");

  if (!isAuthenticated) {
    if (!authComponent) {
      return <Navigate to="/login" />;
    }
    return <RouteComponent />;
  }
  if (authComponent) {
    return <Navigate to="/user" />;
  }
  return <RouteComponent />;
};

export default PrivateRoute;
