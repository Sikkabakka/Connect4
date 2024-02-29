import React from 'react'


const page = () => {
  return (
    <div className="h-screen w-screen -z-10">
      <div className = "flex-col justify-center flex h-full w-full z-10">
        <div className="flex-row center w-full  h-2/5 flex">
          
        <Play text="Against Friends" link="./playfriends" />

          <div className="center flex">
            <h2 className="text-xl text-orange-500"> -- Play -- </h2>
          </div>
        
        <Play text="Against AI"  />

        </div>
        </div>
      </div>
)}


function Play({ text, link = "" } : { text: string, link?: string} ){
    return (
      <a href={link} className='h-full'>
        <div className="h-full w-96 m-4 bg-violet-700 center flex rounded hover:bg-violet-800">
          <p>
            {text}
          </p>
        </div>
      </a>
    )
}


export default page