import { connectionStr } from "@/app/db/db";
import { foodSchema } from "@/app/db/restaurantModel";
import mongoose from "mongoose";
import { connection, NextResponse } from "next/server"

export async function GET(request ,content){
    const foodid = content.params.id;  
    console.log("i get the resquest")
    try{
        await mongoose.connect(connectionStr)
        let foodData = await foodSchema.findOne({_id:foodid})
        return NextResponse.json({success : true , data :foodData},{status:200})
    }
    catch(error){
        console.error(error)
        return NextResponse.json({success:false , message:error.message},{status:500})

    }


}



export async function PUT(request , content) {
    const id = content.params.id;
    console.log(request)
    const payload = await request.json()
    let success = false
    await mongoose.connect(connectionStr)
    let response = await foodSchema.findByIdAndUpdate({_id:id},payload)
    try{
        return NextResponse.json({success:true , message:"updated"},{status:200})
    }
    catch(error){
        console.log(error)
        return NextResponse.json({success:false , message:error.message},{status:500})
    }
    
}