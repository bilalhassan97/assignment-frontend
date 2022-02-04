import { Outlet } from "react-router";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Provider } from "react-redux";

import Theme from "./Theme";
import store from "./@store";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <ToastContainer />
        <Theme>
          <Outlet />
        </Theme>
      </Provider>
    </div>
  );
}

export default App;
