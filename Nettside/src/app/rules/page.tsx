import React from 'react'
import Image from "next/image";



const how_To_play = () => {
  return (
    <div className='center flex'>
      <div className='center flex-col flex w-screen'>
          <h1 className='text-4xl p-10'>How To Play</h1>
          <div className='text-center text-xl w-2/3'>
              <p>4 på rad er ett fantastisk brettspill for 2 personer hvor målet er å lage en rekke med 4 brikker etterhverandre, enten om det er skrått, til siden eller oppover. Man spiller på ett 6x7 brett som dette:</p>

          </div>
          <div className="w-1/2 aspect-square relative">
              <Image src="/bilder/EmptyBoard.png" alt='' style={{objectFit: "contain"}}  fill></Image>
            </div>

          <div className='text-center text-xl w-2/3'>
            <p>Sånn man spiller er at man bytter annenhver gang på å plassere en brikke i en kollone. For å plassere en brikke bare trykk på kollonen du vil plassere i. Den sirkelen som blir grå er der du vil plassere. Se på bilde under:</p>
          </div>
          
          <div className="w-1/2 aspect-square relative">
              <Image src="/bilder/hoverBilde.png" alt='' style={{objectFit: "contain"}}  fill></Image>
            </div>
            <div className='text-center text-xl w-2/3'>
              <p>Man vinner ved å skape en rekke med 4 av sine brikker på rad. Dette kan du lage sidelengs, oppover og på skrått. På alle brettene under vinner rødt, kan du se hvor?</p>
            </div>
          
          <div className="w-1/2 aspect-square relative">
              <div className='h-1/2 w-full flex-row flex'>

                <div className="w-1/2 aspect-square relative mr-10 ">
                    <Image src="/bilder/win1.png" alt='' style={{objectFit: "contain"}}  fill></Image>
                  </div>
                <div className="w-1/2 aspect-square relative">
                    <Image src="/bilder/win2.png" alt='' style={{objectFit: "contain"}}  fill></Image>
                  </div>

              </div>
              <div className='h-1/2 w-full flex-row flex'>

                <div className="w-1/2 aspect-square relative mr-10">
                    <Image src="/bilder/win3.png" alt='' style={{objectFit: "contain"}}  fill></Image>
                  </div>
                <div className="w-1/2 aspect-square relative">
                    <Image src="/bilder/win4.png" alt='' style={{objectFit: "contain"}}  fill></Image>
                  </div>

              </div>
          </div>
          <div className='text-center text-xl w-2/3 mb-20'>
            <p>Nå kan du reglene for 4 på rad! Lykke til!👍</p>
          </div>

          
          
          

      </div></div>
      

  )}

export default how_To_play