# Connect 4 bot

A connect 4 website where you can play locally with your friends, or against a connect 4 bot. 

## Introduction

Welcome to my Connect 4 project, where I've developed a perfect Connect 4 bot in both C++ and Python, along with a web application to challenge and play against this bot or even play against friends locally. This project is a fun starting project into game AIs and has been a fun challenge for me.

## Connect 4 bot
The Connect 4 bot is uses advanced algorithms and techniques, including:

- **Negamax with Alpha-Beta Pruning**: The bot employs the negamax  algorithm enhanced with alpha-beta pruning to efficiently search through the game tree and determine the best moves.[Read More](https://en.wikipedia.org/wiki/Negamax)
  
- **Bitboards**: Utilizing bitboards for board representation and manipulation, the bot optimizes performance and memory usage for a faster competutional time [Read More](https://en.wikipedia.org/wiki/Bitboard)
  
- **Transposition Table**: To avoid redundant calculations and improve search efficiency, a transposition table is implemented for storing previously evaluated positions and their associated scores.[Read More](https://en.wikipedia.org/wiki/Negamax)
  
- **Lookup Table**: In the early stages of the game, the bot utilizes a lookup table generated with [Pascal Pons' Connect4 solver](https://github.com/PascalPons/connect4), to make it so the first moves dont take an eternity.

## Bot Versions
The bot is implemented in c++ and in python:
- **C++**: The better of the two, has all the differnet optimizations and is playable with reasonable time.
  
- **Pyton**:  Initially developed as the project's prototype, the Python version implements the negamax algorithm with alpha-beta pruning. However, due to performance constraints in computational speed i shifted to a more advanced bot in C++.

## Web Application
The react app is a web application where you can play connect 4. Currently you can play locally against your friends and against the bot if you set it up either on your computer or on a server. 
Future plans is to make it so you can play online, either random or friends. Would be cool if it could become like chess.com so there is a lot of improvements to be made.

## Installation on Mac os
If you want to run the project locally this is how you would install it on Mac OS:

**Prerequisites:**

- **Git:** Install Git if not already installed. You can download it from [here](https://git-scm.com/downloads).
- **Node.js and npm**: Make sure you have Node.js and npm installed. You can download them from [here](https://nodejs.org/en).
- **Python**: Ensure Python is installed on your system. You can download it from [here](https://www.python.org/downloads/).

**Cloning the repository:**
1. Open a terminal in the repository where you want the project placed
2. Clone the repository:
```bash
  git clone https://https://github.com/Sikkabakka/Connect4
```

**Setting up the bot**
1. Open the cpp directory
```bash
    cd bot/cppversjon
```
2. Download flask
```bash
  pip3 install flask
```
or
```bash
  pip install flask
```
3. To run the flask api:
```bash
  python3 src/app.py
```

**Setting up the website**
1. Open a new terminal.
2. 


