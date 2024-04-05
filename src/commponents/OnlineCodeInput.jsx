import React, { useEffect, useRef, useState } from 'react'

export default function OnlineCodeInput({to_email, code}) {


  const [digit, setDigit] = useState([])

  const onlineCodeVerification = () => {
    if (digit == code) {

    }
  }

  useEffect(() => {
    if ( digit.length >= 6 ) onlineCodeVerification()
  }, [])

  return (
    <div>
      <form onSubmit={onlineCodeVerification} className="max-w-[500px] flex flex-col items-center gap-2">
        <h3 className="text-white font-mono mb-2 text-center">Terakhir! Sebelum memulai online kami mengirim 6 digit kode ke <span className="text-green-400">{to_email}</span> </h3>
        <div className="flex mb-2 space-x-2 rtl:space-x-reverse">
          <input onChange={e => setDigit(e.target.value)} type="number" className="text-[#b3b3b3] p-2 pl-3 pr-3 border border-gray-700 rounded-lg outline-none bg-[#151515] remove-arrow flex justify-center tracking-wider" placeholder="XXXXXX"/>
        </div>
        <p id="helper-text-explanation" className="mt-2 text-sm text-gray-500 dark:text-gray-400">Silahkan masukkan kode 6 digit yang kami kirimkan melalui email.</p>
        <button type='submit' className='hidden'></button>
      </form>   
    </div>
  )
}



  //   const inputs = useRef([]);

  // // Function to handle input change
  // const handleChange = (index, e) => {
  //   const value = e.target.value;
    
  //   // If value is entered, focus on the next input
  //   if (value && index < inputs.current.length - 1) {
  //     inputs.current[index + 1].focus();
  //   }

  //   if (value && index ==  1) {
  //     inputs.current[index + 1].focus();
  //   }


  //   // If value is deleted and not in the first input, focus on the previous input
  //   if (!value && index > 0) {
  //     inputs.current[index - 1].focus();
  //   }

  //   // If value is deleted and in the first input, maintain focus on the current input
  //   if (!value && index === 0) {
  //     inputs.current[index].focus();
  //   }

  //   // If value is entered and in the last input, maintain focus on the current input
  //   if (value && index === inputs.current.length - 1) {
  //     inputs.current[index].focus();
  //   }
  // };

  // // Function to handle input keydown
  // const handleKeyDown = (index, e) => {
  //   // If backspace is pressed and input is empty, focus on the previous input
  //   if (e.key === 'Backspace' && index > 0 && e.target.value === '') {
  //     inputs.current[index - 1].focus();
  //     inputs.current[index - 1].value = null
  //   }
  
  //   // If delete is pressed and input is empty, focus on the next input
  //   if (e.key === 'Delete' && index < inputs.current.length - 1 && e.target.value === '') {
  //     inputs.current[index + 1].focus();
  //   }
  // };


  {/* <form className="max-w-[500px] flex flex-col items-center gap-2">
      <h3 className="text-white font-mono mb-2 text-center">Terakhir! Sebelum memulai online kami mengirim 6 digit kode ke <span className="text-green-400">{to_email}</span> </h3>
      <div className="flex mb-2 space-x-2 rtl:space-x-reverse">
        {[...Array(6)].map((_, index) => (
          <div key={index}>
            <label htmlFor={`code-${index + 1}`} className="sr-only">Code {index + 1}</label>
            <input 
              type="text"
              maxLength="1"
              ref={el => inputs.current[index] = el}
              id={`code-${index + 1}`}
              className="block w-10 h-10 py-3 text-sm font-extrabold text-center text-white bg-[#151515] border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              required
              onChange={(e) => {handleChange(index, e); digit.push(e.target.value)}}
              onKeyDown={(e) => handleKeyDown(index, e)}
            />
          </div>
        ))}
      </div>
      <p id="helper-text-explanation" className="mt-2 text-sm text-gray-500 dark:text-gray-400">Silahkan masukkan kode 6 digit yang kami kirimkan melalui email.</p>
    </form> */}
