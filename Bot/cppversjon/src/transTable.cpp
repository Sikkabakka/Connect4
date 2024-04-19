#include "transTable.hpp" 

TranspositionTable::TranspositionTable(int size) {
    table.reserve(size);
    maxSize = size;
}

unsigned int TranspositionTable::hashFunction(uint64_t key) {
    return key % maxSize;
}

void TranspositionTable::put(uint64_t key, uint8_t value, uint8_t depth, uint8_t flag) {

    Entry e;
    e.key = key;
    e.value = value;
    e.depth = depth;
    e.flag = flag;
    unsigned int index = hashFunction(key);

    table[index] = e;
    return;
}

TranspositionTable::Entry TranspositionTable::get(uint64_t key) {
    unsigned int index = hashFunction(key);

    if (table[index].key == key) {
        return table[index];
    } 
    else {
        table[index].value = 100; // 100 is a placeholder for "no value found"
        return table[index];
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
