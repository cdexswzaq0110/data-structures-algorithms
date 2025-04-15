#include <iostream>
#include <limits>
#include <queue>
#include <unordered_map>
#include <vector>

int main() {
    std::unordered_map<int, std::vector<std::pair<int, int>>> graph = {{0, {{1, 4}, {2, 1}}}, {1, {{3, 1}}}, {2, {{1, 2}, {3, 5}}}, {3, {}}};
    std::unordered_map<int, int> distance;
    for (const auto& item : graph) distance[item.first] = std::numeric_limits<int>::max() / 4;
    distance[0] = 0;
    using Entry = std::pair<int, int>;
    std::priority_queue<Entry, std::vector<Entry>, std::greater<Entry>> pq;
    pq.push({0, 0});
    while (!pq.empty()) {
        auto [cost, node] = pq.top();
        pq.pop();
        if (cost != distance[node]) continue;
        for (auto [next, weight] : graph[node]) {
            if (cost + weight < distance[next]) {
                distance[next] = cost + weight;
                pq.push({distance[next], next});
            }
        }
    }
    std::cout << distance[3] << '\n';
    return 0;
}
