#include <algorithm>
#include <iostream>
#include <random>
#include <vector>

int main() {
    std::vector<int> values = {1, 2, 3, 4, 5};
    std::mt19937 generator(42);
    std::shuffle(values.begin(), values.end(), generator);
    for (int value : values) std::cout << value << ' ';
    std::cout << '\n';
    return 0;
}
