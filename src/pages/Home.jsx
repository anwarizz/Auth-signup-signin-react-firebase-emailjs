import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { auth } from '../firebase'

export default function Home() {

    const navigate = useNavigate()

    const [user, setUser] = useState({})
  
    useEffect(() => {
      onAuthStateChanged(auth, user => {
        if (!user) return navigate('/login')
        else setUser(user)  
      })
    }, [])
  
    const logOut = () => {
      signOut(auth).then(() => console.log('user logout.'))
    }

  return (
    <>
        <h1 className='w-full text-center text-[30px] font-bold font-mono text-white mt-5'>Welcome! {user.displayName}</h1>
      <div className='text-white flex-col flex items-center pt-10 gap-2'>
        <img className='w-[100px] border-2 border-gray-300' src={user.photoURL} alt="" />
        <h2 className='font-mono'>Email: <span className='text-green-400'>{user.email}</span></h2>
        <h2 className='font-mono'>Display name: {user.displayName == null ? 'null' : user.displayName}</h2>
        <h2 className='font-mono'>UID: <span className='text-blue-400'>{user.uid}</span></h2>
        <h2 className='font-mono'>Phone number: {user.phoneNumber == null ? 'null' : user.phoneNumber}</h2>
        ....
        <button onClick={logOut} className='text-red-400 font-mono'>log out</button>
    </div>
    </>
  )
}
