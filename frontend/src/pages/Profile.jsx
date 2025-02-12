import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";

const Profile = () => {
  const [currentState, setCurrentState] = useState("My Profile");
  const { token, navigate, userData } = useContext(ShopContext);


  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  }, [token]);


  return (
    <div className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800 pb-10">
      <div className="inline-flex items-center gap-2 mb-2 mt-10">
        <p className="prata-regular text-3xl">{currentState}</p>
        <hr className="border-none h-[1.5px] w-8 bg-gray-800" />
      </div>

      <div className="flex flex-col gap-6">
        <div className="flex flex-row gap-4">
          <span>Name</span>
          <span>{userData?.name}</span>
        </div>
        <div className="flex flex-row gap-4">
          <span>Mobile Number</span>
          <span>{userData?.phone}</span>
        </div>
        <div className="flex flex-row gap-4">
          <span>Email</span>
          <span>{userData?.email}</span>
        </div>
      </div>
      
    </div>
  );
};

export default Profile;
