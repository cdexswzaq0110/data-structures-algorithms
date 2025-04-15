#include <iostream>
#include <queue>
#include <unordered_map>
#include <unordered_set>
#include <vector>

int main() {
    std::unordered_map<int, std::vector<std::pair<int, int>>> graph;
    auto add = [&](int a, int b, int w) { graph[a].push_back({b, w}); graph[b].push_back({a, w}); };
    add(0, 1, 10); add(0, 2, 6); add(0, 3, 5); add(1, 3, 15); add(2, 3, 4);
    using Entry = std::pair<int, int>;
    std::priority_queue<Entry, std::vector<Entry>, std::greater<Entry>> pq;
    std::unordered_set<int> visited = {0};
    for (auto [next, weight] : graph[0]) pq.push({weight, next});
    int total = 0;
    while (!pq.empty()) {
        auto [weight, node] = pq.top();
        pq.pop();
        if (!visited.insert(node).second) continue;
        total += weight;
        for (auto [next, nextWeight] : graph[node]) if (!visited.count(next)) pq.push({nextWeight, next});
    }
    std::cout << total << '\n';
    return 0;
}
