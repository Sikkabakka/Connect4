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
    
    while [True] not in check_win(prove_brett) and check_draw(prove_brett):
        alpha = -math.inf
        beta = math.inf
        depth = 11
        move = int(input("Hvilken kollone vil du plassere brikken din"))

        prove_brett = add_piece(prove_brett, move, 1)

        score, AImove = minmax(prove_brett, -1,depth, alpha, beta)
 
        prove_brett = add_piece(prove_brett, AImove, -1)
        kopi = copy.deepcopy(prove_brett)
        
        print_board(turn_board(change_board_characters(kopi)))
        print("movedone:", AImove, score)
        print(prove_brett, "dette er provebrett")
    print(kopi)
    print("spillet er over")
game_loop()
