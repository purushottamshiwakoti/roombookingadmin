import prismadb from "@/libs/prismadb";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest){

    try {
        const { email, password}=await req.json();
        const user=await prismadb.user.findUnique({
            where:{
                email
            }
        });

        if(!user){
        return NextResponse.json({message:"Invalid credentials",user},{status:400});

        }

        if(password!==user.password){
        return NextResponse.json({message:"Invalid credentials",user},{status:400});
        }

        return NextResponse.json({message:"Successfully loggedin",user},{status:200});
        
    } catch (error) {
        return NextResponse.json({message:error},{status:500})
    }

}