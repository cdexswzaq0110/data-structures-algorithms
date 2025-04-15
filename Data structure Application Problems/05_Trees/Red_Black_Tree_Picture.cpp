#include <iostream>
#include <memory>
#include <string>

struct Node {
    int value;
    char color;
    std::unique_ptr<Node> left;
    std::unique_ptr<Node> right;

    Node(int nodeValue, char nodeColor) : value(nodeValue), color(nodeColor) {}
};

void printTree(const Node* node, const std::string& prefix, bool isLeft) {
    if (node == nullptr) {
        return;
    }

    std::cout << prefix << (isLeft ? "|-- " : "`-- ");
    std::cout << node->value << '(' << (node->color == 'r' ? "red" : "black") << ')' << '\n';

    std::string nextPrefix = prefix + (isLeft ? "|   " : "    ");
    printTree(node->left.get(), nextPrefix, true);
    printTree(node->right.get(), nextPrefix, false);
}

int main() {
    auto root = std::make_unique<Node>(10, 'b');
    root->left = std::make_unique<Node>(5, 'r');
    root->right = std::make_unique<Node>(20, 'r');
    root->left->left = std::make_unique<Node>(3, 'b');
    root->left->right = std::make_unique<Node>(7, 'b');
    root->right->right = std::make_unique<Node>(30, 'b');

    printTree(root.get(), "", false);
    return 0;
}
