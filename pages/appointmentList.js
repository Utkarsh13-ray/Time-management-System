import React, { useEffect, useState } from 'react'
import { collection, getDocs, updateDoc, doc, deleteDoc } from "firebase/firestore"
import { db } from "../config/firebase"

export default function AppointmentList() {
    const [appointments, setAppointments] = useState([])
    const [updatingAppointment, setUpdatingAppointment] = useState(null)
    const [newData, setNewData] = useState({}) // Initialize with an empty object

    const appointmentRef = collection(db,'Slot');

    useEffect(() => {
      const a=localStorage.getItem('userid')
        const getData = async () => {
            const data = await getDocs(appointmentRef)
            const temp = data.docs.map((doc) => {
                if (a === doc.data().uid) {
                    return { ...doc.data(), id: doc.id }
                }
            })
            setAppointments(temp)
        }
        getData()
    }, [])

    const handleDelete = async (appointmentId) => {
        try {
            await deleteDoc(doc(db, "Slot", appointmentId));
            console.log("Appointment deleted successfully");
            setTimeout(() => {
        
              location.reload();
            }, 1500);
        } catch (error) {
            console.error("Error deleting appointment: ", error);
        }
    }

    const handleUpdateAppointment = async (appointment) => {
        setUpdatingAppointment(appointment)
        setNewData({
            purpose: appointment.purpose,
            startingTime: appointment.startingTime,
            endingTime: appointment.endingTime,
            venue: appointment.venue
        });
        
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewData({ ...newData, [name]: value });
    }

    const handleUpdateSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateDoc(doc(db, "Slot", updatingAppointment.id), newData);
            console.log("Appointment updated successfully");
            setUpdatingAppointment(null);
            setNewData({});
            setTimeout(() => {
        
              location.reload();
            }, 1500);
        } catch (error) {
            console.error("Error updating appointment: ", error);
        }
    }

    return (
        <div>
            <div className='text-center text-2xl font-semibold text-purple-600'>
                Your Appointments
            </div>
            {appointments.length !== 0 &&
                appointments.map((item) => {
                    if (item)
                        return (
                            <div key={item.id} className='m-4 shadow-lg p-4' >

                                <div className='text-xl font-bold'>Purpose of Meeting : {item.purpose}</div>
                                <div className='text-xl font-semibold'>StartTime : {item.startingTime}</div>
                                <div className='text-xl font-semibold'>EndTime : {item.endingTime}</div>
                                <div className='text-xl font-semibold'>Venue : {item.venue}</div>

                                <div className='flex mt-4 flex-col'>
                                  <div className='flex'>
                                    <button className='bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 mr-2 rounded w-20' onClick={() => handleDelete(item.id)}>Delete</button>
                                    <button className='bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded w-20' onClick={() => handleUpdateAppointment(item)}>Update</button>
                                    </div>
                                    {updatingAppointment && updatingAppointment.id === item.id && (
                                    <form className="mt-4">
                                        <input type="text" className="block w-full p-2 border-gray-300 border focus:outline-none focus:border-purple-600 rounded" name="purpose" value={newData.purpose || ''} onChange={handleInputChange} placeholder="Purpose of Meeting" />
                                        <input type="text" className="block w-full p-2 border-gray-300 border mt-2 focus:outline-none focus:border-purple-600 rounded" name="startingTime" value={newData.startingTime || ''} onChange={handleInputChange} placeholder="Start Time" />
                                        <input type="text" className="block w-full p-2 border-gray-300 border mt-2 focus:outline-none focus:border-purple-600 rounded" name="endingTime" value={newData.endingTime || ''} onChange={handleInputChange} placeholder="End Time" />
                                        <input type="text" className="block w-full p-2 border-gray-300 border mt-2 focus:outline-none focus:border-purple-600 rounded" name="venue" value={newData.venue || ''} onChange={handleInputChange} placeholder="Venue" />
                                        <button className='bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 mt-2' onClick={handleUpdateSubmit}>Update</button>
                                        <button className='bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-4 mt-2 ml-2' onClick={() => setUpdatingAppointment(null)}>Cancel</button>
                                    </form>
                                )}
                            </div>
                        </div>
                    )
                else return null
            })}
    </div>
)
          }
