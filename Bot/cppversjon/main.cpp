#include "gameLogic.hpp"
#include <iostream>
#include <cstdint>
#include "transTable.hpp"

Board brett;

int main() {
    brett.initializeBoard();
    brett.playsequence("4343233424");
    brett.printEveryBoard();




    
    int value = -10000;
    int best_value = -100000;
    int best_move = -1;
    brett.flip_board();
    brett.printEveryBoard();
    
    for(int p = 0; p<7; p++ ){


        if(!brett.canPlay(p)){
            printf("%s", "continued");
            continue;
        }
        
        
        brett.addPiece(p);
        if (brett.checkWin()){

            printf("won here");
            best_move = p;
            
            brett.removePiece(p);
            brett.printEveryBoard();
            break;
        }
        
        value = brett.negamax(brett.countMoves(), -100, 100);
        brett.flip_board();
        brett.removePiece(p);
        value = -value;
        printf("midprint: %d  nodes: %llu\n", value, brett.nodes);
        if (value > best_value){
            best_value = value;
            best_move = p;
         }
     
    }
    brett.addPiece(best_move);
    brett.flip_board();
    brett.printEveryBoard();

    printf("%d  %d", best_move+1, best_value);

    std::cout<<"\n"<<std::endl;
    return 0;
}




/*
Position: 4343233424  Time 128  nodes: 1341305998

*/