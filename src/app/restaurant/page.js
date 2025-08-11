"use client";
import { useState } from "react";
import ResturantHeader from "../_Components/ResturantHeader";
import RestaurantFooter from "../_Components/RestaurantFooter";
import RestaurantLogin from "../_Components/RestaurantLogin";
import RestaurantSignUp from "../_Components/RestaurantSignup";
function Restaurant() {
  const [login, setLogin] = useState(true);

  return (
    <div className="h-[100vh]">
      <ResturantHeader></ResturantHeader>
    <div className="h-[95vh] flex flex-col items-center gap-2 justify-center">
      <h1> Restaurant login/singup page </h1>
      <div className="">
        {login ? (
          <RestaurantLogin></RestaurantLogin>
        ) : (
         <RestaurantSignUp></RestaurantSignUp>
        )}
      </div>
      <div>
        <button
          onClick={() => setLogin((prev) => !prev)}
          className=""
        >
          {login ? "Do not have account ? SignUp" : "Login"}
        </button>
      </div>
    </div>
    <RestaurantFooter></RestaurantFooter>
    </div>
  );
}

export default Restaurant;
