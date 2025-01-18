import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";
import { assets } from "../assets/assets";

const Login = () => {
  const [currentState, setCurrentState] = useState("Login");
  const { token, setToken, navigate, backendUrl } = useContext(ShopContext);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPasword] = useState("");
  const [email, setEmail] = useState("");

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      if (currentState === "Sign Up") {
        const response = await axios.post(backendUrl + "/api/user/register", {
          name,
          phone,
          email,
          password,
        });
        if (response.data.success) {
          setToken(response.data.token);
          localStorage.setItem("token", response.data.token);
        } else {
          toast.error(response.data.message);
        }
      } else {
        const response = await axios.post(backendUrl + "/api/user/login", {
          email,
          password,
        });
        if (response.data.success) {
          setToken(response.data.token);
          localStorage.setItem("token", response.data.token);
        } else {
          toast.error(response.data.message);
        }
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token]);

  return (
    <div className="py-16 mb-8">
      <div className="container">

        <form
          onSubmit={onSubmitHandler}
          className="flex flex-col items-center w-[100%] sm:max-w-[500px] m-auto gap-4 text-gray-800 bg-lightstone p-4 rounded-md"
        >
        <img className="max-w-[300px] mx-auto mt-4" src={assets.create_account} alt="" />


          <div className="inline-flex items-center gap-2 my-6">
            <p className="text-3xl text-secondary font-semibold">{currentState}</p>
          </div>
          {currentState === "Login" ? (
            ""
          ) : (
            <>
              <input
                onChange={(e) => setName(e.target.value)}
                value={name}
                type="text"
                className="w-full border-1 border-primary focus:ring-primary rounded-sm focus:border-primary rounded-1 text-base px-2"
                placeholder="Name"
                required
              />
              <input
                onChange={(e) => setPhone(e.target.value)}
                value={phone}
                type="number"
                className="w-full border-1 border-primary focus:ring-primary rounded-sm focus:border-primary rounded-1 text-base px-2"
                placeholder="Mobile Number"
                required
              />
            </>
          )}
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type="email"
            className="w-full border-1 border-primary focus:ring-primary rounded-sm focus:border-primary rounded-1 text-base px-2"
            placeholder="Email"
            required
          />
          <input
            onChange={(e) => setPasword(e.target.value)}
            value={password}
            type="password"
            className="w-full border-1 border-primary focus:ring-primary rounded-sm focus:border-primary rounded-1 text-base px-2"
            placeholder="Password"
            required
          />
          <div className="w-full flex justify-between text-sm mt-[-8px]">
            <p className=" cursor-pointer hover:underline hover:text-primary">Forgot your password?</p>
            {currentState === "Login" ? (
              <p
                onClick={() => setCurrentState("Sign Up")}
                className=" cursor-pointer hover:underline hover:text-primary"
              >
                Create account
              </p>
            ) : (
              <p
                onClick={() => setCurrentState("Login")}
                className=" cursor-pointer hover:underline hover:text-primary"
              >
                Login Here
              </p>
            )}
          </div>
          <button className="bg-black text-white font-light px-8 py-3 mt-4 w-full hover:bg-primary rounded-sm">
            {currentState === "Login" ? "Sign In" : "Sign Up"}
          </button>
        </form>

      </div>
    </div>
  );
};

export default Login;
