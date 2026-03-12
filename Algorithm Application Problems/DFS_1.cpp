#include <iostream>
#include <vector>
#include <list>

using namespace std;

struct Edge{
    int to;
    int weight; // 邊的權重（DFS 不用，但保留可擴充） 
};

class Graph{
private:
    int vertex;               // 頂點數量
    vector<list<Edge>> edges; // adjacency list：每個頂點對應一個邊的 list
    vector<int> order;        // DFS 遍歷順序，用來最後輸出
    enum Color {WHITE, GRAY, BLACK}; // DFS 用的三色標記法
    vector<Color> color;      // 記錄每個頂點顏色（白/灰/黑）
    void DFS_Visit(int current); // DFS 遞迴函式
/*
vector<list<Edge>> edges;
外層 vector：頂點列表，索引 1~vertex
內層 list：存放從該頂點出發的邊
enum Color 用來標記 DFS 狀態：
WHITE：尚未訪問
GRAY：正在訪問
BLACK：已完成訪問
*/ 
public:
    Graph(int v); // 建構子
    void Print_Edges(); // 印出圖的鄰接串列
    void Add_Edge(int from, int to, int weight = 1); // 加邊
    void DFS(int start); // DFS 從 start 節點開始
};


Graph::Graph(int v){
    vertex = v;
    // 1-based index，方便用頂點 1~v
    edges.resize(vertex + 1); // 建立頂點數量 +1 的 vector
    color.resize(vertex + 1); // 顏色陣列也對應每個頂點
}


void Graph::Add_Edge(int from, int to, int weight){
    edges[from].push_back({to, weight}); // 在 from 的 list 尾端加入一條指向 to 的邊 
}
/*
push_back()：在 vector/list 尾端加入元素。
{to, weight}：使用 C++11 的 列表初始化，建立 Edge 結構。
*/ 

void Graph::Print_Edges(){

    for(int i = 1; i <= vertex; i++){
        cout << i << "\t"; // 印出頂點 
        for(auto &e : edges[i]){ // 遍歷 i 的所有鄰接邊 
            cout << "->" << e.to << "," << e.weight;
        }
        cout << endl;
    }
}
/*
for(auto &e : edges[i])：C++11 的 範圍 for 迴圈，e 是對 list 中元素的引用。
每個頂點會印出格式：頂點 ->目標,權重 ->目標,權重 ...
*/ 

void Graph::DFS(int start){

    for(int i = 1; i <= vertex; i++){
        color[i] = WHITE; // 初始化所有頂點為未訪問 
    }
    order.clear(); // 清空之前 DFS 的紀錄 
    DFS_Visit(start); // 從 start 開始遞迴 DFS 
    
    // 印出 DFS 遍歷順序
    for(int i = 0; i < order.size(); i++){
        cout << order[i];
        if(i != order.size()-1)
            cout << "->"; // 最後一個節點不印箭頭 
    }
    cout << endl;
}
/*
order 用來存訪問順序，方便漂亮輸出。
order.clear()：清空 vector，避免上一次 DFS 的殘留。
DFS_Visit(start)：呼叫遞迴函式。
*/ 


void Graph::DFS_Visit(int current){
    order.push_back(current); // 記錄訪問順序
    color[current] = GRAY;    // 標記為正在訪問
    for(auto &e : edges[current]){ // 遍歷當前頂點所有鄰居
        int neighbor = e.to;
        if(color[neighbor] == WHITE){ // 只訪問尚未訪問的鄰居
            DFS_Visit(neighbor);      // 遞迴
        }
    }
    color[current] = BLACK; // 標記為訪問完成
}


int main(){
    Graph g(7);
    g.Add_Edge(1,3);
    g.Add_Edge(1,2);
    g.Add_Edge(1,6);
    g.Add_Edge(3,4);
    g.Add_Edge(2,4);
    g.Add_Edge(2,7);
    g.Add_Edge(6,5);
    g.Add_Edge(4,5);
    g.Add_Edge(7,5);
    g.Add_Edge(5,3);
    g.DFS(1); // 從頂點 1 開始 DFS 
    return 0;
}
