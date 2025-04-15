#include <iostream>
#include <memory>
#include <string>
#include <unordered_map>

struct Node {
    bool word = false;
    std::unordered_map<char, std::unique_ptr<Node>> next;
};

void insert(Node& root, const std::string& word) {
    Node* current = &root;
    for (char ch : word) {
        if (!current->next[ch]) current->next[ch] = std::make_unique<Node>();
        current = current->next[ch].get();
    }
    current->word = true;
}

bool contains(const Node& root, const std::string& word) {
    const Node* current = &root;
    for (char ch : word) {
        auto found = current->next.find(ch);
        if (found == current->next.end()) return false;
        current = found->second.get();
    }
    return current->word;
}

int main() {
    Node root;
    insert(root, "algorithm");
    std::cout << contains(root, "algorithm") << '\n';
    return 0;
}
