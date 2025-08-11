"use client"
import { useState } from "react";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
const CustomerHeader = () => {
    const [details , setDetails] =  useState("")
    const router = useRouter(); 
    const pathname = usePathname();

      useEffect(() => {
        let data = localStorage.getItem("restaurantUser")
        if(!data && pathname=='/'){
          router.push("/user")
        }
        else if(data && pathname == '/user'){
          router.push("/")
        }
        else{
          setDetails(JSON.parse(data))
        }
    
       
      },[])

    function handelDelete(){
        setDetails("")
        localStorage.clear()
        router.push("/user")
    }




    
  return (
    <div className=" w-full">
        <div className="flex justify-between items-center pl-0 pr-2 md:px-10">
            <div className="flex gap-0 items-center hover:text-orange-400">
                <div className=" w-18 h-15 p-2"> 
                    <img className="w-full h-full object-cover overflow-hidden" src="/Logo.png" alt="My Icon" />
                </div>
                <span className="font-medium text-2xl">DeliFood!!!</span>
            </div>
            {/* <div>
                <ul>
                    <li>

                    </li>
                </ul>
            </div> */}
            <div className="flex gap-3">
                <span className="cursor-pointer hover:text-orange-400 capitalize font-bold">cart</span>
               {details?<span className="cursor-pointer hover:text-orange-400 capitalize font-bold" onClick={handelDelete}>Logout</span>:<span className="cursor-pointer hover:text-orange-400 capitalize font-bold">Login</span> } 
            </div>
        </div>

    </div>
  )
}

export default CustomerHeader