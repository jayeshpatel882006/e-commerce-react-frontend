import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../../Context/UserContext";
import axios from "axios";
import { toast } from "react-toastify";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);
  const [uesr, setUsers] = useState({
    username: "",
    password: "",
  });

  const handalSubmit = async (e) => {
    e.preventDefault();
    if (uesr.username === "" || uesr.password === "") {
      alert("Please fill all the fields");
      return;
    }
    const toastId = toast.loading("Loading...", { isLoading: true });

    await axios
      .post("http://localhost:8080/api/signup", uesr, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        // console.log(res.data);
        if (res.data === "User Created") {
          navigate("/login");
          alert("User Created Login Now");
          toast.update(toastId, {
            render: "User Created",
            type: "success",
            isLoading: false,
            autoClose: 2000,
          });
          return;
        }
      })
      .catch((err) => {
        // console.log(err);
        toast.update(toastId, {
          render: " User Already Exists",
          type: "error",
          autoClose: 2000,
          isLoading: false,
        });
        // alert("Invalid Credentials or User Already Exists");
      });
  };

  return (
    <>
      <section className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <p className="flex items-center mb-6 text-2xl font-semibold text-teal-500">
            Patel's Web Store
          </p>
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold text-center leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-teal-500">
                Signup in your new account
              </h1>
              <form className="space-y-4 md:space-y-6" action="#">
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Username
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={uesr.username}
                    onChange={(e) =>
                      setUsers({ ...uesr, username: e.target.value })
                    }
                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="username"
                    required=""
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Password
                  </label>
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    id="password"
                    autoComplete="true"
                    onChange={(e) =>
                      setUsers({ ...uesr, password: e.target.value })
                    }
                    value={uesr.password}
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required=""
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="remember"
                        aria-describedby="remember"
                        type="checkbox"
                        onClick={() => setShowPassword(!showPassword)}
                        className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                        required=""
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label
                        htmlFor="remember"
                        className="text-gray-500 dark:text-gray-300"
                      >
                        see password
                      </label>
                    </div>
                  </div>
                  <Link
                    href="#"
                    className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
                  >
                    Forgot password?
                  </Link>
                </div>
                <button
                  onClick={(e) => handalSubmit(e)}
                  className="w-full text-white bg-teal-500 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  Sign in
                </button>
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  have an account{"  "}
                  <Link
                    to={"/login"}
                    className="font-medium text-teal-500 hover:underline dark:text-primary-500"
                  >
                    Login
                  </Link>
                </p>
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Stay logged Out{"  "}
                  <Link
                    to={"/"}
                    className="font-medium text-teal-500 text-primary-600 hover:underline dark:text-primary-500"
                  >
                    go to home page
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Signup;
