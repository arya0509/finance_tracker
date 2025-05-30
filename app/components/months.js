'use client';
import { useState } from "react";
export default function Months({MonthsAndYears,MonthClicked}) {
    if(!MonthsAndYears){
        return null;
    }
    const monthsAndYears = MonthsAndYears;
    
    
    const grupedMonths=(monthsAndYears).reduce((acc,monthAndYear)=>{
        const month=monthAndYear.month_name;
        const year=monthAndYear.month_year;
        if(!acc[year]){
            acc[year]=[];
        }
        acc[year].push(month);
        return acc;
    },{});
    const sortedgroupedYears=Object.keys(grupedMonths).sort((a,b)=>
        b-a
    );
    function clicked(month,year){
        const newMonth=monthsAndYears.find((monthAndYear)=>{
            return monthAndYear.month_name===month && monthAndYear.month_year===year;
        });
        MonthClicked(newMonth,year);
    }
    return(
        <div className='text-black flex justify-center items-center flex-col mt-5'>
           {sortedgroupedYears.map((year,index)=>{
                return(
                     <div key={index}>
                          <h1 className='text-2xl font-bold'>{year}</h1>
                          <div className='flex flex-row'>
                            {grupedMonths[year].map((month,index)=>{
                                 return(

                                      <div key={index} className='my-5 bg-gray-300 h-24 w-56 rounded flex justify-center items-center flex-col mx-3 hover:bg-slate-200' >
                                        <button type="button" className="h-full w-full" onClick={()=>clicked(month,year)}>
                                            <h1 className='text-2xl font-bold'>{month}</h1>
                                        </button>
                                      </div>
                                 )
                            })}
                          </div>
                     </div>
                );
           })}
        </div>
    );
}