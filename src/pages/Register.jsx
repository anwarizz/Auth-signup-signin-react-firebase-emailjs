import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserAlreadyExist, createAccount} from "../firebase";
import emailjs from 'emailjs-com'

export default function Register() {

  const navigate = useNavigate()

  const [newUser, setNewUser] = useState({
    email: String,
    password: String,
    confirmPassword: String,
  });

  const [failedCus, setFailed] = useState({
    emailAlreadyUse: false,
    passwordToWeak: false,
    passwordNotSync: false
  })

  const generateCode = () => {
    const math = Math.random().toString()
    return (`${math[7]}${math[2]}${math[3]}${math[4]}${math[5]}${math[6]}`)
  }

  const [onlineCode, setOnlineCode] = useState()
  const [final, setFinal] = useState(false) 
  const [to_email, setTo_email] = useState()
  const [wait, setWait] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newUser.password.length < 6) return setFailed(prev => {return {...prev, passwordToWeak: true}})

    // cek apakah password dan confirm password sudah sinkrong
    else if ( newUser.password != newUser.confirmPassword ) return setFailed(prev => {return {...prev, passwordNotSync: true}})
    
    // cek apakah pengguna sudah terdaftar sebelumnya
    UserAlreadyExist(newUser.email).then((e) => {
      if (e.length == 1) return setFailed(prev => {return {...prev, emailAlreadyUse: true}})
      
      else {
        setWait(true)
        // mengirim verifikasi kode ke email pengguna dengan emailJS
        const emailParams = {code: generateCode(), to_email: newUser.email}
        emailjs.send(import.meta.env.VITE_SERVICE_ID, import.meta.env.VITE_TEMPLATE_ID, emailParams, import.meta.env.VITE_PUBLIC_KEY).then(() => {
          setOnlineCode(emailParams.code)
          setTo_email(emailParams.to_email)
          setFinal(true)
        })
      }
    })


    // menyesuaikan online kode yg diinputkan pengguna dengan online code yg di hasilkan
    // pindah tugas ->>

  };
  
  
  const [digit, setDigit] = useState([])
  const [onlineCodeWrong, setOnlineCodeWrong] = useState(false)
  const onlineCodeVerification = (e) => {
    e.preventDefault()
    if (digit == onlineCode) {
      createAccount(newUser.email, newUser.password).then((e) => {
        // verification(e.user).then(() => setEmailVerificationSend(true))
        // console.log(e.user.displayName)
          navigate('/home')
        }
        ).catch(error => {
          if (error.code == 'auth/email-already-in-use') setFailed(prev => {return {...prev, emailAlreadyUse: true}})
        })
    } else setOnlineCodeWrong(true)
  }


  return (
    <div className="bg-[rgb(36,36,36)] h-[100vh]">
      <nav className="flex justify-between h-[80px] 2xl:w-[1400px] m-auto pr-5 pl-5 2xl:p-0">
        <div className="flex items-center gap-3">
          <h2 className="text-white md:text-[20px] font-mono font-bold">
          </h2>
        </div>
        <ul className="flex items-center gap-3">
          <li className="text-white font-mono md:text-[19px] opacity-35 md:block hidden "> 
            Sudah punya akun?
          </li>
          <li className="text-white font-mono md:text-[19px]">
            <Link to="/login" className="flex items-center">
              <span >Sign in</span>
              <span className="ml-1">👉</span>
            </Link>
          </li>
        </ul>
      </nav>

      {!final ? (
        <section className="xl:w-[1200px] m-auto flex flex-col items-center mt-[60px] mb-[80px] bg-[rgb(36,36,36)]">
          <h2 className="font-mono text-white font-bold md:text-[45px] text-[24px]">Sign up</h2>
          <p className="font-mono text-cyan-400">Buat akun anda!</p>
          <form
            onSubmit={handleSubmit}
            className="w-[90%] md:w-[500px] mt-10 flex flex-col bg-[rgb(44,49,51)] p-5 rounded-lg gap-1 shadow-2xl"
          >
            {failedCus.emailAlreadyUse ? <p className="text-red-400 font-mono text-[13px]">Email sudah terdaftar 😭</p> : <></>}
            <input
              onChange={(e) =>
                setNewUser((prev) => {
                  return { ...prev, email: e.target.value };
                })
              }
              required
              type="text"
              className={`${failedCus.emailAlreadyUse ? 'border border-red-400 rounded-lg' : ''} bg-transparent outline-none  text-white font-mono p-2 font-semibold`}
              placeholder="Email 💀"
            />
            {failedCus.passwordToWeak ? <p className="text-red-400 font-mono text-[13px]">Password kependekan!</p> : <></>}
            <input
              onChange={(e) =>
                setNewUser((prev) => {
                  return { ...prev, password: e.target.value };
                })
              }
              required
              type="password"
              className={`${failedCus.passwordToWeak ? 'border border-red-400 rounded-lg' : ''} bg-transparent outline-none  text-white font-mono p-2 font-semibold`}
              placeholder="Password 🔑"
            />
            {failedCus.passwordNotSync ? <p className="text-red-400 font-mono text-[13px]">konfirmasi password!</p> : <></>}
            <input
              onChange={(e) =>
                setNewUser((prev) => {
                  return { ...prev, confirmPassword: e.target.value };
                })
              }
              required
              type="password"
              className={`${
                failedCus.passwordNotSync ? "border border-red-400 rounded-lg" : ""
              } bg-transparent outline-none  text-white font-mono p-2 font-semibold`}
              placeholder="Konfirmasi password 👉"
            />
            <div className="w-full pt-2">
              <button
                type="submit"
                className="w-[max-content] p-2 text-red-500 flex items-center gap-2"
              >
                {wait ? (
                  <p className="w-[9px] h-[9px] bg-red-500 animate-spin"></p>
                ): <></>}
                Buat akun
              </button>
            </div>
          </form>
        </section>

      ) : (

      <section className="xl:w-[1200px] m-auto flex flex-col items-center mt-[70px] mb-[80px] bg-[rgb(36,36,36)]">
        <form onSubmit={onlineCodeVerification} className="w-[80%] md:w-auto md:max-w-[500px] flex flex-col items-center gap-2">
          <h3 className="text-white font-mono mb-2 text-center">Terakhir! Sebelum memulai online kami mengirim 6 digit kode ke <span className="text-green-400">{to_email}</span> </h3>
          <div className="flex mb-2 space-x-2 rtl:space-x-reverse flex-col">
            {onlineCodeWrong ? (
              <p className="text-red-400 pl-2 mb-1 text-[14px]">kode salah!</p>
            ) : <></>}
            <div className={`${onlineCodeWrong ? 'border-red-400' : 'border-gray-700 w-[200px]'}  flex overflow-hidden p-2 pl-3 border rounded-lg outline-none bg-[#151515]`}>
              <input onChange={e => setDigit(e.target.value)} type="number" className={`text-[#b3b3b3] bg-transparent w-[80%] outline-none remove-arrow flex justify-center tracking-wider`} placeholder="XXXXXX"/>
              <button type="submit" className="h-[100]">
                <svg width="40px" height="25px" viewBox="0 0 20 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4 12H20M20 12L16 8M20 12L16 16" stroke="#b3b3b3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
              </button>
            </div>
          </div>
          <p id="helper-text-explanation" className="mt-2 text-sm text-gray-500 dark:text-gray-400 text-center">Silahkan masukkan kode 6 digit yang kami kirimkan melalui email.</p>
          
      </form> 
      </section>

      )}

      
    </div>
  );
}
