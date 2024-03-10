#include <iostream>
#include <cstdint>
#include <iomanip>
#include <vector>
#include <ctime>
#include "transTable.hpp"
#include "gameLogic.hpp"



void Board::initializeBoard(){

    for(int i = 0; i<49; ++i){
        if ((i%7)==0){
            key |= (1ULL << (i+1));
    }}}


void Board::printBoard(unsigned long long bitboard){
    printf("\n");
    for(int x = 0; x<7; ++x){
        for( int i = 1; i<8; ++i){
            std::cout<<(bitboard & (1ULL << (i*7-x)) ? 1:  0);

    }
    std::cout<<" "<<std::endl;
    }}


void Board::printSelf() 
{
    for(int x = 0; x<7; ++x) {
        for( int i = 1; i<8; ++i) {
            std::cout<<(board & (1ULL << (i*7-x)) ? 1:  0);
        }
    std::cout<<"\n"<<std::endl;
    }
}

void Board::printEveryBoard(){
    std::cout<< "Symbols:   Board:    PlayMask:   key:"<<std::endl;
        for(int x = 0; x<7; ++x){
        for(int i = 1; i<8; ++i){
            if(x!=0){
                if (playMask & (1ULL << (i*7-x))){
                    if (board & (1ULL << (i*7-x)))
                    {
                        std::cout<<"x";
                    }
                    else{
                        std::cout<<"o";
                    }
                
                }
                else{
                    std::cout<<"-";
                }
            }
            else{
                std::cout<<" ";
            }
            }

        std::cout<<"    ";
        for( int i = 1; i<8; ++i){
            std::cout<<(board & (1ULL << (i*7-x)) ? 1:  0);
        }

        std::cout<<"    ";
        for(int i = 1; i<8; ++i){
            std::cout<<(playMask & (1ULL << (i*7-x)) ? 1:  0);
        }
        std::cout<<"    ";
        for(int i = 1; i < 8; ++i){
            std::cout << (key & (1ULL << (i*7-x)) ? 1:  0);
        }
        std::cout<<" "<<std::endl;

}}
void Board::printThreeBoard(uint64_t board1, uint64_t board2, uint64_t board3){
    printf("\n\n");
    std::cout<< "Board1:   Board2:    Board:"<<std::endl;


        for(int x = 0; x<7; x++){
            for( int i = 1; i<8; ++i){
                std::cout<<(board1 & (1ULL << (i*7-x)) ? 1:  0);
            }

            std::cout<<"    ";
            for(int i = 1; i<8; ++i){
                std::cout<<(board2 & (1ULL << (i*7-x)) ? 1:  0);
            }
            std::cout<<"    ";
            for(int i = 1; i < 8; ++i){
                std::cout << (board3 & (1ULL << (i*7-x)) ? 1:  0);
            }
            std::cout<<" "<<std::endl;

        }
        }
void Board::printWithSymbols(){

    for(int x = 0; x<7; ++x){
        for(int i = 1; i<8; ++i){
            if(i != 0){
                if (playMask & (1ULL << (i*7-x))){
                    if (board & (1ULL << (i*7-x)))
                    {
                        std::cout<<"x";
                    }
                    else{
                        std::cout<<"o";
                    }
                }
                else{
                    std::cout<<"-";
                }
            }
            else{
                std::cout<<" ";
            }
        }
        printf("\n");
    }  
    return;
    }
void Board::flip_board(){
    board ^= playMask;
    return;
}
bool Board::canPlay(int &col){
    return !(top_mask(col) & key);
}

void Board::addPiece(int col){
    
    if (canPlay(col)){
        uint64_t top_of_col = (full_mask(col) & key);
        // playMask |= (playMask + bottom_mask(col));
        // board ^= playMask;
        key ^= (top_of_col <<1) ^(top_of_col);
        playMask ^= top_of_col;
        board |= top_of_col;

        return;
    }
    else{
        std::cout<<"error: kollonen er full" << col<<std::endl;
        return;
    }
}
void Board::removePiece(int col){

    uint64_t top_of_col = (full_mask(col) & key);

    key ^= (top_of_col >>1);
    key ^= top_of_col;
    playMask ^= (top_of_col>>1);

    board ^= (top_of_col>>1);
    
}




void Board::playsequence(const std::string& sequence){
    for(int i =0; i<sequence.length(); ++i){
        flip_board();
        addPiece(sequence[i] - '0'-1);
    }
}
void Board::removesequence(const std::string& sequence){
    for(int i =0; i<sequence.length(); ++i){
        removePiece(sequence[(sequence.length()-i-1)] - '0'-1);
        flip_board();

    }
}
bool Board::checkWin(){

    uint64_t adjacent = 0ULL;
    // printEveryBoard();
    adjacent =(board &(board >> 1));
    if (adjacent &(adjacent>>2)) return true;

    adjacent = (board &(board >>7));
    if (adjacent &(adjacent>>14)) return true;

    adjacent = (board &(board>>6));
    if (adjacent &(adjacent>>12)) return true;

    adjacent = (board &(board>>8));
    if (adjacent &(adjacent>>16)) return true;
    
    return false;
}

bool Board::checkDraw(){
    return !(((full_bottom<<6) ^ key));

}
unsigned long long Board::top_mask(int col){
    return 1ULL<<(7*(col+1));
}
unsigned long long Board::bottom_mask(int col){
    return 1ULL<<(7*(col)+1);
}
unsigned long long Board::full_mask(int col) {
    return columnLength << (col*7+1);
}
int Board::countMoves(){
    int counter = 0;
    for(int i = 0; i<49; i++){
        if ((1ULL <<i) & playMask){
            counter++;
        }
    }
    return counter;
}


int Board::negamax(int depth, int a, int b){
    //om draw return 0
    nodes++;
    
    //sjekk om man har ett move som fører til win
    //hvis vunnet return 22-depth

    //gå gjennom hver index fra midten og utover:
        //hvis kollonen ikke er full:
            //set value = - (utfør minmax på et movet(husk å flippe hver verdi fordi da vil det være fra det))
            //hvis value > best_value: 
                //best_value = value
            //hvis a <best_value
                //a = best_value
            //hvis a>= b
                //break

        //ellers continue
    //return best_value

    if (transTable.get(board+playMask) != -100000 ){
        printf("skipped");
        return transTable.get(board+playMask);
    }
    flip_board();
    if (checkDraw()){
        return 0;
    }
    for(int i = 0; i<7; i++ ){
        if (canPlay(i)){
            addPiece(i);
        
            if (checkWin()){
                // printf(" returned for win\n");
                removePiece(i);
                return (43-depth);
            }
            
            removePiece(i);
            }
        else{
            continue;
        }
    }
    int max = 42 - depth-1; // max blir max hva man kan opnå siden man ikke kan vinne med engang
    if(b > max){
        // printf("returned\n");
        b = max; // basically setter b til det meste man kan få siden det ikke er vits at den er høyere og vi kan sjekke om noe er like denne og da altså det beste man kan klare
        if (a >= b){
            return b;
        }
    }
    int best_value = -1000;
    int value = -1000;
    for(int i = 0; i<7; i++ ){
        if (canPlay(moveOrder[i])){
            // printf("Adding piece %d: \n", i);
            // printEveryBoard();
            addPiece(moveOrder[i]);

            value = -negamax(depth+1, -b, -a);
            flip_board();
            
            removePiece(moveOrder[i]);

            if (value>best_value){
                best_value = value;
            }
            if (a<best_value){
                a = best_value;
            }
            if(a>=b){

                break;
            }

            }

        else{
            continue;
        }
    }
    transTable.put(board+playMask, a);

    return best_value;
}



//Legg til sånn at hvis motstanderen kan vinne neste runde så blokker

