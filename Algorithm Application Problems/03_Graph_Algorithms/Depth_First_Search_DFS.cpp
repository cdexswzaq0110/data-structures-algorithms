#include <iostream>
#include <unordered_map>
#include <unordered_set>
#include <vector>

void dfs(const std::unordered_map<int, std::vector<int>>& graph, int node, std::unordered_set<int>& visited) {
    if (!visited.insert(node).second) return;
    std::cout << node << ' ';
    auto found = graph.find(node);
    if (found == graph.end()) return;
    for (int next : found->second) dfs(graph, next, visited);
}

int main() {
    std::unordered_map<int, std::vector<int>> graph = {{1, {2, 3}}, {2, {4}}, {3, {}}, {4, {}}};
    std::unordered_set<int> visited;
    dfs(graph, 1, visited);
    std::cout << '\n';
    return 0;
}
