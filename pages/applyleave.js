import { useEffect, useState } from 'react';
import { collection, getDocs, increment, addDoc } from "firebase/firestore"
import { db } from "../config/firebase"

const Form = () => {

    useEffect(() => {
     const a=localStorage.getItem('userid');
     setUser(a);
    }, [])
    
    
    const [reason, setReason] = useState('');
    const [startDate, setStartDate] = useState('');
    const [user, setUser] = useState('');
    // const [endTime, setEndTime] = useState('');
    const [days, setDays] = useState(0);
    

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(name);
    const userCollectionRef = collection(db, 'Leave')
    const add = async () => {
        const document = await addDoc(userCollectionRef, {
            Reaon: reason,
            Date: startDate,
            Days:days,
            uid:user
        })
    }
    add()
    setStartDate('')
    setReason('')
    setDays(0)
 
       
    console.log(document.id)
  };

  return (
  <>
  <div className="flex justify-center items-center h-screen text-gray-950 my-8">

      <form onSubmit={handleSubmit} className="w-full max-w-md p-4 bg-gray-100 rounded-lg">
        <h2 className="text-2xl flex justify-center item-center font-bold mb-4 pt-4">Apply for Leave</h2>
        <div className="mb-4">
          <label htmlFor="date" className="block text-gray-700 font-bold mb-2">
            Starting Date for Leave
          </label>
          <input
            type="date"
            id="date"
            name="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="w-full px-3 py-2 border border-gray-400 rounded-lg focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="days" className="block text-gray-700 font-bold mb-2">
            Number of Days
          </label>
          <input
            type="number"
            id="days"
            name="days"
            value={days}
            onChange={(e) => setDays(e.target.value)}
            className="w-full px-3 py-2 border border-gray-400 rounded-lg focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="reason" className="block text-gray-700 font-bold mb-2">
            Reason
          </label>
          <input
            type="reason"
            id="reason"
            name="reason"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
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
