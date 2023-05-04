import React, { useState } from "react";
// const nodemailer = require("nodemailer");

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Sendmailer } from "./lib/api";
import {
  collection,
  getDocs,
  increment,
  addDoc,
  onSnapshot,
  query,
  where,
  doc,
} from "firebase/firestore";
import { db } from "../config/firebase";
const App = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [recipients, setRecipients] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [meetingname, setMeetingName] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [duration, setDuration] = useState("");
  const [venue, setVenue] = useState("");
  const [error, setError] = useState(null);
  const [purpose, setPurpose] = useState("");


  const userCollectionRef = collection(db, "Users");
  
  const user= localStorage.getItem('user');
  const id= localStorage.getItem('userid');
  const useremail= localStorage.getItem('useremail');
  console.log(user);
  const Sendemail = async()=>{
      

    
    // send mail with defined transport object
    if(id){
        console.log(user)
    recipients.map(async (recipient)=>{
                let data={
                      "user":user,
                      "email":useremail,
                      "recipient":recipient
                }
               const a=await Sendmailer(data);
        });}
 
}
  const handleOpenModal = () => {
    setIsOpen(true);
    
  };

  const handleCloseModal = () => {
    setIsOpen(false);
    setError(null);
  };
  const handleFirstNameChange = (event) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const meetingCollectionRef = collection(db, "Meeting");
  const handleAddRecipient = async () => {
    if (name !== "" && email !== "") {
      const newRecipient = { name: name, email: email };
      setRecipients([...recipients, newRecipient]);
      setName("");
      setEmail("");
    }
  };

  const handleScheduleMeeting = async () => {
 
    if (recipients.length !== 0) {
      const document = await addDoc(meetingCollectionRef, {
        Host: id,
        Recepint: recipients,
        Date: date,
        Time: time,
        Duration: duration,
        Venue: venue,
        Purpose:purpose
      });
      console.log(document);

      handleCloseModal();
      toast.success('Meeting Scheduled', {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        
        });
      setRecipients([])
      Sendemail();
        
    }
  };

  const handleRecipientNameChange = (event, index) => {
    const updatedRecipients = [...recipients];
    updatedRecipients[index].name = event.target.value;
    setRecipients(updatedRecipients);
  };

  const handleRecipientEmailChange = (event, index) => {
    const updatedRecipients = [...recipients];
    updatedRecipients[index].email = event.target.value;
    setRecipients(updatedRecipients);
  };

  const handleDeleteRecipient = (index) => {
    const updatedRecipients = [...recipients];
    updatedRecipients.splice(index, 1);
    setRecipients(updatedRecipients);
  };

  return (
    <div className="container mx-auto max-w-md p-4">
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
      <h1 className="text-center text-3xl font-bold mb-4">Recipient Form</h1>
      <div className="flex flex-col space-y-2 mb-4">
        <label className="block">
          First Name:
          <input
            type="text"
            value={name}
            onChange={handleFirstNameChange}
            className="w-full mt-1 p-2 border border-gray-300 rounded"
          />
        </label>
        <label className="block">
          Email:
          <input
            type="email"
            value={email}
            onChange={handleEmailChange}
            className="w-full mt-1 p-2 border border-gray-300 rounded"
          />
        </label>
        <button
          onClick={handleAddRecipient}
          className="w-full py-2 px-4 bg-blue-500 text-white font-bold rounded"
        >
          Add Person
        </button>
        <button
          onClick={handleOpenModal}
          className="w-full py-2 px-4 bg-blue-500 text-white font-bold rounded"
        >
          Schedule Meeting
        </button>
        {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center">
          <div className="absolute inset-0 bg-gray-900 opacity-75"></div>
          <div className="bg-white w-1/2 p-8 pb-20 rounded-lg relative">
            <h2 className="text-2xl font-bold mb-4">Meeting Details</h2>
            <input
              type="text"
              placeholder="Meeting Name"
              value={meetingname}
              onChange={(e) => setMeetingName(e.target.value)}
              className="w-full p-2 mb-2 border border-gray-400 rounded"
            />
            <input
              type="date"
              placeholder="Date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full p-2 mb-2 border border-gray-400 rounded"
            />
            <input
              type="time"
              placeholder="Starting Time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="w-full p-2 mb-4 border border-gray-400 rounded"
            />
            <input
              type="text"
              placeholder="Duration (in Hours)"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              className="w-full p-2 mb-4 border border-gray-400 rounded"
            />
            <input
              type="text"
              placeholder="Venue"
              value={venue}
              onChange={(e) => setVenue(e.target.value)}
              className="w-full p-2 mb-4 border border-gray-400 rounded"
            />
            <input
              type="text"
              placeholder="Purpose"
              value={purpose}
              onChange={(e) => setPurpose(e.target.value)}
              className="w-full p-2 mb-4 border border-gray-400 rounded"
            />
            {error && (
              <p className="text-red-500 text-sm mb-4">{error}</p>
            )}
            <div className="flex justify-end absolute inset-x-0 bottom-0 p-4 ">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                onClick={handleScheduleMeeting}
              >
                Schedule
              </button>
              <button
                className="bg-gray-400 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded"
                onClick={handleCloseModal}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      </div>
      {recipients.map((recipient, index) => (
        <div key={index} className="border border-gray-300 p-4 rounded mb-4">
          <label className="block mb-2">
            Recipient Name:
            <input
              type="text"
              value={recipient.name}
              onChange={(event) => handleRecipientNameChange(event, index)}
              className="w-full mt-1 p-2 border border-gray-300 rounded"
            />
          </label>
          <label className="block mb-2">
            Recipient Email:
            <input
              type="email"
              value={recipient.email}
              onChange={(event) => handleRecipientEmailChange(event, index)}
              className="w-full mt-1 p-2 border border-gray-300 rounded"
            />
          </label>
          <div className="flex space-x-2">
            <button
              onClick={() => handleDeleteRecipient(index)}
              className="flex-1 py-2 px-4 bg-red-500 text-white font-bold rounded"
            >
              Delete
            </button>
            <button
              onClick={handleAddRecipient}
              className="flex-1 py-2 px-4 bg-green-500 text-white font-bold rounded"
            >
              Update
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default App;
