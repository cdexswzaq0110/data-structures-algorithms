#include <algorithm>
#include <iostream>
#include <numeric>
#include <vector>

struct Edge { int from; int to; int weight; };

int findRoot(std::vector<int>& parent, int node) {
    if (parent[node] != node) parent[node] = findRoot(parent, parent[node]);
    return parent[node];
}

int main() {
    std::vector<Edge> edges = {{0, 1, 10}, {0, 2, 6}, {0, 3, 5}, {1, 3, 15}, {2, 3, 4}};
    std::sort(edges.begin(), edges.end(), [](const Edge& a, const Edge& b) { return a.weight < b.weight; });
    std::vector<int> parent(4);
    std::iota(parent.begin(), parent.end(), 0);
    int total = 0;
    for (const Edge& edge : edges) {
        int a = findRoot(parent, edge.from);
        int b = findRoot(parent, edge.to);
        if (a == b) continue;
        parent[a] = b;
        total += edge.weight;
    }
    std::cout << total << '\n';
    return 0;
}
