import { connectionStr } from "@/app/db/db"
import { foodSchema } from "@/app/db/restaurantModel"
import mongoose from "mongoose"
import next from "next"
import { NextRequest, NextResponse } from "next/server"

export async function POST(request) {
  try {
    let payload = await request.json();
    await  mongoose.connect(connectionStr);
    let response = await foodSchema.create(payload);
    return NextResponse.json({
      success: true,
      message: "uploaded successfully",
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false ,message:error.message},
      {  status: 500 }
    );
  }
}

export async function GET() {
  try {
    await mongoose.connect(connectionStr);
    let foods = await foodSchema.find().lean();
    console.log(foods)
    return NextResponse.json({ success: true , values : foods });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false ,message: error.message },
      {status: 500 }
    );
  }
}

