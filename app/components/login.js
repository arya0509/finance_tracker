import { useUserAuth } from "../_utils/auth-context";
// import user  from "../_utils/user";
import { useEffect } from "react";
export default function Login() {
  const { user, googleSignIn, firebaseSignOut } = useUserAuth();
  
  const signIn = async () => {
      await googleSignIn();   
  };

  return (
   
      <div className="flex justify-center items-center h-screen w-full">
        <div className="w-3/4 h-full bg-gray-800 flex items-center justify-center">
          <img className="h-9/1 w-9/1 "src="/logo.png"></img>
        </div>
        <div className="h-full w-1/4 flex justify-center items-center">
          <div className="flex justify-center items-center flex-col">
            {/* <h1 className="text-5xl text-black  mb-5">Welcome! </h1> */}
            <button 
                className="bg-gray-800 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md h-28 w-48"
                onClick={signIn}
              >
                Sign in with Google
              </button>
          </div>
        </div>
            
         
      </div>
   
  );
}
