from game_logic import *
import math

 

def minmax(minmax_board, player, depth, alpha, beta):
    #hvis spillet er over skal return hvor dypt spillet er kommet
    #hvis dette er 0 vil det si at det har vært en draw mens hvis det er ett vin vil det ha en verdi opp til 22

    if [True] in check_win(minmax_board):
        print("vinneren er", player, 22-depth)
        return player * (22 - depth)+1, None
    elif(22 - depth) == 0:
        return player * (22 - depth), None
    

    #Value blir minus uendelig siden alle moves skal være bedre en ingen move
    value = 1000000000
    
    #dette er for å lagre det beste move
    best_move = None

    #finn alle lovlige moves
    legal_moves = check_legal_moves(minmax_board)

    #for hvert move som er lovlig skal jeg gi en verdi og finne den beste verdien
    for legal_move in legal_moves:
      
        
        minmax_board = add_piece(minmax_board, legal_move, player)
        #finner veriden til det move ved å gjøre minmax på det nye movet, men som om jeg er den andre personen
        #den vil da gjør minmax for den andre personen og sende inn på nytt fra hvert move som den første playeren igjen
        #til slutt når dette et sted hvor noen har vunnet og da har vi fått noen verdier 
        #da skal funksjonen velge det beste movet annenhvergang for hver person og vil gi en verdi til spillet hvis begge spiller perfekt

        #denne verdien vil bli høyere hvis man vinner fortere, og vil også være kjappeste vei til å vinne
        
        move_value, o = minmax(minmax_board, (player *-1),(depth +1), -1 *beta,-1 *alpha)
        minmax_board = remove_piece(minmax_board, legal_move)
        move_value = -move_value

        #minmax vil gi verdier til hver av de legal movesa man kan gjøre, her sjekker jeg om den verdien som er nå er bedre en de tidligere
        if move_value < value:
            value =  move_value
            #lagrer hvilet move som ga dette
            best_move = legal_move
        else:
            continue
        
        #alpha skal være en verdi som sier
        # alpha = max(alpha, value) 
        # if alpha >= beta:
        #     print(alpha, beta)
        #     return alpha, best_move 

    return value, best_move

