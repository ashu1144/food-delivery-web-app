import { useRouter } from "next/navigation";
import { useState } from "react";

function CustomerSignUp() {
  const router = useRouter()
  const [error, setError] = useState("");
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    c_password: "",
    city: "",
    contact: "",
    img_path:""
  });

  const reset = () => {
    setUserData({
      name: "",
      email: "",
      password: "",
      c_password: "",
      city: "",
      contact: "",
      img_path:""
    });
  };

  const handelFormInput = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // validate and singup
  const handelSubmit = async (e) => {
    e.preventDefault();

    if(!/@gmail\.com$/.test(userData.email)){
      reset()
      return setError("enter valid email")
    }
    if(userData.password.length<5){
      console.log("length error")
      reset()
      return setError("password is too short");

    }
    if(!/[!@#$%^&*(),.?":{}|<>]/.test(userData.password)){
      console.log("add atleast one character")
      reset()
      return setError("atleast one special character");
    }
    if (userData.password !== userData.c_password) {
      console.log("error")
      reset()
      return setError("password not matched");
    }
    if(userData.contact.length !== 10){
      console.log("length error")
      reset()
      return setError("contact is too short");

    }
    if (!/^[0-9]+$/.test(userData.contact)) {
      reset();
      return setError("enter valid contact");
    }
    setError("")
    let response = await fetch("/api/user",
      {method:"POST" , body:JSON.stringify(userData)})
      response = await response.json()
      if(response.success){ 
        alert("registered Successfully")
        const{values}=response
        delete values.password
        console.log({RESvalues:values})
        localStorage.setItem("restaurantUser",JSON.stringify(values))
        router.push("/") 
      }
      else{
        reset() 
        alert("failed")
      }
   
  };

  return (
    <div className="">
      <div className="relative w-80 h-120 border-2 p-5 m-auto  ">
        <h1 className="">SignUp</h1>
        <form
          onSubmit={handelSubmit}
          className=" absolute bottom-9 left-1/5 flex flex-col gap-5"
        >
          <input
            className="border-2 w-50"
            placeholder="Enter Your Name "
            name="name"
            required
            value={userData.name}
            onChange={(e) => {
              handelFormInput(e);
            }}
          ></input>
          <input
            className="border-2 w-50 "
            name="email"
             required
            value={userData.email}
            placeholder="Enter Your Email "
            onChange={(e) => {
              handelFormInput(e);
            }}
          ></input>
          <input
            className="border-2 w-50"
            name="password"
            type="password"
             required
            autoComplete="off"
            value={userData.password}
            placeholder="Enter Your Password "
            onChange={(e) => {
              handelFormInput(e);
            }}
          ></input>
          <input
            className="border-2 w-50 "
            name="c_password"
            type="password"
             required
            autoComplete="off"
            value={userData.c_password}
            placeholder="Conform Password "
            onChange={(e) => {
              handelFormInput(e);
            }}
          ></input>
          <input
            className="w-50 border-2 "
            name="city"
             required
            autoComplete="off"
            value={userData.city}
            placeholder="Enter Your Address "
            onChange={(e) => {
              handelFormInput(e);
            }}
          ></input>
          <input
            className="w-50 border-2"
            name="contact"
            type="tel"
            required
            autoComplete="off"
            value={userData.contact}
            placeholder="Phone Number "
            onChange={(e) => {
              handelFormInput(e);
            }}
          ></input>
          <input
            className="w-50 border-2"
            name="img_path"
            autoComplete="off"
            value={userData.img_path}
            placeholder="Profile Img"
            onChange={(e) => {
              handelFormInput(e);
            }}
          ></input>
          {error && <p className="text-red-500"> {error} </p>}
          <input type="submit"></input>
        </form>
      </div>
    </div>
  );
}

export default CustomerSignUp;
