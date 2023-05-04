import React,{useEffect, useState} from 'react'
import Link from 'next/link'
import { MdAccountCircle } from "react-icons/md";
import {auth} from '../config/firebase'
import {signOut} from 'firebase/auth'
import { useRouter } from 'next/router';
// useRouter
// const router=useRouter();
const logout=async ()=>{
  const res=await signOut(auth);
  localStorage.removeItem('userid')
  // localStorage.removeItem('userid')
  // localStorage.removeItem('user')
  // setTimeout(() => {
          
  //   router.push(`http://localhost:3000/`);
  // }, 1500);
}



export default function Navbar() {
    useEffect(() => {
        const a=localStorage.getItem("userid");
          setUser(a);
          if(a!=null){
            setDropdown(true);
          }else{
            setDropdown(false);
          }
      }, [])
    const [dropdown, setDropdown] = useState(false);
    const [user, setUser] = useState(null);
  return (
    <div className="flex flex-col md:flex-row justify-center md:justify-start shadow-xl py-2 mb-1 sticky top-0 z-10 bg-white">
    <div className="logo mr-auto md:mx-5">
      <Link href="/">Company name</Link>
    </div>
    <div className="nav">
      <ul className="flex mt-2 items-center justify-center gap-2 text-sm mx-2 md:gap-3 font-semibold md:text-md">
        <Link href={"/appointmentForm"}>
          <li className="hover:text-purple-600" >AppointmentForm</li>
        </Link>
        <Link href={"/appointmentList"}>
          <li className="hover:text-purple-600" >AppointmentList</li>
        </Link>
        <Link href={"/meetingScheduler"}>
          <li className="hover:text-purple-600" >MeetingScheduler</li>
        </Link>
        <Link href={"/meetingList"}>
          <li className="hover:text-purple-600" >MeetingList</li>
        </Link>
        <Link href={"/applyleave"}>
          <li className="hover:text-purple-600" >Apply for Leave</li>
        </Link>
        <Link href={"/leaveList"}>
          <li className="hover:text-purple-600" >Leave Application</li>
        </Link>
      </ul>
    </div>

    <div className="cart absolute items-center right-0 top-0 m-2 cursor-pointer flex ">
    {user && <MdAccountCircle onMouseEnter={()=>{setDropdown(true)}} onMouseLeave={()=>{setDropdown(false)}} className="text-3xl mx-2" />
  
    } 
   {/*toggle mouse leave and enter ebents for hover  */}
     {!user && <Link href={'/login'}><button className="bg-purple-500 text-white rounded-md mx-2 p-1 ">Login</button></Link>}
     {!user && <Link href={'/login'}><button className="bg-purple-500 text-white rounded-md mx-2 p-1 ">Login As Admin</button></Link>}

      { user && dropdown && <div  onMouseEnter={()=>{setDropdown(true)}} onMouseLeave={()=>{setDropdown(false)}} className="absolute right-4 rounded-md px-3 w-32 py-2 border-2 bg-white top-7">
        <ul>
         <a><li className="py-1 text-sm hover:text-purple-700 " onClick={logout}>LogOut</li></a>
         {/* <a><li className="py-1 text-sm hover:text-purple-700 ">LogOut</li></a> */}
        </ul>
    </div>}
    </div>
    </div>
  )
}
// vmQmJEmYl6frg8j99vC1UBW3p9G2