import { NextResponse } from "next/server";
import mongoose, { mongo, Schema } from 'mongoose';
import { connectionStr } from "@/app/db/db";
import { userSchema } from "@/app/db/userModel";
import bcrypt from "bcryptjs";





export async function POST(request){
    let payload = await request.json()
    console.log(payload)
    await mongoose.connect(connectionStr)
    if(payload.login){
        const {email , password } = payload.userData
        try{
            console.log("i am searching")
            let response = await userSchema.findOne({ email:email });
            if(!response){
                return NextResponse.json({success:false , message:"invalid credientials"} ,{status:401})
            }
            const isMatch = await bcrypt.compare(password, response.password);
            console.log(isMatch)
            if(!isMatch){
                return NextResponse.json({success:false , message:"enter correct answer"} ,{status:401})
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
            payload.password= await bcrypt.hash(payload.password, 10);
            console.log("i am uploading")
            let data = await userSchema.create(payload)
            console.log("i am done")
            return NextResponse.json({success:true , values: data})
    }
    catch(error){
        console.error("signup error :" , error)
        return NextResponse.json({success:false , message:error.message} ,{status:500})
    }
    }
}


export async function GET(request) {
        try{
            return NextResponse.json({success:true , message:"invalid credientials"} ,{status:200})
        }
        catch(error){
            console.error(error)
        }
}

