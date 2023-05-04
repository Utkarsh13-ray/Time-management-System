import { useEffect, useState } from 'react';
import { collection, getDocs, increment, addDoc } from "firebase/firestore"
import { db } from "../config/firebase"

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Form = () => {

    useEffect(() => {
     const a=localStorage.getItem('userid');
     setUser(a);
    }, [])
    
    const [email, setEmail] = useState('');
    const [user, setUser] = useState('');
    const [date, setDate] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [name, setName] = useState('');
    const [venue, setVenue] = useState('');
    const [purpose, setPurpose] = useState('');

  const handleSubmit = (e) => {
    
    e.preventDefault();
    console.log(name);
    const userCollectionRef = collection(db, 'Slot')
    const add = async () => {
        const document = await addDoc(userCollectionRef, {
            name: name,
            email: email,
            startingTime: startTime,
            endingTime: endTime,
            meetingDate: date,
            venue:venue,
            purpose:purpose,
            uid:user
        })
    }
    add()
    setDate('')
    setEmail('')
    setName('')
    setStartTime('')
    setEndTime('')
    setPurpose('')
    setVenue('')
    toast.success('Your Appointment has been saved', {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      
      });
     
    console.log(document.id)
  };

  return (
  <>
  <div className="flex justify-center items-center h-screen text-gray-950 my-20">
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
      <form onSubmit={handleSubmit} className="w-full max-w-md p-4 bg-gray-100 rounded-lg">
        <h2 className="text-2xl flex justify-center item-center font-bold mb-4 pt-4">Book an appointment</h2>
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 font-bold mb-2">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 border border-gray-400 rounded-lg focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="date" className="block text-gray-700 font-bold mb-2">
            Meeting Date
          </label>
          <input
            type="date"
            id="date"
            name="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full px-3 py-2 border border-gray-400 rounded-lg focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="start-time" className="block text-gray-700 font-bold mb-2">
            Meeting start time
          </label>
          <input
            type="time"
            id="start-time"
            name="start-time"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            className="w-full px-3 py-2 border border-gray-400 rounded-lg focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="end-time" className="block text-gray-700 font-bold mb-2">
            Meeting end time
          </label>
          <input
            type="time"
            id="end-time"
            name="end-time"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            className="w-full px-3 py-2 border border-gray-400 rounded-lg focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border border-gray-400 rounded-lg focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
            Venue
          </label>
          <input
            type="text"
            id="venue"
            name="venue"
            value={venue}
            onChange={(e) => setVenue(e.target.value)}
            className="w-full px-3 py-2 border border-gray-400 rounded-lg focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
            Purpose
          </label>
          <input
            type="text"
            id="purpose"
            name="purpose"
            value={purpose}
            onChange={(e) => setPurpose(e.target.value)}
            className="w-full px-3 py-2 border border-gray-400 rounded-lg focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        <div className="flex justify-center items-center pt-6">
        <button
          type="submit"
          className="w-1/2 bg-purple-900 hover:bg-purple-400 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline"
        >
          Submit
        </button>
        </div>
        
      </form>
    </div>
  </>
    
  );
};

export default Form;
