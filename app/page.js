'use client';
import transactionItems from './data/transaction-items.json';

import NavBar from "./components/navBar"
import CreateMonths from "./components/createMonths"
import CreateTransaction from "./components/createTransaction"
import Transactions from "./components/tranactions"
import { useState } from "react";
import Months from "./components/months"

export default function Page() {
  const [createClicked, setCreateClicked] = useState(false);
  const [newTransactions, setNewTransactions] = useState([]);
  const [transactions, setTransactions] = useState(transactionItems.transactions);
  const [monthsAndYears, setMonths] = useState([]);
  const[MonthClicked, setMonthClicked] = useState(false);
  const [screen,setScreen]=useState(0);
  const screens = [ 
    <Months MonthsAndYears={monthsAndYears} MonthClicked={monthClicked} screenType={setScreen}/>, 
    <Transactions transactionItems={newTransactions}  screenType={setScreen}  />,
    <CreateTransaction createTransaction={createTransaction}   />, 
    <CreateMonths onCreateNewMonth={createNewMonth}  />
    ];

  const MonthsWords={'January': '01', 'February': '02', 'March': '03', 'April': '04', 'May': '05', 'June': '06', 'July': '07', 'August': '08', 'September': '09', 'October': '10', 'November': '11', 'December': '12'};
  function onCreateClicked(){
    setCreateClicked(true);
  }
  
  function createTransaction(transaction){
    const newTransaction = {
      name: transaction.name,
      amount: transaction.amount,
      date: transaction.date,
      month: transaction.month,
      year: transaction.year
    };
  
    setTransactions([...transactions, newTransaction]);
    setNewTransactions([...newTransactions, newTransaction]);
    setScreen(1);
    
  }

  function createNewMonth(month, year){
    const monthExists = monthsAndYears.find(monthAndYear => {
      return monthAndYear.month === month && monthAndYear.year === year;
    });
    if(monthExists){
      alert('Month already exists');
      return;
    }
    const newMonth = {
      month: month,
      year: year,
    };
    setMonths([...monthsAndYears, newMonth]);
    setCreateClicked(false);
    setScreen(0);
  }

  function monthClicked(month, year) {
  //  alert(year);
   
    
   
    setNewTransactions(transactions.filter(transaction => {
        // Convert year to string if it's a number in transactions
        return transaction.year.toString() === year.toString() && transaction.month===MonthsWords[month]; ;
    }));
    setScreen(1);
   
  }
  return (
  <div className="bg-white h-screen w-screen overflow-scroll overflow-x-scroll">
      <NavBar onCreateClicked={onCreateClicked} MonthClicked={setMonthClicked} MonthsAndYears={monthsAndYears} screenType={setScreen} />
       {screens[screen] }
  </div>
  )
}