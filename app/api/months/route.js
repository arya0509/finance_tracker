import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function POST(req, res){
    try{
        const body = await req.json(); 
        const { month,year,userID } = body;
       
        const response=await prisma.month.create({
            data: {
                month_name: month,
                month_year: year.toString(),
                user_id: userID,
            }
        });
        if(response){
           return NextResponse.json(response);
        }
        return NextResponse.json({message: 'Month not created'});
    } catch (error) {
        console.log('Error during when creating month:', error);
        return NextResponse.json({message: 'Error during when creating month'});
       
    }
}
export async function GET(req, res){
    try{
       
       const url = new URL(req.url);  // Get the full URL from the request
       const userID=url.searchParams.get("userID");
        
        const months = await prisma.month.findMany({
            where: {
            user_id: userID,
            }
        });
       
       
        return NextResponse.json(months);
    } catch (error) {
        console.log('Error during when finding month(s):', error);
        return res.status(500).json({message: 'Error when finding month(s)'});
    }
}
