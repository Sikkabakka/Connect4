"use client";
import React, { use } from 'react'
import "../globals.css";
import { findBottomTile, createBoard, placePiece, checkWin } from '../utils/handling';
import { useState, useEffect } from 'react';
import { printCustomRoutes } from 'next/dist/build/utils';
import Image from 'next/image';

const play = () => {
  const[board, setBoard] = useState(createBoard())
  const [won, setWon] = useState(false)
  const [turn, setTurn] = useState(-1)


  return (

    <div className ="w-screen h-screen bg-violet-100">
      <div className='w-screen center flex'>
        <div className='w-1/2 h-20  flex-row items-end justify-between flex text-black mb-1'>
            <div className='flex-row center flex border-2 border-black items-start' style={turn===-1 ? {borderColor:"red"}:{borderColor:"black"} }>
              <Image src="/bilder/monkey.jpeg" width={32} height={32} alt="" />
              <p className='pl-2 pr-2'>Player 1</p>
              </div>
            {won && <div>
              <p>Won</p>
            </div>}
            <div className='flex-row center flex border-2 border-black' style={turn===1 ? {borderColor:"yellow"}:{borderColor:"black"}}>
              <Image src="/bilder/monkey.jpeg" width={32} height={32} alt="" />
              <p className='pl-2 pr-2'>Player 2</p>
              </div>
          </div>
        </div>
      
      <div className='justify-center items-start flex h-full w-full'>
        <Board board = {board} setBoard={setBoard} won = {setWon} setTurn = {setTurn}/>
      </div>
    </div>
  )
}



function Piece({team, index, bottomTile, isHovering} : {team: number, index: number, bottomTile: number, isHovering: boolean}){
  const[piecestyle, setPiecestyle] = useState({backgroundColor: "white"});

  useEffect(() => {


    if (team === -1){
      setPiecestyle({backgroundColor: "#db2e3c"})
    }
    else if (team === 1){
      setPiecestyle({backgroundColor: "#edf03c"})
    }
    else if (!isHovering){
      setPiecestyle({backgroundColor:"#FFFFFF"})
    }
    else if(index ===  bottomTile && isHovering){

      setPiecestyle({backgroundColor: "#707070"})

    }}, [team, index, bottomTile, isHovering]);
  

  return (
    <div className='aspect-square w-11/12'>

      <div className="h-full w-full  rounded-full" 
          style={piecestyle}>
      </div>
    </div>
  )}

  
function Column({column, team, board, index, setBoard, won, setTurn} : {column: Array<number>, team: number, board : Array<Array<number>>, index : number, setBoard: any, won: any, setTurn:any}){
  const [hover, setHover] = useState(false);
  const [bottomTile, setBottomTile] = useState(findBottomTile(column));
  const [full, setfull] = useState(false);
  useEffect(() => {
    setBottomTile(findBottomTile(column));
    if (bottomTile == -1){
      setfull(true)
    }
  });  

  return ( 
    <div className="h-full w-[14.285714286%] flex-col justify-evenly items-center flex" 
      onMouseEnter={() =>{
        setHover(true);
      }}
      onMouseLeave={() =>{

        setHover(false);
      }}
      onClick={() => {!full && setBoard(placePiece(board,team, index)); setBottomTile(findBottomTile(column)); won(checkWin(board))}}
    >
      {column.map((tile, index) => {
        return (
          <Piece key={index} team={tile} index={index} bottomTile={bottomTile} isHovering={hover} />
        )
      })}
    </div>
  )
}


//når  mus entrer, finne hvilken kolonne den er i
//så sette hover på indexen til nederste tile i den kolonnen


function Board({board, setBoard, won, setTurn} : {board : Array<Array<number>>, setBoard : any, won : any, setTurn: any}){
  const [team, setTeam] = useState(1)
  

  useEffect(() =>{
        setTeam(team*-1)
        setTurn(team*-1)

  } ,[board])
  
  return (
    <div className="aspect-[1.166/1] w-1/2 bg-blue-300 ">
      <div id = "board" className=' h-full w-full  items-center justify-items-center  bg-blue-400  flex'>
        {board.map((tile, index) => {
          return (

            <Column key={index} column ={board[index]} team ={team} board = {board} index = {index} setBoard ={setBoard} won={won} setTurn={setTurn} />
          )
        })}

        
      </div>
        

    </div>
  )
}

export default play