
export default async function userAPI(user) {
    console.log(`/api/user?userID=${user.uid}`);

    
   const response=await fetch(`/api/user?userID=${encodeURIComponent(user.uid)}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      
    },

    });
    if(response.status===200){
        return true;
    }

    const postResponse = await fetch('/api/user', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json', // Crucial for Next.js to parse the body
        },
        body: JSON.stringify({
            displayName: user.displayName,
            email: user.email,
            uid: user.uid,
        }),
    });
    
    console.log(postResponse);
    if(postResponse.status===200){
            return true;
        }
        return false;
    
}