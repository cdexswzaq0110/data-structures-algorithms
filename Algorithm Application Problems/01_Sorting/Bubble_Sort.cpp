#include <algorithm>
#include <iostream>
#include <vector>

void sortValues(std::vector<int>& values) {
    for (std::size_t pass = 0; pass < values.size(); ++pass) {
        for (std::size_t index = 1; index < values.size() - pass; ++index) {
            if (values[index] < values[index - 1]) {
                std::swap(values[index], values[index - 1]);
            }
        }
    }
}

int main() {
    std::vector<int> values = {5, 1, 4, 2, 8};
    sortValues(values);
    for (int value : values) {
        std::cout << value << ' ';
    }
    std::cout << '\n';
    return 0;
}
