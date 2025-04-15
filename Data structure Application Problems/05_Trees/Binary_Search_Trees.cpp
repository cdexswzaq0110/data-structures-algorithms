#include <iostream>
#include <memory>

struct Node {
    int value;
    std::unique_ptr<Node> left;
    std::unique_ptr<Node> right;
    explicit Node(int nodeValue) : value(nodeValue) {}
};

void insert(std::unique_ptr<Node>& node, int value) {
    if (!node) {
        node = std::make_unique<Node>(value);
        return;
    }
    if (value < node->value) insert(node->left, value);
    if (value > node->value) insert(node->right, value);
}

bool contains(const Node* node, int value) {
    if (node == nullptr) return false;
    if (node->value == value) return true;
    return contains(value < node->value ? node->left.get() : node->right.get(), value);
}

int main() {
    std::unique_ptr<Node> root;
    for (int value : {5, 2, 8, 1, 3}) insert(root, value);
    std::cout << contains(root.get(), 3) << '\n';
    return 0;
}
