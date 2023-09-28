from MinMax import *
from game_logic import *
import copy



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

    brettet = copy.deepcopy(prove_brett2)
    while True not in check_win(brettet) and check_draw(brettet): 
        kopi = copy.deepcopy(brettet)
        print_board(turn_board(change_board_characters(kopi)))
        alpha = -math.inf
        beta = math.inf
        depth = 17
        move = int(input("Hvilken kollone vil du plassere brikken din"))

        brettet = add_piece(brettet, move, 1)

        score, AImove = minmax(brettet, -1,depth, alpha, beta)
 
        brettet = add_piece(brettet, AImove, -1)
       
        kopi = copy.deepcopy(brettet)
        print_board(turn_board(change_board_characters(kopi)))
        print("movedone:", AImove, score)
        print(brettet, "dette er provebrett")
    print_board(turn_board(change_board_characters(kopi)))   
    print("spillet er over")
game_loop()
