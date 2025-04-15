#include <algorithm>
#include <iostream>
#include <vector>

int main() {
    std::vector<int> bTreeNodeKeys = {10, 20, 30};
    int key = 25;
    bTreeNodeKeys.insert(std::upper_bound(bTreeNodeKeys.begin(), bTreeNodeKeys.end(), key), key);
    for (int value : bTreeNodeKeys) std::cout << value << ' ';
    std::cout << '\n';
    return 0;
}
