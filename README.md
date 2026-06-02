# Data Structures and Algorithms

## Project Layout

The repository is organized around four top-level learning tracks. Keep new work
inside these folders instead of adding new root-level directories.

Interactive visualizations live in `DSA_Visual_Forge/`. This is the only
root-level project folder and is intentionally separated from the C++ practice
tracks because it is a browser application.

- `Basic Programming Problems/`
  - `00_Legacy_Practice/`
  - `01_Introduction/`
- `Data structure Application Problems/`
  - `00_Overview/`
  - `01_Arrays/`
  - `02_Linked_Lists/`
  - `03_Stacks/`
  - `04_Queues/`
  - `05_Trees/`
  - `06_Graphs/`
  - `07_Hash_Tables/`
- `Algorithm Application Problems/`
  - `00_Overview/`
  - `01_Sorting/`
  - `02_Searching/`
  - `03_Graph_Algorithms/`
  - `04_Minimum_Spanning_Tree/`
  - `05_Other_Algorithms/`
- `Advanced Programming Problems/`
  - `01_Shortest_Path/`
  - `02_Dynamic_Programming/`
  - `03_Randomized_Algorithms/`
  - `04_String_Algorithms/`

Each data structure or algorithm topic has its own standalone C++17 `.cpp` file.
Red-black tree implementations are under
`Data structure Application Problems/05_Trees/`.

## Table of Contents
1. [Introduction](#introduction)
2. [Data Structures](#data-structures)
    - [Arrays](#arrays)
    - [Linked Lists](#linked-lists)
    - [Stacks](#stacks)
    - [Queues](#queues)
    - [Trees](#trees)
        - [Binary Trees](#binary-trees)
        - [Binary Search Trees](#binary-search-trees)
        - [AVL Trees](#avl-trees)
        - [Red-Black Trees](#red-black-trees)
        - [B-Trees](#b-trees)
        - [Trie](#trie)
    - [Graphs](#graphs)
        - [Directed Graphs](#directed-graphs)
        - [Undirected Graphs](#undirected-graphs)
    - [Hash Tables](#hash-tables)
3. [Algorithms](#algorithms)
    - [Sorting Algorithms](#sorting-algorithms)
        - [Comparison-Based Sorting Algorithms](#comparison-based-sorting-algorithms)
            - [Bubble Sort](#bubble-sort)
            - [Selection Sort](#selection-sort)
            - [Insertion Sort](#insertion-sort)
            - [Merge Sort](#merge-sort)
            - [Quick Sort](#quick-sort)
            - [Heap Sort](#heap-sort)
        - [Non-Comparison Based Sorting Algorithms](#non-comparison-based-sorting-algorithms)
            - [Counting Sort](#counting-sort)
            - [Radix Sort](#radix-sort)
            - [Bucket Sort](#bucket-sort)
    - [Searching Algorithms](#searching-algorithms)
        - [Linear Search](#linear-search)
        - [Binary Search](#binary-search)
    - [Graph Algorithms](#graph-algorithms)
        - [Graph Traversal](#graph-traversal)
            - [Depth-First Search (DFS)](#depth-first-search-dfs)
            - [Breadth-First Search (BFS)](#breadth-first-search-bfs)
        - [Shortest Path Algorithms](#shortest-path-algorithms)
            - [Dijkstra’s Algorithm](#dijkstras-algorithm)
            - [Bellman-Ford Algorithm](#bellman-ford-algorithm)
            - [Floyd-Warshall Algorithm](#floyd-warshall-algorithm)
            - [Johnson’s Algorithm](#johnsons-algorithm)
        - [Minimum Spanning Tree Algorithms](#minimum-spanning-tree-algorithms)
            - [Kruskal’s Algorithm](#kruskals-algorithm)
            - [Prim’s Algorithm](#prims-algorithm)
    - [Dynamic Programming](#dynamic-programming)
        - [Optimal Substructure](#optimal-substructure)
        - [Memoization](#memoization)
        - [Tabulation](#tabulation)
        - [Common Dynamic Programming Problems](#common-dynamic-programming-problems)
            - [Fibonacci Sequence](#fibonacci-sequence)
            - [Knapsack Problem](#knapsack-problem)
            - [Longest Common Subsequence](#longest-common-subsequence)
            - [Matrix Chain Multiplication](#matrix-chain-multiplication)
    - [Other Algorithms](#other-algorithms)
        - [Backtracking](#backtracking)
        - [Greedy Algorithms](#greedy-algorithms)
        - [Divide and Conquer Algorithms](#divide-and-conquer-algorithms)
        - [Randomized Algorithms](#randomized-algorithms)
        - [String Algorithms](#string-algorithms)
            - [Knuth-Morris-Pratt (KMP) Algorithm](#knuth-morris-pratt-kmp-algorithm)
            - [Rabin-Karp Algorithm](#rabin-karp-algorithm)
4. [Complexity Analysis](#complexity-analysis)
    - [Time Complexity](#time-complexity)
    - [Space Complexity](#space-complexity)
5. [Conclusion](#conclusion)
6. [References](#references)

## 1. Introduction
This repository contains a comprehensive collection of data structures and algorithms implemented in various programming languages. This project aims to provide clear and efficient implementations of commonly used data structures and algorithms, along with explanations and analysis of their complexities.

## 2. Data Structures

### 2.1 Arrays
- **Description**: A collection of elements identified by index or key. They store elements of the same type in contiguous memory locations.
- **Operations**: Insertion, Deletion, Traversal, Searching.

### 2.2 Linked Lists
- **Description**: A linear data structure where elements, called nodes, are not stored in contiguous memory. Each node contains data and a reference (or link) to the next node.
- **Types**:
    - Singly Linked List
    - Doubly Linked List
    - Circular Linked List
- **Operations**: Insertion, Deletion, Traversal.

### 2.3 Stacks
- **Description**: A linear data structure that follows the Last In First Out (LIFO) principle.
- **Operations**: Push, Pop, Peek, isEmpty.

### 2.4 Queues
- **Description**: A linear data structure that follows the First In First Out (FIFO) principle.
- **Types**:
    - Simple Queue
    - Circular Queue
    - Priority Queue
- **Operations**: Enqueue, Dequeue, Front, isEmpty.

### 2.5 Trees
#### 2.5.1 Binary Trees
- **Description**: A tree data structure where each node has at most two children.
#### 2.5.2 Binary Search Trees (BST)
- **Description**: A binary tree where the left subtree contains only nodes with values less than the parent node, and the right subtree only nodes with values greater.
#### 2.5.3 AVL Trees
- **Description**: A self-balancing binary search tree where the height difference between left and right subtrees is at most one.
#### 2.5.4 Red-Black Trees
- **Description**: A balanced binary search tree with an extra bit for denoting the color of each node (red or black).
#### 2.5.5 B-Trees
- **Description**: A self-balancing tree data structure that maintains sorted data and allows searches, sequential access, insertions, and deletions in logarithmic time.
#### 2.5.6 Tries
- **Description**: A tree-like data structure that stores a dynamic set of strings, typically used for searching and prefix matching.

### 2.6 Graphs
#### 2.6.1 Directed Graphs
- **Description**: A graph where the edges have a direction, indicating a one-way relationship.
#### 2.6.2 Undirected Graphs
- **Description**: A graph where the edges do not have a direction, indicating a two-way relationship.

### 2.7 Hash Tables
- **Description**: A data structure that implements an associative array abstract data type, a structure that can map keys to values.

## 3. Algorithms

### 3.1 Sorting Algorithms
#### 3.1.1 Comparison-Based Sorting Algorithms
##### Bubble Sort
- **Description**: A simple sorting algorithm that repeatedly steps through the list, compares adjacent elements, and swaps them if they are in the wrong order.

##### Selection Sort
- **Description**: An in-place comparison sorting algorithm that divides the input list into a sorted and an unsorted region and repeatedly selects the smallest element from the unsorted region.

##### Insertion Sort
- **Description**: A simple sorting algorithm that builds a sorted array one element at a time by repeatedly taking the next element and inserting it into the sorted part.

##### Merge Sort
- **Description**: A divide and conquer algorithm that divides the array into halves, sorts them, and merges them.

##### Quick Sort
- **Description**: A highly efficient sorting algorithm that uses divide and conquer principles to sort elements.

##### Heap Sort
- **Description**: A comparison-based sorting technique that utilizes a binary heap data structure.

#### 3.1.2 Non-Comparison Based Sorting Algorithms
##### Counting Sort
- **Description**: A non-comparison sorting algorithm that counts the occurrences of each distinct element.

##### Radix Sort
- **Description**: Sorts numbers by processing individual digits, using a stable sort as a subroutine.

##### Bucket Sort
- **Description**: Divides the input into several "buckets" and then sorts these buckets individually.

### 3.2 Searching Algorithms
#### 3.2.1 Linear Search
- **Description**: A simple search algorithm that checks every element in the list until the desired element is found.

#### 3.2.2 Binary Search
- **Description**: A search algorithm that finds the position of a target value within a sorted array by repeatedly dividing the search interval in half.

### 3.3 Graph Algorithms
#### 3.3.1 Graph Traversal
##### Depth-First Search (DFS)
- **Description**: An algorithm for traversing or searching tree or graph data structures that explores as far as possible along each branch.

##### Breadth-First Search (BFS)
- **Description**: An algorithm for traversing or searching tree or graph data structures that explores all neighbor nodes at the present depth before moving on to nodes at the next depth level.

#### 3.3.2 Shortest Path Algorithms
##### Dijkstra’s Algorithm
- **Description**: An algorithm for finding the shortest paths from a starting node to all other nodes in a graph with non-negative edge weights.

##### Bellman-Ford Algorithm
- **Description**: Computes shortest paths from a single source vertex to all other vertices in a graph, capable of handling negative weights.

##### Floyd-Warshall Algorithm
- **Description**: A dynamic programming algorithm that finds the shortest paths between all pairs of vertices in a weighted graph.

##### Johnson’s Algorithm
- **Description**: An efficient algorithm for finding the shortest paths between all pairs of vertices in a sparse graph, which uses both Bellman-Ford and Dijkstra's algorithms.

#### 3.3.3 Minimum Spanning Tree Algorithms
##### Kruskal’s Algorithm
- **Description**: A greedy algorithm that finds a minimum spanning tree for a connected weighted graph.

##### Prim’s Algorithm
- **Description**: A greedy algorithm that builds a minimum spanning tree for a connected weighted graph by adding edges with the minimum weight.

### 3.4 Dynamic Programming
#### 3.4.1 Optimal Substructure
- **Description**: A property of a problem that can be broken down into smaller, simpler subproblems which can be solved independently.

#### 3.4.2 Memoization
- **Description**: An optimization technique that involves storing the results of expensive function calls and returning the cached result when the same inputs occur again.

#### 3.4.3 Tabulation
- **Description**: A bottom-up approach to dynamic programming that involves filling up a table based on previously computed values.

#### 3.4.4 Common Dynamic Programming Problems
##### Fibonacci Sequence
- **Description**: A series of numbers where each number is the sum of the two preceding ones, commonly used as an introductory example of dynamic programming.

##### Knapsack Problem
- **Description**: A problem in combinatorial optimization where the goal is to determine the number of each item to include in a collection so that the total weight is less than or equal to a given limit and the total value is as large as possible.

##### Longest Common Subsequence
- **Description**: A classic problem that seeks the longest subsequence present in two sequences.

##### Matrix Chain Multiplication
- **Description**: A problem that involves determining the most efficient way to multiply a given sequence of matrices.

### 3.5 Other Algorithms
#### 3.5.1 Backtracking
- **Description**: An algorithmic technique for solving problems incrementally, one step at a time, and removing those solutions that fail to satisfy the constraints.

#### 3.5.2 Greedy Algorithms
- **Description**: An algorithmic paradigm that builds up a solution piece by piece, always choosing the next piece that offers the most immediate benefit.

#### 3.5.3 Divide and Conquer Algorithms
- **Description**: An algorithm design paradigm that works by recursively breaking down a problem into two or more sub-problems of the same or related type.

#### 3.5.4 Randomized Algorithms
- **Description**: Algorithms that make random choices during their process of execution to produce results.

#### 3.5.5 String Algorithms
##### Knuth-Morris-Pratt (KMP) Algorithm
- **Description**: An efficient string searching algorithm that avoids unnecessary comparisons.

##### Rabin-Karp Algorithm
- **Description**: A string searching algorithm that uses hashing to find any one of a set of pattern strings in a text.

## 4. Complexity Analysis
### 4.1 Time Complexity
- **Description**: A computational complexity that describes the amount of time it takes to run an algorithm as a function of the length of the input.

### 4.2 Space Complexity
- **Description**: A computational complexity that describes the amount of memory space required by an algorithm as a function of the length of the input.

## 5. Conclusion
This repository aims to serve as a comprehensive resource for understanding fundamental data structures and algorithms. Each section provides insight into the concepts and their implementations.

## 6. References
- Cormen, T. H., Leiserson, C. E., Rivest, R. L., & Stein, C. (2009). *Introduction to Algorithms* (3rd ed.). MIT Press.
