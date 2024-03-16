#ifndef TRANSPOSITION_TABLE_HPP
#define TRANSPOSITION_TABLE_HPP

#include <cstdint>
#include <vector>

class TranspositionTable {
public:
    struct Entry {
        uint64_t key;
        uint8_t value;
        uint8_t depth;
        uint8_t flag;
        uint8_t upperBound;
        uint8_t lowerBound;
    };
    
    int maxSize;
    std::vector<Entry> table;
    
    TranspositionTable(int size);

    unsigned int hashFunction(uint64_t key);

    void put(uint64_t key, uint8_t value, uint8_t depth, uint8_t flag);
    void resetTable();
    Entry get(uint64_t key);
    void printValues();
};

#endif // TRANSPOSITION_TABLE_HPP
