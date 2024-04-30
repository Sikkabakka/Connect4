# Connect 4 bot

A connect 4 website where you can play locally with your friends, or against a connect 4 bot. 

## Introduction

Welcome to my Connect 4 project, where I've developed a perfect Connect 4 bot in both C++ and Python, along with a web application to challenge and play against this bot or even play against friends locally. This project is a fun starting project into game AIs and has been a fun challenge for me.

## Connect 4 bot
The Connect 4 bot is powered by advanced algorithms and techniques, including:

- **Negamax with Alpha-Beta Pruning**: The bot employs the negamax  algorithm enhanced with alpha-beta pruning to efficiently search through the game tree and determine the best moves.[Read More](https://en.wikipedia.org/wiki/Negamax)
  
- **Bitboards**: Utilizing bitboards for board representation and manipulation, the bot optimizes performance and memory usage for a faster competutional time [Read More](https://en.wikipedia.org/wiki/Bitboard)
  
- **Transposition Table**: To avoid redundant calculations and improve search efficiency, a transposition table is implemented for storing previously evaluated positions and their associated scores.[Read More](https://en.wikipedia.org/wiki/Negamax)
  
- **Lookup Table**: In the early stages of the game, the bot utilizes a lookup table generated with [Pascal Pons' Connect4 solver](https://github.com/PascalPons/connect4), enhancing its decision-making capability in crucial opening moves.
