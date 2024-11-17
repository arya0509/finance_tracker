import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';
import { buffer } from 'micro';

const prisma = new PrismaClient();
console.log('Hello');


export const config = {
    api: {
        bodyParser: false,  // Disable Next.js automatic body parsing
    },
};
export async function GET(req, res){
    
    try{
        const url = new URL(req.url);  // Get the full URL from the request
        const userID = url.searchParams.get("userID"); 
        console.log(userID);

    const response = await prisma.user.findUnique({
        where: {
        user_id: userID,
        }
    });
    if(response){
        return NextResponse.json({message: 'User exists'},{status:200});
        
    }
     console.log('User did not get added');
     return NextResponse.json({message: 'User does not exist'},{status:404});
} catch (error) {
    // console.log('Error during sign-in process:', error);
    return NextResponse.json({message: 'Error during sign-in process'},{status:500});
}
}

export  async function POST(req, res){
    
    try{
        const body = await req.json(); // Parse the JSON body directly
        
       
    
        const { displayName, email, uid } = body;
        console.log("No error till before create");
        console.log(typeof displayName);
        const response=await prisma.user.create({
            data: {
                user_id:uid,
                user_name: displayName,
                user_email: email,
                
            }
        });
        console.log(response);
        if(!response){
            
        return NextResponse.json({message: 'User not created'},{status:404});
        }
        return NextResponse.json({message: 'User created'},{status:200});
        
    }catch (error) {
        console.log('Error during sign-in process:', error);
        return NextResponse.json({message: 'Error during sign-in process'},{status:500});
    }
}

