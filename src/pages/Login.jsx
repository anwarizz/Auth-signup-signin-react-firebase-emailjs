import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { signIn, signInWithFacebook, signInWithGoogle } from '../firebase'

export default function Login() {

  const navigate = useNavigate()

  const [user, setUser] = useState({email: String, password: String})
  const [errorCus, setErrorCus] = useState({
    invalidEmail: false,
    wrongPassword: false,
    toManyRequest: false,
  })

  const submit = (e) => {
    e.preventDefault()
    signIn(user.email, user.password).then(() => {
      navigate('/home')
    }).catch(error => {
      console.log(error.code)
      if (error.code == 'auth/invalid-email' || error.code == 'auth/user-not-found') {
        setErrorCus(prev => {return {...prev, invalidEmail: true}})
        setTimeout(() => {
          setErrorCus(prev => {return {...prev, invalidEmail: false}})
        }, 4000)
      }

      if (error.code == 'auth/wrong-password') {
        setErrorCus(prev => {return {...prev, wrongPassword: true}})
        setTimeout(() => {
          setErrorCus(prev => {return {...prev, wrongPassword: false}})
        }, 4000)
      }

      if (error.code == 'auth/too-many-requests') {
        setErrorCus(prev => {return {...prev, toManyRequest: true}})
        setTimeout(() => {
          setErrorCus(prev => {return {...prev, toManyRequest: false}})
        }, 4000)
      }
    })
  }

  const googleSignIn = () => {
    signInWithGoogle().then(() => {
      // buat collections di firestore
      navigate('/home')
    }).catch(error => console.log(error))
  }


  // sign in dengan facebook memerlukan app id dan secret id, jadi itu mungkin membutuhkan proses selanjutnya yg tidak akan saya lakukan
  // jadi untuk signin dengan facebook akan berjalan seperti ini
  const facebookSignIn = () => {
    // buat collections di firestore
    // signInWithFacebook().then(() => navigate('/')).catch(error => console.log(error))
  }

  return (
    <div className='w-full h-[100vh] bg-[rgb(36,36,36)]'>
        <div className='xl:w-[1200px] m-auto flex flex-col items-center gap-3 pt-[80px]'>
            <h2 className='font-mono font-bold text-[18px] w-full text-center text-white mb-[10px]'>Sign in to <span className='text-green-400'>Ulangan.online</span></h2>
            <form onSubmit={submit} className='bg-[rgb(44,49,51)] text-white flex flex-col gap-4 w-[300px] items-center pt-7 pb-7 rounded-lg'>
                {errorCus.invalidEmail ? (
                  <p className='text-red-400 text-[10px] w-full pl-6'>Email tidak tersedia atau belum terdaftar!</p>
                ): <></>}

                {errorCus.wrongPassword ? (
                  <p className='text-red-400 text-[10px] w-full pl-6'>Password salah!</p>
                ): <></>}

                {errorCus.toManyRequest ? (
                  <p className='text-red-400 text-[10px] w-full pl-6'>To many request. silahkan coba lagi nanti!</p>
                ): <></>}
                <input required onChange={e => setUser(prev => {return {...prev, email: e.target.value}})} className='font-mono w-[90%] bg-transparent outline-none rounded-lg h-[37px] pr-3 pl-3' type="text" placeholder='Email 💀' />
                <input required onChange={e => setUser(prev => {return {...prev, password: e.target.value}})} className='font-mono w-[90%] bg-transparent outline-none rounded-lg h-[37px] pr-3 pl-3' type="password" placeholder='Password 🔑' />
                <button type='submit' className='font-mono font-bold w-[90%] pr-3 pl-3 text-start text-red-400'>Sign in</button>
            </form>
            <div className='w-[300px] h-[100px] rounded-lg text-gray-500 font-mono flex flex-col items-center gap-1 mt-2'>
                <button onClick={googleSignIn} type='button'>Sign in with Google</button>
                <button onClick={facebookSignIn} type='button'>Sign in with Facebook</button>
            </div>
            <p className='text-white font-mono'>Belum bergabung? <Link to="/signup" className='text-blue-400'>Buat akun👉</Link></p>
        </div>
    </div>
  )
}
