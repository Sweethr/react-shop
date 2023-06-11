import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import Home from "./Pages/Home/Home";
import Register from "./Pages/Register/Register";
import Login from "./Pages/Login/Login";
import Basket from "./Pages/Basket/Basket";
let auth = JSON.parse(localStorage.getItem("userData"))

const router = createBrowserRouter([
  {
    path: "/",
    element: (<Home />),
  },
  {
    path: "/register",
    element: (auth ? <Navigate to="/" /> : <Register />),
  },
  {
    path: "/login",
    element: (auth ? <Navigate to="/" /> : <Login />),
  },
  {
    path: "/basket",
    element: (!auth ? <Navigate to="/login" /> : <Basket />),
  }
]);

function App() {
  return (<RouterProvider router={router} />);
}

export default App;
