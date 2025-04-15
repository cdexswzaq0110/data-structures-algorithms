#include <iostream>
#include <vector>

void quickSort(std::vector<int>& values, int left, int right) {
    if (left >= right) return;
    int pivot = values[left + (right - left) / 2];
    int i = left, j = right;
    while (i <= j) {
        while (values[i] < pivot) ++i;
        while (values[j] > pivot) --j;
        if (i <= j) std::swap(values[i++], values[j--]);
    }
    quickSort(values, left, j);
    quickSort(values, i, right);
}

int main() {
    std::vector<int> values = {5, 1, 4, 2, 8};
    quickSort(values, 0, static_cast<int>(values.size()) - 1);
    for (int value : values) std::cout << value << ' ';
    std::cout << '\n';
    return 0;
}
