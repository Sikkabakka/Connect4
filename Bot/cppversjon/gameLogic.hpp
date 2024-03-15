#ifndef BOARD_HPP
#define BOARD_HPP

#include <cstdint>
#include <vector>
#include <string>
#include "transTable.hpp"


class Board {
public:
    uint64_t board = 0ULL;
    uint64_t playMask = 0ULL;
    uint64_t boardKey = 0ULL;
    uint64_t full_bottom = 8865353597186;
    uint64_t columnLength = 127;
    int best_move = 10;
   

    TranspositionTable transTable = TranspositionTable(16000057);
    bool firstcall = false;
    void initializeBoard();
    void putTransTable(uint64_t key, int value);
    void printBoard(unsigned long long bitboard);
    void printSelf();
    void printEveryBoard();
    void printThreeBoard(uint64_t board1, uint64_t board2, uint64_t board3);
    void flip_board();
    bool canPlay(int& col);
    void addPiece(int col);
    void removePiece(int col);
    void printWithSymbols();
    void playsequence(const std::string& sequence);
    void removesequence(const std::string& sequence);
    bool checkWin();
    bool checkDraw();
    int hasWinningMove();
    unsigned long long top_mask(int col);
    unsigned long long bottom_mask(int col);
    unsigned long long full_mask(int col);
    int countMoves();

    std::vector<int> moveOrder {3, 4, 2, 5, 1, 6, 0};
    uint64_t nodes = 0;

    int negamax(int depth, int a, int b);
};

#endif // BOARD_HPP
