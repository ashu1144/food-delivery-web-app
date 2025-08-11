"use client"
import Image from "next/image";
import CustomerHeader from "./_Components/CustomerHeader";
import SliddingBanner from "./_Components/SliddingBanner";
import { useEffect , useState } from "react";
import Restaurant from "./restaurant/page";
import { useRef } from "react";
export default function Home() {
    const [count, setCount] = useState(0);
    const[resturantsName , setrestaurantNames] = useState({biryani :[],burger:[],pizza:[]})
    const photos = [{imageSrc:"https://assets.limetray.com/assets/image_manager/uploads/7639/eb-slide-23423-3.jpg",title:"biiryani"},
        {imageSrc:"https://tds.indianeagle.com/wp-content/uploads/2022/05/Visit-these-Beautiful-Cities-to-Try-Different-Biryanis-of-India-01.png", title:"biyani"},
        {imageSrc:"https://www.food4life.org.uk/multisite/wp-content/uploads/sites/2/2022/06/1109-x-627-cheese-and-onion-burger-landscapejpg.jpg" , title:"burger"}
    ]
   useEffect(() => {
     const interval = setInterval(() => {
      setCount((prev)=>(prev+1)%photos.length)
     }, 6000);
     return () => clearInterval(interval)
   }, [])

   useEffect(() => {
    getRestaurants("biryani")
    getRestaurants("burger")
   }, [])
  
    const scrollRef = useRef(null);

  const scrollLeft = (id) => {
    document.getElementById(id).scrollBy({
      left: -200, // pixels to scroll
      behavior: "smooth",
    });
  };

  const scrollRight = (id) => {
    document.getElementById(id).scrollBy({
      left: 200,
      behavior: "smooth",
    });
  };
  //  useEffect(() => {
  //   console.log(resturantsName)
  //  }, [resturantsName])
   
   async function getRestaurants(foodItems){
    let response = await fetch(`/api/user/${foodItems}`, {method:"GET"})
    response = await response.json()
    const{data} = response
    setrestaurantNames((prev)=>({
      ...prev,[foodItems]:data
    }))
   }
   

  return (
    <div>
      <CustomerHeader></CustomerHeader>
      <div className="w-full md:px-10 ">
        {/* banner */}
        <div className=" relative flex w-full h-50 border-2 border-zinc-400  bg-amber-950 overflow-hidden">
          {photos.map((el, index) => (
            <img
              src={el.imageSrc}
              key={index}
              alt={el.title}
              className=" z-0 w-full flex-shrink-0 h-full object-cover transition-transform duration-500 ease-in-out opacity-60"
              style={{ transform: `translateX(-${count * 100}%)` }}
            ></img>
          ))}
          <div className="absolute bottom-2">
            <h1 className="text-[7vw] md:text-[3vw] font-bold text-white text-4xl drop-shadow-[0_0_2px_black] tracking-wide pl-2">
              Craving? <br /> We’re Already on the Way!
            </h1>
          </div>
        </div>
        {/*banner ends   */}

        {/* offer area */}
        <div className=" lg:gap-5 px-2 lg:px-5 py-2 grid grid-cols-2 md:grid-cols-4 w-full ">
          <div className="relative h-40 lg:h-80 rounded-2xl p-1  hover:scale-110  transition-all duration-400 ease-in-out ">
            <img
              className="w-full h-full object-cover rounded-2xl opacity-90"
              src="https://images.unsplash.com/photo-1697276063790-a68a966b12f7?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Biryani"
            />
            <div className="absolute font-bold bottom-0 text-white w-40 p-2 md:w-60 md:text-2xl  drop-shadow-[0_0_10px_black] ">
              <h1>50% OFF on Biyani & More Limited Time Offer!🎉 </h1>
            </div>
          </div>
          <div className="relative h-40 lg:h-80 rounded-2xl p-1  hover:scale-110  transition-all duration-400 ease-in-out ">
            <img
              className="w-full h-full object-cover rounded-2xl"
              src="https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=781&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="pizza"
            />
            <div className="absolute font-bold bottom-0 text-white w-40 p-2 md:w-60 md:text-2xl  drop-shadow-[0_0_10px_black] ">
              <h1>Half the Price,Double the Cheese! 🍕 </h1>
            </div>
          </div>
          <div className="relative h-40 lg:h-80 rounded-2xl p-1  hover:scale-110  transition-all duration-400 ease-in-out">
            <img
              className="w-full h-full object-cover rounded-2xl"
              src="https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=765&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="burger"
            />
            <div className="absolute font-bold bottom-0 text-white w-40 p-2 md:w-60 md:text-2xl  drop-shadow-[0_0_10px_black] ">
              <h1>30% OFF Burgers Your Cheat Day Just Got Better </h1>
            </div>
          </div>
          <div className="relative h-40 lg:h-80 rounded-2xl p-1  hover:scale-110  transition-all duration-400 ease-in-out">
            <img
              className="w-full h-full object-cover rounded-2xl"
              src="https://images.unsplash.com/photo-1611270629569-8b357cb88da9?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Biryani"
            />
            <div className="absolute font-bold bottom-0 text-white w-40 p-2 md:w-60 md:text-2xl  drop-shadow-[0_0_10px_black] ">
              <h1>Twirl Into Flavor – 20% OFF All Pasta Dishes!</h1>
            </div>
          </div>
        </div>
        {/* offer area ends */}

        {/* biryani section */}
        <div className="relative">
          <h1 className="capitalize font-bold text-2xl text-gray-700 pl-1">
            Everyone's fav biryani
          </h1>
          <div>
            <div className=" hidden md:block  absolute left-[-1vw] top-1/2 z-20 cursor-pointer" onClick={()=>scrollLeft("scroll-biryani")}><span className="material-symbols-outlined  scale-150">arrow_back_ios</span></div>
            <div className="hidden md:block absolute right-[-1.5vw] top-1/2 z-20 cursor-pointer" onClick={()=>scrollRight("scroll-biryani")}><span className="material-symbols-outlined scale-150">arrow_forward_ios</span></div>
          </div>
          <div className="flex gap-3 rounded-2xl p-3 md:p-5 overflow-x-scroll no-scrollbar" id="scroll-biryani">
            {resturantsName.biryani.map((restoDetails, index) => (
              <div key={index}>
                <div className="relative w-30 h-35  md:w-45 md:h-50 overflow-hidden rounded-2xl hover:scale-110 transition-all duration-300 ease-in-out">
                  <img src={restoDetails.img_path} className="object-cover h-full w-full flex-shrink-0 opacity-90 "></img>
                  <div className="absolute text-sm md:text-[1vw] bottom-0 p-2 font-bold text-white drop-shadow-[0_0_10px_black] ">
                    <h1>{restoDetails.name}</h1>
                    <h1>{restoDetails.city}</h1>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Burger section */}
          <div className="relative">
          <h1 className="capitalize font-bold text-2xl text-gray-700 pl-1">
            Everyone's fav biryani
          </h1>
          <div>
            <div className=" hidden md:block  absolute left-[-1.5vw] top-1/2 z-20 cursor-pointer" onClick={()=>scrollLeft("scroll-burger")}><span className="material-symbols-outlined  scale-150">arrow_back_ios</span></div>
            <div className="hidden md:block absolute right-[-1.5vw] top-1/2 z-20 cursor-pointer" onClick={()=>scrollRight("scroll-burger")}><span className="material-symbols-outlined scale-150">arrow_forward_ios</span></div>
          </div>
          <div className="flex gap-3 rounded-2xl p-3 md:p-5 overflow-x-scroll no-scrollbar" id="scroll-burger">
            {resturantsName.burger.map((restoDetails, index) => (
              <div key={index}>
                <div className="relative w-30 h-35  md:w-45 md:h-50 overflow-hidden rounded-2xl hover:scale-110 transition-all duration-300 ease-in-out">
                  <img src={restoDetails.img_path} className="object-cover h-full w-full flex-shrink-0 opacity-90 "></img>
                  <div className="absolute text-sm md:text-[1vw] bottom-0 p-2 font-bold text-white drop-shadow-[0_0_10px_black] ">
                    <h1>{restoDetails.name}</h1>
                    <h1>{restoDetails.city}</h1>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>


        {/* pizza section */}
        {/* <div className="">
          <h1 className="capitalize font-bold text-2xl text-gray-700 pl-1">
            pizza
          </h1>
          <div className=" flex gap-3 rounded-2xl p-5 overflow-x-scroll">
            {resturantsName.burger.map((restoDetails, index) => (
              <div key={index}>
                <div className="relative w-40 h-50 overflow-hidden rounded-2xl hover:scale-110 transition-all duration-300 ease-in-out">
                  <img src={restoDetails.img_path} className="object-cover h-full w-full flex-shrink-0 opacity-90 "></img>
                  <div className="absolute text-[1vw] bottom-0 p-2 font-bold text-white drop-shadow-[0_0_10px_black] ">
                    <h1>{restoDetails.name}</h1>
                    <h1>{restoDetails.city}</h1>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div> */}
        
      </div>
    </div>
  );
}
