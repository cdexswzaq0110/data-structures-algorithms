#include <iostream>
#include <string>
#include <vector>

int main() {
    std::vector<std::string> algorithms = {"KMP", "Rabin-Karp"};
    for (const auto& algorithm : algorithms) std::cout << algorithm << '\n';
    return 0;
}
