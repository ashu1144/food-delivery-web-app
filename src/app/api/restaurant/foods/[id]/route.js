import { connectionStr } from "@/app/db/db";
import { foodSchema } from "@/app/db/restaurantModel";
import mongoose from "mongoose";
import next from "next";
import { connection, NextResponse } from "next/server"

export async function GET(request ,context){
    const id = context.params.id;  
    const restaurant ={resto_id:id}
    try{
        await mongoose.connect(connectionStr)
        let userdata = await foodSchema.find(restaurant)
        return NextResponse.json({success : true , data : userdata},{status:200})
    }
    catch(error){
        console.error(error)
        return NextResponse.json({success:false , message:error.message},{status:500})

    }


}


export async function DELETE(request,context){
    let restoId =context.params.id
    try{
        await mongoose.connect(connectionStr)
        console.log("i am searching and deleting")
        let response = await foodSchema.findOneAndDelete({_id:restoId})
        return NextResponse.json({success:true},{status:200})    
    }
    catch(error){
        return NextResponse.json({success:false , message:error.message},{status:500})
    }
}




