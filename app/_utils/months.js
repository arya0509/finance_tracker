// ./api/months.js

export async function addMonth(month, user) {
  const response = await fetch('/api/months', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ month, user }),
  });
  if (response.status === 200) {
    const data = await response.json();
    console.log(data);
    return data;
  }
}

export async function getMonths(user) {
   const response= await fetch(`/api/months?userID=${user.uid}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    }
    
    });
    if(response.status===200){
      
      const data= await response.json();
      console.log("Data"+data);
        return  data;
    }
}
