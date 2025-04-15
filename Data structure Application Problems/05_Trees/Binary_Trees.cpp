#include <iostream>
#include <memory>

struct Node {
    int value;
    std::unique_ptr<Node> left;
    std::unique_ptr<Node> right;
    explicit Node(int nodeValue) : value(nodeValue) {}
};

void inorder(const Node* node) {
    if (node == nullptr) return;
    inorder(node->left.get());
    std::cout << node->value << ' ';
    inorder(node->right.get());
}

int main() {
    auto root = std::make_unique<Node>(2);
    root->left = std::make_unique<Node>(1);
    root->right = std::make_unique<Node>(3);
    inorder(root.get());
    std::cout << '\n';
    return 0;
}
