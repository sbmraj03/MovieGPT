import { checkValidData } from "../utils/validate";
import Header from "./Header";
import { useState, useRef } from "react";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../utils/firebase"
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { BG_URL } from "../utils/constants";

const Login = () => {
  const [isSignInForm, setIsSignInForm]= useState(true)
  const [errorMessage, setErrorMessage]= useState(null)
  const navigate = useNavigate();
  const dispatch = useDispatch(); 

  const name= useRef(null)
  const email= useRef(null)
  const password= useRef(null)


  const handleButtonClick = () => {
    const message = checkValidData(email.current.value, password.current.value)
    setErrorMessage(message)

    if (message) {
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000); // 5 
      
      return;
    }

    console.log(isSignInForm)
    if(!isSignInForm){
      console.log("HI i am in signup form")
      createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
      .then((userCredential) => {
        // Signed up 
        const user = userCredential.user;
        updateProfile(user, {
          displayName: name.current.value,
        })
         .then(() => {
           const { uid, email, displayName} = auth.currentUser;
           dispatch(addUser({uid: uid, email: email, displayName: displayName}));
           navigate("/browse")
         })
         .catch((error) => {
           setErrorMessage(error.message)
         })
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        setErrorMessage(errorCode + " --==- " + errorMessage);
        
      });
    }
    else{
      console.log("HI i am in signIn form")
      signInWithEmailAndPassword(auth, email.current.value, password.current.value)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        navigate("/browse")
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        setErrorMessage(errorCode + " " + errorMessage);
      });
    }


  }

  const toggleSignInForm= () => {
    setIsSignInForm(!isSignInForm)
  }
  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Header */}
      <Header />

      {/* Background Image */}
      <div className="absolute">
        <img
          className=" w-full h-full object-cover"
          src={BG_URL}
          alt="logo"
        />

      </div>

      {/* Overlay */}
      <div className="absolute inset-0 w-full bg-black opacity-55 z-10 h-full" />


      {/* Sign In Form */}
      <div className="relative z-10 flex items-center justify-center h-full">
        <div className="bg-black opacity-80 px-10 py-8 rounded-md max-w-md w-full text-white mt-20">
          <h1 className="text-3xl font-semibold mb-6">{isSignInForm ? "Sign In" : "Sign Up"}</h1>

          <form className="flex flex-col space-y-4" onSubmit= {(e) => e.preventDefault()}>
            {
              !isSignInForm && 
                <input
                  ref= {name}
                  type="text"
                  placeholder="Full Name"
                  className="bg-[#333] text-white px-4 py-3 rounded focus:outline-none"
                />
            }
            <input
              ref= {email}
              type="email"
              placeholder="Email or mobile number"
              className="bg-[#333] text-white px-4 py-3 rounded focus:outline-none"
            />
            <input
              ref= {password}
              type="password"
              placeholder="Password"
              className="bg-[#333] text-white px-4 py-3 rounded focus:outline-none"
            />

            <p className="text-red-500 font-bold text-lg py-2">{errorMessage}</p>

            <button className="bg-red-600 hover:bg-red-700 cursor-pointer transition font-semibold py-3 rounded opacity-{100}" onClick={handleButtonClick}>
              {isSignInForm ? "Sign In" : "Sign Up"}
            </button>
          </form>

          <div className="flex items-center justify-between mt-4 text-sm text-gray-400">
            <label className="flex items-center gap-2">
              <input type="checkbox" className="accent-white" />
              Remember me
            </label>
            <a href="#" className="hover:underline">
              Forgot password?
            </a>
          </div>

          <div className="text-sm text-gray-400 mt-6">
            {isSignInForm ? "New to Netflix?" : "Already a User"} {" "}
            <a href="#" className="text-white hover:underline" onClick={toggleSignInForm}>
              {isSignInForm ? "Sign Up Now" : "Sign In Now"}
            </a>
          </div>

          <p className="text-xs text-gray-500 mt-6">
            This page is protected by Google reCAPTCHA to ensure you're not a
            bot.{" "}
            <a href="#" className="text-blue-500 hover:underline">
              Learn more.
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
