import prismadb from "@/libs/prismadb";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest){
    try {
        const {userId,hoterId}=await req.json();
        const booking=await prismadb.booking.create({
            data:{
                userId,
                hoterId,
            }
        });
        return NextResponse.json({message:"Successfully made booking",booking},{status:200});
        
    } catch (error) {
    return NextResponse.json({message:error},{status:500})
        
    }
}
export async function GET(){
    try {
        const booking=await prismadb.booking.findMany({
            orderBy:{
                createdAt:"desc"
            },
            include:{
                hotel:true,
                user:true
            }
        });
        return NextResponse.json({message:"Successfully fetched booking",booking},{status:200});

    } catch (error) {
    return NextResponse.json({message:error},{status:500})
        
    }
}