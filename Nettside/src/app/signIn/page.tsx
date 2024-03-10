"use client";
import React, {useState} from 'react'
import Signup from '@/database/fire'
const signin = () => {

  return (
    <div className="center flex" style={{ height: "calc(100vh - 80px)" } }> 
          <div className='flex-direction-column flex '>
          <form className='flex-col flex h-40 w-40'>
              <label className='mb-1 text-xl'>Username:  </label>
              <input type="text" className='mb-5 pl-2 text-black' name='brukernavn' required/>
              <label className='text-xl'>Password:  </label>
              <input type='password' className='mb-5 pl-2 text-black' required name="passord"></input>
              <input type="submit" onClick={() => Signup} className='border-white border-2 hover:brightness-95 hover:scale-105'></input>
            </form>
          </div>
    </div>
  )
}

export default signin