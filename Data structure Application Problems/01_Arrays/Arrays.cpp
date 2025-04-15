#include <iostream>
#include <vector>

int main() {
    std::vector<int> values = {10, 20, 30};
    values.insert(values.begin() + 1, 15);
    values.erase(values.begin() + 3);

    for (int value : values) {
        std::cout << value << ' ';
    }
    std::cout << '\n';
    return 0;
}
