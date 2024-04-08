#include "gameLogic.hpp"
#include <iostream>
#include <cstdint>
#include "transTable.hpp"
#include <string>
Board brett;
int play(){

    int value = -10000;
    int best_value = -100000;
    int best_move = -1;
    brett.flip_board();

    
    for(int p = 0; p<7; p++ ){


        if(!brett.canPlay(p)){
            continue;
        }
        
        
        brett.addPiece(p);
        if (brett.checkWin()){

            printf("won here");
            best_move = p;
            
            brett.removePiece(p);

            break;
        }

        value = brett.negamax(brett.countMoves(), -100, 100);
        brett.flip_board();
        brett.removePiece(p);
        value = -value;
        // printf("midprint: %d  nodes: %llu\n", value, brett.nodes);
        if (value > best_value){
            best_value = value;
            best_move = p;
         }
     
    }
  


    brett.addPiece(best_move);
    brett.flip_board();

    printf("\n %d  %d \n", best_move+1, best_value);
    return best_move;
}


int getBestMove(std::string iBrett){
    brett.transTable.resetTable();
    brett.reset_board();
    brett.playsequence(iBrett);
    return play();
}

void testing(){
    //ikke fikset nå 
    int x;
    std::cout<< "Hvor vil du spille?"<< std::endl;
    std::cin >> x;
    while (!brett.checkWin() && !brett.checkDraw()){
        play();
    }

}
int main() {
    brett.initializeBoard();
    brett.playsequence("");
    brett.printEveryBoard();
    brett.transTable.resetTable();
    
    std::cout<<"\n"<<std::endl;
    return 0;
}




/*
Position: 4343233424  Time 128  nodes: 1341305998

*/