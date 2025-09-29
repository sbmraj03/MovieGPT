import { checkValidData } from "../utils/validate";
import Header from "./Header";
import { useState, useRef } from "react";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../utils/firebase"
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { BG_URL } from "../utils/constants";
import Shimmer from "./Shimmer";

const Login = () => {
  const [isSignInForm, setIsSignInForm]= useState(true); // toggle between sign in / sign up
  const [errorMessage, setErrorMessage]= useState(null); // store validation / firebase errors
  const [isLoading, setIsLoading] = useState(false); // loading state for async actions
  const navigate = useNavigate();
  const dispatch = useDispatch(); 

  const name= useRef(null);
  const email= useRef(null);
  const password= useRef(null);

  // Handle Sign In / Sign Up button click
  const handleButtonClick = () => {
    const message = checkValidData(email.current.value, password.current.value);
    setErrorMessage(message);

    if (message) {
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
      return;
    }

    setIsLoading(true);

    if(!isSignInForm){
      // Sign Up flow
      createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
      .then((userCredential) => {
        const user = userCredential.user;
        updateProfile(user, {
          displayName: name.current.value,
        })
         .then(() => {
           const { uid, email, displayName} = auth.currentUser;
           dispatch(addUser({uid: uid, email: email, displayName: displayName}));
           navigate("/browse");
         })
         .catch((error) => {
           setErrorMessage(error.message);
         })
         .finally(() => {
           setIsLoading(false);
         });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setErrorMessage(errorCode + " --==- " + errorMessage);
      });
    }
    else{
      // Sign In flow
      signInWithEmailAndPassword(auth, email.current.value, password.current.value)
      .then((userCredential) => {
        const user = userCredential.user;
        navigate("/browse");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setErrorMessage(errorCode + " " + errorMessage);
      });
    }
  };

  // Toggle between Sign In / Sign Up form
  const toggleSignInForm= () => {
    setIsSignInForm(!isSignInForm);
  };

  // Guest login handler
  const handleGuestLogin = () => {
    const guestEmail = "guest_user@gmail.com";
    const guestPassword = "Guest@1234";
    
    signInWithEmailAndPassword(auth, guestEmail, guestPassword)
      .then((userCredential) => {
        const user = userCredential.user;
        navigate("/browse");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setErrorMessage(`Guest login failed: ${errorCode} - ${errorMessage}`);
      });
  };

  return (
    <div className="relative w-full min-h-screen overflow-hidden">
      {/* Fixed Header */}
      <div className="fixed top-0 left-0 right-0 z-50">
        <Header />
      </div>

      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          className="w-full h-full object-cover"
          src={BG_URL}
          alt="Netflix background"
        />
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Sign In / Sign Up Form */}
      <div className="relative z-10 flex items-center justify-center min-h-screen px-4 pt-20 pb-8">
        <div className="bg-black/80 backdrop-blur-sm px-6 sm:px-8 md:px-12 py-8 sm:py-10 md:py-12 rounded-lg w-full max-w-md text-white">
          <h1 className="text-2xl sm:text-3xl font-semibold mb-6 sm:mb-8">
            {isSignInForm ? "Sign In" : "Sign Up"}
          </h1>

          <form className="flex flex-col space-y-4 sm:space-y-5" onSubmit={(e) => e.preventDefault()}>
            {!isSignInForm && 
              <input
                ref={name}
                type="text"
                placeholder="Full Name"
                className="bg-gray-700/80 text-white px-4 py-3 sm:py-4 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 transition-all"
              />
            }
            <input
              ref={email}
              type="email"
              placeholder="Email or mobile number"
              className="bg-gray-700/80 text-white px-4 py-3 sm:py-4 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 transition-all"
            />
            <input
              ref={password}
              type="password"
              placeholder="Password"
              className="bg-gray-700/80 text-white px-4 py-3 sm:py-4 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 transition-all"
            />

            {/* Error message */}
            {errorMessage && (
              <p className="text-red-500 font-medium text-sm sm:text-base py-2">
                {errorMessage}
              </p>
            )}

            {/* Submit Button */}
            <button 
              className="bg-red-600 hover:bg-red-700 active:bg-red-800 font-semibold py-3 sm:py-4 rounded-md transition-colors duration-200"
              onClick={handleButtonClick}
            >
              {isSignInForm ? "Sign In" : "Sign Up"}
            </button>
          </form>

          {/* Remember Me */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mt-6 gap-4 sm:gap-2 text-sm text-gray-400">
            <label className="flex items-center gap-2 cursor-pointer hover:text-white transition-colors">
              <input type="checkbox" className="accent-red-600" />
              Remember me
            </label>
          </div>

          {/* Toggle Form Link */}
          <div className="text-sm text-gray-400 mt-6 sm:mt-8">
            {isSignInForm ? "New to Netflix?" : "Already a User?"}{" "}
            <button 
              className="text-white hover:underline ml-1 transition-colors"
              onClick={toggleSignInForm}
            >
              {isSignInForm ? "Sign Up Now" : "Sign In Now"}
            </button>
          </div>

          {/* Guest User Section */}
          <div className="mt-6 pt-6 border-t border-gray-700">
            <div className="text-center">
              <p className="text-gray-400 text-sm mb-3">
                Don't have an account and feeling lazy to sign up?
              </p>
              <button 
                className="w-full bg-gray-600 hover:bg-gray-700 active:bg-gray-800 font-semibold py-3 sm:py-4 rounded-md transition-colors duration-200 text-white"
                onClick={handleGuestLogin}
              >
                Sign in as Guest User
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
