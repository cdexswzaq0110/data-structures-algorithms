#include <iostream>
#include <vector>

void generateSubsets(const std::vector<int>& values, int index, std::vector<int>& subset) {
    if (index == static_cast<int>(values.size())) {
        for (int value : subset) std::cout << value;
        std::cout << '\n';
        return;
    }
    generateSubsets(values, index + 1, subset);
    subset.push_back(values[index]);
    generateSubsets(values, index + 1, subset);
    subset.pop_back();
}

int main() {
    std::vector<int> subset;
    generateSubsets({1, 2, 3}, 0, subset);
    return 0;
}
