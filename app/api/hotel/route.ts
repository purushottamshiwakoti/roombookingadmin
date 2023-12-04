import prismadb from "@/libs/prismadb";
import { NextResponse } from "next/server";

export async function GET(){

   try {
    const hotel=await prismadb.hotel.findMany({
       

     
 });
 return NextResponse.json({message:"Success",hotel},{status:200})
   } catch (error) {
    return NextResponse.json({message:error},{status:500})
    
   }
}