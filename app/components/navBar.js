import { useUserAuth } from "../_utils/auth-context";

export default  function NavBar({onCreateClicked,MonthClicked=()=>{},screenType}) {
    const { user, googleSignIn, firebaseSignOut } = useUserAuth();
    function handleClick(){
       screenType(3);
    }
    function handleViewClick(){
        screenType(0);
    }
    const signOut = async () => {
        await firebaseSignOut();
    }
   
    return(
        <div>
            <nav className="bg-gray-800  h-24 w-full flex flex-row justify-between">
                <div className="w-72 flex justify-around pt-8 pl-5">
                    <a className="hover:underline " onClick={()=>handleClick()}>Create</a>
                    <a className="hover:underline" onClick={()=>handleViewClick()}>View</a>
                </div>
                <div className="flex justify-center items-center">
                <h2 className="text-4xl">The Finance Tracker App</h2>
                </div>
                <div>
                    <h1 className="text-white text-2xl pt-8 pr-8">Welcome {user.email}</h1>
                </div>
                <div className="pt-8 pr-8">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full" onClick={()=>signOut()}>Sign out</button>
                </div>
             </nav>
             
           
        </div>
        
    );
}