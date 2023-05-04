import Image from 'next/image'
import { Inter } from 'next/font/google'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
   
        <div className="w-full bg-purple-400 h-[91vh] flex flex-col items-center justify-center">
          <div className='text-white text-center text-8xl font-semibold'>WELCOME</div>
          <Link className= 'w-80 bg-white p-2 text-black text-center font-bold my-4 rounded-md hover:text-purple-600'  href="/appointmentList"><div >Check your Appointments</div></Link>
        </div>
   
  )
}
