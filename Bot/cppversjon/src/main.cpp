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

extern "C"{
    int getBestMove(const char* iBrett){
        std::cout<<"starting"<<std::endl;

        brett.transTable.resetTable();
        brett.reset_board();
        brett.initializeBoard();

        brett.playsequence(iBrett);
        

        brett.printEveryBoard();

        return (play() +1);
    }
}

void testing(){ 

    while (!brett.checkWin() && !brett.checkDraw()){

        int x;
        std::cout<< "Hvor vil du spille?"<< std::endl;
        std::cin >> x;
        brett.addPiece(x -1);
        play();
        brett.printEveryBoard();
    }

}
int main() {
    brett.initializeBoard();
    brett.playsequence("");
    brett.printEveryBoard();
    brett.transTable.resetTable();
    testing();
    std::cout<<"\n"<<std::endl;
    return 0;
}




/*
Position: 4343233424  Time 128  nodes: 1341305998

*/