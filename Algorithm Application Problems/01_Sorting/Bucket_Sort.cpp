#include <algorithm>
#include <iostream>
#include <vector>

std::vector<double> bucketSort(const std::vector<double>& values) {
    std::vector<std::vector<double>> buckets(values.size());
    for (double value : values) buckets[std::min(values.size() - 1, static_cast<std::size_t>(value * values.size()))].push_back(value);
    std::vector<double> result;
    for (auto& bucket : buckets) {
        std::sort(bucket.begin(), bucket.end());
        result.insert(result.end(), bucket.begin(), bucket.end());
    }
    return result;
}

int main() {
    for (double value : bucketSort({0.78, 0.17, 0.39, 0.26, 0.72})) std::cout << value << ' ';
    std::cout << '\n';
    return 0;
}
