import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { toast } from "react-toastify";
import { assets } from "../assets/assets";
import { Link } from "react-router-dom";
import http from "../services/utility";

const Login = () => {
  const [currentState, setCurrentState] = useState("Login");
  const { token, setToken, navigate, backendUrl, setIsLoading } = useContext(ShopContext);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPasword] = useState("");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const [verifyButtonClicked, setVerifyButtonClicked] = useState(false);

  const [time, setTime] = useState(0);
  const [text, setText] = useState("OTP");

  useEffect(() => {
    if (time > 0) {
      const timer = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [time]);

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      if (currentState === "Sign Up") {
        const response = await http.post(backendUrl + "/api/user/register", {
          name,
          phone,
          email,
          password,
          otp
        });
        if (response.data.success) {
          toast.success("Successfully signed up");
          setToken(response.data.token);
          localStorage.setItem("token", response.data.token);
        } else {
          toast.error(response.data.message);
        }
      } else {
        const response = await http.post(backendUrl + "/api/user/login", {
          email,
          password,
        });
        if (response.data.success) {
          toast.success("Successfully logged in");
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

  const generateOtp = async () => {
    if(time > 0){
      return;
    }
    setIsLoading(true);
    try {
      const response = await http.post(backendUrl + "/api/user/generate-otp", {
        email,
        type: "signup"
      });
      if (response.data.success) {
        toast.success(response.data.message);
        setIsLoading(false);
        setVerifyButtonClicked(true)
        setTime(30);
      } else {
        toast.error(response.data.message);
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
    <div className="py-16 mb-8 pt-6">
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
          <div className="w-full relative">
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              type="email"
              className="w-full border-1 border-primary focus:ring-primary rounded-sm focus:border-primary rounded-1 text-base px-2"
              placeholder="Email"
              required
            />
            {currentState !== "Login" ? 
              !isVerified ? <button type="button" className="bg-slate-500 text-white font-light text-sm px-4 py-1 hover:bg-slate-700 rounded-lg absolute top-1/2 right-2 -translate-y-1/2" onClick={generateOtp}>{time > 0 ? time : text}</button>
              : <span className="bg-green-500 text-white font-light text-sm px-4 py-1 rounded-lg absolute top-1/2 right-2 -translate-y-1/2">Verified</span>
            : <></>}
          </div>

          {verifyButtonClicked && !isVerified ?
            <input
              onChange={(e) => setOtp(e.target.value)}
              value={otp}
              type="number"
              className="w-full border-1 border-primary focus:ring-primary rounded-sm focus:border-primary rounded-1 text-base px-2"
              placeholder="Enter OTP"
              required
            /> 
           : <></>}

          <input
            onChange={(e) => setPasword(e.target.value)}
            value={password}
            type="password"
            className="w-full border-1 border-primary focus:ring-primary rounded-sm focus:border-primary rounded-1 text-base px-2"
            placeholder="Password"
            required
          />
          <div className="w-full flex justify-between text-sm mt-[-8px]">
            <Link to='/forgot-password'><p className=" cursor-pointer hover:underline hover:text-primary">Forgot your password?</p></Link>
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
