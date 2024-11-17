import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export  async function user(req, res) {
    console.log("the complier is here before the post request");
    if(req.method === 'POST'){
        console.log("the complier is here after the post request");
        try{
            alert(req.body);
            const response = await prisma.user.create({
                data: {
                    user_id: req.body.uid,
                    email: req.body.email,
                    name: req.body.displayName,
                }
            });
        console.log(response);
            if(response){
                return res.status(200).json({message: 'User created'});
            }
            return res.status(404).json({message: 'User not created'});

        }catch (error) {
            console.log('Error during sign-in process:', error);
            return res.status(500).json({message: 'Error during sign-in process'});
        }
    }
    else{
    try{
    const userID=req.query.user.uid;
    const response = await prisma.user.findUnique({
        where: {
        user_id: userID,
        }
    });
    if(response){
        return res.status(200).json({message: 'User exists'});
    }
     console.log('User did not get added');
     return res.status(404).json({message: 'User does not exist'});
} catch (error) {
    console.log('Error during sign-in process:', error);
    return res.status(500).json({message: 'Error during sign-in process'});
}}
}



export async function Months(req,res) {
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



export async function addTransaction(req,res) {
    const {name, amount, date, month_name, year} = transaction;
    const newTransaction = await prisma.transaction.create({
        data: {
        name: name,
        amount: amount,
        date: date,
        month_name: month_name,
        year: year,
        }
    });
    if(newTransaction){
        return true;
    }
    return false;
}


export async function getTransactions(req,res) {
    const transactions = await prisma.transaction.findMany({
        where: {
        month_name: month,
        year: year,
        }
    });
    if(!transactions){
        return [];
    }
    return transactions;
}