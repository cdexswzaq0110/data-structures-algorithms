#include <iostream>
#include <string>
#include <unordered_map>

int main() {
    std::unordered_map<std::string, int> scores;
    scores["alice"] = 95;
    scores["bob"] = 88;
    std::cout << scores["alice"] << '\n';
    return 0;
}
