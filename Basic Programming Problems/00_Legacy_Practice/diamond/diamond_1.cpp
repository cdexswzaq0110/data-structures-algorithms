/*

Diamond Shape Aligned on Both Sides
This program generates a diamond shape aligned on both sides, based on user input for the height.

Input & Output Examples:
Example 1:
Input: 5
Output:
  *
 ***
*****
 ***
  *
Example 2:
Input: 6
Output:

  *
 ***
*****
*****
 ***
  *
  
*/
#include <iostream>
using namespace std;

int main() {
    int n;
    cin >> n;

    int mid = (n + 1) / 2;  // 场︽计

    // 场程糴︽
    for (int i = 0; i < mid; i++) {
        for (int j = 0; j < mid - i - 1; j++) cout << " ";
        for (int j = 0; j < 2 * i + 1; j++) cout << "*";
        cout << endl;
    }

    // 场
    for (int i = n / 2 - 1; i >= 0; i--) {
        for (int j = 0; j < mid - i - 1; j++) cout << " ";
        for (int j = 0; j < 2 * i + 1; j++) cout << "*";
        cout << endl;
    }

    return 0;
}

