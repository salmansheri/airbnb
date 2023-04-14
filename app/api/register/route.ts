import { NextResponse } from "next/server";

import bcrypt from "bcrypt";
import prisma from "@/libs/prismaDB";

export async function GET(request: Request) {
    try {
        const users = await prisma.user.findMany(); 
        return NextResponse.json(users)


    } catch(err) {
        return NextResponse.json(err)
        console.log(err); 


    }
    


}



export async function POST(request: Request) {
    try {
        const body = await request.json();

        const { email, name, password } = body;
      
      const hashedPassword = password; 
      
        const user = await prisma.user.create({
          data: {
            email,
            name,
            hashedPassword,
          },
        });
      
        return NextResponse.json(user);

    }catch(error) {
        console.log(error)
        return new Response(JSON.stringify(error), {
            status: 500,
        })
        

    }
 
}



