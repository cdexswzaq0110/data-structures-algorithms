/*

Finding the Largest Connected Flood-Prone Area
Problem Description
Write a program that processes aerial image data to identify the largest connected flood-prone area in a city.

Design Explanation
The city government has used drone imagery to divide the city into small grid areas, each with a unit area of 1.
Each area is assigned a flood risk level between 0 and 5:
0: Represents a low-lying area that is highly prone to flooding.
1-5: Represents areas with progressively higher elevations and lower flood risk.
A flood-prone connected area consists of adjacent low-lying (0) cells. Two cells are connected only if they share an edge (left, right, up, or down). Diagonal connections are not considered.
The goal is to find the largest connected area of 0s and output its size. If no flood-prone areas exist, print 0.
Input & Output Format
Input:
The first line contains two integers, M and N (5 ? M, N ? 100), representing the number of rows and columns in the grid.
The next M lines contain N integers (0 to 5) separated by spaces, representing the flood risk levels of each grid cell.
Output:
A single integer representing the size of the largest connected low-lying area (0s).
If no 0s exist in the grid, output 0.

Example 1
Input:
6 6
3 2 3 2 3 3
2 0 0 0 2 2
2 0 1 0 0 3
3 0 0 2 2 3
2 0 0 0 0 2
3 2 3 2 2 3
Output:
12

Example 2
Input:
10 8
3 0 0 0 0 0 0 0
2 2 2 2 2 2 2 0
3 3 2 0 0 2 2 0
0 1 0 0 0 0 2 0
0 1 2 2 2 0 2 0
0 1 0 2 2 0 2 0
0 1 0 0 0 0 2 0
0 1 2 0 0 2 2 0
0 1 2 2 2 2 2 0
0 0 0 0 0 0 0 0
Output:
29

*/

/*

Using DFS for Recursive Search of Connected Regions
Depth-First Search (DFS) Approach
Use dfs(x, y) to compute the area of a connected 0 region.
If the search goes out of bounds, reaches an already visited cell, or encounters a non-zero value, return 0.
Recursively explore the four adjacent directions (up, down, left, right) to find connected 0s and accumulate the total area.
Tracking the Maximum Area
Use the variable maxArea to keep track of the largest connected 0 region found during the search.

*/

#include <iostream>
#include <vector>
using namespace std;

int M, N;
vector<vector<int> > grid;
vector<vector<bool> > visited;
int maxArea = 0;

// 方向向量 (上, 下, 左, 右)
int dx[4] = {-1, 1, 0, 0};
int dy[4] = {0, 0, -1, 1};

// 深度優先搜尋 (DFS) 計算相連區域面積
int dfs(int x, int y) {
    if (x < 0 || x >= M || y < 0 || y >= N || visited[x][y] || grid[x][y] != 0)
        return 0;

    visited[x][y] = true;  // 標記為已訪問
    int area = 1;  // 當前區塊計算進面積

    // 向四個方向擴展搜尋
    for (int i = 0; i < 4; i++) {
        area += dfs(x + dx[i], y + dy[i]);
    }

    return area;
}

int main() {
    cin >> M >> N;
    grid.resize(M, vector<int>(N));
    visited.resize(M, vector<bool>(N, false));

    // 讀取輸入
    for (int i = 0; i < M; i++) {
        for (int j = 0; j < N; j++) {
            cin >> grid[i][j];
        }
    }

    // 遍歷整個矩陣，找出最大的低窪區域
    for (int i = 0; i < M; i++) {
        for (int j = 0; j < N; j++) {
            if (grid[i][j] == 0 && !visited[i][j]) {
                maxArea = max(maxArea, dfs(i, j));
            }
        }
    }

    cout << maxArea << endl;
    return 0;
}

