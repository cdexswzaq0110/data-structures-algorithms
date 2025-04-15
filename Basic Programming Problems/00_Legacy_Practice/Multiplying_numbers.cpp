#include <iostream>
#include <string>
using namespace std;

int main() {
    string input;
    cin >> input;

    if (input == "0") {
        cout << "0=0" << endl;
        return 0;
    }

    int product = 1;
    for (int i = 0; i < input.length(); i++) {
        cout << input[i];
        if (i != input.length() - 1) {
            cout << "*";
        }
        product *= (input[i] - '0');  // 將字元轉為數字再乘
    }
    cout << "=" << product << endl;

    return 0;
}

