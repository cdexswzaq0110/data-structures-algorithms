/*
1. Problem Description:
Write a program according to the following requirements to ensure the output meets the specified criteria.
2. Program Requirements:
Write a program that prompts the user to input two strings, each with a maximum length of 10 characters (no whitespace). The program should:
Output the length of each string on separate lines.
Output the concatenation of the two strings.
3. Input/Output:
Input:
Two strings (each no longer than 10 characters and without any whitespace).
Output:
The length of the first string
The length of the second string
The result of concatenating the two strings
Sample Input:
abcd
eeeee
Sample Output:
4
5
abcdeeeee
*/

#include <iostream>
#include <string>

int main() {
    std::string str1, str2;
    std::cin >> str1;
    std::cin >> str2;

    std::cout  << str1.size() << "\n";
    std::cout  << str2.length() << "\n";
   
    std::string result = str1 + str2;
    std::cout  << result << "\n";
   
    return 0;
}

