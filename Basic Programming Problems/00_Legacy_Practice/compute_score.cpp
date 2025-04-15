/*
1. Problem Description:
Write a program based on the following requirements so that the output meets the specified criteria.
2. Program Requirements:
Implement a function named compute() that receives a midterm exam score from the main program. The compute() function should perform the following logic:
If the score is outside the range of 0 to 100, return -1.
If the score is greater than or equal to 60, add 5 points.
If the score is less than 60, add 10 points.
Return the adjusted score to the main program for output.
3. Input/Output:
Input:
A single integer representing the original score.
Output:
An integer representing the adjusted score.
Sample Input 1:
78
Sample Output 1:
83
Sample Input 2:
120
Sample Output 2:
-1
*/

#include <iostream>
using namespace std;

int compute(int score) {
    if (score < 0 || score > 100) {
        return -1;
    }
    if (score >= 60) {
        return score + 5;
    }
    return score + 10;
}

int main() {
    int score;
    cin >> score;
    int result = compute(score); // ©I¥s compute ¨ç¦¡
    cout << result << endl;
    return 0;
}

