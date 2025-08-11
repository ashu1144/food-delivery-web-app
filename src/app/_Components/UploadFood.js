import { useState } from "react";


function UploadFood() {
    const resto = JSON.parse(localStorage.getItem("restaurantUser"))
    const [foodData, setFoodData] = useState({name:"",
        description : "",
        img_path:"",
        price:"",
        resto_id:resto._id})
    
    const reset=()=>{setFoodData({name:"",
        description : "",
        img_path:"",
        price:"",
        resto_id:resto._id}
    )}

    const handelForm=(e)=>{
        const {name , value} =e.target;
        setFoodData((prev)=>({
            ...prev , [name] : value
        }))
    }
    const handelSubmit=async(e)=>{
        e.preventDefault()

        // change the format if the user set name in 
        // let capitalizeName = foodData.name.replace(/\b\w/g, (char) => char.toUpperCase());
        // const FormatedData = {name:capitalizeName, description:foodData.description, img_path:foodData.img_path, price:foodData.price, resto_id:foodData.resto_id} 
        // validate

        const {description} = foodData

        if(description.length>230){
            return alert("length of the discription should be under 230 characters")
        }

        console.log(foodData)
        if(foodData.resto_id){
            let data = await fetch("http://localhost:3000/api/restaurant/foods",{method:"POST", body:JSON.stringify(foodData)})
            let response = await data.json()
            if(response.success){
                alert(response.message)
                reset()
            }
            else{
                alert("failed")
            }
        }


    }



  return (
    <form onSubmit={handelSubmit} className="flex flex-col w-110 p-10 border-4 border-zinc-400 rounded-4xl">
        <h1 className="text-2xl font-medium">Create New Item</h1>
        <input required autoComplete="off" className="border-2 rounded-sm mt-15 pl-2 h-10 border-gray-300 focus:scale-110 hover:scale-110 hover:border-blue-600 transition-all duration-300 ease-in-out" value={foodData.img_path}   onChange={handelForm}  name="img_path"  placeholder="Food image"></input>
        <input required autoComplete="off" className="border-2 rounded-sm mt-3 pl-2 h-10 border-gray-300 focus:scale-110 hover:scale-110 hover:border-blue-600 transition-all duration-300 ease-in-out " value={foodData.name}       onChange={handelForm} name="name" placeholder="name"></input>
        <input required autoComplete="off" className="border-2 rounded-sm mt-3 pl-2 h-10 border-gray-300 focus:scale-110 hover:scale-110 hover:border-blue-600 transition-all duration-300 ease-in-out"  type="number"  value={foodData.price}  onChange={handelForm} name="price" placeholder="price" ></input>
        <input required autoComplete="off" className="border-2 rounded-sm mt-3 pl-2 h-10 border-gray-300 focus:scale-110 hover:scale-110 hover:border-blue-600 transition-all duration-300 ease-in-out" value={foodData.description}onChange={handelForm} name="description" placeholder="description"></input>
        <input className="rounded-sm mt-5 p-2  w-1/2 mx-auto bg-blue-500 border-gray-300 focus:scale-110 hover:scale-110 hover:border-blue-600 transition-all duration-300 ease-in-out" type="submit"></input>
    </form>
)}

export default UploadFood;
