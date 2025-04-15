# DSA Visual Forge

Standalone C++-inspired data structures and algorithms visualizer.

No paid API is used. No package install is required.

## How To Run

### Option A: Open The File Directly

Open this file in a browser:

```text
C:\Users\HUANG\DSA\DSA_Visual_Forge\index.html
```

### Option B: Run A Local Static Server

Windows PowerShell:

```powershell
cd C:\Users\HUANG\DSA\DSA_Visual_Forge
python -m http.server 8000 --bind 127.0.0.1
```

Then open:

```text
http://127.0.0.1:8000/index.html
```

## Usage

1. Pick a category in the left sidebar.
2. Pick an algorithm or search by name.
3. Edit `Input` and `Target / Pattern` if needed.
4. Click `Run` to regenerate steps.
5. For interactive data structures, use the operation panel:
   - Red-Black Tree: `Insert`, `Delete`
   - Fibonacci Heap: `Insert`, `Extract-Min`
   - BST / AVL / Trie: `Insert`, `Delete`
6. Use `Next`, `Prev`, `Play`, or the step timeline to inspect the algorithm.
7. Use the pseudocode panel to map the current animation step to the algorithm.
8. Use the step log to audit recent state changes.
9. Use the theme button for light/dark review.

Input formats:

- Array: `5,1,4,2,8`
- Words: `algo,all,also,tree,trie`
- Weighted graph: `0-1:4,0-2:1,2-1:2`
- Unweighted graph: `0-1,0-2,1-3`
- Knapsack items: `10:60,20:100,30:120`

## Troubleshooting

- If `http://127.0.0.1:8000/index.html` shows connection refused, the local
  server is not running. Start it again with the PowerShell command above.
- If the in-app browser blocks localhost or file URLs, open `index.html` in a
  normal browser. The app is fully static and does not need network access.
- If a visualization shows `Invalid input`, restore the default example input
  for that algorithm and run again.

## Product Notes

- The app is fully static and keeps all computation in the browser.
- Visual state, pseudocode, and event log are generated from the same algorithm
  step model, so controls stay synchronized.
- The interface is designed for repeated study sessions: search, metrics,
  timeline scrubbing, speed control, and step-by-step playback are always
  visible.

## Included Visualizations

- Red-Black Tree insertion
- Fibonacci Heap insert / extract-min
- Binary Search Tree insertion
- AVL Tree insertion
- Trie insertion
- Sorting: bubble, selection, insertion, merge, quick, heap, counting, radix, bucket
- Searching: linear, binary
- Graph traversal: DFS, BFS
- Shortest path: Dijkstra, Bellman-Ford, Floyd-Warshall, Johnson
- Minimum spanning tree: Kruskal, Prim
- Dynamic programming: Fibonacci, knapsack, LCS, matrix-chain multiplication
- Other algorithms: backtracking subsets, greedy interval scheduling, divide-and-conquer max subarray, randomized quickselect
- String algorithms: KMP, Rabin-Karp
