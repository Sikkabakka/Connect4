import React from 'react'
import Image from "next/image";

const Navbar = () => {
    return (
        <div className="w-full h-20 bg-primary items-center justify-evenly flex text-xl overflow-hidden z-50">
          <div className ="flex-row justify-evenly center flex w-1/4 h-full ">
            <Image src="/bilder/icon.png" alt="icon" width={100} height={100} />
            <h1>Connect 4</h1>
          </div>
          <div className="flex-row justify-evenly flex w-full">
            <a href="./">
                <div className="hover:scale-95 hover:text-black">
                <h1>Play</h1>
                </div>
            </a>
            <a href='./rules'>
              <div className="hover:scale-95 hover:text-black">
                <h1>How to play</h1>
              </div>
            </a>
          </div>
          <div  className="hover:scale-95 hover:text-black w-1/5">
            <a href="./signingPage">
                <h1>Sign in</h1>
              </a>
          </div>
        </div>
    )
}

export default Navbar