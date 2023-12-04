import prismadb from "@/libs/prismadb";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest,{params}:{params:any}){
    try {
        const id=params.id;
        const bookings=await prismadb.booking.findMany({
            where:{
                userId:id
            },
            orderBy:{
                createdAt:"desc"
            },
            include:{
                user:true,
                hotel:true
            }
        });
        return NextResponse.json({message:"Successfully retrieved bookings",bookings})
        
    } catch (error) {
    return NextResponse.json({message:error},{status:500})
        
    }
}