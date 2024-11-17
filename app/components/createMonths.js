'use client';
import { useState } from "react";

export default function CreateMonths({onCreateNewMonth=()=>{}}) {
    const months=['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    var DateObject = new Date();
    const year=DateObject.getFullYear(); 
    const [month, setMonth] = useState('January');
    const [currYear, setYear] = useState(year);
    
    
    const years=getAllYears();

    function getAllYears(){
        const years = [];
        for(var i=year; i>=year-10; i--){
            years.push(i);
        }
        return years;
    }

    function clicked(e){
        e.preventDefault();
        onCreateNewMonth(month, currYear);
    }


    return(
        <div className='text-white flex justify-center items-center h-full mt-5 '>
            <form className="flex flex-col border-2 border-black rounded h-96 w-96  items-center bg-gray-800 ">

                <div className="mt-8 h-1/3 flex w-full justify-around">
                    <label className='text-2xl'>Choose a month</label>
                    <select className="bg-slate-500 w-1/3 h-1/3 rounded" value={month} onChange={(e)=>setMonth(e.target.value)}>
                        {months.map((month, index) => {
                            return(
                                <option key={index} value={month}>{month}</option>
                            )
                        })}
                    </select>
                </div>
                
                <div className="h-1/3 flex w-full justify-around">
                    <label className='text-2xl'>Choose an year</label>
                    <select className="bg-slate-500 w-1/3 h-1/3 rounded" value={year} onChange={(e)=>setYear(e.target.value)}>
                        {years.map((year, index) => {
                            return(
                                <option key={index} value={year}>{year}</option>
                            )
                        })}
                    </select>
                </div>
                <button type="submit"  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full" onClick={(e)=>clicked(e)}>Create</button>
                
            </form>
        </div>
        );
}