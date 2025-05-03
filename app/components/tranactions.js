'use client';
import { useState } from "react";
export default function Transactions({transactionItems,screenType}) {
    const [hover,setHover]=useState(false);
    const bgColorForEachCategory = {
        'Grocery': '#e6f4ea',        // light green tint
        'Food order': '#fff4e6',     // light orange tint
        'Mandatory': '#f0f0f0',      // neutral light gray
        'Comfort': '#e6f0ff',        // soft blue
        'Subscriptions': '#fce6ff'   // light lavender/pink
    };
    const deleteClicked=(id)=>{
        deleteTransaction(id)
    }
    const deleteTransaction=async(id)=>{
        const res=await fetch("/api/transaction",{
            method:"DELETE",
            headers:{
                "content-type":"application/json"
            },
            body:JSON.stringify(id)
        })
        if(res.ok){
            transactionItems.forEach((item,index)=>{
                if(item.transaction_id===id){
                    transactionItems.splice(index,1);
                }
            })
        }
    }
    let GrocerySum=0;
    let FoodOrderSum=0;
    let MandatorySum=0;
    let ComfortSum=0;
    let SubscriptionSum=0
    transactionItems.forEach(transaction => {
        if(transaction.transaction_category==="Grocery"){
            GrocerySum+=parseFloat(transaction.transaction_amount);
        }
        if(transaction.transaction_category==="Food order"){
            FoodOrderSum+=parseFloat(transaction.transaction_amount);
        }
        if(transaction.transaction_category==="Mandatory"){
            MandatorySum+=parseFloat(transaction.transaction_amount);
        }
        if(transaction.transaction_category==="Comfort"){
            ComfortSum+=parseFloat(transaction.transaction_amount);
        }
        if(transaction.transaction_category==="Subscriptions"){
            SubscriptionSum+=parseFloat(transaction.transaction_amount);

        }
    });
    
    const transactions = transactionItems.sort((a, b) => {
        return new Date(b.transaction_date) - new Date(a.transaction_date);
    });
    console.log(transactions);
    const totalPrice = transactions.reduce((acc, transaction) => {
        if(!transaction){
            return 0;
        }
        return acc + parseFloat(transaction.transaction_amount);
    }, 0);

    function createTransaction(){
        screenType(2);
    }


    return(
        <div className='text-black flex justify-center items-center flex-col mt-3'>
            <h1 className='text-2xl font-bold'>Total: $ {totalPrice.toFixed(2)}</h1>
            <div className="">
                <button className="bg-gray-800 text-white h-8 w-60 rounded-lg mt-3 mb-3 hover:bg-gray-950" onClick={()=>createTransaction()}>Create a new transaction</button>
            </div>
            <div className="color-divs">
                <div className="color-div">
                    <div className="h-4 w-4 " style={{backgroundColor:'#e6f4ea'}}></div>
                    <p>Grocery:</p>
                    <p>{GrocerySum}</p>
                </div>
                <div className="color-div" >
                    <div className="h-4 w-4" style={{backgroundColor:'#fff4e6'}}></div>
                    <p>Food order:</p>
                    <p>{FoodOrderSum}</p>
                </div>
                <div className="color-div" >
                    <div className="h-4 w-4" style={{backgroundColor:'#f0f0f0'}}></div>
                    <p>Mandatory:</p>
                    <p>{MandatorySum}</p>
                </div>
                <div className="color-div" >
                    <div className="h-4 w-4" style={{backgroundColor:'#e6f0ff'}}></div>
                    <p>Comfort:</p>
                    <p>{ComfortSum}</p>
                </div>
                <div className="color-div" >
                    <div className="h-4 w-4" style={{backgroundColor:'#fce6ff'}}></div>
                    <p>Subscriptions:</p>
                    <p>{SubscriptionSum}</p>
                </div>
            </div>
            <div className="transactions-div">
                {transactions.map((transaction, index) => {
                    const date = new Date(transaction.transaction_date);
                    const formattedDate = date.toLocaleDateString('en-GB', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                    timeZone: 'UTC', // Ensure the date is treated in UTC
                    });
                    return(
                        <div onMouseEnter={()=>setHover(index)} onMouseLeave={()=>{setHover("")}} id="transaction-div-child" key={index} className='my-5 bg-gray-300 h-24 w-56 rounded flex justify-center items-center flex-col' style={{backgroundColor:transaction.transaction_category?bgColorForEachCategory[transaction.transaction_category]:""}}>
                            {hover===index?
                                <div onClick={()=>{deleteClicked(transaction.transaction_id)}}  style={{height:"100%", width:"100%",backgroundColor:"white",cursor:"pointer"}}>
                                    <img style={{height:"100%", width:"100%",objectFit:"contain"}} src="/delete-icon-vector.jpg"></img>
                                </div>
                                :
                                <div>
                                     <h1 className='text-2xl font-bold'>{transaction.transaction_name}</h1>
                                      <p>$ {transaction.transaction_amount}</p>
                                      <p>{formattedDate}</p>
                                </div>
                            }
                           
                        </div>
                    )
                })}
            </div>
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