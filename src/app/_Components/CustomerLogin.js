import { useRouter , usePathname } from "next/navigation";
import { useState } from "react";

function CustomerLogin() {
    

  const pathname = usePathname();
  const router =  useRouter();
  const [userData, setUserData] = useState({
      email: "",
      password: "",
    });

    const handelLoginForm=(e)=>{
      const {name , value } = e.target
      setUserData((prev)=>({
        ...prev , [name]:value
      }))

    }


    const handelSubmit=async(e)=>{
      e.preventDefault()
      console.log(userData)
      let response = await fetch("/api/user" ,{method:"POST" , body:JSON.stringify({userData , login:true})} )
      response = await response.json() 
      if(response.success){
        alert("login successfully")
        const {values} =  response
        delete values.password
        localStorage.setItem("restaurantUser", JSON.stringify(values))
        router.push( "/")
      }
      else{
        alert(response.message)
      }
    }


  return (
    <div>
      <div className="relative w-80 h-80 border-2 p-5 m-auto rounded-2xl   border-zinc-800  ease-in-out transition-all shadow-[5px_8px_20px] hover:shadow-[5px_8px_25px] duration-500 bg-amber-300">
         <div className="flex w-full justify-center">
           <h1 className="font-medium text-2xl ">welcome to Delifood</h1>
        </div>
        <h1 className="absolute left-10 top-20">Login</h1>
            <form
              onSubmit={handelSubmit}
             className=" absolute bottom-9 left-1/5 flex flex-col gap-5"
              >
                <input
                    name= "email"
                    value={userData.email}
                    className="border-2 w-50 rounded-2xl p-1 border-zinc-900 hover:border-purple-500 duration-100 ease-in-out"
                    placeholder="Enter your Email "
                    autoComplete="off"
                    onChange={handelLoginForm}
                ></input>
                <input
                    name= "password"
                    autoComplete="off"
                    value={userData.password}
                    className="border-2 w-50 rounded-2xl p-1 border-zinc-900 hover:border-purple-500 duration-100 ease-in-out transition-all"
                    placeholder="Enter your Password "
                    onChange={handelLoginForm}
                ></input>
               <div className="w-full h-12 flex justify-center">
                <button 
                  type="submit" 
                  className=" border-2 w-30 h-8 border-blue-400 rounded-full hover:scale-110 duration-300 ease-in-out"
                >
                  submit
                </button>
              </div>

            </form>
      </div>
    
    </div>
  );
}

export default CustomerLogin;

