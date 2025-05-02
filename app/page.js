'use client';
import transactionItems from './data/transaction-items.json';
import { useUserAuth } from './_utils/auth-context';
import NavBar from "./components/navBar"
import CreateMonths from "./components/createMonths"
import CreateTransaction from "./components/createTransaction"
import Transactions from "./components/tranactions"
import { useState } from "react";
import Months from "./components/months"
import Login from './components/login';
import {addTransaction,getTransactions} from './_utils/transaction';
import {addMonth, getMonths} from './_utils/months';
import userAPI from './_utils/user';
import { useEffect } from 'react';

export default function Page() {
  const [createClicked, setCreateClicked] = useState(false);
  const [newTransactions, setNewTransactions] = useState();
  const [transactions, setTransactions] = useState(transactionItems.transactions);
  const [monthsAndYears, setMonths] = useState();
  const[MonthClicked, setMonthClicked] = useState(false);
  const [screen,setScreen]=useState(0);
  const[currMonth, setCurrMonth]=useState('');
  const[currYear, setCurrYear]=useState('');

  const { user } = useUserAuth();
  useEffect(() => {
    if (user) {
      // Only run fetchData if user is defined
      const fetch = async () => {
      await validateUser();
      await fetchData();
      }
      fetch();
    }
  }, [user]);

  const validateUser = async () => {
    try {
      const response = await userAPI(user);
      if(!response){
        console.log('User not validated');
      }
      
    } catch (error) {
      console.log('Error during sign-in process:', error);
    }
  };
  const fetchData = async () => {
    try {
      const dbMonths = await getMonths(user);
      setMonths(dbMonths);
    } catch (error) {
      console.log('Error fetching data:', error);
    }
  };
  // const { user, googleSignIn, firebaseSignOut } = useUserAuth();



  const screens = [ 
    <Months key={months} MonthsAndYears={monthsAndYears} MonthClicked={monthClicked} screenType={setScreen}/>, 
    <Transactions key={transaction} transactionItems={newTransactions}  screenType={setScreen}  />,
    <CreateTransaction key={crTransaction} createTransaction={createTransaction}   />, 
    <CreateMonths key={CrMonths} onCreateNewMonth={createNewMonth}  />
    ];

  const MonthsWords={'January': '01', 'February': '02', 'March': '03', 'April': '04', 'May': '05', 'June': '06', 'July': '07', 'August': '08', 'September': '09', 'October': '10', 'November': '11', 'December': '12'};
  function onCreateClicked(){
    setCreateClicked(true);
  }
  
  async function createTransaction(transaction){
    const newTransaction = {                                                                                
      // +--------------------+---------------+------+-----+---------+----------------+
      // | Field              | Type          | Null | Key | Default | Extra          |
      // +--------------------+---------------+------+-----+---------+----------------+
      // | transaction_id     | int           | NO   | PRI | NULL    | auto_increment |
      // | month_id           | int           | YES  | MUL | NULL    |                |
      // | transaction_name   | varchar(255)  | YES  |     | NULL    |                |
      // | transaction_amount | decimal(10,2) | YES  |     | NULL    |                |
      // | transaction_date   | date          | YES  |     | NULL    |                |
      // +--------------------+---------------+------+-----+---------+----------------+
      transaction_name: transaction.name,
      transaction_amount: transaction.amount,
      transaction_date: transaction.date,
      month: transaction.month,
      year: transaction.year
    };

    const res = await addTransaction(newTransaction,currMonth,currYear);
    setTransactions([...transactions, res]);
    setNewTransactions([...newTransactions, res]);
    setScreen(1);
    
  }

  async function createNewMonth(month, year){
    const monthExists = monthsAndYears.find(monthAndYear => {
      return monthAndYear.month === month && monthAndYear.year === year;
    });
    if(monthExists){
      alert('Month already exists');
      return;
    }
    const newMonth = {
      month_name: month,
      month_year: year,
    };
    const res = await addMonth(newMonth,user);
    setMonths([...monthsAndYears, res]);
    setCreateClicked(false);
    setScreen(0);
  }

  async function  monthClicked(month, year) {
  //  alert(year);
    setCurrMonth(month);
    setCurrYear(year);
      const dbTransactions= await getTransactions(month,year);

      
      setNewTransactions(dbTransactions.filter(transaction => {
        const date = new Date(transaction.transaction_date);

        // Use UTC methods for consistent comparison
        const yearMatch = date.getUTCFullYear() === Number(year);
        const monthMatch = date.getUTCMonth() + 1 === Number(MonthsWords[month.month_name]);

        return yearMatch && monthMatch;
      }));
    setScreen(1);
   
  }
  return (
  <div className="bg-white h-screen w-screen overflow-scroll overflow-x-scroll">
    {user?(
      <div>
       <NavBar onCreateClicked={onCreateClicked} MonthClicked={setMonthClicked} MonthsAndYears={monthsAndYears} screenType={setScreen} />
       {screens[screen]}
      </div>
    ):(
      <div className="flex flex-col justify-center items-center h-screen">
        <Login   />
      </div>
      
    )}
     
  </div>
    
  )
}