'use client';
import { useUserAuth } from './_utils/auth-context';
import NavBar from "./components/navBar"
import CreateMonths from "./components/createMonths"
import CreateTransaction from "./components/createTransaction"
import Transactions from "./components/tranactions"
import Months from "./components/months"
import Login from './components/login';
import Analytics from './components/analytics';
import { useState,useEffect } from 'react';


export default function Page() {
  
  const {user, googleSignIn, firebaseSignOut} =useUserAuth();
  useEffect(()=>{
    if(user){
    getUserFromDB(user)
    getMonths(); 
    }
   
  },[user])
  const [screen,setScreen]=useState(0);
  const [monthsAndYears,setMonthsAndYears]=useState([])
  async function getUserFromDB(user){
    const response = await fetch(`/api/user?userID=${user.uid}`,{
      method:"GET",
      headers:{
        'Content-Type':'application/json',
      }
    })
    if (!response.ok){
      createUser(user)
    }
  }
  async function createUser(user){
    const res = await fetch ("api/user",{
            method:"POST",
            headers: { 'Content-Type': 'application/json' },
            body:JSON.stringify({"displayName":user.displayName,"email":user.email,"uid":user.uid})
        })
  }
  //Get Transaction from monthID
  const [transaction,setTransaction]=useState([]);
  async function getTransFromID(month_id){
    const response= await fetch(`/api/transaction?month=${month_id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    }
    });
    if(response.status===200){
      
      const data= await response.json();
      setTransaction(data);
      
      setScreen(1);
    }
  }

  //Creating transaction
  async function createTransaction(transaction){
    const monthID=await getMonthID(transaction.month,transaction.year);
   
      const res = await fetch ("api/transaction",{
            method:"POST",
            headers: { 'Content-Type': 'application/json' },
            body:JSON.stringify({"transaction":transaction,"monthID":monthID})
        })
      getTransFromID(monthID);
    
    
  
  }
  async function getMonthID(month,year){
    const res= await fetch (`api/monthID?userID=${user.uid}&month=${month}&year=${year}`,{
      method:"GET",
      headers: { 'Content-Type': 'application/json' }
    })
    const data = await res.json();
    
    return data;
  
  }

  //creating month
  async function createNewMonth(month,year) {
    const res = await fetch ("api/months",{
            method:"POST",
            headers: { 'Content-Type': 'application/json' },
            body:JSON.stringify({"month":month,"year":year,"userID":user.uid})
    })

    await getMonths();
    setScreen(0);
  }
  const screens = [ 
    <Months key={"months"} MonthsAndYears={monthsAndYears} getTransFromID={getTransFromID} screenType={setScreen}/>, 
    <Transactions key={"transaction"} transactionItems={transaction}  screenType={setScreen}  />,
    <CreateTransaction key={"crTransaction"} createTransaction={createTransaction}   />, 
    <CreateMonths key={"CrMonths"} createNewMonth={createNewMonth}  />,
    <Analytics key={"CrAnalytics"}  screenType={setScreen} monthsAndYears={monthsAndYears}/>
    ];
  
   
  const getMonths=async()=>{
   const response= await fetch(`/api/months?userID=${user.uid}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    }
    });
    if(response.status===200){
      
      const data= await response.json();
      setMonthsAndYears(data);
    }
  }
  
  
  
  
  return (
  <div className="bg-white h-full w-full flex justify-center items-center overflow-y-auto">
    {user?(
     <div className='h-[100vh] w-full'>
       <NavBar screenType={setScreen} />
       {screens[screen]}
      </div>
    ):(
      <div className="flex flex-col justify-center items-center h-full w-full">
        <Login   />
      </div>
      
    )}
     
  </div>
    
  )
}