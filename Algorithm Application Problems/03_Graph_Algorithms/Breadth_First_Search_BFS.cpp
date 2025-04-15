#include <iostream>
#include <queue>
#include <unordered_map>
#include <unordered_set>
#include <vector>

int main() {
    std::unordered_map<int, std::vector<int>> graph = {{1, {2, 3}}, {2, {4}}, {3, {}}, {4, {}}};
    std::queue<int> frontier;
    std::unordered_set<int> visited;
    frontier.push(1);
    visited.insert(1);
    while (!frontier.empty()) {
        int node = frontier.front();
        frontier.pop();
        std::cout << node << ' ';
        for (int next : graph[node]) {
            if (visited.insert(next).second) frontier.push(next);
        }
    }
    std::cout << '\n';
    return 0;
}
