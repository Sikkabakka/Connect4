import React from 'react'


const page = () => {
  return (
    <div className="w-screen -z-10 center flex "
      style={{ height: "calc(100vh - 80px)" }}
    >
      <div className="flex-row center w-full  h-3/5 flex">
            
          <Play text="Against Friends" link="./playfriends" />
            <div className="center flex">
              <h2 className="text-xl text-orange-500"> -- Play -- </h2>
            </div>
          <Play text="Against AI" link="./playBot" />

      </div>
    </div>


)}


function Play({ text, link = "" } : { text: string, link?: string} ){
    return (
      <a href={link} className='h-full lg:w-1/3 md:w-2/4 sm:w-3/5 center flex'>
        <div className="w-3/4 aspect-square m-4 bg-violet-700 center flex rounded hover:bg-violet-800">
          <p className="text-2xl center flex">
            {text}
          </p>
        </div>
      </a>
    )
}


export default page