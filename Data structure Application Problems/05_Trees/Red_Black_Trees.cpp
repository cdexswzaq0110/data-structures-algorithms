#include <iostream>
#include <memory>

enum class Color { Red, Black };

struct Node {
    int value;
    Color color = Color::Red;
    std::unique_ptr<Node> left;
    std::unique_ptr<Node> right;
    explicit Node(int nodeValue) : value(nodeValue) {}
};

bool isRed(const std::unique_ptr<Node>& node) { return node && node->color == Color::Red; }

std::unique_ptr<Node> rotateLeft(std::unique_ptr<Node> node) {
    auto root = std::move(node->right);
    node->right = std::move(root->left);
    root->left = std::move(node);
    root->color = root->left->color;
    root->left->color = Color::Red;
    return root;
}

std::unique_ptr<Node> rotateRight(std::unique_ptr<Node> node) {
    auto root = std::move(node->left);
    node->left = std::move(root->right);
    root->right = std::move(node);
    root->color = root->right->color;
    root->right->color = Color::Red;
    return root;
}

void flipColors(Node* node) {
    node->color = Color::Red;
    node->left->color = Color::Black;
    node->right->color = Color::Black;
}

std::unique_ptr<Node> insert(std::unique_ptr<Node> node, int value) {
    if (!node) return std::make_unique<Node>(value);
    if (value < node->value) node->left = insert(std::move(node->left), value);
    if (value > node->value) node->right = insert(std::move(node->right), value);
    if (isRed(node->right) && !isRed(node->left)) node = rotateLeft(std::move(node));
    if (isRed(node->left) && isRed(node->left->left)) node = rotateRight(std::move(node));
    if (isRed(node->left) && isRed(node->right)) flipColors(node.get());
    return node;
}

int main() {
    std::unique_ptr<Node> root;
    for (int value : {5, 3, 7, 1}) root = insert(std::move(root), value);
    root->color = Color::Black;
    std::cout << root->value << '\n';
    return 0;
}
