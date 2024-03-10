import React from 'react'
import Image from "next/image";


const rules = () => {
  return (
    <div className='w-screen'
        style={{ height: "calc(100vh - 80px)" }}> 
        <div className='center flex w-full h-20'>
            <h1 className='text-4xl'>How to play:</h1>
        </div>
        <div className='center text-center flex'>


            <div className='w-3/4 h-fit mb-20 flex-col center flex text-xl'>
                <div className='mb-10 items-center flex-col flex'>
                    <div className='mb-5'>
                    Connect 4 er et klassisk brettspill hvor målet er å koble fire av dine egne brikker på rad, enten horisontalt, vertikalt eller diagonalt på et 6x7 spillbrett.
                    </div>
                    <div className='lg:w-1/2 md:w-2/3 sm:w-3/4 aspect-square relative'>
                        <Image src="/bilder/EmptyBoard.png" fill style={{objectFit: "contain"}} sizes="(max-width:768) 100vw, (max-width:1025) 50vw, (max-width:1200), 50vw" alt=""></Image>
                    </div>
                </div>
                <div className='mb-10 items-center flex-col flex'>
                    <div className='mb-5'>
                    Den ene spilleren har røde brikker mens den andre har gule, og spillerne bytter på å legge en brikke på brettet.
                    </div>
                    <div className='lg:w-1/2 md:w-2/3 sm:w-3/4   aspect-square relative'>
                        <Image src="/bilder/SomePlaced.png" fill style={{objectFit: "contain"}} sizes="(max-width:768) 100vw, (max-width:1025) 50vw, (max-width:1200), 50vw" alt="" ></Image>
                    </div>
                </div>

                <div className='mb-10 items-center flex-col flex'>
                    <div className='mb-5'>
                    En kan vinne ved å koble fire brikker på rad, og spillet er over når en av spillerne har vunnet, eller brettet er fullt da blir det likt. På alle disse bildene vinner rødt!
                    </div>
                    <div className='lg:w-1/2 md:w-2/3 sm:w-3/4 aspect-square relative flex-col flex'>
                        <div className='flex-row flex w-full h-1/2'>
                                <div className='lg:w-1/2 md:w-2/3 sm:w-3/4 aspect-square relative'>
                                    <Image src="/bilder/win1.png" fill style={{objectFit: "contain"}} sizes="(max-width:768) 100vw, (max-width:1025) 50vw, (max-width:1200), 50vw" alt=""></Image>
                                </div>
                                <div className='lg:w-1/2 md:w-2/3 sm:w-3/4 aspect-square relative'>
                                    <Image src="/bilder/win2.png" fill style={{objectFit: "contain"}} sizes="(max-width:768) 100vw, (max-width:1025) 50vw, (max-width:1200), 50vw" alt=""></Image>
                                </div>
                        </div>
                        <div className='flex-row flex w-full h-1/2'>
                                <div className='lg:w-1/2 md:w-2/3 sm:w-3/4 aspect-square relative'>
                                    <Image src="/bilder/win3.png" fill style={{objectFit: "contain"}} sizes="(max-width:768) 100vw, (max-width:1025) 50vw, (max-width:1200), 50vw" alt=""></Image>
                                </div>
                                <div className='lg:w-1/2 md:w-2/3 sm:w-3/4 aspect-square relative'>
                                    <Image src="/bilder/win4.png" fill style={{objectFit: "contain"}} sizes="(max-width:768) 100vw, (max-width:1025) 50vw, (max-width:1200), 50vw" alt=""></Image>
                                </div>
                        </div>
                    </div>
                </div>
                <div className='mb-10 items-center flex-col flex'>
                    <div className='mb-5'>Lykke til! 👍</div>
                </div>
                
            </div>

        </div>
        
        <div></div>
    </div>
  )
}

export default rules