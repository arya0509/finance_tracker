'use client';
import { useState,useEffect } from "react";
export default function CreateTransaction({createTransaction}) {
    const [name , setName] = useState('');
    const [amount , setAmount] = useState('');
    const [date , setDate] = useState('');
    const[category,setCategory]=useState('Grocery');
    const options=['Grocery','Food order','Mandatory','Comfort','Subscriptions'];
   
    function onsubmit(e){
        e.preventDefault();
        const transaction = {
            name: name,
            amount: amount,
            date: date,
            month: date.split('-')[1],
            year: date.split('-')[0],
            category:category
        };
        createTransaction(transaction);
        setName('');
        setAmount('');
        setDate('');
        setCategory('');
        
    }
    return(
        <div className='text-white flex justify-center items-center h-full mt-5 '>
            <form className="flex flex-col border-2 border-black rounded h-96 w-96  items-center bg-gray-800 ">
                <div className="mt-5 h-1/5 w-full flex justify-around">
                    <label className='text-2xl'>Name:</label>
                    <input className='border-2 border-gray-300 rounded w-56 h-10 text-black' type='text' name='name' value={name} onChange={(e)=>setName(e.target.value)} />
                </div>

                <div className="mt-5 h-1/5 w-full flex justify-around">
                    <label className='text-2xl'>Category:</label>
                    <select defaultChecked onChange={(e)=>{setCategory(e.target.value)}} className="border-2 border-gray-300 rounded w-56 h-10 text-black">
                        {options.map((op,index)=>{
                            return(
                                <option key={index} value={op}>{op}</option>
                            )
                        })}
                    </select>
                </div>
                <div className="h-1/5  w-full flex justify-around">
                    <label className='text-2xl'>Amount:</label>
                    <input className='border-2 border-gray-300 rounded w-56 h-10 text-black' type='text' name='amount' value={amount} onChange={(e)=>setAmount(e.target.value)} />
                </div>
                
                <div  className="h-1/5  w-full flex justify-around">
                    <label className='text-2xl'>Date:</label>
                    <input className='border-2 border-gray-300 rounded w-56 h-10 text-black' type='date' name='date' value={date}  onChange={(e)=>setDate(e.target.value)} />
                </div>
                
                <button type="submit" className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full' onClick={(e)=>onsubmit(e)}>Submit</button>
            </form>
        </div>
    );
}