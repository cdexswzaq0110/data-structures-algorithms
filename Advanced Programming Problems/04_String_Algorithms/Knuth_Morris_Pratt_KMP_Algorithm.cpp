#include <iostream>
#include <string>
#include <vector>

std::vector<int> prefixTable(const std::string& pattern) {
    std::vector<int> prefix(pattern.size(), 0);
    int matched = 0;
    for (std::size_t i = 1; i < pattern.size(); ++i) {
        while (matched > 0 && pattern[i] != pattern[matched]) matched = prefix[matched - 1];
        if (pattern[i] == pattern[matched]) prefix[i] = ++matched;
    }
    return prefix;
}

int main() {
    std::string text = "ababcabcabababd";
    std::string pattern = "ababd";
    std::vector<int> prefix = prefixTable(pattern);
    int matched = 0;
    for (std::size_t i = 0; i < text.size(); ++i) {
        while (matched > 0 && text[i] != pattern[matched]) matched = prefix[matched - 1];
        if (text[i] == pattern[matched]) ++matched;
        if (matched == static_cast<int>(pattern.size())) {
            std::cout << i + 1 - pattern.size() << '\n';
            matched = prefix[matched - 1];
        }
    }
    return 0;
}
