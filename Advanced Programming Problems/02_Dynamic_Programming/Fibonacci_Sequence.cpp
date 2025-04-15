#include <iostream>

int main() {
    long long previous = 0;
    long long current = 1;
    for (int i = 0; i < 10; ++i) {
        long long next = previous + current;
        previous = current;
        current = next;
    }
    std::cout << previous << '\n';
    return 0;
}
