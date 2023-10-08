from MinMax import *
from game_logic import *
import copy

#funker sånn halveis, men prøv prove_brett og ta nummer 1 her vil den få feil, så finn ut hva som skjer

def game_loop():
    brettet =[[0, 0, 0, 0, 0, 0],
              [0, 0, 0, 0, 0, 0],
              [0, 0, 0, 0, 0, 0],
              [0, 0, 0, 0, 0, 0],
              [0, 0, 0, 0, 0, 0],
              [0, 0, 0, 0, 0, 0],
              [0, 0, 0, 0, 0, 0]]
    prove_brett = [ [0,  0,  0,  0, -1,  1],
                    [0,  0,  0,  0,  0, -1],
                    [1, -1, -1, -1,  1, -1],
                    [1, -1, -1,  1, -1,  1],
                    [0,  0,  0,  0,  1,  1],
                    [0,  0,  0,  0,  1,  1],
                    [0,  0,  0,  0,  0, -1]]
    prove_brett2 = [[1, -1,  1,  1,  -1, -1],
                    [0,  0,  0,  0,  1, -1],
                    [0, -1,  1, -1,  1, -1],
                    [0,  1, -1, -1, -1,  1],
                    [1, -1,  1,  1,  1, -1],
                    [0,  0, -1, -1,  1,  1],
                    [0,  0,  1, -1,  1, -1]]
    prove_brett3 = [[1, -1,  1,  1,  -1, -1],
                    [0,   1,  1, -1,  1, -1],
                    [0,  -1,  1, -1,  1, -1],
                    [1,   1, -1, -1, -1,  1],
                    [-1, -1,  1,  1,  1, -1],
                    [0,  -1, -1, -1,  1,  1],
                    [0,  -1,  1, -1,  1, -1]]
    prove_brett4 = [[1, -1,  1,  1,  -1, -1],
                    [-1,  -1,  1,  -1,  1, -1],
                    [1, -1,  1, -1,  1, -1],
                    [1,  1, -1, -1, -1,  1],
                    [1, -1,  1,  1,  1, -1],
                    [0,  0, -1, -1,  1,  1],
                    [0,  0,  1, -1,  1, -1]]
    depth = 9
    brettet = copy.deepcopy(prove_brett)
    while True not in check_win(brettet) and check_draw(brettet): 
        mamma = copy.deepcopy(brettet)
        
        print_board(turn_board(change_board_characters(mamma)))
        alpha = -math.inf
        beta = math.inf
        move = int(input("Hvilken kollone vil du plassere brikken din"))

        brettet = add_piece(brettet, move, 1)

        score, AImove = minmax(brettet, -1,depth, alpha, beta)
 
        brettet = add_piece(brettet, AImove, -1)
       
        kopi = copy.deepcopy(brettet)
        print_board(turn_board(change_board_characters(kopi)))
        print("movedone:", AImove, score)
        depth = depth + 1   
    print("spillet er over")
    print_board(turn_board(change_board_characters(brettet)))   
    print("spillet er over")
game_loop()
#game 1: https://connect4.gamesolver.org/?pos=11444453523363633447
#game 2: https://connect4.gamesolver.org/?pos=674553322151141114544553336677764