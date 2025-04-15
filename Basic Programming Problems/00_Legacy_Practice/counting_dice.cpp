/*
1. Problem Description:
Write a program based on the following requirements to ensure the output meets the expected format.
2. Program Requirements:
Write a program that allows the user to input the result of rolling a die 10 times. A standard die has point values from 1 to 6. The program should:
Count and output the number of times each valid die value (1 to 6) appears.
Count and output the number of invalid inputs (values not between 1 and 6).
3. Input/Output:
Input:
Ten integers, each representing a die roll.
Output:
The number of occurrences for each die value from 1 to 6, in the format: numberX:Y
The number of invalid inputs, in the format: error:Z
Sample Input:
1
2
2
5
8
3
1
2
6
7
Sample Output:
number1:2  
number2:3  
number3:1  
number4:0  
number5:1  
number6:1  
error:2
*/

#include <iostream>

int main() {
    int count[6] = {0}; // 0-1 1-2 2-3 3-4 4-5 5-6 (arr-num)
    int errorCount = 0;
    int num;
   
    for (int i = 0; i < 10; ++i) {
        std::cin >> num;
        if (num >= 1 && num <= 6) {
            count[num - 1]++;
        } else {
            errorCount++;
        }
    }
   
    for (int i = 0; i < 6; ++i) {
        std::cout << "number" << (i + 1) << ":" << count[i] << "\n";
    }
    std::cout << "error:" << errorCount << "\n";
    return 0;
}
