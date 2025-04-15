#include <iostream>
#include <string>
#include <algorithm>  // for reverse
using namespace std;

int main() {
    string str1, str2;
    cin >> str1 >> str2;

    if (str1.length() < 4 || str1.length() > 20 || str2.length() < 4 || str2.length() > 20) {
        cout << "error" << endl;
        return 0;
    }

    cout << str1.length() << endl;
    cout << str2.length() << endl;

    string combined = str1 + str2;
    reverse(combined.begin(), combined.end());

    cout << combined << endl;

    return 0;
}

