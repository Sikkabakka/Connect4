#include <iostream> 
#include <vector>
#include <fstream>
#include <unordered_map>



std::unordered_map<uint64_t, int> earlyLookUpTable;

int makeLookUpTable(){ 
    printf("running");

    earlyLookUpTable.reserve(947761);
   std::ifstream rf("earlyPosition.dat", std::ios::out | std::ios::binary);
  
    int key, value;
    while (rf.read(reinterpret_cast<char*>(&key), sizeof(uint64_t)) &&
           rf.read(reinterpret_cast<char*>(&value), sizeof(int))) {
        earlyLookUpTable[key] = value;
    }
    rf.close();

    for(const auto& pair : earlyLookUpTable){
        std::cout << pair.first << " " << pair.second << std::endl;
    }

    std::cout << earlyLookUpTable.size() << std::endl; 

    return 0;
}