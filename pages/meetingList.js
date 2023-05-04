import React, { useEffect, useState } from 'react'
import { collection, getDocs, increment, addDoc, onSnapshot, query, where } from "firebase/firestore"
import { db } from "../config/firebase"

export default function meetingList() {
    const [meeting, setMeeting] = useState([])
    const meetingRef=collection(db,'Meeting');
    useEffect(() => {
        const a=localStorage.getItem('userid');
        if(a){
        const getData = async () => {
        const data = await getDocs(meetingRef)
        const temp = data.docs.map((doc)=>{
            console.log(doc.data().uid);
            if(a === doc.data().Host) {
                return {...doc.data(),id:doc.id}
            }
        })
        setMeeting(temp)
        }
        getData()
    }
}, [])
useEffect(()=>{
    console.log(meeting)
}, [meeting])

const handleDelete = async (appointmentId) => {
    try {
        await deleteDoc(meetingRef, appointmentId);
        console.log("meeitng deleted successfully");
        setTimeout(() => {
    
          location.reload();
        }, 1500);
    } catch (error) {
        console.error("Error deleting appointment: ", error);
    }
}


    
  return (
    <div>
       
        <div className='text-center text-2xl font-semibold text-purple-600'>
                 Your Meetings
        </div>
        { !meeting.length!==0 &&
            meeting.map((item)=>{
              {if(item)
                return  <div key={item.id} className='m-4 shadow-lg p-4' >
                   
                   
                    <div className='text-xl font-bold'>Meeting:{item.Purpose}</div>
                    <div className='text-xl font-semibold'>StartTime:{item.startingTime}</div>
                    <div className='text-xl font-semibold'>Date:{item.Date}</div>
                    <div className='text-xl font-semibold'>Duration:{item.duration}</div>
                    <div className='text-xl font-semibold'>Venue:{item.duration}</div>
                    <div className='text-xl font-semibold'>Recepients:</div>
                    {item.Recepint.length !== 0 && item.Recepint.map((r)=>{
                            return <div>
                                <div className='text-lg font-semibold'>Name:{r.name}</div>
                                <div className='text-lg font-semibold'>Email:{r.email}</div>
                            </div>
                         })
                    }
                    
                    
              </div>}
                console.log(meeting)
            })}
            
            {meeting.lenth === 0 && <div>No Meetings</div>}
            
        

    </div>
  )
}
