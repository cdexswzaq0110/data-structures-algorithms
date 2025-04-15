#include <iostream>
#include <string>
#include <vector>

int main() {
    std::vector<std::string> topics = {"DFS", "BFS", "Shortest Path", "Minimum Spanning Tree"};
    for (const auto& topic : topics) std::cout << topic << '\n';
    return 0;
}
