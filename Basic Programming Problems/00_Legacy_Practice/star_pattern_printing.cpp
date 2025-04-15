/*
Star Pattern Printing with Compute Function
Problem Description
Write a program that prints a star (*) pattern based on the given input and calculates the total number of printed stars.

Design Explanation
Implement a function named compute() that receives an array with two positive integers as input:
Index 0: The number of stars (*) per row.
Index 1: The number of rows to print.
The function prints the required star pattern and returns the total number of stars to the main program for output.
Input & Output Format
Input:
Two positive integers:
The first integer represents the number of stars per row.
The second integer represents the number of rows to print.
Output:
Prints the star pattern according to the input values.
Outputs the total number of stars at the end.

Example 1
Input:
10
3
Output:
**********
**********
**********
30

*/
#include <iostream>
int compute(int arr[]) {
    int rowStars = arr[0]; //–琍琍计
int rowsNum=arr[1];  //计
int totalStars = rowStars * rowsNum; // 羆琍计

    for (int i = 0; i != rowsNum; i++) {
        for (int j = 0; j != rowStars; j++) {
            std::cout << "*";
        }
        std::cout << std::endl;
    }

    return totalStars; // 肚羆琍计
}

int main() {
int arr[2];
    std::cin >> arr[0] >> arr[1];
    int total = compute(arr);
    std::cout << total << std::endl;

    return 0;

}
