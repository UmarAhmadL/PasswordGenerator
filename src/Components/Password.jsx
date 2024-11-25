import React, { useState,useCallback,useEffect,useRef } from 'react'


function Password() 
{
    const [length,setLength] = useState(8);
    const [numberAllowed,setNumberAllowed] = useState(false);
    const [characterAllowed,setCharacterAllowed] = useState(false);
    const [password,setPassword] = useState("");

    //refrence hook
    const passwordRef = useRef(null);

    /*
     useCallback() ->  for memoization - 
     is a technique for speeding up applications by caching(storing in memory) the results of 
     expensive function calls and returning them when the same inputs are used again.
    */
     const passwdGenerator = useCallback(() => {

        let passwd = "";
        let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
        if(numberAllowed)
            str += "0123456789";
        if(characterAllowed)
            str += "!@##$%^&*+=-{}[]~";

        for(let i = 1 ; i <= length ; i++){
            let char =Math.floor(Math.random() * str.length + 1);
            passwd += str.charAt(char);
        }

        setPassword(passwd);

    },[length,numberAllowed,characterAllowed,setPassword])

    const copyPasswordToClipboard = useCallback(() => {
        passwordRef.current?.select();
        // passwordRef.current?.setSelectionRange(0,3);
        window.navigator.clipboard.writeText(password);
    },[password])

    /*
        to reload the page once again if any of the dependencies change their state
    */
    useEffect(() => {
        passwdGenerator();
    },[length,numberAllowed,characterAllowed,passwdGenerator])
  return (
    <>
         {/* BackgroundContainer  */}
        <div className=' flex items-center justify-center h-screen'>
            {/* Card  */}
            <div className='bg-white/20 backdrop-blur-md p-4 mx-6 rounded-2xl shadow-lg shadow-orange-500'>
                {/* flex container  */}
                <div className='flex flex-col items-center md:flex-row rounded-2xl'>
                    {/* image */}
                    <img src="PasswdGenLogo.png"
                     alt="Password Generator Logo"
                     className='object-fit h-60 w-60 md:h-80 md:w-80' />
                    {/* content */}
                    <div className='p-4 md:p-12 flex flex-col items-center  md:border-l-4 border-violet-900 ml-5'>
                        <h1 className='font-Iceberg mb-5 pb-3 bg-gradient-to-t from-orange-500 to-yellow-400 bg-clip-text text-transparent text-l font-bold'>
                            Don't guess; generate. Security starts here.
                        </h1>
                        <div className='flex sm:flex-row xs:flex-col xs:items-center'>
                            <input 
                                type="text"
                                value={password}
                                placeholder='password'
                                readOnly 
                                ref={passwordRef}
                                className='p-2 px-2 text-center text-indigo-800 text-sm font-bold rounded-md m-2 sm:rounded-r-none sm:m-0'
                            />
                            <button
                                onClick={copyPasswordToClipboard}
                                className='p-2 px-4 w-3/4 text-center bg-indigo-900 text-white text-sm font-bold rounded-md hover:bg-orange-600 sm:rounded-l-none sm:w-1/4'
                            >COPY</button>
                        </div>
                        <div>
                            <div className='p-3 flex flex-col items-center'>
                                <input 
                                    type="range"
                                    min={6}
                                    max={50}
                                    value={length}
                                    onChange={(e) => {setLength(e.target.value)}} 
                                    className='mt-6 w-full accent-orange-500'
                                />
                                <label className='p-2 text-white text-l font-bold '>Length : {length}</label>
                            </div>
                            <div className='flex sm:flex-row xs:flex-col'>
                                {/* to include the numbers in the password */}
                                <div className='mx-2'>
                                    <input 
                                    type="checkbox"
                                    defaultChecked={numberAllowed}
                                    onChange={() => {
                                        setNumberAllowed((prev) => !prev);
                                    }}
                                    className=' mt-4 accent-orange-500'
                                    />
                                    <label 
                                        className='p-2 text-white text-lg font-bold ' 
                                        htmlFor='numberInput'
                                    >Number</label>
                                </div>
                                {/* to include the specail characters in the password */}
                                <div className='mx-2'> 
                                    <input 
                                    type="checkbox"
                                    defaultChecked={characterAllowed}
                                    onChange={() => {
                                        setCharacterAllowed((prev) => !prev);
                                    }}
                                    className='mt-4 accent-orange-500'
                                    />
                                    <label 
                                        className='p-2 text-white text-lg font-bold '
                                        htmlFor='characterInput'
                                    >Characters</label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default Password