#include <algorithm>
#include <iostream>
#include <vector>

int main() {
    std::vector<std::pair<int, int>> intervals = {{1, 3}, {2, 5}, {4, 7}, {6, 9}};
    std::sort(intervals.begin(), intervals.end(), [](auto a, auto b) { return a.second < b.second; });
    int currentEnd = -1;
    int selected = 0;
    for (auto interval : intervals) {
        if (interval.first < currentEnd) continue;
        currentEnd = interval.second;
        ++selected;
    }
    std::cout << selected << '\n';
    return 0;
}
