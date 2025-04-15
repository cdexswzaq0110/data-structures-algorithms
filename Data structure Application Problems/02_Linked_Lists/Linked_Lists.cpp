#include <iostream>
#include <memory>

struct Node {
    int value;
    std::unique_ptr<Node> next;
    explicit Node(int nodeValue) : value(nodeValue) {}
};

class SinglyLinkedList {
public:
    void pushFront(int value) {
        auto node = std::make_unique<Node>(value);
        node->next = std::move(head);
        head = std::move(node);
    }

    void print() const {
        for (Node* current = head.get(); current != nullptr; current = current->next.get()) {
            std::cout << current->value << ' ';
        }
        std::cout << '\n';
    }

private:
    std::unique_ptr<Node> head;
};

int main() {
    SinglyLinkedList list;
    list.pushFront(3);
    list.pushFront(2);
    list.pushFront(1);
    list.print();
    return 0;
}
