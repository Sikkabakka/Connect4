import React from 'react'
import Image from "next/image";

const how_To_play = () => {
  return (
    <div className ="w-screen h-screen bg-zinc-900" 
      style={{ height: "calc(100vh - 80px)" }}>
        <div className='center flex text-3xl text-center pt-10'>
          <h1 className=''>How to play!</h1>
        </div>
        <div className='center flex-col w-full flex pt-20'>
            <p className='text-2xl lg:w-2/3 md:w-3/4 sm:w-4/5 text-center'>
              Fire på rad er et strategisk brettspill for to spillere, hvor målet er å være den første til å få fire av ens egen farge på rad enten horisontalt, vertikalt eller diagonalt. Brettet ser sånn ut:
            </p>

            <div className='lg:w-1/2 md:w-2/3 sm:w-3/4  aspect-square relative'>
              <Image src="/bilder/EmptyBoard.png" alt='' style={{objectFit: "contain"}}  fill></Image>
            </div>

            <p className='text-2xl lg:w-2/3 md:w-3/4 sm:w-4/5 text-center'>
              Å spille en brikke er veldig simpelt. Hover musen over en kollone og venstre klikk. Der du vil plassere vil bli mørkere, sånn som skjer på dette brettet:
            </p>

            <div className='lg:w-1/2 md:w-2/3 sm:w-3/4  aspect-square relative'>
              <Image src="/bilder/hoverBilde.png" alt='' style={{objectFit: "contain"}}  fill></Image>
            </div>

            <p className='text-2xl lg:w-2/3 md:w-3/4 sm:w-4/5 text-center'>
                Du og motstanderen bytter på å plassere en brikke helt til en har vunnet eller brettet er fylt opp. Husk at man kan få fire på rad horisontalt, vertikalt og diagonalt. På disse 4 brettetene vinner rød, kan du se hvor?
            </p>


            <div className='lg:w-1/2 md:w-2/3 sm:w-3/4  aspect-square flex-col flex'>
              <div className='w-full h-1/2 flex-row flex'>

                <div className='w-1/2 aspect-square m-3 relative'>
                  <Image src="/bilder/win1.png" alt='' style={{objectFit: "contain"}}  fill></Image>
                </div> 

                <div className='w-1/2 m-3 relative'>
                  <Image src="/bilder/win2.png" alt='' style={{objectFit: "contain"}}  fill></Image>
                </div>  

              </div>
              <div className='w-full h-1/2 flex-row flex'>

                <div className='w-1/2 aspect-square m-3 relative'>
                  <Image src="/bilder/win3.png" alt='' style={{objectFit: "contain"}}  fill></Image>
                </div> 

                <div className='w-1/2 m-3 relative'>
                  <Image src="/bilder/win4.png" alt='' style={{objectFit: "contain"}}  fill></Image>
                </div>  

              </div>
            </div>

            <p className='text-2xl lg:w-2/3 md:w-3/4 sm:w-4/5 text-center pb-20'>
                Det er alt! Lykke til!👍
            </p>

        </div>


    </div>
  )
}

export default how_To_play