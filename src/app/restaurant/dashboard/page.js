"use client"
import ResturantHeader from "@/app/_Components/ResturantHeader";
import { useState , useEffect } from "react";
import UploadFood from "@/app/_Components/UploadFood";
import { resolve } from "styled-jsx/css";
import { useRouter , usePathname } from "next/navigation";
import { Router } from "next/router";
function dashboard() {
  const [loading, setLoading] = useState(false);
  const [foodData, setFoodData] = useState([])
  const [user , setUser] =useState("") 
  const [showFoodData, setShowFoodData] = useState(false);
  const [showAddFood, setShowAddFood] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showOrders , setShowOrders] = useState(false)
  const router = useRouter()
  useEffect(() => {
    fetchData()
  }, []);
  
  useEffect(() => {
    console.log(foodData)
  }, [foodData])
  

  async function fetchData(){
    const resto = JSON.parse(localStorage.getItem("restaurantUser"))
    setUser(resto)
    setLoading(true)
    let res = await fetch("http://localhost:3000/api/restaurant/foods/"+resto._id , {method:"GET"})
    res = await res.json()
    console.log(res)
    setFoodData(res.data)
    setLoading(false)
  }

  const handelDelete=async(e)=>{
    let {_id}=e
    let res = await fetch("http://localhost:3000/api/restaurant/foods/"+_id ,{method:"DELETE"})
    res = await res.json()
    if(res.success){
      alert("Succesfully deleted")
      window.location.reload()
    
    }
    else{
      alert("failed internal issue try after sometime")
    }
   

  }

  const handelFoodshow = ()=>{
    setShowFoodData(true)
    setShowAddFood(false)
    setShowProfile(false)
    setShowOrders(false)

  }
  const handelAddItemShow=()=>{
    setShowAddFood(true)
    setShowFoodData(false)
    setShowProfile(false)
    setShowOrders(false)


  }
   const handelShowProfile = ()=>{
    setShowFoodData(false)
    setShowAddFood(false)
    setShowProfile(true)
    setShowOrders(false)

  }
  
  const handelOrdershow = ()=>{
    setShowFoodData(false)
    setShowAddFood(false)
    setShowProfile(false)
    setShowOrders(true)

  }
  
  
  
  return (
    <div className="relative w-screen h-screen bg-zinc-900 overflow-x-hidden ">
      <div className="absolute top-0 w-full ">
        <ResturantHeader></ResturantHeader>
      </div>
      <div className="absolute w-screen top-20 px-10 text-white ">
        <div>
          <h1 className="text-6xl font-medium">Welcome {user.name}</h1>
        </div>
        <div className="grid grid-cols-4 gap-5 p-10">
          <div
            onClick={handelOrdershow}
            className="relative flex items-center p-5 w-[20vw] h-[15vh] bg-gradient-to-tr to-purple-800 from-purple-300 hover:scale-120 transition-all duration-500 ease-in-out hover:[filter:drop-shadow(0_0_20px_#9333ea)]"
          >
            <h1 className="text-4xl">Orders</h1>
            <img
              className=" absolute right-0 w-1/2"
              src="/Line.svg"
              alt="My Icon"
            />
          </div>
          <div
            onClick={handelFoodshow}
            className="relative flex items-center p-5 w-[20vw] h-[15vh] bg-gradient-to-tr from-blue-300 to-blue-800  hover:scale-120 transition-all duration-500 ease-in-out hover:[filter:drop-shadow(0_0_20px_#4ac3f7)]"
          >
            <h1 className="text-4xl">Foods</h1>
            <img
              className=" absolute right-0 w-1/2"
              src="/Line.svg"
              alt="My Icon"
            />
          </div>
          <div
            onClick={handelAddItemShow}
            className="relative flex items-center p-5 w-[20vw] h-[15vh]  bg-gradient-to-tr from-red-400 via-red-500 to-red-600 hover:scale-120 transition-all duration-500 ease-in-out hover:[filter:drop-shadow(0_0_20px_#f24954)]"
          >
            <h1 className="text-4xl">
              Add <br /> Food
            </h1>
            <img
              className=" absolute right-0 w-1/2"
              src="/Line.svg"
              alt="My Icon"
            />
          </div>
          <div
            onClick={handelShowProfile}
            className="relative flex items-center p-5 w-[20vw] h-[15vh] bg-gradient-to-tr from-green-300 via-green-400 to-green-500 hover:scale-120 transition-all duration-500 ease-in-out hover:[filter:drop-shadow(0_0_20px_#0af04b)]"
          >
            <h1 className="text-4xl">Profile</h1>
            <img
              className=" absolute right-0 w-1/2"
              src="/Line.svg"
              alt="My Icon"
            />
          </div>
        </div>

        <hr className="border-zinc-500" />
        {/* food data */}
        {showFoodData && (
          <div className="mt-5 p-5">
            <div className="flex justify-between">
              <h1 className="text-4xl font-medium">Foods Items</h1>
              <div onClick={() => setShowFoodData(false)} className="text-4xl">
                x
              </div>
            </div>
            {foodData.length > 0 ? (
              <>
                <h1>{foodData.length} Items</h1>
                <div className="p-10 grid grid-cols-4 gap-2 ">
                  {foodData.map((foodItem, index) => (
                    <div
                      key={index}
                      className="w-80 h-120 bg-neutral-800 rounded-3xl p-5 flex flex-col justify-between  text-neutral-300  hover:bg-gray-900 hover:shadow-2xl hover:shadow-sky-400 transition-shadow"
                    >
                      <div>
                        <div className="w-full h-40 bg-sky-300 rounded-2xl">
                          <img
                            src={foodItem.img_path}
                            className="w-full h-full object-cover overflow-hidden"
                          />
                        </div>
                        <div className="mt-4 ml-1">
                          <p className="font-extrabold capitalize">
                            {foodItem.name}
                          </p>
                          <p className="font-medium mr-2">
                            RS:{foodItem.price}
                          </p>
                          <p className=" break-words w-full capitalize ">
                            {foodItem.description}
                          </p>
                          <p className="font-light text-sm">
                            id:{foodItem._id}
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-row gap-2">
                        <button
                          onClick={()=>{router.push("dashboard/"+foodItem._id)}}
                          className="bg-blue-500 font-extrabold p-1 px-3 w-1/2 rounded-xl hover:bg-blue-800 transition-all duration-300 ease-in-out ">
                          Edit
                        </button>
                        <button
                          onClick={() => handelDelete(foodData[index])}
                          className="bg-red-500 font-extrabold p-1 px-3 w-1/2 rounded-xl hover:bg-red-800 transition-all duration-300 ease-in-out ">
                        Delete
                      </button>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <h1>No items plz add items</h1>
            )}
          </div>
        )}

        {/* Add food data */}
        {showAddFood && (
          <div className="mt-5">
            <div className="flex justify-between">
              <h1 className="text-4xl font-medium">Add Items</h1>
              <div
                onClick={() => setShowAddFood(false)}
                className="float-right text-4xl cursor-pointer"
              >
                x
              </div>
            </div>
            <div className="flex justify-center py-5">
              <UploadFood></UploadFood>
            </div>
          </div>
        )}

        {/* profile */}
        {showProfile && (
          <div className="mt-5 p-5">
            <div className="flex justify-between">
              <h1 className="text-4xl font-medium">Profile</h1>
              <div onClick={() => setShowProfile(false)} className="text-4xl">
                x
              </div>
            </div>
            <div className="p-10 ">
              <div className="border-2 border-zinc-600 rounded-2xl w-1/2 mx-auto flex">
                <div className="flex w-50 items-center justify-center bg-zinc--900 p-4">
                  <div className="w-72 rounded-lg border border-indigo-500 bg-white dark:bg-gray-800 p-6 text-center shadow-lg">
                    <figure className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-indigo-500 dark:bg-indigo-600">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="40"
                        height="40"
                        fill="currentColor"
                        className="text-white dark:text-indigo-300"
                        viewBox="0 0 16 16"
                      >
                        <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"></path>
                      </svg>
                      <figcaption className="sr-only"></figcaption>
                    </figure>

                    <h2 className="text-xl font-semibold text-indigo-600 dark:text-indigo-400">
                      {user.name}
                    </h2>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                      verified
                    </p>
                  </div>
                </div>
                <div className="bg-gradient-to-tr via-indigo-600 to-blue-600 from-blue-400 p-4 w-full flex flex-col gap-5 justify-center items-start rounded-xl ">
                  <div>
                    <span>Name:</span>
                    <span className="underline font-medium ml-2">
                      {user.name}
                    </span>
                  </div>
                  <div>
                    <span>Location:</span>
                    <span className="underline font-medium  ml-2">
                      {user.city}
                    </span>
                  </div>
                  <div>
                    <span>Contact:</span>
                    <span className="underline font-medium  ml-2">
                      {user.contact}
                    </span>
                  </div>
                  <div>
                    <span>Email:</span>
                    <span className="underline font-medium  ml-2">
                      {user.email}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* show orders */}
        {showOrders && (
          <div className="mt-5">
            <div className="flex justify-between">
              <h1 className="text-4xl font-medium">Orders</h1>
              <div onClick={() => setShowOrders(false)} className="text-4xl">
                x
              </div>
            </div>
          </div>
        )}

        {/*loading  */}
      </div>
      {loading && <div className="backdrop-blur-sm bg-zinc-600/30 absolute w-full h-full flex justify-center items-center">
        <button
          className=" w-100 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold py-3 px-6 rounded-full shadow-lg flex items-center justify-center transition duration-300 transform hover:scale-105 active:scale-95">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="animate-spin h-5 w-5 mr-3 text-white"
          >
            <circle
              stroke="currentColor"
              r="10"
              cy="12"
              cx="12"
              className="opacity-25"
            ></circle>
            <path
              d="M4 12a8 8 0 018-8v8H4z"
              fill="currentColor"
              className="opacity-75"
            ></path>
          </svg>
          Loading...
        </button>
      </div>}


    </div>
  );
}

export default dashboard;
