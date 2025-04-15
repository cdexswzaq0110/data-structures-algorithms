/*
Simple Calculator Program
Problem Description
Write a program that functions as a basic calculator. The user will input two integers followed by an operator. The program should perform the corresponding operation and output the result.

Design Explanation
The user inputs two integers followed by a mathematical operator.
The program supports the following operations:
+ → Addition
- → Subtraction
* → Multiplication
If the user enters an invalid operator, output "error".
Input & Output Format
Input:
Two integers
One operator (+, -, or *)
Output:
The result of the computation in the format:
a operator b = result
If the operator is invalid, output:
error

Example 1
Input:
20
50
-

Output:
20-50=-30

*/
#include <iostream>

int main() {
    int num1, num2;
    char op;

    // 讀取輸入
    std::cin >> num1 >> num2 >> op;

    // 判斷運算符號並計算結果
    if (op == '+') {
        std::cout << num1 << "+" << num2 << "=" << (num1 + num2) << std::endl;
    } else if (op == '-') {
        std::cout << num1 << "-" << num2 << "=" << (num1 - num2) << std::endl;
    } else if (op == '*') {
        std::cout << num1 << "*" << num2 << "=" << (num1 * num2) << std::endl;
    } else {
        std::cout << "error" << std::endl;
    }

    return 0;
}
