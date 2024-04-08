#include <iostream>
#include <cstdint>
#include <iomanip>
#include <vector>
#include <ctime>
#include "transTable.hpp"
#include "gameLogic.hpp"
#include <algorithm>
#include <fstream>

void Board::initializeBoard(){

    for(int i = 0; i<49; ++i){
        if ((i%7)==0){
            boardKey |= (1ULL << (i+1));
    }}
    makeLookUpTable();
    }

void Board::makeLookUpTable(){
    earlyLookUpTable.reserve(947761);
    std::ifstream rf("earlyPosition.dat", std::ios::out | std::ios::binary);

    int key, value;
    while (rf.read(reinterpret_cast<char*>(&key), sizeof(uint64_t)) &&
           rf.read(reinterpret_cast<char*>(&value), sizeof(int))) {
        earlyLookUpTable[key] = value;
    }
    rf.close();
    return;
}

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
    std::cout<< "Symbols:   Board:    PlayMask:   boardKey:"<<std::endl;
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
            std::cout << (boardKey & (1ULL << (i*7-x)) ? 1:  0);
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
void Board::reset_board(){
    board = 0ULL;
    playMask = 0ULL;
    boardKey = 0ULL;
    initializeBoard();
    return;
}
bool Board::canPlay(int &col){
    return !(top_mask(col) & boardKey);
}

void Board::addPiece(int col){
    
    if (canPlay(col)){
        uint64_t top_of_col = (full_mask(col) & boardKey);
        // playMask |= (playMask + bottom_mask(col));
        // board ^= playMask;
        boardKey ^= (top_of_col <<1) ^(top_of_col);
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

    uint64_t top_of_col = (full_mask(col) & boardKey);

    boardKey ^= (top_of_col >>1);
    boardKey ^= top_of_col;
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
    return !(((full_bottom<<6) ^ boardKey));

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
int Board::hasWinningMove(){
      for(int i = 0; i<7; i++ ){
        if (canPlay(i)){
            addPiece(i);
        
            if (checkWin()){

                removePiece(i);
                return i;
            }
            
            removePiece(i);
            }
        else{
            continue;
        }
    }
    return 0;
}
int Board::corrected(uint8_t value){
    if (value > 42){

        return value-256;
    }
    else{

        return value;
    
    }
}

int Board::negamax(int depth, int a, int b){
    //om draw return 0
    int originA = a;
    nodes++;
    std::cout<< earlyLookUpTable.size()<<std::endl;
    // if (depth <8){

    //     try {
    //         int value = earlyLookUpTable.at(boardKey + board); // If key doesn't exist, it will throw an std::out_of_range exception
    //     } catch (const std::out_of_range& e) {
    //         std::cerr << "Key not found: " << e.what() << std::endl;
    //         }

    // }
   

    //fix sånn at den sjekker om motstanderen kan vinne neste runde og blokker
    
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
                return 42-depth;
            }
            
            removePiece(i);
            }
        else{
            continue;
        }
    }
    //sjekk om denne positionen har blitt lagt inn i transTable

    TranspositionTable::Entry savedEntry = transTable.get(board+playMask);


    if (savedEntry.value != 100 && savedEntry.depth >= depth){
        int savedValue = corrected(savedEntry.value);

        if (savedEntry.flag == 0){
            return savedValue;
        }
        else if (savedEntry.flag == 2){

            a = std::max(a, savedValue);
        }
        else if (savedEntry.flag == 1){
            b = std::min(b, savedValue);
        }
        if (a >= b){
            return savedValue;
        }
    }
    int max = 42 - depth-1;
     // max blir max hva man kan opnå siden man ikke kan vinne med engang
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
            if (a<=best_value){
                a = best_value;
            }
            if(a>=b){
                break;
            }
            }
    }  
    
    TranspositionTable::Entry el;

    if (best_value <= originA){
        el.flag = 1;
    } 
    else if(best_value >= b){
        el.flag = 2;
    } 
    else{
        el.flag = 0;
    }
    el.depth = depth;
    transTable.put(board+playMask, a, el.depth, el.flag);
    

    return a;
}




//Legg til sånn at hvis motstanderen kan vinne neste runde så blokker

