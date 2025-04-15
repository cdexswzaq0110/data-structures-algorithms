#include <iostream>
#include <string>
#include <cctype>  // for islower, isupper, tolower, toupper
using namespace std;

int main() {
    string str;
    int n;
    cin >> str >> n;
    char original = str[n];
    char converted;

    if (islower(original)) {
        converted = toupper(original);
    } else if (isupper(original)) {
        converted = tolower(original);
    } else {
        converted = original;  // 非字母就不轉
    }

    str[n] = converted;

    cout << "The letter that was selected is: " << converted << endl;
    cout << str << endl;

    return 0;
}

