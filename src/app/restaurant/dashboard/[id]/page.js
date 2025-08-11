"use client"
import { useEffect, useState } from "react"
import { useParams } from 'next/navigation';

function page() {
   const [loading, setLoading] = useState(false);
    const params = useParams();        
    const id = params.id;
    

    const [foodData, setEditItem] = useState({
            name :"",
            description:"",
            price:"",
            img_path:"",
            price:""
    })

    useEffect(() => { 
        fetchData(id)
    },[])

    async function fetchData(id){
      setLoading(true)
      let response  =  await fetch("http://localhost:3000/api/restaurant/foods/edit/"+id, {method:"GET"})
      response =  await response.json()
      console.log(response)
      if(response.success){
           const {name ,description ,img_path ,price} = response.data
           setEditItem({
             name: name,
             description: description,
             price: price,
             img_path: img_path,
           });
           setLoading(false)
        }
        else{
            setLoading(false)
            alert("internal Problem")
        }

    }
    
    async function Edit(){

    }
      const handelForm=(e)=>{
      const {name , value} = e.target
      setEditItem((prev)=>({
          ...prev , [name]:value}))
    }


    async function handelSUbmit(e){
      e.preventDefault()
      setLoading(true)
      let res = await fetch('http://localhost:3000/api/restaurant/foods/edit/'+id ,{method:"PUT",body:JSON.stringify(foodData)})
      res = await res.json()
      if(res.success){
        setLoading(false)
        alert("Updated successfully")
      }
      else{
        setLoading(false)
        alert("internal problem")
      }

    }

    



  return (
    <div className=" absolute flex-col flex w-full h-full items-center justify-center gap-5 bg-zinc-900 text-white">
      <div className=" capitalize font-medium text-4xl">
        Edit your order 
      </div>

    <form onSubmit={handelSUbmit}  className="flex flex-col w-110 p-10 border-4 border-zinc-400 rounded-4xl">
        <h1 className="text-2xl font-medium">Edit form</h1>
        <input required className="border-2 rounded-sm mt-15 pl-2 h-10 border-gray-300 focus:scale-110 hover:scale-110 hover:border-blue-600 transition-all duration-300 ease-in-out" value={foodData.img_path}   onChange={handelForm}  name="img_path"  placeholder="Food image"></input>
        <input required className="border-2 rounded-sm mt-3 pl-2 h-10 border-gray-300 focus:scale-110 hover:scale-110 hover:border-blue-600 transition-all duration-300 ease-in-out " value={foodData.name}       onChange={handelForm} name="name" placeholder="name"></input>
        <input required className="border-2 rounded-sm mt-3 pl-2 h-10 border-gray-300 focus:scale-110 hover:scale-110 hover:border-blue-600 transition-all duration-300 ease-in-out"  type="number"  value={foodData.price}  onChange={handelForm} name="price" placeholder="price" ></input>
        <input required className="border-2 rounded-sm mt-3 pl-2 h-10 border-gray-300 focus:scale-110 hover:scale-110 hover:border-blue-600 transition-all duration-300 ease-in-out" value={foodData.description}onChange={handelForm} name="description" placeholder="description"></input>
        <input className="rounded-sm mt-5 p-2  w-1/2 mx-auto bg-blue-500 border-gray-300 focus:scale-110 hover:scale-110 hover:border-blue-600 transition-all duration-300 ease-in-out" type="submit"></input>
    </form>

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
  )
}

export default page