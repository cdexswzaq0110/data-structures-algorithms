#include <iostream>
#include <limits>
#include <queue>
#include <vector>

struct Edge {
    int from;
    int to;
    int weight;
};

std::vector<int> bellmanFord(const std::vector<Edge>& edges, int vertexCount, int source) {
    const int inf = std::numeric_limits<int>::max() / 4;
    std::vector<int> distance(vertexCount, inf);
    distance[source] = 0;

    for (int pass = 1; pass < vertexCount; ++pass) {
        for (const Edge& edge : edges) {
            if (distance[edge.from] == inf) continue;
            if (distance[edge.from] + edge.weight < distance[edge.to]) {
                distance[edge.to] = distance[edge.from] + edge.weight;
            }
        }
    }
    return distance;
}

std::vector<int> dijkstra(const std::vector<std::vector<std::pair<int, int>>>& graph, int source) {
    const int inf = std::numeric_limits<int>::max() / 4;
    std::vector<int> distance(graph.size(), inf);
    distance[source] = 0;

    using Entry = std::pair<int, int>;
    std::priority_queue<Entry, std::vector<Entry>, std::greater<Entry>> queue;
    queue.push({0, source});

    while (!queue.empty()) {
        auto [cost, node] = queue.top();
        queue.pop();
        if (cost != distance[node]) continue;

        for (auto [next, weight] : graph[node]) {
            if (cost + weight < distance[next]) {
                distance[next] = cost + weight;
                queue.push({distance[next], next});
            }
        }
    }
    return distance;
}

int main() {
    const int vertexCount = 3;
    const int helper = vertexCount;
    std::vector<Edge> edges = {
        {0, 1, 2},
        {1, 2, -1},
        {0, 2, 4},
    };

    std::vector<Edge> augmented = edges;
    for (int vertex = 0; vertex < vertexCount; ++vertex) {
        augmented.push_back({helper, vertex, 0});
    }

    std::vector<int> potential = bellmanFord(augmented, vertexCount + 1, helper);
    std::vector<std::vector<std::pair<int, int>>> reweighted(vertexCount);
    for (const Edge& edge : edges) {
        int weight = edge.weight + potential[edge.from] - potential[edge.to];
        reweighted[edge.from].push_back({edge.to, weight});
    }

    std::vector<int> fromZero = dijkstra(reweighted, 0);
    int originalDistance = fromZero[2] - potential[0] + potential[2];
    std::cout << originalDistance << '\n';
    return 0;
}
