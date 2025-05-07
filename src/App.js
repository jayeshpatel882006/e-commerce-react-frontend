import { Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import Navbar from "./Components/Navbar";
import Home from "./Components/Home";
import AddProduct from "./Components/ADMIN/AddProduct";
import ProductPage from "./Components/USER/ProductPage";
import CategoryAll from "./Components/USER/CategoryAll";
import CategorySaprate from "./Components/USER/CategorySaprate";
import { useContext, useEffect } from "react";
import { UserContext } from "./Context/UserContext";
import axios from "axios";
import LoginPage from "./Components/Login/Signup/LoginPage";
import Signup from "./Components/Login/Signup/Signup";
import CartPage from "./Components/USER/CartPage";
import { ToastContainer } from "react-toastify";

function App() {
  const { setUser } = useContext(UserContext);
  const location = useLocation();
  const getAndSetUser = () => {
    setUser({
      username: sessionStorage.getItem("username"),
      password: sessionStorage.getItem("password"),
      role: sessionStorage.getItem("role"),
      id: sessionStorage.getItem("id"),
    });
    return;
  };

  useEffect(() => {
    getAndSetUser();
  }, []);

  const excludedPaths = ["/login", "/signup"];

  return (
    <div className="App dark:bg-gray-950">
      {excludedPaths.includes(location.pathname) ? null : <Navbar />}
      <ToastContainer
        position="top-center"
        autoClose={2500}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<h1>About</h1>} />
        <Route path="/add-product" element={<AddProduct />} />
        <Route path="/all-category" element={<CategoryAll />} />
        <Route path="/user/cart" element={<CartPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/all-category/category/:id"
          element={<CategorySaprate />}
        />
        <Route path="/product/:id" element={<ProductPage />} />
      </Routes>
    </div>
  );
}

const useAXiosApi = () => {
  const username = "default" || sessionStorage.getItem("username");
  const password = "123" || sessionStorage.getItem("password");

  const token = btoa(`${username}:${password}`);

  const API = axios.create({
    baseURL: "http://localhost:8080",
    headers: {
      Authorization: `Basic ${token}`,
    },
  });

  return API;
};

export default App;

export { useAXiosApi };
