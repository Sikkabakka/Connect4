"use client";
import React, {use, useEffect, useState} from 'react'
import {auth} from '@/database/firebaseConfig'
import { on } from 'events'
import { onAuthStateChanged, signOut } from "firebase/auth";

const AuthDetails = () => {

    const [user, setUser] = useState(null);


    useEffect(() => {
        const listen = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user)
            }else{
                setUser(null)
            }

        })
        return () => listen();
    })

    const userSignout = async () => {
        await signOut(auth)
        .then(() => {
            setUser(null)
            console.log("signed out")
        })
        .catch((error) => {
            console.log(error)
        })
    }
  return (
    <div>
        {user ? 
            <div className='w-screen h-fit_content items-center justify-center flex-col flex mt-20 text-2xl'>
                <p className='mb-4'>{`Signed in as: ${user.email}👍`}</p>
                <button onClick={userSignout} className='border-4 border-white rounded p-4 hover:brightness-75,  hover:scale-105'> Signout</button>
            </div> 
        : <p>Not Signed in</p>}
    </div>
  )


}

export default AuthDetails