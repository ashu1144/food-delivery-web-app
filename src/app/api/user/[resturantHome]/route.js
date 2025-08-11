import mongoose from 'mongoose';
import { NextResponse } from 'next/server';
import { foodSchema, restaurantSchema } from '@/app/db/restaurantModel';
import { connectionStr } from '@/app/db/db';
import next from 'next';



export async function GET(request , content){
    const foodName = content.params.resturantHome
    await mongoose.connect(connectionStr)
    try{
   const results = await foodSchema.aggregate([
    { $match: { name: { $regex: new RegExp(foodName, 'i') } } },
    { $group: { _id: "$resto_id" } },
    { $limit: 10 }
    ]);
    console.log(results)
    const uniqueRestaurants = await Promise.all(results.map((r) => restaurantSchema.findById(r._id)));
    return NextResponse.json({success:true , data : uniqueRestaurants}, {status:200})
    }
    catch(error){
        console.error(error)
        NextResponse.json({success:false , message : error.message},{status:500})
    }

}