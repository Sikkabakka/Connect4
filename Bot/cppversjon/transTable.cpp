#include "transTable.hpp"

TranspositionTable::TranspositionTable(int size) {
    table.reserve(size);
    maxSize = size;
}

int TranspositionTable::hashFunction(uint64_t key) {
    return key % maxSize;
}

void TranspositionTable::put(uint64_t key, int value) {

    Entry e;
    e.key = key;
    e.value = value;
    int index = hashFunction(key);
    table[index] = e;
}

int TranspositionTable::get(uint64_t key) {
    int index = hashFunction(key);

    //blir alltid false

    if (table[index].key == key) {
        return table[index].value;
    } else {
        return -100000;
    }
}
