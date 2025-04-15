#include <iostream>
#include <string>
#include <vector>

int main() {
    std::vector<std::string> problems = {"Fibonacci", "Knapsack", "LCS", "Matrix Chain Multiplication"};
    for (const auto& problem : problems) std::cout << problem << '\n';
    return 0;
}
