#include <iostream>
#include <string>
#include <vector>

int main() {
    std::vector<std::string> algorithms = {"Dijkstra", "Bellman-Ford", "Floyd-Warshall", "Johnson"};
    for (const auto& name : algorithms) std::cout << name << '\n';
    return 0;
}
