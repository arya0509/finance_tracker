import { PieChart, Pie, Tooltip, Cell } from 'recharts';
import {addTransaction,getTransactions} from '../_utils/transaction'
import { useState,useEffect } from 'react';
export default function Analytics({monthsAndYears,screenType}){
    const [currObj,setCurrObj]=useState();
    const [currTransaction,setCurrTransaction]=useState(null);
    const [isEmpty,setIsEmpty]=useState(true);
    const [pieData,setPieData]=useState();
    const [currMonth,setCurrMonth]=useState();
    const [currYear,setCurrYear]=useState();
    const [activeIndex, setActiveIndex] = useState(-1);
    const onPieEnter = (_, index) => {
        setActiveIndex(index);
    };
    useEffect(()=>{
        console.log("Im inside the useEffect")
        console.log(currTransaction)
        if(currTransaction){
            getSum();
        }
    },[currTransaction])
    const months = {
        "January": 1,
        "February": 2,
        "March": 3,
        "April": 4,
        "May": 5,
        "June": 6,
        "July": 7,
        "August": 8,
        "September": 9,
        "October": 10,
        "November": 11,
        "December": 12
    };
    const bgColorForEachCategory = {
        'Grocery': '#a8d5b8',        // medium green
        'Food order': '#ffc085',     // medium orange
        'Mandatory': '#c97b63',      // medium gray
        'Comfort': '#a3bffa',        // medium blue
        'Subscriptions': '#e6a8eb'   // medium lavender/pink
    };
    function handleClick(){
        screenType(3);
     }
     function handleViewClick(){
         screenType(0);
     }
    useEffect(()=>{
        addMonth();
    },[])
    function addMonth() {
        const today = new Date();
    const month=today.getMonth() +1;
    const year =today.getFullYear();
    monthsAndYears.forEach(obj => {
        
        if(obj.month_year === (year).toString() && (months[obj.month_name].toString())===(month).toString()){
            setCurrObj(obj);
            getTrans(obj,year);
            
            setCurrMonth(obj.month_name);
            setCurrYear(obj.month_year);
        }
    });
    
    }

    
    async function getTrans(month,year) {
      const dbTransactions= await getTransactions(month,year);
      if(dbTransactions.length!==0){
        console.log(dbTransactions);
        setCurrTransaction(dbTransactions);
        
      }


    }
    let GrocerySum=0;
    let FoodOrderSum=0;
    let MandatorySum=0;
    let ComfortSum=0;
    let SubscriptionSum=0
    function getSum() {
        currTransaction.forEach(transaction => {
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
        
        const FinalData=[
            {'name':"Grocery","sum":GrocerySum},
            {'name':"Food order","sum":FoodOrderSum},
            {'name':"Mandatory","sum":MandatorySum},
            {'name':"Comfort","sum":ComfortSum},
            {'name':"Subscriptions","sum":SubscriptionSum},
        ]
        setPieData(FinalData);
        setIsEmpty(false);

    }
    let EmptyData=[{'name':"No Data","sum":100}]
    return(
        <div>
            {(isEmpty && !pieData )?
            <div className='flex flex-row'>
            <div className='pie-div'>
                 <h1 className='text-black text-4xl'></h1>

                <PieChart width={500} height={500}>
                <Pie
                    activeIndex={activeIndex}
                    data={EmptyData}
                    dataKey="sum"
                    outerRadius={250}
                    fill="green"
                    onMouseEnter={onPieEnter}   
                    style={{ cursor: 'pointer', outline: 'none' }} // Ensure no outline on focus
                >
                    {EmptyData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={"#bfbfbf"} />
                    ))}
                </Pie>
                <Tooltip />
            </PieChart>
                
            </div>
            <div className='buttons-div'>
            <p className='text-black font-bold text-3xl mb-'>Track your expenses, stay on budget, and take control of your financial future. Get insights into your spending habits and make smarter decisions every day.</p>   
            <a id='a-buttons'  onClick={()=>handleClick()}>Create more months</a>
            <a id='a-buttons'   onClick={()=>handleViewClick()}>View the created months</a>

        </div>
        </div>
            :
             <div className='flex flex-row'>
                {console.log( !currTransaction)}
            <div className='pie-div'>
                 <h1 className='text-black text-2xl font-bold'>{currMonth} {currYear}</h1>

                <PieChart width={500} height={500}>
                <Pie
                    activeIndex={activeIndex}
                    data={pieData}
                    dataKey="sum"
                    outerRadius={250}
                    fill="green"
                    onMouseEnter={onPieEnter}   
                    style={{ cursor: 'pointer', outline: 'none' }} // Ensure no outline on focus
                >
                    {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={bgColorForEachCategory[entry["name"]]} />
                    ))}
                </Pie>
                <Tooltip />
            </PieChart>
                
            </div>
            <div className='buttons-div'>
            <p className='text-black font-bold text-3xl mb-'>Track your expenses, stay on budget, and take control of your financial future. Get insights into your spending habits and make smarter decisions every day.</p>   
            <a id='a-buttons'  onClick={()=>handleClick()}>Create more months</a>
            <a id='a-buttons'   onClick={()=>handleViewClick()}>View the created months</a>

        </div>
        </div>
            }

            
        </div>
    )
    
}