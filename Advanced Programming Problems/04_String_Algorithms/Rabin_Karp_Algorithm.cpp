#include <iostream>
#include <string>

int main() {
    std::string text = "abracadabra";
    std::string pattern = "abra";
    const long long base = 256;
    const long long mod = 1000000007;
    long long high = 1, patternHash = 0, windowHash = 0;
    for (std::size_t i = 0; i < pattern.size(); ++i) {
        patternHash = (patternHash * base + pattern[i]) % mod;
        windowHash = (windowHash * base + text[i]) % mod;
        if (i + 1 < pattern.size()) high = (high * base) % mod;
    }
    for (std::size_t i = 0; i + pattern.size() <= text.size(); ++i) {
        if (patternHash == windowHash && text.compare(i, pattern.size(), pattern) == 0) std::cout << i << '\n';
        if (i + pattern.size() == text.size()) break;
        windowHash = (windowHash - text[i] * high) % mod;
        if (windowHash < 0) windowHash += mod;
        windowHash = (windowHash * base + text[i + pattern.size()]) % mod;
    }
    return 0;
}
