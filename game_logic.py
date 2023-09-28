#Alt om selve spillet, som å gjøre moves, lagre positionen og sjekke for om man har vunne

def check_top_of_column(column):
    for i, piece in enumerate(column):
        if piece != 0:
            return i-1
    return 5
def add_piece(board, column, team):
    #få inn column og sett på toppen av den columen, kanskje endre hvordan brettet ser ut for å gjør det lettere å lage dette
    board[column][check_top_of_column(board[column])] = team
    return board
def remove_piece(board, column):
    board[column][check_top_of_column(board[column])+1] = 0
    return board

def check_win(board):
    return [check_column(board), check_diagonal(board), check_row(board)]

def check_draw(board):
    top_of_columns = set([column[0] for column in board])
    if 0 in top_of_columns:
        return True
    return False
    
def print_board(board):
    for row in board:
        print(row)

def change_board_characters(board):
    for row in board:
        for i, piece in enumerate(row):
            if piece == 1:
                row[i] = "X"
            elif piece == -1:
                row[i] = "O"
            else:
                row[i] = " "
    return board

def turn_board(board):
    new_board = [[row[i]for row in board]for i in range(0,6)]
    return new_board
def check_column(board):
   
    columns = [[row[i]for row in board]for i in range(0,6)]
    possible_wins = [[column[x+i]for x in range(0, 4)]for column in columns for i in range(0, 3) ]
    decision = [True for possible_win in possible_wins if len(set(possible_win)) == 1 if possible_win[0] != 0]
    return true_in_list(decision)

def check_row(board):
    possible_wins = [[row[x+i]for x in range(0, 4)] for row in board for i in range(0, 3)]
   
    decision = [True for possible_win in possible_wins if len(set(possible_win)) == 1 if possible_win[0] != 0]
    return true_in_list(decision)
def true_in_list(liste):
    for i in liste:
        if i == True:
            return True
def check_diagonal(board):
    #insane list comprehension
    
    right_diagonals_rows = [[board[i+x+1][x]for x in range(0, 6-i)]for i in range(0, 6)]
    rigth_diagonals_columns = [[board[x][i + x]for x in range(0, 6-i)]for i in range(0, 6)]
    left_diagonals_rows = [[board[i +5-x][x]for x in range(5, i, -1)]for i in range(0, 6)]
    left_diagonals_columns = [[board[x][i-x] for x in range(0, i+1)]for i in range(5, -1, -1)]
    
    diagonals = right_diagonals_rows + rigth_diagonals_columns + left_diagonals_rows + left_diagonals_columns

    diagonals = [each for each in diagonals if len(each) >= 4]
    
    possible_wins = [[diagonal[x+i]for x in range(0, 4)] for diagonal in diagonals for i in range(0, len(diagonal)-3)]
    
    decision = [True for possible_win in possible_wins if len(set(possible_win)) == 1 if possible_win[0] != 0]
    
    return true_in_list(decision)
def check_legal_moves(board):
    return[i for i in range (len(board))  if board[i][0] == 0]
         
