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
    <div className="">
      <div className="relative w-80 h-80 border-2 p-5 m-auto">
        <h1 className="">Login</h1>
            <form
              onSubmit={handelSubmit}
             className=" absolute bottom-9 left-1/5 flex flex-col gap-5"
              >
                <input
                    name= "email"
                    value={userData.email}
                    className="border-2 w-50"
                    placeholder="enter your Email "
                    onChange={handelLoginForm}
                ></input>
                <input
                    name= "password"
                    value={userData.password}
                    className="w-50 border-2"
                    placeholder="enter your password "
                    onChange={handelLoginForm}
                ></input>
                <input type="submit"></input>
            </form>
      </div>
    
    </div>
  );
}

export default CustomerLogin;

