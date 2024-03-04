"use client";
import React, { use } from 'react'
import "../globals.css";
import { findBottomTile, createBoard, placePiece, checkWin } from '../utils/handling';
import { useState, useEffect } from 'react';
import { printCustomRoutes } from 'next/dist/build/utils';
import Image from 'next/image';
import { motion } from 'framer-motion';

const play = () => {
  const[board, setBoard] = useState(createBoard())
  const [won, setWon] = useState(false)
  const [turn, setTurn] = useState(-1)
  
  return (
    <div className ="w-screen h-screen bg-zinc-900" 
      style={{ height: "calc(100vh - 80px)" }}>
        <Header won={won} turn={turn}></Header>
      <div className='justify-center items-start flex h-full w-full'>
        <Board board = {board} setBoard={setBoard} setWon = {setWon} setTurn = {setTurn} won={won}/>
      </div>
    </div>
  )
}
function Header({won, turn}:{won: boolean, turn: number}){
  return (
  <div className='w-full center flex'>
    <div className='lg:w-1/2 md:w-3/4 sm:w-5/6 h-20  flex-row items-end justify-between flex mb-1'>
      <div className='flex-row center flex  border-black items-start' style={turn===-1 ? {borderColor:"red"}:{borderColor:"white"} }>
        <Image src="/bilder/monkey.jpeg" width={32} height={32} alt="" />
        <p className='pl-2 pr-2'>Player 1</p>
        </div>
      
      <motion.div className='h-10 w-10 rounded-full bg-white center flex'  
        style={turn===-1 ? {backgroundColor:"red"}:{backgroundColor:"yellow"}}
        variants={donglevariants}

        animate={won ? "won" : turn===-1 ? "red":"yellow" }
      >
        {won && <div className=' h-10 w-10 center flex text-black'>
          Won!
          </div>}
      </motion.div>
      
      <div className='flex-row-reverse center flex ' style={turn===1 ? {borderColor:"yellow"}:{borderColor:"white"}}>
        <Image src="/bilder/monkey.jpeg" width={32} height={32} alt="" />
        <p className='pl-2 pr-2'>Player 2</p>
        </div>
    </div>
  </div>
)}

let donglevariants = {
  "center": {
    x: 0
  },
  "red": {
    x: "-14vw"
  },
  "yellow": {
    x: "14vw"
  },
  "won":{
    x: "0",
    height: "70px",
    width:"70px"
  }
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

  
function Column({column, team, board, index, setBoard, setWon, setTurn, won} : {column: Array<number>, team: number, board : Array<Array<number>>, index : number, setBoard: any, setWon: any, setTurn:any, won:boolean}){
  const [hover, setHover] = useState(false);
  const [bottomTile, setBottomTile] = useState(findBottomTile(column));
  const [full, setfull] = useState(false);
  useEffect(() => {
    setBottomTile(findBottomTile(column));
    if (bottomTile == -1){
      setfull(true)
    }
  });  
  useEffect(() => {
    if (won){
      setHover(false);
    }
  }, [won]
  )
  return ( 
    <div className="h-full w-[14.285714286%] flex-col justify-evenly items-center flex" 
      onMouseEnter={() =>{
        if (!won){
          setHover(true);
        }
        
      }}
      onMouseLeave={() =>{

        setHover(false);
      }}
      onClick={() => {!full && !won && setBoard(placePiece(board,team, index)); setBottomTile(findBottomTile(column)); setWon(checkWin(board)); }}
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


function Board({board, setBoard, setWon, setTurn, won} : {board : Array<Array<number>>, setBoard : any, setWon : any, setTurn: any, won:boolean}){
  const [team, setTeam] = useState(1)
  

  useEffect(() =>{

        setTeam(team*-1)
        setTurn(team*-1)

  },[board])

  useEffect(() => {
    if (won){
      setTurn(team)
    }
  }, [won])

  return (
    <div className="aspect-[1.166/1] lg:w-1/2 md:w-3/4 sm:w-5/6 bg-blue-300 ">
      <div id = "board" className=' h-full w-full  items-center justify-items-center  bg-blue-400  flex'>
        {board.map((tile, index) => {
          return (

            <Column key={index} column ={board[index]} team ={team} board = {board} index = {index} setBoard ={setBoard} setWon={setWon} setTurn={setTurn} won={won} />
          )
        })}

        
      </div>
        

    </div>
  )
}

export default play