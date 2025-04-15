#include <iostream>
#include <limits>
#include <vector>

struct Edge { int from; int to; int weight; };

int main() {
    std::vector<Edge> edges = {{0, 1, 1}, {1, 2, -2}, {0, 2, 4}};
    std::vector<int> distance(3, std::numeric_limits<int>::max() / 4);
    distance[0] = 0;
    for (int pass = 1; pass < 3; ++pass) {
        for (const Edge& edge : edges) {
            if (distance[edge.from] + edge.weight < distance[edge.to]) distance[edge.to] = distance[edge.from] + edge.weight;
        }
    }
    std::cout << distance[2] << '\n';
    return 0;
}
