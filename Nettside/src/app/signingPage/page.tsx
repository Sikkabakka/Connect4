"use client";
import React, {use, useEffect, useState} from 'react'
import SignIn from '@/components/SignIn'
import SignUp from '@/components/SignUp'
import AuthDetails from '@/components/AuthDetails'
import {auth} from '@/database/firebaseConfig'
import { onAuthStateChanged, signOut } from "firebase/auth";
import Image from "next/image";

const page = () => {
  const [haveUser, sethaveUser] = useState(false);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      sethaveUser(!!user); 
    });
    return () => unsubscribe();
  }, []);

  return (
    <div>
      <div className=''>

      </div>
      {haveUser && <AuthDetails/>}
      {!haveUser && <Option/> }
     

    </div>
  )
}

function Option(){
  const [makeUser, setmakeUser] = useState(false);
  const [hasChosen, sethasChosen] = useState(false);


  useEffect(() => {
    console.log(makeUser, hasChosen)
  },  [makeUser, hasChosen])
  return (

    <div>

      
      {!hasChosen &&
      <div className='center flex-col flex' style={{ height: "calc(100vh - 80px)" }}>
        <button className='border-4 rounded h-20 w-80 center flex text-2xl m-4 hover:brightness-95  hover:scale-105' onClick={() => {setmakeUser(true); sethasChosen(true)}}>
                Create User
        </button>
        <button className='border-4 rounded h-20 w-80 center flex text-2xl m-4 hover:brightness-95  hover:scale-105' onClick={() => {setmakeUser(false); sethasChosen(true)}}>
                Log In
        </button>
       
      </div>}

      {makeUser && 
     <div className='w-screen flex-col items-center flex'>
        <div className='w-2/3 h-fit_content'>
          <div className='flex-row items-center flex h-20 w-40 text-xl hover:brightness-95  hover:scale-105' onClick={()=>{sethasChosen(false)}}> 
            <div className='h-1/2 aspect-square relative'>
              <Image src="/bilder/backButtonWhite.png" alt="" style={{objectFit: "contain"}}  fill></Image>
            </div>
            <div> Back</div>
          </div>
        </div>
     <SignUp/>
   </div>}
      {(hasChosen && !makeUser) &&
      <div className='w-screen flex-col items-center flex'>
        <div className='w-2/3 h-fit_content'>
          <div className='flex-row items-center flex h-20 w-40 text-xl hover:brightness-95  hover:scale-105 ' onClick={()=>{sethasChosen(false)}}> 
            <div className='h-1/2 aspect-square relative'>
              <Image src="/bilder/backButtonWhite.png" alt="" style={{objectFit: "contain"}}  fill></Image>
            </div>
            <div> Back</div>
          </div>
        </div>
        <SignIn/>
      </div>
      }
    </div>
  )
}

export default page