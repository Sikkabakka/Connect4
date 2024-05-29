"use client";
import React, {useState, useEffect } from 'react'
import {auth} from '@/database/firebaseConfig'
import { createUserWithEmailAndPassword } from 'firebase/auth';

const signUp = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('');


  useEffect(() => {

  }, [email, password])


   
    const onSubmit = async (e) => {
      e.preventDefault()
     
      await createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;



        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage);

        });
 
   
  }

  return (

    <div className="items-center flex-col flex " style={{ height: "calc(100vh - 80px)" } }> 
       <div className='h-40 center flex'>
           <h1 className='text-5xl pb-10'>Make an account</h1>
        </div>
          <div className='flex-direction-column flex '>
          <form className='flex-col flex h-40 w-40' onSubmit={onSubmit}>
              <label className='mb-1 text-xl'>Email:  </label>
              <input 
                type="email" 
                className='mb-5 pl-2 text-black' 
                name='brukernavn' 
                placeholder='Email'
                onChange={(e) => setEmail(e.target.value)}
                required/>
              <label className='text-xl'>Password:  </label>
              <input 
                type='password' 
                className='mb-5 pl-2 text-black' 
                required 
                onChange={(e) => setPassword(e.target.value)}
                name="passord"
                placeholder="Password">
                
              </input>
              <input 
                type="submit" 
                className='border-white border-2 hover:brightness-95 hover:scale-105'>
              </input>
            </form>
          </div>
    </div>
  )
}

export default signUp