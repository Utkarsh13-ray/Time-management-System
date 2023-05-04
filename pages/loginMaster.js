
import {React, useState,useEffect}from 'react'
import Link from 'next/link'

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from 'next/router';
import {auth} from '../config/firebase'
import {signInWithEmailAndPassword} from 'firebase/auth'
export default function Login() {
  const router=useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // useEffect(() => {
  
  // if(localStorage.getItem('token')){
  //   router.push('/')
  // }
    
  // }, [])
  
  const handleChange=(e)=>{
   if(e.target.name==='email'){
      setEmail(e.target.value);
    }else if(e.target.name==='password'){
      setPassword(e.target.value);
    }
   }
    const handleSubmit=async (e)=>{
       e.preventDefault();
         //  console.log(response);
     if(email !=="utkarshdwivedi@gmail.com" || password !=="1234679"){
        toast.error(res.error, {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            })
          
     }else{    
    const res= await signInWithEmailAndPassword(auth,email,password);
    const user = res.user;
  
  
      //  console.log(response);
       setEmail('')
       setPassword('')
       if(res.user){
        // localStorage.setItem('token',response.token)
        localStorage.setItem('userid',user.uid);
        console.log(user.uid);
       toast.success('Logged in Successfully', {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        
        });
        setTimeout(() => {
          
          router.push(`http://localhost:3000/appointmentList`);
        }, 1500);
    
      }else{
        toast.error(res.error, {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          
          })
        }
    }
    }
  return (
    <div>
             <ToastContainer
          position="bottom-center"
          autoClose={1000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <div className="w-full max-w-md space-y-8">
      <div>
        {/* <img className="mx-auto h-12 w-auto" src="/logo.png" alt="Your Company"/> */}
        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">Sign in to your account</h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Or
          <Link href={'/signup'} className="font-medium text-purple-600 hover:text-purple-500 mx-2">Signup</Link>
        </p>
      </div>
      <form onSubmit={handleSubmit} className="mt-8 space-y-6"  method="POST">
        <input type="hidden" name="remember" value="true"/>
        <div className="-space-y-px rounded-md shadow-sm">
          <div>
            <label htmlFor="email" className="sr-only">Email address</label>
            <input onChange={handleChange} value={email} id="email" name="email" type="email" autocomplete="email" required className="relative block w-full rounded-t-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-purple-600 sm:text-sm sm:leading-6 px-2" placeholder="Email address"/>
          </div>
          <div>
            <label htmlFor="password" className="sr-only">Password</label>
            <input onChange={handleChange} value={password} id="password" name="password" type="password" autocomplete="current-password" required className="relative block w-full rounded-b-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-purple-600 sm:text-sm sm:leading-6 px-2" placeholder="Password"/>
          </div>
        </div>
  
        <div>
          <button type="submit" className="group relative flex w-full justify-center rounded-md bg-purple-600 py-2 px-3 text-sm font-semibold text-white hover:bg-purple-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
              <svg className="h-5 w-5 text-purple-500 group-hover:text-purple-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fill-rule="evenodd" d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z" clip-rule="evenodd" />
              </svg>
            </span>
            Sign in
          </button>
        </div>
      </form>
    </div>
  </div></div>
  )
}
