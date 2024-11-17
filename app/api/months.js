import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();


export default async function handler(req,res) {
    try{
    if(req.method === 'POST'){
        const response = await prisma.month.create({
            data: {
            month_name: req.body.month.month,
            year: req.body.month.month,
            user_id: req.body.user.uid,
            }
        });
        if(response){
            return res.status(200).json({message: 'Month created'});
        }
        return res.status(404).json({message: 'Month not created'});
    }
    else if(req.method === 'GET'){
        const userID=req.query.user.uid;
        const months = await prisma.month.findMany({
            where: {
            user_id: userID,
            }
        });
        if(!months){
            return [];
        }
        return months;
    }
    }catch (error) {
    console.log('Error during when creating or finding month(s):', error);
    return res.status(500).json({message: 'Error when creating or finding month(s)'});
    }
}