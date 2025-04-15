#include <algorithm>
#include <iostream>
#include <vector>

void sortValues(std::vector<int>& values) {
    for (std::size_t index = 1; index < values.size(); ++index) {
        int current = values[index];
        std::size_t position = index;
        while (position > 0 && current < values[position - 1]) {
            values[position] = values[position - 1];
            --position;
        }
        values[position] = current;
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
