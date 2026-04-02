import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();
export async function GET(req, res){
    try{
       
       const url = new URL(req.url);  // Get the full URL from the request
       const userID=url.searchParams.get("userID");
       const month=url.searchParams.get("month");
       const year= url.searchParams.get("year");
        
        const monthObject = await prisma.month.findFirst({
            where: {
            user_id: userID,
            month_name:month,
            month_year:year
            }
        });
        const monthID=monthObject.month_id;
        return NextResponse.json(monthID);
    } catch (error) {
        console.log('Error during when finding month(s):', error);
        return res.status(500).json({message: 'Error when finding month(s)'});
    }
}