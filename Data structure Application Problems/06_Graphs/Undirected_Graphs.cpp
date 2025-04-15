#include <iostream>
#include <unordered_map>
#include <vector>

void addEdge(std::unordered_map<int, std::vector<int>>& graph, int a, int b) {
    graph[a].push_back(b);
    graph[b].push_back(a);
}

int main() {
    std::unordered_map<int, std::vector<int>> graph;
    addEdge(graph, 1, 2);
    std::cout << graph[2].front() << '\n';
    return 0;
}
