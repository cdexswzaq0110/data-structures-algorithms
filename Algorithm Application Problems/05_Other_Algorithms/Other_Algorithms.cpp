#include <iostream>
#include <string>
#include <vector>

int main() {
    std::vector<std::string> topics = {"Backtracking", "Greedy", "Divide and Conquer", "Randomized", "String Algorithms"};
    for (const auto& topic : topics) std::cout << topic << '\n';
    return 0;
}
