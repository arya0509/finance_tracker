import { useUserAuth } from "../_utils/auth-context";
import user  from "../_utils/user";

export default function Login() {
  const {  googleSignIn, firebaseSignOut } = useUserAuth();

  const signIn = async () => {
      await googleSignIn();   
  };

  return (
    <div>
      <div className="flex justify-center items-center h-screen">
        <div className="bg-gray-800 p-10 rounded-lg shadow-2xl">
          <h1 className="text-3xl font-bold text-center text-white">Welcome to the Finance Tracker App</h1>
          <div className="mt-10">
            <button 
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
              onClick={signIn}
            >
              Sign in with Google
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
