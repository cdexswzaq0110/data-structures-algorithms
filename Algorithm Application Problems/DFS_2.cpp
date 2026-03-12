#include <iostream>
#include <vector>
using namespace std;

int n;                      // number of vertices
vector<vector<int>> graph;  // adjacency list
vector<bool> visited;


// DFS
void dfs(int u){
    visited[u] = true;       // 標記頂點 u 已訪問
    cout << u << " ";        // 印出當前訪問的頂點

    for(int v : graph[u]){   // 遍歷 u 的所有鄰居
        if(!visited[v]){     // 如果鄰居 v 尚未訪問
            dfs(v);          // 遞迴訪問 v
        }
    }
}


int main(){
    n = 7;                      // 設定頂點數
    graph.resize(n + 1);         // 1-based index, graph[1]~graph[7]
    visited.resize(n + 1, false); // 初始化所有頂點未訪問

    // 建立圖（有向圖）
    graph[1].push_back(3);
    graph[1].push_back(2);
    graph[1].push_back(6);
    graph[3].push_back(4);
    graph[2].push_back(4);
    graph[2].push_back(7);
    graph[6].push_back(5);
    graph[4].push_back(5);
    graph[7].push_back(5);
    graph[5].push_back(3);

    cout << "DFS: "; // 輸出前綴
    dfs(1);          // 從頂點 1 開始 DFS
    cout << endl;

    return 0;
}
