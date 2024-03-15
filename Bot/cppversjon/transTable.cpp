#include "transTable.hpp"

TranspositionTable::TranspositionTable(int size) {
    table.reserve(size);
    maxSize = size;
}

unsigned int TranspositionTable::hashFunction(uint64_t key) {
    return key % maxSize;
}

void TranspositionTable::put(uint64_t key, uint8_t value) {

    Entry e;
    e.key = key;
    e.value = value;
    unsigned int index = hashFunction(key);

    table[index] = e;
    return;
}

int TranspositionTable::get(uint64_t key) {
    unsigned int index = hashFunction(key);

    if (table[index].key == key) {
        return table[index].value +1;
    } else {
        return 100;
    }
}


void TranspositionTable::resetTable(){
    for (int i = 0; i<maxSize; i++){
        table[i].value = 100;
        table[i].key = -1;
    }
    return;
}

void TranspositionTable::printValues(){
    int inputs = 0;
    int zeroes = 0;
    for (int i = 0; i<maxSize; i++){
        if (table[i].value != 0){
            printf("key: %llu  value: %hhu hashvalue: %u \n", table[i].key, table[i].value, hashFunction(table[i].key));
            inputs++;
        }
        else{
            zeroes++;
        }
    }
    printf("differnet values: %d  zeroes: %d", inputs, zeroes);
    return;
}
