#include <iostream>
#include <cstdint>
#include <iomanip>
#include <vector>
#include <ctime>
#include "transTable.hpp"


// TranspositionTable table(1000000);




class Board {
public:

    //brikkene representert med 1 og 0 der 1-er er den nåverende spilleren
    uint64_t board = 0ULL;
    
    //ett brett hvor det er en 1-er hvor det er blitt plassert en brikke
    uint64_t playMask = 0ULL;

    //key en represenatsjon av første ledige sted man kan spille i hver kollone
    uint64_t key = 0ULL;

    uint64_t full_bottom= 8865353597186;

    uint64_t columnLength = 127;

    int best_move = 10;

    void initializeBoard(){

        for(int i = 0; i<49; ++i){
            if ((i%7)==0){
                key |= (1ULL << (i+1));
        }}}
    void printBoard(unsigned long long bitboard){
        printf("\n");
        for(int x = 0; x<7; ++x){
            for( int i = 1; i<8; ++i){
                std::cout<<(bitboard & (1ULL << (i*7-x)) ? 1:  0);

        }
        std::cout<<" "<<std::endl;
        }}


    void printSelf() 
    {
        for(int x = 0; x<7; ++x) {
            for( int i = 1; i<8; ++i) {
                std::cout<<(board & (1ULL << (i*7-x)) ? 1:  0);
            }
        std::cout<<"\n"<<std::endl;
        }
    }
    
    void printEveryBoard(){
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
     void printThreeBoard(uint64_t board1, uint64_t board2, uint64_t board3){
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
    void flip_board(){
        board ^= playMask;
        return;
    }
    bool canPlay(int &col){
        return !(top_mask(col) & key);
    }

    void addPiece(int col){
        
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
    void removePiece(int col){

        uint64_t top_of_col = (full_mask(col) & key);

        key ^= (top_of_col >>1);
        key ^= top_of_col;
        playMask ^= (top_of_col>>1);

        board ^= (top_of_col>>1);
        
    }


    void printWithSymbols(){

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
    
    void playsequence(const std::string& sequence){
        for(int i =0; i<sequence.length(); ++i){
            flip_board();
            addPiece(sequence[i] - '0'-1);
        }
    }
    void removesequence(const std::string& sequence){
        for(int i =0; i<sequence.length(); ++i){
            removePiece(sequence[(sequence.length()-i-1)] - '0'-1);
            flip_board();

        }
    }
    bool checkWin(){

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

    bool checkDraw(){
        return !(((full_bottom<<6) ^ key));

    }
    unsigned long long top_mask(int col){
        return 1ULL<<(7*(col+1));
    }
    unsigned long long bottom_mask(int col){
        return 1ULL<<(7*(col)+1);
    }
    unsigned long long full_mask(int col) {
        return columnLength << (col*7+1);
    }
    int countMoves(){
        int counter = 0;
        for(int i = 0; i<49; i++){
            if ((1ULL <<i) & playMask){
                counter++;
            }
        }
        return counter;
    }
    std::vector<int> moveOrder {3, 4, 2, 5, 1, 6, 0};
    uint64_t nodes = 0;

    int negamax(int depth, int a, int b){
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

        return best_value;
    }
};




void print(int input){
    printf("%d\n", input);
}

//Legg til sånn at hvis motstanderen kan vinne neste runde så blokker

int main() {
    Board brett;
    
    brett.initializeBoard();
    brett.playsequence("43432213");
    brett.printEveryBoard();
    printf("%d won?\n", brett.checkWin() );



    
    int value = -10000;
    int best_value = -100000;
    int best_move = -1;
    brett.flip_board();
    brett.printEveryBoard();
    
    for(int p = 0; p<7; p++ ){


        if(!brett.canPlay(p)){
            continue;
        }

        
        brett.addPiece(p);
        if (brett.checkWin()){


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