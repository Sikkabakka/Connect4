"use client";
import React, {use, useEffect, useState} from 'react'
import SignIn from '@/components/SignIn'
import SignUp from '@/components/SignUp'
import AuthDetails from '@/components/AuthDetails'
import {auth} from '@/database/firebaseConfig'
import { onAuthStateChanged, signOut } from "firebase/auth";
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
  return (
    <div>
      <div></div>
      <button onClick={() => setmakeUser(true)}>Sign up</button>
      <button onClick={() => setmakeUser(false)}>Sign in</button>
      {makeUser && <SignUp/>}
      {!makeUser && <SignIn/>}
    </div>
  )
}

export default page