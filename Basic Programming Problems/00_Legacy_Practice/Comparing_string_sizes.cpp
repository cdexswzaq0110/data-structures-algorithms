/*
1. Problem Description:
Write a program based on the following requirements so that the output matches the expected results.
2. Program Requirements:
Write a program that prompts the user to input:
Two strings of equal length, each with a maximum of 128 characters
A positive integer n
The program should:
Compare the first n characters of the two strings based on ASCII order
Output the comparison result:
If the first n characters are equal, print:
string1 = string2
If string1 is less than string2 in ASCII order, print:
string1 < string2
If string1 is greater than string2 in ASCII order, print:
string1 > string2
If n exceeds the length of either string, output:
error
3. Input/Output:
Input:
Two strings of equal length (each ? 128 characters)
A positive integer n

Output:
The comparison result of the first n characters, or "error" if n is invalid
*/ 
#include <iostream>
#include <cstring>

int main() {
    char str1[129], str2[129];
    int n;
   
    std::cin.getline(str1, 129);
	//fgets(str1, sizeof(str1), stdin); /*可以儲存包含空白的字串*/
    //str1[strcspn(str1,"\n")]='\0'; /*strcspn從字元陣列中找到目標字元的索引值*/
    std::cin.getline(str2, 129);
   
    if (std::strlen(str1) != std::strlen(str2)) {
        std::cout << "error" << std::endl;
        return 1;
    }
   
    std::cin >> n; //比較長度
   
    if (n > std::strlen(str1)) {
        std::cout << "error" << std::endl;
        return 1;
    }
   
    int cmp = std::strncmp(str1, str2, n);
    if (cmp > 0) {
        std::cout << str1 << " > " << str2 << std::endl;
    } else if (cmp < 0) {
        std::cout << str1 << " < " << str2 << std::endl;
    } else {
        std::cout << str1 << " = " << str2 << std::endl;
    }  
    return 0;
}

