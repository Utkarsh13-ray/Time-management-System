import React, { useEffect, useState } from 'react'
import { collection, getDocs, setDoc, doc, increment, addDoc, onSnapshot, query, where, updateDoc } from "firebase/firestore"
import { db } from "../config/firebase"

export default function LeaveList() {
    const [leave, setLeave] = useState([])
    const [userid, setUserid] = useState([])
    const leaveRef = collection(db, 'Leave');

    useEffect(() => {
        const a = localStorage.getItem('userid');
        setUserid(a);
        if (a) {
            const getData = async () => {
                const data = await getDocs(leaveRef)
                const temp = data.docs.map((doc) => {
                    console.log(doc.data().uid);
                    if (a === doc.data().uid || a === "Ch2LVNgtjyVVrJTdUcmvR8PgvnA3") {
                        return { ...doc.data(), id: doc.id }
                    }
                })
                setLeave(temp)
            }
            getData()
        }
    }, [])

    useEffect(() => {
        console.log(leave)
    }, [leave])

    const handleRejectLeave = async (id) => {
        try {
            await updateDoc(doc(db, 'Leave', id), {
                status: 'denied'
            });
            location.reload();
        } catch (error) {
            console.error("Error updating leave status:", error);
        }
    }

    const handleAcceptLeave = async (id) => {
        try {
            await updateDoc(doc(db, 'Leave', id), {
                status: 'accepted'
            });
            location.reload();
            
        } catch (error) {
            console.error("Error updating leave status:", error);
        }
    }

    return (
        <div>
            <div className='text-center text-2xl font-semibold text-purple-600'>
                Your leaves
            </div>
            {!leave.length !== 0 &&
                leave.map((item) => {
                    console.log(item)
                    if (item)
                        return <div key={item.id} className='m-4 shadow-lg p-4' >

                            <div className='text-xl font-semibold'>Startung Date:{item.Date}</div>
                            <div className='text-xl font-semibold'>Number of Days:{item.Days}</div>
                            <div className='text-xl font-semibold'>Reason:{item.Reason}</div>
                            <div className='text-xl font-semibold'>Status: <i>{item.status}</i></div>
                            {userid === "Ch2LVNgtjyVVrJTdUcmvR8PgvnA3" && <div className="flex space-x-2 w-80">
                                <button
                                    onClick={() => handleRejectLeave(item.id)}
                                    className="flex-1 py-2 px-4 w-40 bg-red-500 text-white font-bold rounded"
                                >
                                    Reject
                                </button>
                                <button
                                    onClick={() => handleAcceptLeave(item.id)}
                                    className="flex-1 py-2 px-4  bg-green-500 w-40 text-white font-bold rounded"
                                >
                                    Accept
                                </button>
                            </div>}
                            {/* <div>Venue:{item.venue}</div> */}
                        </div>
                    console.log(leave)
                })}

            {leave.length === 0 && <div>No leaves</div>}

        </div>
    )
}
