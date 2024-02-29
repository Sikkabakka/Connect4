from game_logic import *
import math
import copy

# du må fikse noe for når man kan vinne på neste move, sånn at du slipper å sende det videre inn i minmax greia, bare gi den den verdien som den har
#kanskje lage en funksjon som sjekker om det er mulig å vinne med et move, hvis det er det så skal den velge det move
#vet ikke helt hvorfor dette skjer men sånn er det bare.

def minmax(minmax_board, player, depth, alpha, beta):
    
    #hvis spillet er over skal return hvor dypt spillet er kommet
    #hvis dette er 0 vil det si at det har vært en draw mens hvis det er ett vin vil det ha en verdi opp til 22
    copy_board = copy.deepcopy(minmax_board)
    
    # finn alle lovlige moves

    legal_moves = check_legal_moves(minmax_board)
    for legal_move in legal_moves:
        copy_board = add_piece(copy_board, legal_move, player)
        # print("sjekker om noen har vunnet", player, legal_move)
        # for i in copy_board:
        #     print(i)
        if True in check_win(copy_board):
            # print("noen har vunnet","player and move:", player, legal_move, "depth:",  depth)
            # print("value", (player * ((22 - depth)+1)))
            # for i in minmax_board:
            #     print(i)
            return (((22 - depth)+1)), legal_move
        
        copy_board = remove_piece(copy_board, legal_move)
    if(22 - depth) == 0:
        # print("draw")
        # for each in minmax_board:
            # print(each)
        return player * (22 - depth), None
    

    #sjekker om det er mulig å vinne med et move

    #Value blir minus uendelig siden alle moves skal være bedre en ingen move
    value = -1000000000
    
    #dette er for å lagre det beste move
    best_move = None

    #

    

    #for hvert move som er lovlig skal jeg gi en verdi og finne den beste verdien
    # print(legal_moves)
    for legal_move in legal_moves:
        # print("sjekker move", legal_move, "depth:", depth, player)
        
        
       
        copy_board = add_piece(copy_board, legal_move, player)
        # for i in copy_board:
        #     print(i)
        # print(minmax_board, legal_moves, legal_move)
      
        #finner veriden til det move ved å gjøre minmax på det nye movet, men som om jeg er den andre personen
        #den vil da gjør minmax for den andre personen og sende inn på nytt fra hvert move som den første playeren igjen
        #til slutt når dette et sted hvor noen har vunnet og da har vi fått noen verdier 
        #da skal funksjonen velge det beste movet annenhvergang for hver person og vil gi en verdi til spillet hvis begge spiller perfekt

        #denne verdien vil bli høyere hvis man vinner fortere, og vil også være kjappeste vei til å vinne

        move_value, o = minmax(copy_board, (player *-1),(depth +1), -1 *beta,-1 *alpha)
        copy_board = remove_piece(copy_board, legal_move)
        move_value = -move_value
        # if move_value == -2:
        #     print(legal_move, minmax_board)
        # print(value, move_value, f"depth: {depth}", player)
        #minmax vil gi verdier til hver av de legal movesa man kan gjøre, her sjekker jeg om den verdien som er nå er bedre en de tidligere
        if move_value > value:
            
            value =  move_value
            #lagrer hvilet move som ga dette
            best_move = legal_move
            # print(move_value, best_move)
        else:

            continue
        

        alpha = max(alpha, value) 
        if alpha >= beta:

            return alpha, best_move 

    return value, best_move

