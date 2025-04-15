#include <iostream>
#include <unordered_map>
#include <vector>

int main() {
    std::unordered_map<int, std::vector<int>> graph;
    graph[1].push_back(2);
    graph[2].push_back(3);
    for (int next : graph[1]) std::cout << "1 -> " << next << '\n';
    return 0;
}
