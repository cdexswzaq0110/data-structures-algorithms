/*
Square Root of Sum (Rounded to Two Decimal Places)
Problem Description
Write a program that takes two integers as input, calculates their sum, finds the square root, and rounds the result to two decimal places.

Input & Output Format
Input:
Two integers separated by a space.
Output:
The square root of their sum, rounded to two decimal places.
Example
Input:
100 75
Output:
13.23
*/
#include <iostream>
#include <cmath>  
#include <iomanip>  

int main() {
    double num1, num2;

    std::cin >> num1;
    std::cin >> num2;

    double result = sqrt(num1 + num2);
    double roundedResult = floor(result * 100 + 0.5) / 100;

    std::cout << std::fixed << std::setprecision(2);
    std::cout << "result=" << roundedResult << std::endl;

    return 0;
}
