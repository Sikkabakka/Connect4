#ifndef TRANSPOSITION_TABLE_HPP
#define TRANSPOSITION_TABLE_HPP

#include <cstdint>
#include <vector>

class TranspositionTable {
public:
    struct Entry {
        uint64_t key;
        uint8_t value;
    };
    
    int maxSize;
    std::vector<Entry> table;

    TranspositionTable(int size);

    int hashFunction(uint64_t key);

    void put(uint64_t key, int value);

    int get(uint64_t key);
};

#endif // TRANSPOSITION_TABLE_HPP
