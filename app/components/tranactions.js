'use client';
import { useState } from "react";
export default function Transactions({transactionItems,screenType}) {
    const transactions = transactionItems.sort((a, b) => {
        return new Date(b.date) - new Date(a.date);
    });
    const totalPrice = transactions.reduce((acc, transaction) => {
        return acc + parseFloat(transaction.amount);
    }, 0);

    function createTransaction(){
        screenType(2);
    }

    return(
        <div className='text-black flex justify-center items-center flex-col'>
            <h1 className='text-2xl font-bold'>Total: $ {totalPrice}</h1>
            <h1 className='text-2xl font-bold'>Transaction per head:${ (totalPrice/3).toFixed(2)}</h1>
            <div className="">
                <button onClick={()=>createTransaction()}>create a new transaction</button>
            </div>
            {transactions.map((transaction, index) => {
                return(
                    <div key={index} className='my-5 bg-gray-300 h-24 w-56 rounded flex justify-center items-center flex-col'>
                        <h1 className='text-2xl font-bold'>{transaction.name}</h1>
                        <p>$ {transaction.amount}</p>
                        <p>{transaction.date}</p>
                    </div>
                )
            })}
        </div>
    );
}