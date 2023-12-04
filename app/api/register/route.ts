import prismadb from "@/libs/prismadb";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest){

    try {
        const {fullName, email, password}=await req.json();
        const user=await prismadb.user.create({
            data:{
                fullName,
                email,
                password
            }
        });

        return NextResponse.json({message:"Successfully registered",user},{status:200});
        
    } catch (error) {
        return NextResponse.json({message:error},{status:500})
    }

}