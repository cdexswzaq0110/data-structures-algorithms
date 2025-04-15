#include <iostream>
using namespace std;

// 計算第 n 項費氏數列的值
int compute(int n) {
    if (n == 0) return 0;
    if (n == 1) return 1;
    return compute(n - 1) + compute(n - 2);
}

int main() {
    int n;
    cin >> n;
    for (int i = n; i >= 1; i--) {
        cout << "fib(" << i << ")=" << compute(i) << endl;
    }
    return 0;
}
 
