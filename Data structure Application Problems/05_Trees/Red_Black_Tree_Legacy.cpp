#include<iostream>
#include<stdlib.h>
using namespace std;

// 定義 Node 節點類別，表示紅黑樹中的一個節點
class Node {
public:
    int info;       // 節點存儲的資料
    char color;     // 'r' 表示紅色, 'b' 表示黑色
    Node* left;     // 左子節點指標
    Node* right;    // 右子節點指標
    Node* parent;   // 父節點指標

    // Node 的建構函數，初始化節點的資料和指標
    Node(int value, Node* neel) {
        info = value;
        color = 'r';   // 新插入的節點預設為紅色
        left = neel;   // 左子節點初始指向 NIL 節點
        right = neel;  // 右子節點初始指向 NIL 節點
        parent = neel; // 父節點初始指向 NIL 節點
    }
};

// 定義紅黑樹類別，封裝所有紅黑樹操作
class RedBlackTree {
private:
    Node* root;   // 樹的根節點
    Node* neel;   // 用來表示 NIL 節點 (所有葉子節點)

    // 左旋操作，保持紅黑樹的平衡
    void leftRotate(Node* x) {
        Node* y = x->right;  // 將 x 的右子節點設為 y
        x->right = y->left;  // 轉移 y 的左子節點給 x 的右子節點

        if (y->left != neel)
            y->left->parent = x;
        y->parent = x->parent; // 調整 y 的父節點指標

        if (x->parent == neel)
            root = y;  // 如果 x 是根節點，更新根為 y
        else if (x == x->parent->left)
            x->parent->left = y;  // 調整 x 父節點的左子節點指向 y
        else
            x->parent->right = y; // 調整 x 父節點的右子節點指向 y

        y->left = x;  // 將 x 設為 y 的左子節點
        x->parent = y; // 更新 x 的父節點
    }

    // 右旋操作，保持紅黑樹的平衡
    void rightRotate(Node* y) {
        Node* x = y->left;  // 將 y 的左子節點設為 x
        y->left = x->right; // 轉移 x 的右子節點給 y 的左子節點

        if (x->right != neel)
            x->right->parent = y;
        x->parent = y->parent; // 調整 x 的父節點指標

        if (y->parent == neel)
            root = x;  // 如果 y 是根節點，更新根為 x
        else if (y == y->parent->left)
            y->parent->left = x;  // 調整 y 父節點的左子節點指向 x
        else
            y->parent->right = x; // 調整 y 父節點的右子節點指向 x

        x->right = y;  // 將 y 設為 x 的右子節點
        y->parent = x; // 更新 y 的父節點
    }

    // 插入修正，保持紅黑樹的特性
    void insertFixup(Node* z) {
        // 當 z 的父節點是紅色時，進行修正
        while (z->parent->color == 'r') {
            if (z->parent == z->parent->parent->left) {
                Node* y = z->parent->parent->right; // z 爺爺的右子節點

                if (y->color == 'r') { // Case 1: 叔叔節點是紅色
                    z->parent->color = 'b';   // 父節點變黑
                    y->color = 'b';           // 叔叔節點變黑
                    z->parent->parent->color = 'r'; // 爺爺節點變紅
                    z = z->parent->parent;     // 繼續修正爺爺節點
                }
                else {
                    if (z == z->parent->right) {  // Case 2: z 是右子節點
                        z = z->parent;
                        leftRotate(z);           // 左旋
                    }
                    z->parent->color = 'b';       // Case 3: z 是左子節點
                    z->parent->parent->color = 'r';
                    rightRotate(z->parent->parent); // 右旋
                }
            }
            else {
                // 與上面的 if 互為鏡像處理 (父節點是右子節點)
                Node* y = z->parent->parent->left;

                if (y->color == 'r') {
                    z->parent->color = 'b';
                    y->color = 'b';
                    z->parent->parent->color = 'r';
                    z = z->parent->parent;
                }
                else {
                    if (z == z->parent->left) {
                        z = z->parent;
                        rightRotate(z);
                    }
                    z->parent->color = 'b';
                    z->parent->parent->color = 'r';
                    leftRotate(z->parent->parent);
                }
            }
        }
        root->color = 'b'; // 根節點總是黑色
    }

    // 查找樹中的最小節點
    Node* findMin(Node* x) {
        while (x->left != neel)
            x = x->left;
        return x;
    }

    // 中序遍歷輔助函數
    void inorderTraversal(Node* x) {
        if (x != neel) {
            inorderTraversal(x->left);  // 遍歷左子樹
            cout << x->info << ", " << x->color << " ";  // 輸出節點資料
            inorderTraversal(x->right); // 遍歷右子樹
        }
    }

public:
    // 建構函數，初始化紅黑樹
    RedBlackTree() {
        neel = new Node(0, nullptr); // NIL 節點，所有葉子節點都是 NIL
        neel->color = 'b';  // NIL 節點總是黑色
        root = neel;        // 初始化根節點為 NIL
    }

    // 插入一個新節點到紅黑樹中
    void insert(int value) {
        Node* z = new Node(value, neel); // 建立新節點
        Node* y = neel;
        Node* x = root;

        // 查找插入位置
        while (x != neel) {
            y = x;
            if (z->info < x->info)
                x = x->left;
            else
                x = x->right;
        }
        z->parent = y;
        if (y == neel)
            root = z;
        else if (z->info < y->info)
            y->left = z;
        else
            y->right = z;

        z->left = neel;
        z->right = neel;
        z->color = 'r';  // 新節點設為紅色

        insertFixup(z);  // 修正紅黑樹的平衡
    }

    // 中序遍歷，顯示樹中所有節點
    void inorder() {
        inorderTraversal(root);  // 調用輔助函數進行中序遍歷
        cout << endl;
    }

    // 刪除操作 (部分功能，可根據需求擴展)
    // 搜尋節點
    Node* search(Node* x, int value) {
        while (x != neel && value != x->info) {
            if (value < x->info)
                x = x->left;
            else
                x = x->right;
        }
        return x;
    }

    // 刪除節點的功能
    void deleteNode(int value) {
        Node* z = search(root, value);
        if (z == neel)
            return;

        Node* y = z;
        Node* x;
        char yOriginalColor = y->color;

        if (z->left == neel) {
            x = z->right;
            transplant(z, z->right);
        }
        else if (z->right == neel) {
            x = z->left;
            transplant(z, z->left);
        }
        else {
            y = findMin(z->right);
            yOriginalColor = y->color;
            x = y->right;

            if (y->parent == z) {
                x->parent = y;
            }
            else {
                transplant(y, y->right);
                y->right = z->right;
                y->right->parent = y;
            }

            transplant(z, y);
            y->left = z->left;
            y->left->parent = y;
            y->color = z->color;
        }

        if (yOriginalColor == 'b')
            deleteFixup(x);
    }

    void transplant(Node* u, Node* v) {
        if (u->parent == neel)
            root = v;
        else if (u == u->parent->left)
            u->parent->left = v;
        else
            u->parent->right = v;
        v->parent = u->parent;
    }

    void deleteFixup(Node* x) {
        while (x != root && x->color == 'b') {
            if (x == x->parent->left) {
                Node* w = x->parent->right;
                if (w->color == 'r') {
                    w->color = 'b';
                    x->parent->color = 'r';
                    leftRotate(x->parent);
                    w = x->parent->right;
                }
                if (w->left->color == 'b' && w->right->color == 'b') {
                    w->color = 'r';
                    x = x->parent;
                }
                else {
                    if (w->right->color == 'b') {
                        w->left->color = 'b';
                        w->color = 'r';
                        rightRotate(w);
                        w = x->parent->right;
                    }
                    w->color = x->parent->color;
                    x->parent->color = 'b';
                    w->right->color = 'b';
                    leftRotate(x->parent);
                    x = root;
                }
            }
            else {
                Node* w = x->parent->left;
                if (w->color == 'r') {
                    w->color = 'b';
                    x->parent->color = 'r';
                    rightRotate(x->parent);
                    w = x->parent->left;
                }
                if (w->right->color == 'b' && w->left->color == 'b') {
                    w->color = 'r';
                    x = x->parent;
                }
                else {
                    if (w->left->color == 'b') {
                        w->right->color = 'b';
                        w->color = 'r';
                        leftRotate(w);
                        w = x->parent->left;
                    }
                    w->color = x->parent->color;
                    x->parent->color = 'b';
                    w->left->color = 'b';
                    rightRotate(x->parent);
                    x = root;
                }
            }
        }
        x->color = 'b';
    }

    Node* getRoot() {
        return root;
    }
};

int main() {
    RedBlackTree tree;

    // 插入 1 到 10 的節點
    for (int i = 1; i <= 10; ++i) {
        tree.insert(i);
    }

    cout << "插入後的中序遍歷: " << endl;
    tree.inorder();

    // 刪除數值為 4 的節點
    tree.deleteNode(4);
    cout << "刪除 4 之後的中序遍歷: " << endl;
    tree.inorder();

    return 0;
}
