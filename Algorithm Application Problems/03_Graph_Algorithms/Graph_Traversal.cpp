#include <iostream>
#include <string>
#include <vector>

int main() {
    std::vector<std::string> traversal = {"Depth-First Search", "Breadth-First Search"};
    for (const auto& name : traversal) std::cout << name << '\n';
    return 0;
}
