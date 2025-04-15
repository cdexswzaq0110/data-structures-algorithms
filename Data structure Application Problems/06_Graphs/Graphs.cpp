#include <iostream>
#include <string>
#include <vector>

int main() {
    std::vector<std::string> topics = {"Directed Graph", "Undirected Graph", "Weighted Graph", "Adjacency List"};
    for (const std::string& topic : topics) {
        std::cout << topic << '\n';
    }
    return 0;
}
