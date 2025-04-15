#include <iostream>
#include <queue>

int main() {
    std::queue<int> line;
    line.push(10);
    line.push(20);
    std::cout << line.front() << '\n';
    line.pop();
    std::cout << line.front() << '\n';
    return 0;
}
