
"use client";
import { useState } from "react";
import CustomerLogin from "../_Components/CustomerLogin";
import CustomerSignUp from "../_Components/CustomerSingup";
import CustomerHeader from "../_Components/CustomerHeader";
function Restaurant() {
  const [login, setLogin] = useState(true);

  return (
    <div className="h-[100vh]">
      <CustomerHeader></CustomerHeader>
    <div className="h-[95vh] flex flex-col items-center gap-2 justify-center">
      <h1> user login/singup</h1>
      <div className="">
        {login ? (
          <CustomerLogin></CustomerLogin>
        ) : (
         <CustomerSignUp></CustomerSignUp>
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
    {/* <RestaurantFooter></RestaurantFooter> */}
    </div>
  );
}

export default Restaurant;
