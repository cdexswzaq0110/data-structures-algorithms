#include <iostream>
#include <vector>

int linearSearch(const std::vector<int>& values, int target) {
    for (int index = 0; index < static_cast<int>(values.size()); ++index) {
        if (values[index] == target) {
            return index;
        }
    }
    return -1;
}

int main() {
    std::vector<int> values = {4, 8, 15, 16, 23, 42};
    std::cout << linearSearch(values, 16) << '\n';
    return 0;
}
