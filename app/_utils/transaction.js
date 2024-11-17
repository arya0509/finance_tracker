// ./api/transaction.js
export async function addTransaction(transaction, month) {
   const response = await fetch('/api/transaction', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify({ transaction, month }),
   });
   if(response.status===200){
       const data = await response.json();
       return data;
   }
   
}

export async function getTransactions(month,year) {
   const transactions = await fetch(`/api/transaction?month=${month}&year=${year}`, {
        method: 'GET',
        headers: {
        'Content-Type': 'application/json',
        }
   });
   if(transactions.status===200){
    const data = await transactions.json();
    return data;
   }    
   return[];

}
