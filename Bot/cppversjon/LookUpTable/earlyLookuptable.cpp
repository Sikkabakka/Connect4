#include <iostream>
#include <vector>
#include <fstream>
#include <string>
#include <sstream>
#include <unordered_map>
#include "gameLogic.hpp"
#include "transTable.hpp"

std::unordered_map<uint64_t, int> earlyLookUpTable;

std::fstream file;

Board position;

struct Structure{
    uint64_t key;
    int value;
};

std::vector<uint64_t> keys;
Structure splitString(const std::string str){
    std::vector<int> temporary;

    std::istringstream iss(str);
    Structure result;
    int number;
    while (iss >> number) {
        temporary.push_back(number);
    }
    result.key = temporary[0];
    result.value = temporary[1];
    return result;
}


int main(){
   

    earlyLookUpTable.reserve(947761);

    file.open("output.txt",std::ios::in); 

    if (file.is_open()){ 
        std::string tp;
        while(getline(file, tp)){
            Structure temp = splitString(tp);
            position.playsequence(std::to_string(temp.key));
            earlyLookUpTable[position.board + position.playMask + position.boardKey] = temp.value;

            keys.push_back(position.board + position.boardKey + position.playMask);   

            position.reset_board();         
        }
        file.close(); 
    }

    // std::cout << keys.size() << std::endl;
    std::cout << earlyLookUpTable.size() << " size"<< std::endl;

    std::ofstream wf("earlyPosition.dat", std::ios::out | std::ios::binary);

    for(const auto& pair : earlyLookUpTable){
        wf.write(reinterpret_cast<const char*>(&pair.first), sizeof(uint64_t));
        wf.write(reinterpret_cast<const char*>(&pair.second), sizeof(int));
    }
    wf.close();
   
    return 0;
}
