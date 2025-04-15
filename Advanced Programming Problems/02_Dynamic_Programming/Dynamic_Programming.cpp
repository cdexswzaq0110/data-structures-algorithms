#include <iostream>
#include <string>
#include <vector>

int main() {
    std::vector<std::string> ideas = {"Optimal Substructure", "Memoization", "Tabulation"};
    for (const auto& idea : ideas) std::cout << idea << '\n';
    return 0;
}
