'use client';
import { useState } from "react";
export default function Transactions({transactionItems,screenType}) {
    const transactions = transactionItems.sort((a, b) => {
        return new Date(b.transaction_date) - new Date(a.transaction_date);
    });
    const totalPrice = transactions.reduce((acc, transaction) => {
        return acc + parseFloat(transaction.transaction_amount);
    }, 0);

    function createTransaction(){
        screenType(2);
    }


    return(
        <div className='text-black flex justify-center items-center flex-col'>
            <h1 className='text-2xl font-bold'>Total: $ {totalPrice.toFixed(2)}</h1>
            <h1 className='text-2xl font-bold'>Transaction per head:${ (totalPrice/3).toFixed(2)}</h1>
            <div className="">
                <button onClick={()=>createTransaction()}>create a new transaction</button>
            </div>
            {transactions.map((transaction, index) => {
                const date = new Date(transaction.transaction_date);
                const formattedDate = date.toLocaleDateString('en-GB', {
                  day: '2-digit',
                  month: '2-digit',
                  year: 'numeric',
                  timeZone: 'UTC', // Ensure the date is treated in UTC
                });
                return(
                    <div key={index} className='my-5 bg-gray-300 h-24 w-56 rounded flex justify-center items-center flex-col'>
                        <h1 className='text-2xl font-bold'>{transaction.transaction_name}</h1>
                        <p>$ {transaction.transaction_amount}</p>
                        <p>{formattedDate}</p>
                    </div>
                )
            })}
        </div>
    );
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