#include <iostream>
#include <stdexcept>
#include <vector>

class Stack {
public:
    void push(int value) { values.push_back(value); }
    int pop() {
        if (values.empty()) throw std::out_of_range("empty stack");
        int value = values.back();
        values.pop_back();
        return value;
    }
private:
    std::vector<int> values;
};

int main() {
    Stack stack;
    stack.push(10);
    stack.push(20);
    std::cout << stack.pop() << '\n';
    return 0;
}
