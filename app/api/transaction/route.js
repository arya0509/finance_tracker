import { PrismaClient } from '@prisma/client';
import { NextResponse } from "next/server";

const months = ['','January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November','December'];

const prisma = new PrismaClient();
export async function POST(req, res) {
    try{
        const data= await req.json();
        const { transaction,month } = data;
        console.log(transaction);
        console.log(month);
        const dateObject = new Date(transaction.transaction_date);
        
         const response=await prisma.transaction.create({
            data: {
                month_id:month.month_id,
                transaction_name:transaction.transaction_name,
                transaction_amount:Number(transaction.transaction_amount),
                transaction_date:dateObject,
            }
        })
        
        if(response){
            return NextResponse.json(response);
        }
        return NextResponse.json({message: 'Transaction not created'});
    }catch(e){
        console.log('Error during when creating transaction:', e);
        return NextResponse.json({message: 'Error during when creating transaction'});
    }
}

export async function GET(req, res) {
    const url = new URL(req.url);
    const month = url.searchParams.get('month');
    const year = url.searchParams.get('year');
    try{
        const transactions = await prisma.transaction.findMany({
            where: {
                month_id: month.month_id,
            }
        });
       
            return NextResponse.json(transactions);
      
    }catch(e){
        console.log('Error during when fetching transactions:', error);
        return NextResponse.json({message: 'Error during when fetching transactions'});
    }
}


// +--------------------+---------------+------+-----+---------+----------------+
// | Field              | Type          | Null | Key | Default | Extra          |
// +--------------------+---------------+------+-----+---------+----------------+
// | transaction_id     | int           | NO   | PRI | NULL    | auto_increment |
// | month_id           | int           | YES  | MUL | NULL    |                |
// | transaction_name   | varchar(255)  | YES  |     | NULL    |                |
// | transaction_amount | decimal(10,2) | YES  |     | NULL    |                |
// | transaction_date   | date          | YES  |     | NULL    |                |
// +--------------------+---------------+------+-----+---------+----------------+


// {
//     transaction_name: 'arya perbhaker',
//     transaction_amount: '99',
//     transaction_date: '2024-11-17',
//     month: '11',
//     year: '2024'
//   }
//   November