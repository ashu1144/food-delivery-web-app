"use client"

import { useRouter , usePathname } from "next/navigation";
import { useState  } from "react";
import { useEffect } from "react";

const ResturantHeader = () => {
  const [details , setDetails] =  useState("")
  const router = useRouter(); 
  const pathname = usePathname();

  useEffect(() => {
    let data = localStorage.getItem("restaurantUser")
    console.log("checking")
    if(!data && pathname=='/restaurant/dashboard'){
      router.push("/restaurant")
    }
    else if(data && pathname == '/restaurant'){
      router.push("/restaurant/dashboard")
    }
    else{
      setDetails(JSON.parse(data))

    }

   
  },[])

  const handelDelete=()=>{
    console.log(clicked)
    setDetails("")
    localStorage.clear()
    router.push("/restaurant")
  }
  

  
  return (
    <div className=" w-[100vw] flex justify-between px-10  items-center bg-zinc-800 text-white  ">
      <div className="flex items-center">
        <div className=" w-15 h-15 flex p-2"> 
          <img className="w-full h-full object-cover overflow-hidden" src="/Logo.png" alt="My Icon" />
        </div>
        <span className="text-2xl font-bold">DeliFood!!!</span>
      </div>
      {/* <ul className="flex  gap-5 ml-30 underline ">
        <li className="cursor-pointer">Products</li>
        <li className="cursor-pointer">Products</li>
        <li className="cursor-pointer">Products</li>
        <li className="cursor-pointer">Products</li>
      </ul> */}
      <div className=" flex gap-10">
        {details?
        <>
        <a className="cursor-pointer capitalize">profile</a>
        <div onClick={handelDelete} className="cursor-pointer">logout</div>
        </> 
        : <a className="cursor-pointer capitalize">SignUp/Login</a>}
        {/* <div className="cursor-pointer">cart</div> */}
      </div>
    </div>
  );
}

export default ResturantHeader