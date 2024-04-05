import React, { useState } from 'react'
import { Link } from 'react-router-dom'

export default function Landing() {
    const [theme, setTheme] = useState({
        background: 'rgb(36,36,36)',
        text: 'white'
    })

    const changeTheme = () => {
        if ( theme.background == 'rgb(36,36,36)' && theme.text == 'white') {
            setTheme(prev => {return {...prev, background: 'white', text: 'black'}})
        } else {
            setTheme(prev => {return {...prev, background: 'rgb(36,36,36)', text: 'white'}})
        }
    }
    
    return (
        <>
            <h1 className='w-full text-center text-white text-[42px] font-mono font-bold pt-[100px]'>There we go!</h1>
            <div className={`bg-[${theme.background}] pt-[100px] flex justify-center gap-5`}>
            {/* <button onClick={changeTheme}>ganti</button> */}
                <Link to="/home" className='font-mono text-white font-bold'>Home🏠</Link>
                <Link to="/signup" className='font-mono text-red-400 font-bold'>Sign up😨</Link>
                <Link to="/login" className='font-mono text-green-400 font-bold'>Sign in🥰</Link>
            </div>

            <footer className='w-full text-white font-mono text-center mt-[200px] text-[15px] opacity-75'>
                <div>Menemukan bug atau sesuatu yang tidak diharapkan? <Link className='text-blue-400 border-b border-blue-400' target='_blank' to={'https://github.com/gettingdev/Auth-signup-signin-sytem-with-react-firebase-mailjs'}>Perbaiki di GitHub</Link></div>
                <div>Cari saya di <Link className='text-green-300 border-b border-green-300' target='_blank' to="https:jundia.online">jundia.online</Link>. berikan saran dan masukan!</div>
            </footer>
        </>
  )
}
