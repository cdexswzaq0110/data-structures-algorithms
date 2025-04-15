#include <algorithm>
#include <iostream>
#include <memory>

struct Node {
    int value;
    int height = 1;
    std::unique_ptr<Node> left;
    std::unique_ptr<Node> right;
    explicit Node(int nodeValue) : value(nodeValue) {}
};

int height(const std::unique_ptr<Node>& node) { return node ? node->height : 0; }
void update(Node* node) { node->height = 1 + std::max(height(node->left), height(node->right)); }

std::unique_ptr<Node> rotateLeft(std::unique_ptr<Node> node) {
    auto root = std::move(node->right);
    node->right = std::move(root->left);
    root->left = std::move(node);
    update(root->left.get());
    update(root.get());
    return root;
}

std::unique_ptr<Node> rotateRight(std::unique_ptr<Node> node) {
    auto root = std::move(node->left);
    node->left = std::move(root->right);
    root->right = std::move(node);
    update(root->right.get());
    update(root.get());
    return root;
}

std::unique_ptr<Node> insert(std::unique_ptr<Node> node, int value) {
    if (!node) return std::make_unique<Node>(value);
    if (value < node->value) node->left = insert(std::move(node->left), value);
    if (value > node->value) node->right = insert(std::move(node->right), value);
    update(node.get());
    int balance = height(node->left) - height(node->right);
    if (balance > 1 && value < node->left->value) return rotateRight(std::move(node));
    if (balance < -1 && value > node->right->value) return rotateLeft(std::move(node));
    if (balance > 1 && value > node->left->value) {
        node->left = rotateLeft(std::move(node->left));
        return rotateRight(std::move(node));
    }
    if (balance < -1 && value < node->right->value) {
        node->right = rotateRight(std::move(node->right));
        return rotateLeft(std::move(node));
    }
    return node;
}

int main() {
    std::unique_ptr<Node> root;
    for (int value : {30, 20, 10}) root = insert(std::move(root), value);
    std::cout << root->value << '\n';
    return 0;
}
