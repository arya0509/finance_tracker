'use client';
import { useState } from "react";
import MonthCard from "./monthCard";
export default function Months({MonthsAndYears,getTransFromID}) {
    if(!MonthsAndYears){
        return null;
    }
    const monthsAndYears = MonthsAndYears;
    
    //get a object that with year as key and array of months as its values
    const groupedMonths=(monthsAndYears).reduce((acc,monthAndYear)=>{
        
        const year=monthAndYear.month_year;
        if(!acc[year]){
            acc[year]=[];
        }
        acc[year].push(monthAndYear);
        return acc;
    },{});
    const sortedGroupedYears=Object.keys(groupedMonths).sort((a,b)=>
        b-a
    );
    

    return(
        <div className='text-black flex justify-center items-center flex-col mt-5'>
            
           {sortedGroupedYears.map((year,index)=>{
                return(
                     <div key={index}>
                        <MonthCard groupedMonths={groupedMonths} year={year} getTransFromID={getTransFromID}/>
                     </div>
                );
           })}
        </div>
    );
}