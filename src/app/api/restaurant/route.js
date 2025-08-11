import { NextResponse } from "next/server";
import mongoose, { mongo, Schema } from 'mongoose';
import { connectionStr } from "@/app/db/db";
import { jsx } from "react/jsx-runtime";
import { restaurantSchema } from "@/app/db/restaurantModel";
import next from "next";




export async function POST(request) {
    let payload = await request.json()
    // console.log({userdata:payload})
    await mongoose.connect(connectionStr)
    if(payload.login){
        const {email , password } = payload.userData
        try{
            console.log("i am searching")
            let response = await restaurantSchema.findOne({email , password})
            console.log(response)
            if(!response){
                return NextResponse.json({success:false , message:"invalid credientials"} ,{status:401})
            }
            else{
                return NextResponse.json({success:true , values: response})
            }

        }
        catch(error){
            console.error(error)
            return NextResponse.json({success:false, message : error.message } ,{status:500})

        }
    }
    else{
        try{
        // console.log("i am uploading")
        let data = await restaurantSchema.create(payload)
        // console.log("i am done")
        return NextResponse.json({success:true , values: data})
    }
    catch(error){
        console.error("signup error :" , error)
        return NextResponse.json({success:false , message:error.message} ,{status:500})
    }
    }
    
}

