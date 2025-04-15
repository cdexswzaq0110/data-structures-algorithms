const state = {
  catalog: [],
  selectedId: "",
  steps: [],
  stepIndex: 0,
  timer: null,
  structures: {},
};

const colors = {
  default: "#dbeafe",
  active: "#fbbf24",
  compare: "#fb923c",
  done: "#86efac",
  danger: "#fca5a5",
  treeBlack: "#202938",
  treeRed: "#dc2626",
  edge: "#9aa6b7",
  blue: "#93c5fd",
  purple: "#c4b5fd",
};

const elements = {};

document.addEventListener("DOMContentLoaded", () => {
  bindElements();
  initializeTheme();
  state.catalog = buildCatalog();
  renderSelectors();
  selectAlgorithm(state.catalog[0].id);
  bindEvents();
});

function initializeTheme() {
  if (!document.documentElement.dataset.theme) {
    document.documentElement.dataset.theme = "dark";
  }
  if (elements.themeButton) {
    elements.themeButton.textContent = document.documentElement.dataset.theme === "dark" ? "淺色" : "深色";
  }
}

function bindElements() {
  for (const id of [
    "categorySelect",
    "algorithmSelect",
    "algorithmList",
    "searchInput",
    "catalogMeta",
    "dataInput",
    "targetInput",
    "runButton",
    "prevButton",
    "nextButton",
    "playButton",
    "resetButton",
    "themeButton",
    "operationPanel",
    "operationSelect",
    "operationValue",
    "applyOperationButton",
    "clearStructureButton",
    "stepSlider",
    "speedSelect",
    "svgCanvas",
    "tableCanvas",
    "stepCounter",
    "complexityLabel",
    "algorithmTitle",
    "algorithmDescription",
    "qualityBar",
    "metricCategory",
    "metricSteps",
    "metricInputSize",
    "metricState",
    "progressBar",
    "stageMode",
    "stageHint",
    "stepText",
    "legend",
    "pseudoCode",
    "stepLog",
  ]) {
    elements[id] = document.getElementById(id);
  }
}

function bindEvents() {
  elements.categorySelect.addEventListener("change", renderAlgorithmSelect);
  elements.algorithmSelect.addEventListener("change", (event) => selectAlgorithm(event.target.value));
  elements.searchInput.addEventListener("input", renderAlgorithmSelect);
  elements.runButton.addEventListener("click", runSelectedAlgorithm);
  elements.prevButton.addEventListener("click", () => showStep(state.stepIndex - 1));
  elements.nextButton.addEventListener("click", () => showStep(state.stepIndex + 1));
  elements.playButton.addEventListener("click", togglePlayback);
  elements.stepSlider.addEventListener("input", (event) => showStep(Number(event.target.value)));
  elements.themeButton.addEventListener("click", toggleTheme);
  elements.applyOperationButton.addEventListener("click", applyStructureOperation);
  elements.clearStructureButton.addEventListener("click", clearCurrentStructure);
  elements.resetButton.addEventListener("click", () => {
    stopPlayback();
    showStep(0);
  });
}

function buildCatalog() {
  return [
    item("Red-Black Tree", "Data Structures", "red-black-tree", "Insert values and show rotations / recoloring.", "O(log n)", "10,5,20,3,7,30,15", "", runRedBlackTree),
    item("Fibonacci Heap", "Data Structures", "fibonacci-heap", "Insert values, link roots, then extract the minimum.", "amortized insert O(1), extract-min O(log n)", "7,3,17,24,1,18,52,38", "", runFibonacciHeap),
    item("Binary Search Tree", "Data Structures", "binary-search-tree", "Insert values into a BST and visualize the final shape.", "average O(log n), worst O(n)", "8,3,10,1,6,14,4,7,13", "", runBinarySearchTree),
    item("AVL Tree", "Data Structures", "avl-tree", "Self-balancing BST insertion with rotations.", "O(log n)", "30,20,10,25,40,50", "", runAvlTree),
    item("Trie", "Data Structures", "trie", "Insert words and show prefix sharing.", "O(total characters)", "algo,all,also,tree,trie", "", runTrie),
    item("Bubble Sort", "Sorting", "bubble-sort", "Repeatedly swap adjacent inverted values.", "O(n^2)", "5,1,4,2,8", "", runBubbleSort),
    item("Selection Sort", "Sorting", "selection-sort", "Select the minimum value for each position.", "O(n^2)", "64,25,12,22,11", "", runSelectionSort),
    item("Insertion Sort", "Sorting", "insertion-sort", "Grow a sorted prefix one value at a time.", "O(n^2)", "9,5,1,4,3", "", runInsertionSort),
    item("Merge Sort", "Sorting", "merge-sort", "Divide, sort, and merge ranges.", "O(n log n)", "38,27,43,3,9,82,10", "", runMergeSort),
    item("Quick Sort", "Sorting", "quick-sort", "Partition around a pivot recursively.", "average O(n log n)", "10,7,8,9,1,5", "", runQuickSort),
    item("Heap Sort", "Sorting", "heap-sort", "Build a heap and repeatedly extract max.", "O(n log n)", "12,11,13,5,6,7", "", runHeapSort),
    item("Counting Sort", "Sorting", "counting-sort", "Count small integer frequencies.", "O(n + k)", "4,2,2,8,3,3,1", "", runCountingSort),
    item("Radix Sort", "Sorting", "radix-sort", "Sort by digit from least significant to most significant.", "O(d(n + b))", "170,45,75,90,802,24,2,66", "", runRadixSort),
    item("Bucket Sort", "Sorting", "bucket-sort", "Distribute decimal values into sorted buckets.", "average O(n + k)", "0.78,0.17,0.39,0.26,0.72,0.94,0.21", "", runBucketSort),
    item("Linear Search", "Searching", "linear-search", "Scan every element until target is found.", "O(n)", "4,8,15,16,23,42", "16", runLinearSearch),
    item("Binary Search", "Searching", "binary-search", "Repeatedly halve a sorted search interval.", "O(log n)", "1,3,5,7,9,11,13", "7", runBinarySearch),
    item("DFS", "Graph", "dfs", "Explore as deep as possible before backtracking.", "O(V + E)", "0-1,0-2,1-3,1-4,2-5", "0", runDfs),
    item("BFS", "Graph", "bfs", "Explore graph level by level.", "O(V + E)", "0-1,0-2,1-3,1-4,2-5", "0", runBfs),
    item("Dijkstra", "Graph", "dijkstra", "Shortest path with non-negative edge weights.", "O((V + E) log V)", "0-1:4,0-2:1,2-1:2,1-3:1,2-3:5", "0", runDijkstra),
    item("Bellman-Ford", "Graph", "bellman-ford", "Shortest path with negative edges and cycle detection.", "O(VE)", "0-1:1,1-2:-2,0-2:4", "0", runBellmanFord),
    item("Floyd-Warshall", "Graph", "floyd-warshall", "All-pairs shortest paths by dynamic programming.", "O(V^3)", "0-1:3,1-2:2,2-0:5", "", runFloydWarshall),
    item("Johnson", "Graph", "johnson", "All-pairs shortest paths for sparse graphs.", "O(VE + V(E log V))", "0-1:2,1-2:-1,0-2:4", "", runJohnson),
    item("Kruskal", "Graph", "kruskal", "Build MST by adding lightest non-cycling edges.", "O(E log E)", "0-1:10,0-2:6,0-3:5,1-3:15,2-3:4", "", runKruskal),
    item("Prim", "Graph", "prim", "Grow MST from one component using a priority queue idea.", "O(E log V)", "0-1:10,0-2:6,0-3:5,1-3:15,2-3:4", "0", runPrim),
    item("Fibonacci DP", "Dynamic Programming", "fibonacci-dp", "Compare tabulation state for Fibonacci numbers.", "O(n)", "10", "", runFibonacciDp),
    item("Knapsack", "Dynamic Programming", "knapsack", "0/1 knapsack capacity table.", "O(nW)", "10:60,20:100,30:120", "50", runKnapsack),
    item("LCS", "Dynamic Programming", "lcs", "Longest common subsequence table.", "O(nm)", "AGGTAB", "GXTXAYB", runLcs),
    item("Matrix Chain", "Dynamic Programming", "matrix-chain", "Minimum scalar multiplications table.", "O(n^3)", "40,20,30,10,30", "", runMatrixChain),
    item("Backtracking", "Other Algorithms", "backtracking", "Generate subsets by choose / skip recursion.", "O(2^n)", "1,2,3", "", runBacktracking),
    item("Greedy Intervals", "Other Algorithms", "greedy-intervals", "Select compatible intervals by earliest finish time.", "O(n log n)", "1-3,2-5,4-7,6-9", "", runGreedyIntervals),
    item("Divide and Conquer", "Other Algorithms", "divide-conquer", "Maximum subarray using cross-mid recursion.", "O(n log n)", "-2,1,-3,4,-1,2,1,-5,4", "", runDivideConquer),
    item("Randomized Quickselect", "Other Algorithms", "quickselect", "Partition around a pseudo-random pivot until k is placed.", "average O(n)", "7,10,4,3,20,15", "2", runQuickselect),
    item("KMP", "String Algorithms", "kmp", "Build prefix table and search without backing up text.", "O(n + m)", "ababcabcabababd", "ababd", runKmp),
    item("Rabin-Karp", "String Algorithms", "rabin-karp", "Rolling hash string search.", "average O(n + m)", "abracadabra", "abra", runRabinKarp),
  ];
}

function item(name, category, id, description, complexity, input, target, runner) {
  return { name, category, id, description, complexity, input, target, runner };
}

function renderSelectors() {
  const categories = [...new Set(state.catalog.map((entry) => entry.category))];
  elements.categorySelect.innerHTML = categories.map((category) => `<option>${category}</option>`).join("");
  renderAlgorithmSelect();
}

function renderAlgorithmSelect() {
  const category = elements.categorySelect.value;
  const query = elements.searchInput.value.trim().toLowerCase();
  const entries = state.catalog.filter((entry) => {
    const inCategory = entry.category === category;
    const matchesQuery = !query || `${entry.name} ${entry.description} ${entry.category}`.toLowerCase().includes(query);
    return inCategory && matchesQuery;
  });
  elements.catalogMeta.innerHTML = `<span>${entries.length} algorithms</span><span>${state.catalog.length} total</span>`;
  elements.algorithmSelect.disabled = entries.length === 0;
  elements.algorithmSelect.innerHTML = entries.length === 0
    ? `<option>No matches</option>`
    : entries.map((entry) => `<option value="${entry.id}">${entry.name}</option>`).join("");
  elements.algorithmList.innerHTML = entries
    .map((entry) => `<button class="algorithm-item" type="button" data-id="${entry.id}">${entry.name}</button>`)
    .join("");
  if (entries.length === 0) {
    elements.algorithmList.innerHTML = `<div class="empty-state">No algorithms match the current search.</div>`;
  }
  elements.algorithmList.querySelectorAll("button").forEach((button) => {
    button.addEventListener("click", () => selectAlgorithm(button.dataset.id));
  });
  if (entries.length > 0 && !entries.some((entry) => entry.id === state.selectedId)) {
    selectAlgorithm(entries[0].id);
  }
}

function selectAlgorithm(id) {
  stopPlayback();
  const entry = state.catalog.find((candidate) => candidate.id === id);
  if (!entry) return;
  state.selectedId = id;
  elements.categorySelect.value = entry.category;
  renderAlgorithmSelectIfNeeded(entry.category);
  elements.algorithmSelect.value = id;
  elements.dataInput.value = entry.input;
  elements.targetInput.value = entry.target;
  elements.algorithmTitle.textContent = entry.name;
  elements.algorithmDescription.textContent = entry.description;
  elements.complexityLabel.textContent = entry.complexity;
  elements.stageMode.textContent = entry.category;
  elements.qualityBar.innerHTML = [
    `<span>${entry.category}</span>`,
    `<span>${entry.complexity}</span>`,
    `<span>${entry.runner.name.replace(/^run/, "")}</span>`,
  ].join("");
  renderPseudoCode(entry);
  configureOperationPanel(entry);
  markActiveAlgorithm();
  runSelectedAlgorithm();
}

function renderAlgorithmSelectIfNeeded(category) {
  if (elements.categorySelect.value !== category) {
    elements.categorySelect.value = category;
    renderAlgorithmSelect();
  }
}

function markActiveAlgorithm() {
  elements.algorithmList.querySelectorAll("button").forEach((button) => {
    button.classList.toggle("active", button.dataset.id === state.selectedId);
  });
}

function runSelectedAlgorithm() {
  stopPlayback();
  const entry = state.catalog.find((candidate) => candidate.id === state.selectedId);
  if (!entry) return;
  const input = elements.dataInput.value.trim();
  const target = elements.targetInput.value.trim();
  try {
    state.steps = entry.runner(input, target);
  } catch (error) {
    state.steps = [step("text", `Input error: ${error.message}`, {
      visualText: "Invalid input. Restore the example value or follow the usage guide.",
      legend: [{ label: "error", color: colors.danger }],
    })];
  }
  if (state.steps.length === 0) {
    state.steps = [step("text", "No steps were generated.", { visualText: "No visualization state available." })];
  }
  state.stepIndex = 0;
  elements.stepSlider.max = String(Math.max(0, state.steps.length - 1));
  elements.stepSlider.value = "0";
  updateMetrics(entry, input);
  renderStepLog();
  showStep(0);
}

function showStep(index) {
  if (state.steps.length === 0) return;
  state.stepIndex = Math.max(0, Math.min(index, state.steps.length - 1));
  const step = state.steps[state.stepIndex];
  renderStep(step);
  elements.stepCounter.textContent = `Step ${state.stepIndex + 1} / ${state.steps.length}`;
  elements.stepSlider.value = String(state.stepIndex);
  elements.stepText.textContent = step.message || "";
  elements.progressBar.style.width = `${((state.stepIndex + 1) / Math.max(1, state.steps.length)) * 100}%`;
  elements.metricState.textContent = state.stepIndex >= state.steps.length - 1 ? "Complete" : "Running";
  markPseudoLine(step);
  renderStepLog();
}

function togglePlayback() {
  if (state.timer) {
    stopPlayback();
    return;
  }
  elements.playButton.textContent = "暫停";
  state.timer = window.setInterval(() => {
    if (state.stepIndex >= state.steps.length - 1) {
      stopPlayback();
      return;
    }
    showStep(state.stepIndex + 1);
  }, Number(elements.speedSelect.value) || 650);
}

function stopPlayback() {
  if (state.timer) {
    window.clearInterval(state.timer);
    state.timer = null;
  }
  if (elements.playButton) elements.playButton.textContent = "播放";
}

function toggleTheme() {
  const root = document.documentElement;
  const next = root.dataset.theme === "dark" ? "light" : "dark";
  root.dataset.theme = next;
  elements.themeButton.textContent = next === "dark" ? "淺色" : "深色";
}

function configureOperationPanel(entry) {
  const operations = operationsFor(entry.id);
  elements.operationPanel.classList.toggle("active", operations.length > 0);
  elements.operationSelect.innerHTML = operations.map((operation) => `<option value="${operation.value}">${operation.label}</option>`).join("");
  elements.operationValue.value = nextSuggestedValue(entry.id);
  elements.operationValue.disabled = operations.length === 0 || operations[0]?.value === "extract-min";
  elements.operationSelect.onchange = () => {
    const selected = elements.operationSelect.value;
    elements.operationValue.disabled = selected === "extract-min";
    elements.operationValue.placeholder = selected === "delete" ? "要刪除的值" : "例如 42";
  };
}

function operationsFor(id) {
  if (id === "fibonacci-heap") {
    return [
      { value: "insert", label: "Insert" },
      { value: "extract-min", label: "Extract-Min" },
    ];
  }
  if (id === "red-black-tree") {
    return [
      { value: "insert", label: "Insert" },
      { value: "delete", label: "Delete" },
    ];
  }
  if (["binary-search-tree", "avl-tree"].includes(id)) {
    return [
      { value: "insert", label: "Insert" },
      { value: "delete", label: "Delete" },
    ];
  }
  if (id === "trie") {
    return [
      { value: "insert", label: "Insert Word" },
      { value: "delete", label: "Delete Word" },
    ];
  }
  return [];
}

function nextSuggestedValue(id) {
  const values = parseNumbers(elements.dataInput?.value || "");
  if (id === "trie") return "data";
  if (values.length === 0) return "10";
  return String(Math.max(...values) + 1);
}

function applyStructureOperation() {
  stopPlayback();
  const entry = state.catalog.find((candidate) => candidate.id === state.selectedId);
  if (!entry) return;
  const operation = elements.operationSelect.value;
  const rawValue = elements.operationValue.value.trim();

  if (entry.id === "fibonacci-heap") {
    state.steps = runFibonacciHeapOperation(elements.dataInput.value, operation, rawValue);
    elements.dataInput.value = state.steps.finalInput || elements.dataInput.value;
  } else if (entry.id === "red-black-tree") {
    state.steps = runRedBlackTreeOperation(elements.dataInput.value, operation, rawValue);
    elements.dataInput.value = state.steps.finalInput || elements.dataInput.value;
  } else if (entry.id === "binary-search-tree") {
    state.steps = runBstOperation(elements.dataInput.value, operation, rawValue);
    elements.dataInput.value = state.steps.finalInput || elements.dataInput.value;
  } else if (entry.id === "avl-tree") {
    state.steps = runAvlOperation(elements.dataInput.value, operation, rawValue);
    elements.dataInput.value = state.steps.finalInput || elements.dataInput.value;
  } else if (entry.id === "trie") {
    state.steps = runTrieOperation(elements.dataInput.value, operation, rawValue);
    elements.dataInput.value = state.steps.finalInput || elements.dataInput.value;
  } else {
    runSelectedAlgorithm();
    return;
  }

  if (state.steps.length === 0) {
    state.steps = [step("text", "No operation was applied.", { visualText: "Operation produced no state change." })];
  }
  state.stepIndex = 0;
  elements.stepSlider.max = String(Math.max(0, state.steps.length - 1));
  elements.stepSlider.value = "0";
  updateMetrics(entry, elements.dataInput.value);
  renderStepLog();
  showStep(0);
  elements.operationValue.value = nextSuggestedValue(entry.id);
}

function clearCurrentStructure() {
  const entry = state.catalog.find((candidate) => candidate.id === state.selectedId);
  if (!entry) return;
  elements.dataInput.value = "";
  state.steps = [step("text", `${entry.name} cleared.`, { visualText: "Empty structure" })];
  state.stepIndex = 0;
  elements.stepSlider.max = "0";
  updateMetrics(entry, "");
  renderStepLog();
  showStep(0);
}

function updateMetrics(entry, input) {
  elements.metricCategory.textContent = entry.category;
  elements.metricSteps.textContent = String(state.steps.length);
  elements.metricInputSize.textContent = String(estimateInputSize(input));
  elements.metricState.textContent = "Ready";
}

function estimateInputSize(input) {
  if (!input) return 0;
  return input.split(",").map((part) => part.trim()).filter(Boolean).length;
}

function renderPseudoCode(entry) {
  const lines = pseudoFor(entry.id);
  elements.pseudoCode.innerHTML = lines.map((line, index) => `<li data-line="${index}">${line}</li>`).join("");
}

function markPseudoLine(stepData) {
  const message = (stepData.message || "").toLowerCase();
  const items = [...elements.pseudoCode.querySelectorAll("li")];
  let active = 0;
  if (message.includes("compare") || message.includes("check")) active = 1;
  if (message.includes("swap") || message.includes("relax") || message.includes("shift")) active = 2;
  if (message.includes("insert") || message.includes("place")) active = 2;
  if (message.includes("rotation") || message.includes("flip") || message.includes("consolidation")) active = 3;
  if (message.includes("sorted") || message.includes("found") || message.includes("finished") || message.includes("complete")) active = items.length - 1;
  items.forEach((item, index) => item.classList.toggle("active", index === active));
}

function renderStepLog() {
  const start = Math.max(0, state.stepIndex - 5);
  const entries = state.steps.slice(start, state.stepIndex + 1);
  elements.stepLog.innerHTML = entries
    .map((entry, offset) => {
      const absoluteIndex = start + offset;
      return `<li class="${absoluteIndex === state.stepIndex ? "active" : ""}">${entry.message || "Render state"}</li>`;
    })
    .join("");
}

function pseudoFor(id) {
  if (id.includes("sort")) return ["read input array", "compare candidates", "move or swap values", "mark fixed region", "emit sorted result"];
  if (id.includes("search")) return ["read search target", "inspect candidate", "narrow or advance", "return match or not found"];
  if (id.includes("tree") || id.includes("trie")) return ["start at root", "choose child path", "insert node", "repair structure if needed", "render balanced state"];
  if (id.includes("heap")) return ["add root node", "track minimum", "extract minimum", "link equal-degree roots", "finish consolidated heap"];
  if (["dfs", "bfs"].includes(id)) return ["choose start vertex", "visit current vertex", "push unvisited neighbors", "repeat until frontier empty"];
  if (["dijkstra", "bellman-ford", "floyd-warshall", "johnson"].includes(id)) return ["initialize distances", "select path candidate", "relax edge or matrix cell", "record improved distance", "return shortest paths"];
  if (["kruskal", "prim"].includes(id)) return ["initialize MST", "choose lightest safe edge", "reject cycle or accept edge", "finish spanning tree"];
  if (["fibonacci-dp", "knapsack", "lcs", "matrix-chain"].includes(id)) return ["initialize table", "read previous states", "compute recurrence", "write current cell", "return optimal value"];
  if (["kmp", "rabin-karp"].includes(id)) return ["prepare pattern state", "scan text window", "compare state/hash", "report match"];
  return ["parse input", "iterate state", "update candidate", "render result"];
}

function step(type, message, payload) {
  return { type, message, ...payload };
}

function parseNumbers(input) {
  return input
    .split(",")
    .map((part) => Number(part.trim()))
    .filter((value) => Number.isFinite(value));
}

function parseWords(input) {
  return input.split(",").map((part) => part.trim()).filter(Boolean);
}

function parseEdges(input, directed = false) {
  const edges = [];
  const vertices = new Set();
  for (const token of input.split(",")) {
    const part = token.trim();
    if (!part) continue;
    const [pair, weightPart] = part.split(":");
    const [fromText, toText] = pair.split("-");
    const from = Number(fromText);
    const to = Number(toText);
    const weight = weightPart === undefined ? 1 : Number(weightPart);
    if (![from, to, weight].every(Number.isFinite)) continue;
    edges.push({ from, to, weight });
    vertices.add(from);
    vertices.add(to);
    if (!directed) {
      vertices.add(to);
      vertices.add(from);
    }
  }
  return { vertices: [...vertices].sort((a, b) => a - b), edges };
}

function adjacencyFromEdges(vertices, edges, directed) {
  const graph = new Map(vertices.map((vertex) => [vertex, []]));
  for (const edge of edges) {
    graph.get(edge.from).push({ to: edge.to, weight: edge.weight });
    if (!directed) graph.get(edge.to).push({ to: edge.from, weight: edge.weight });
  }
  return graph;
}

function cloneArray(values) {
  return values.slice();
}

function renderStep(stepData) {
  clearCanvases();
  elements.stageHint.textContent = stepData.message || "Inspect the current algorithm state.";
  if (stepData.type === "array") renderArray(stepData);
  if (stepData.type === "tree") renderTree(stepData);
  if (stepData.type === "graph") renderGraph(stepData);
  if (stepData.type === "table") renderTable(stepData);
  if (stepData.type === "heap") renderHeap(stepData);
  if (stepData.type === "text") renderText(stepData);
  renderLegend(stepData.legend || defaultLegend());
}

function clearCanvases() {
  elements.svgCanvas.innerHTML = "";
  elements.tableCanvas.innerHTML = "";
}

function svgElement(tag, attributes = {}) {
  const node = document.createElementNS("http://www.w3.org/2000/svg", tag);
  for (const [key, value] of Object.entries(attributes)) node.setAttribute(key, value);
  return node;
}

function renderArray(data) {
  const values = data.values || [];
  const width = elements.svgCanvas.clientWidth || 900;
  const height = 560;
  const max = Math.max(...values.map((value) => Math.abs(Number(value)) || 1), 1);
  const barWidth = Math.max(18, Math.min(56, (width - 80) / Math.max(values.length, 1)));
  const baseY = height - 54;
  values.forEach((value, index) => {
    const magnitude = Math.max(8, (Math.abs(Number(value)) / max) * 360);
    const x = 40 + index * barWidth;
    const y = Number(value) >= 0 ? baseY - magnitude : baseY;
    const fill = colorForIndex(index, data);
    elements.svgCanvas.appendChild(svgElement("rect", {
      x,
      y,
      width: barWidth - 6,
      height: magnitude,
      rx: 4,
      fill,
      stroke: "#5b6575",
    }));
    elements.svgCanvas.appendChild(svgElement("text", {
      x: x + (barWidth - 6) / 2,
      y: baseY + 22,
      class: "bar-label",
    })).textContent = String(value);
  });
}

function colorForIndex(index, data) {
  if ((data.done || []).includes(index)) return colors.done;
  if ((data.active || []).includes(index)) return colors.active;
  if ((data.compare || []).includes(index)) return colors.compare;
  if ((data.danger || []).includes(index)) return colors.danger;
  return colors.default;
}

function renderTree(data) {
  const root = data.root;
  if (!root) return;
  const positioned = [];
  assignTreePositions(root, 0, elements.svgCanvas.clientWidth || 900, 56, 92, positioned);
  for (const node of positioned) {
    if (node.parent) {
      elements.svgCanvas.appendChild(svgElement("line", {
        x1: node.parent.x,
        y1: node.parent.y,
        x2: node.x,
        y2: node.y,
        class: "edge",
      }));
    }
  }
  for (const node of positioned) {
    const fill = node.color === "red" ? colors.treeRed : node.color === "black" ? colors.treeBlack : colorForNode(node, data);
    elements.svgCanvas.appendChild(svgElement("circle", {
      cx: node.x,
      cy: node.y,
      r: 22,
      class: "node",
      fill,
    }));
    const text = svgElement("text", {
      x: node.x,
      y: node.y,
      class: "label",
      style: `fill:${node.color === "black" || node.color === "red" ? "#ffffff" : "#1d2430"}`,
    });
    text.textContent = node.label ?? node.value;
    elements.svgCanvas.appendChild(text);
  }
}

function colorForNode(node, data) {
  if ((data.active || []).includes(node.id)) return colors.active;
  if ((data.done || []).includes(node.id)) return colors.done;
  return colors.default;
}

function assignTreePositions(node, left, right, y, gapY, output, parent = null) {
  const x = (left + right) / 2;
  const record = { ...node, x, y, parent };
  output.push(record);
  if (node.left) assignTreePositions(node.left, left, x - 22, y + gapY, gapY, output, record);
  if (node.right) assignTreePositions(node.right, x + 22, right, y + gapY, gapY, output, record);
}

function renderGraph(data) {
  const vertices = data.vertices || [];
  const edges = data.edges || [];
  const width = elements.svgCanvas.clientWidth || 900;
  const centerX = width / 2;
  const centerY = 285;
  const radius = Math.min(230, Math.max(120, width / 3));
  const positions = new Map();
  vertices.forEach((vertex, index) => {
    const angle = -Math.PI / 2 + (2 * Math.PI * index) / Math.max(vertices.length, 1);
    positions.set(vertex, {
      x: centerX + Math.cos(angle) * radius,
      y: centerY + Math.sin(angle) * radius,
    });
  });

  for (const edge of edges) {
    const a = positions.get(edge.from);
    const b = positions.get(edge.to);
    if (!a || !b) continue;
    const active = (data.activeEdges || []).some((item) => sameEdge(item, edge));
    elements.svgCanvas.appendChild(svgElement("line", {
      x1: a.x,
      y1: a.y,
      x2: b.x,
      y2: b.y,
      stroke: active ? colors.active : colors.edge,
      "stroke-width": active ? 4 : 2,
    }));
    const label = svgElement("text", {
      x: (a.x + b.x) / 2,
      y: (a.y + b.y) / 2 - 8,
      class: "bar-label",
    });
    label.textContent = edge.weight ?? "";
    elements.svgCanvas.appendChild(label);
  }

  for (const vertex of vertices) {
    const position = positions.get(vertex);
    const fill = (data.done || []).includes(vertex)
      ? colors.done
      : (data.active || []).includes(vertex)
        ? colors.active
        : colors.default;
    elements.svgCanvas.appendChild(svgElement("circle", {
      cx: position.x,
      cy: position.y,
      r: 24,
      class: "node",
      fill,
    }));
    const label = svgElement("text", { x: position.x, y: position.y, class: "label" });
    label.textContent = vertex;
    elements.svgCanvas.appendChild(label);
  }
}

function sameEdge(a, b) {
  return a.from === b.from && a.to === b.to && (a.weight === undefined || a.weight === b.weight);
}

function renderTable(data) {
  if (data.values) renderArray(data);
  const table = document.createElement("table");
  table.className = "grid-table";
  const matrix = data.table || [];
  matrix.forEach((row, rowIndex) => {
    const tr = document.createElement("tr");
    row.forEach((cell, colIndex) => {
      const td = document.createElement(rowIndex === 0 || colIndex === 0 ? "th" : "td");
      td.textContent = String(cell);
      if ((data.activeCells || []).some(([r, c]) => r === rowIndex && c === colIndex)) td.className = "active";
      if ((data.doneCells || []).some(([r, c]) => r === rowIndex && c === colIndex)) td.className = "done";
      tr.appendChild(td);
    });
    table.appendChild(tr);
  });
  elements.tableCanvas.appendChild(table);
}

function renderHeap(data) {
  const roots = data.roots || [];
  const width = elements.svgCanvas.clientWidth || 900;
  const gap = width / Math.max(roots.length + 1, 2);
  roots.forEach((root, index) => {
    drawHeapTree(root, gap * (index + 1), 70, 80);
  });
}

function drawHeapTree(node, x, y, spread) {
  if (!node) return;
  node.children.forEach((child, index) => {
    const childX = x + (index - (node.children.length - 1) / 2) * spread;
    const childY = y + 92;
    elements.svgCanvas.appendChild(svgElement("line", { x1: x, y1: y, x2: childX, y2: childY, class: "edge" }));
    drawHeapTree(child, childX, childY, spread * 0.7);
  });
  elements.svgCanvas.appendChild(svgElement("circle", { cx: x, cy: y, r: 22, class: "node", fill: node.min ? colors.active : colors.purple }));
  const label = svgElement("text", { x, y, class: "label" });
  label.textContent = node.value;
  elements.svgCanvas.appendChild(label);
}

function renderText(data) {
  const text = svgElement("text", { x: 40, y: 70, fill: "#1d2430", "font-size": 18 });
  text.textContent = data.visualText || data.message;
  elements.svgCanvas.appendChild(text);
}

function renderLegend(entries) {
  elements.legend.innerHTML = entries
    .map((entry) => `<span><i class="swatch" style="background:${entry.color}"></i>${entry.label}</span>`)
    .join("");
}

function defaultLegend() {
  return [
    { label: "active", color: colors.active },
    { label: "done", color: colors.done },
    { label: "compare", color: colors.compare },
  ];
}

function runBubbleSort(input) {
  const values = parseNumbers(input);
  const steps = [step("array", "Initial array.", { values: cloneArray(values) })];
  for (let pass = 0; pass < values.length; pass++) {
    for (let i = 1; i < values.length - pass; i++) {
      steps.push(step("array", `Compare ${values[i - 1]} and ${values[i]}.`, { values: cloneArray(values), compare: [i - 1, i] }));
      if (values[i] < values[i - 1]) {
        [values[i], values[i - 1]] = [values[i - 1], values[i]];
        steps.push(step("array", "Swap adjacent inverted values.", { values: cloneArray(values), active: [i - 1, i] }));
      }
    }
    steps.push(step("array", `Pass ${pass + 1} fixed the next largest value.`, { values: cloneArray(values), done: range(values.length - pass - 1, values.length) }));
  }
  return steps;
}

function runSelectionSort(input) {
  const values = parseNumbers(input);
  const steps = [step("array", "Initial array.", { values: cloneArray(values) })];
  for (let i = 0; i < values.length; i++) {
    let min = i;
    for (let j = i + 1; j < values.length; j++) {
      steps.push(step("array", `Compare current minimum ${values[min]} with ${values[j]}.`, { values: cloneArray(values), compare: [min, j], done: range(0, i) }));
      if (values[j] < values[min]) min = j;
    }
    [values[i], values[min]] = [values[min], values[i]];
    steps.push(step("array", `Place ${values[i]} at position ${i}.`, { values: cloneArray(values), active: [i], done: range(0, i + 1) }));
  }
  return steps;
}

function runInsertionSort(input) {
  const values = parseNumbers(input);
  const steps = [step("array", "Initial array.", { values: cloneArray(values) })];
  for (let i = 1; i < values.length; i++) {
    const current = values[i];
    let j = i - 1;
    steps.push(step("array", `Insert ${current} into sorted prefix.`, { values: cloneArray(values), active: [i], done: range(0, i) }));
    while (j >= 0 && values[j] > current) {
      values[j + 1] = values[j];
      steps.push(step("array", `Shift ${values[j]} right.`, { values: cloneArray(values), compare: [j, j + 1] }));
      j--;
    }
    values[j + 1] = current;
    steps.push(step("array", `Placed ${current}.`, { values: cloneArray(values), done: range(0, i + 1) }));
  }
  return steps;
}

function runMergeSort(input) {
  const values = parseNumbers(input);
  const steps = [step("array", "Initial array.", { values: cloneArray(values) })];
  function sort(left, right) {
    if (right - left <= 1) return;
    const mid = Math.floor((left + right) / 2);
    steps.push(step("array", `Split range [${left}, ${right}).`, { values: cloneArray(values), active: range(left, right) }));
    sort(left, mid);
    sort(mid, right);
    const merged = [];
    let i = left;
    let j = mid;
    while (i < mid || j < right) {
      if (j >= right || (i < mid && values[i] <= values[j])) merged.push(values[i++]);
      else merged.push(values[j++]);
    }
    for (let k = 0; k < merged.length; k++) values[left + k] = merged[k];
    steps.push(step("array", `Merge range [${left}, ${right}).`, { values: cloneArray(values), done: range(left, right) }));
  }
  sort(0, values.length);
  return steps;
}

function runQuickSort(input) {
  const values = parseNumbers(input);
  const steps = [step("array", "Initial array.", { values: cloneArray(values) })];
  function sort(left, right) {
    if (left >= right) return;
    const pivot = values[Math.floor((left + right) / 2)];
    let i = left;
    let j = right;
    steps.push(step("array", `Partition [${left}, ${right}] around pivot ${pivot}.`, { values: cloneArray(values), active: [Math.floor((left + right) / 2)] }));
    while (i <= j) {
      while (values[i] < pivot) i++;
      while (values[j] > pivot) j--;
      if (i <= j) {
        [values[i], values[j]] = [values[j], values[i]];
        steps.push(step("array", `Swap index ${i} and ${j}.`, { values: cloneArray(values), compare: [i, j] }));
        i++;
        j--;
      }
    }
    sort(left, j);
    sort(i, right);
  }
  sort(0, values.length - 1);
  steps.push(step("array", "Sorted.", { values: cloneArray(values), done: range(0, values.length) }));
  return steps;
}

function runHeapSort(input) {
  const values = parseNumbers(input);
  const steps = [step("array", "Initial array.", { values: cloneArray(values) })];
  for (let end = values.length - 1; end > 0; end--) {
    buildMaxHeap(values, end + 1);
    steps.push(step("array", `Build max heap for first ${end + 1} values.`, { values: cloneArray(values), active: [0] }));
    [values[0], values[end]] = [values[end], values[0]];
    steps.push(step("array", `Move max ${values[end]} to sorted suffix.`, { values: cloneArray(values), done: range(end, values.length) }));
  }
  steps.push(step("array", "Sorted.", { values: cloneArray(values), done: range(0, values.length) }));
  return steps;
}

function buildMaxHeap(values, size) {
  for (let i = Math.floor(size / 2) - 1; i >= 0; i--) heapify(values, size, i);
}

function heapify(values, size, root) {
  let largest = root;
  const left = root * 2 + 1;
  const right = root * 2 + 2;
  if (left < size && values[left] > values[largest]) largest = left;
  if (right < size && values[right] > values[largest]) largest = right;
  if (largest !== root) {
    [values[root], values[largest]] = [values[largest], values[root]];
    heapify(values, size, largest);
  }
}

function runCountingSort(input) {
  const values = parseNumbers(input);
  const steps = [step("array", "Initial array.", { values: cloneArray(values) })];
  const min = Math.min(...values);
  const max = Math.max(...values);
  const counts = Array(max - min + 1).fill(0);
  values.forEach((value, index) => {
    counts[value - min]++;
    steps.push(step("table", `Count value ${value}.`, { values: cloneArray(values), active: [index], table: [["value", ...counts.map((_, i) => i + min)], ["count", ...counts]], activeCells: [[1, value - min + 1]] }));
  });
  const sorted = [];
  counts.forEach((count, offset) => {
    for (let i = 0; i < count; i++) sorted.push(offset + min);
    steps.push(step("array", `Emit ${count} copies of ${offset + min}.`, { values: cloneArray(sorted), done: range(0, sorted.length) }));
  });
  return steps;
}

function runRadixSort(input) {
  let values = parseNumbers(input);
  const steps = [step("array", "Initial array.", { values: cloneArray(values) })];
  const max = Math.max(...values);
  for (let exp = 1; Math.floor(max / exp) > 0; exp *= 10) {
    const buckets = Array.from({ length: 10 }, () => []);
    values.forEach((value) => buckets[Math.floor(value / exp) % 10].push(value));
    values = buckets.flat();
    steps.push(step("table", `Collect by digit at exponent ${exp}.`, { values: cloneArray(values), table: buckets.map((bucket, index) => [`${index}`, ...bucket]) }));
  }
  return steps;
}

function runBucketSort(input) {
  const values = parseNumbers(input);
  const buckets = Array.from({ length: values.length }, () => []);
  const steps = [step("array", "Initial decimal values.", { values: cloneArray(values) })];
  for (const value of values) {
    const index = Math.min(values.length - 1, Math.floor(value * values.length));
    buckets[index].push(value);
    steps.push(step("table", `Place ${value} into bucket ${index}.`, { table: buckets.map((bucket, i) => [`bucket ${i}`, ...bucket]) }));
  }
  const sorted = buckets.flatMap((bucket) => bucket.sort((a, b) => a - b));
  steps.push(step("array", "Concatenate sorted buckets.", { values: sorted, done: range(0, sorted.length) }));
  return steps;
}

function runLinearSearch(input, targetText) {
  const values = parseNumbers(input);
  const target = Number(targetText);
  const steps = [step("array", `Search for ${target}.`, { values })];
  for (let i = 0; i < values.length; i++) {
    steps.push(step("array", `Check index ${i}.`, { values, active: [i] }));
    if (values[i] === target) {
      steps.push(step("array", `Found ${target} at index ${i}.`, { values, done: [i] }));
      return steps;
    }
  }
  steps.push(step("array", `${target} was not found.`, { values, danger: range(0, values.length) }));
  return steps;
}

function runBinarySearch(input, targetText) {
  const values = parseNumbers(input).sort((a, b) => a - b);
  const target = Number(targetText);
  const steps = [step("array", `Search sorted array for ${target}.`, { values })];
  let left = 0;
  let right = values.length - 1;
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    steps.push(step("array", `Middle index ${mid}, value ${values[mid]}.`, { values, active: [mid], compare: range(left, right + 1) }));
    if (values[mid] === target) {
      steps.push(step("array", `Found ${target}.`, { values, done: [mid] }));
      return steps;
    }
    if (values[mid] < target) left = mid + 1;
    else right = mid - 1;
  }
  steps.push(step("array", `${target} was not found.`, { values, danger: range(0, values.length) }));
  return steps;
}

function range(start, end) {
  return Array.from({ length: Math.max(0, end - start) }, (_, index) => start + index);
}

function runBinarySearchTree(input) {
  const values = parseNumbers(input);
  let root = null;
  const steps = [];
  values.forEach((value) => {
    root = bstInsert(root, value);
    steps.push(step("tree", `Insert ${value}.`, { root: cloneTree(root), active: [value] }));
  });
  return steps;
}

function bstInsert(node, value) {
  if (!node) return { id: value, value, left: null, right: null };
  if (value < node.value) node.left = bstInsert(node.left, value);
  if (value > node.value) node.right = bstInsert(node.right, value);
  return node;
}

function cloneTree(node) {
  if (!node) return null;
  return { ...node, left: cloneTree(node.left), right: cloneTree(node.right) };
}

function runAvlTree(input) {
  const values = parseNumbers(input);
  let root = null;
  const steps = [];
  values.forEach((value) => {
    root = avlInsert(root, value, steps);
    steps.push(step("tree", `AVL insert ${value}; balance factors repaired.`, { root: cloneTree(root), active: [value] }));
  });
  return steps;
}

function avlHeight(node) {
  return node ? node.height : 0;
}

function updateAvl(node) {
  node.height = 1 + Math.max(avlHeight(node.left), avlHeight(node.right));
}

function rotateRight(y) {
  const x = y.left;
  y.left = x.right;
  x.right = y;
  updateAvl(y);
  updateAvl(x);
  return x;
}

function rotateLeft(x) {
  const y = x.right;
  x.right = y.left;
  y.left = x;
  updateAvl(x);
  updateAvl(y);
  return y;
}

function avlInsert(node, value, steps) {
  if (!node) return { id: value, value, height: 1, left: null, right: null };
  if (value < node.value) node.left = avlInsert(node.left, value, steps);
  else if (value > node.value) node.right = avlInsert(node.right, value, steps);
  else return node;
  updateAvl(node);
  const balance = avlHeight(node.left) - avlHeight(node.right);
  if (balance > 1 && value < node.left.value) {
    steps.push(step("tree", `Right rotation at ${node.value}.`, { root: cloneTree(node), active: [node.value] }));
    return rotateRight(node);
  }
  if (balance < -1 && value > node.right.value) {
    steps.push(step("tree", `Left rotation at ${node.value}.`, { root: cloneTree(node), active: [node.value] }));
    return rotateLeft(node);
  }
  if (balance > 1 && value > node.left.value) {
    node.left = rotateLeft(node.left);
    return rotateRight(node);
  }
  if (balance < -1 && value < node.right.value) {
    node.right = rotateRight(node.right);
    return rotateLeft(node);
  }
  return node;
}

function runRedBlackTree(input) {
  const values = parseNumbers(input);
  let root = null;
  const steps = [];
  values.forEach((value) => {
    root = rbInsert(root, value, steps);
    root.color = "black";
    steps.push(step("tree", `Inserted ${value}; root is black.`, { root: cloneTree(root), active: [value] }));
  });
  return steps;
}

function runRedBlackTreeOperation(input, operation, rawValue) {
  const values = parseNumbers(input);
  if (operation === "insert") {
    const value = Number(rawValue);
    if (!Number.isFinite(value)) throw new Error("Insert needs a numeric value.");
    let root = buildRedBlackTree(values);
    const steps = [
      step("tree", "Current red-black tree before insert.", { root: cloneTree(root) }),
      step("tree", `Search insertion position for ${value}.`, { root: cloneTree(root), active: [value] }),
    ];
    root = rbInsert(root, value, steps);
    root.color = "black";
    steps.push(step("tree", `Insert ${value} and repair red-black invariants.`, { root: cloneTree(root), active: [value] }));
    steps.finalInput = values.concat(value).join(",");
    return steps;
  }

  if (operation === "delete") {
    const value = Number(rawValue);
    if (!Number.isFinite(value)) throw new Error("Delete needs a numeric value.");
    const beforeRoot = buildRedBlackTree(values);
    const afterValues = values.filter((item) => item !== value);
    const afterRoot = buildRedBlackTree(afterValues);
    const steps = [
      step("tree", `Locate ${value} before deletion.`, { root: cloneTree(beforeRoot), active: [value] }),
      step("tree", `Remove ${value} from the value set.`, { root: cloneTree(beforeRoot), danger: [value] }),
      step("tree", "Rebalance into a left-leaning red-black representation.", { root: cloneTree(afterRoot), done: afterValues }),
      step("tree", "Deletion complete; root remains black.", { root: cloneTree(afterRoot), done: afterValues }),
    ];
    steps.finalInput = afterValues.join(",");
    return steps;
  }
  return [];
}

function buildRedBlackTree(values) {
  let root = null;
  for (const value of values) {
    root = rbInsert(root, value, []);
    root.color = "black";
  }
  return root;
}

function isRed(node) {
  return Boolean(node && node.color === "red");
}

function rbRotateLeft(node) {
  const x = node.right;
  node.right = x.left;
  x.left = node;
  x.color = node.color;
  x.left.color = "red";
  return x;
}

function rbRotateRight(node) {
  const x = node.left;
  node.left = x.right;
  x.right = node;
  x.color = node.color;
  x.right.color = "red";
  return x;
}

function rbFlipColors(node) {
  node.color = "red";
  node.left.color = "black";
  node.right.color = "black";
}

function rbInsert(node, value, steps) {
  if (!node) return { id: value, value, color: "red", left: null, right: null };
  if (value < node.value) node.left = rbInsert(node.left, value, steps);
  else if (value > node.value) node.right = rbInsert(node.right, value, steps);
  if (isRed(node.right) && !isRed(node.left)) {
    steps.push(step("tree", `Left rotation at ${node.value}.`, { root: cloneTree(node), active: [node.value] }));
    node = rbRotateLeft(node);
  }
  if (isRed(node.left) && isRed(node.left.left)) {
    steps.push(step("tree", `Right rotation at ${node.value}.`, { root: cloneTree(node), active: [node.value] }));
    node = rbRotateRight(node);
  }
  if (isRed(node.left) && isRed(node.right)) {
    rbFlipColors(node);
    steps.push(step("tree", `Flip colors at ${node.value}.`, { root: cloneTree(node), active: [node.value] }));
  }
  return node;
}

function runTrie(input) {
  const words = parseWords(input);
  const root = { id: "root", label: "root", children: new Map() };
  const steps = [];
  for (const word of words) {
    let node = root;
    for (const char of word) {
      if (!node.children.has(char)) node.children.set(char, { id: `${node.id}-${char}`, label: char, children: new Map() });
      node = node.children.get(char);
      steps.push(step("tree", `Insert character '${char}' from '${word}'.`, { root: trieToBinary(root), active: [node.id] }));
    }
    node.label += "*";
  }
  return steps;
}

function runBstOperation(input, operation, rawValue) {
  const values = parseNumbers(input);
  const value = Number(rawValue);
  if (!Number.isFinite(value)) throw new Error("Operation needs a numeric value.");
  const nextValues = operation === "delete" ? values.filter((item) => item !== value) : values.concat(value);
  const steps = [
    step("text", `${operation === "delete" ? "Delete" : "Insert"} ${value} in BST.`, { visualText: "BST operation" }),
    ...runBinarySearchTree(nextValues.join(",")),
  ];
  steps.finalInput = nextValues.join(",");
  return steps;
}

function runAvlOperation(input, operation, rawValue) {
  const values = parseNumbers(input);
  const value = Number(rawValue);
  if (!Number.isFinite(value)) throw new Error("Operation needs a numeric value.");
  const nextValues = operation === "delete" ? values.filter((item) => item !== value) : values.concat(value);
  const steps = [
    step("text", `${operation === "delete" ? "Delete" : "Insert"} ${value} in AVL tree.`, { visualText: "AVL operation" }),
    ...runAvlTree(nextValues.join(",")),
  ];
  steps.finalInput = nextValues.join(",");
  return steps;
}

function runTrieOperation(input, operation, rawValue) {
  const words = parseWords(input);
  const word = rawValue.trim();
  if (!word) throw new Error("Trie operation needs a word.");
  const nextWords = operation === "delete" ? words.filter((item) => item !== word) : words.concat(word);
  const steps = [
    step("text", `${operation === "delete" ? "Delete" : "Insert"} '${word}' in Trie.`, { visualText: "Trie operation" }),
    ...runTrie(nextWords.join(",")),
  ];
  steps.finalInput = nextWords.join(",");
  return steps;
}

function trieToBinary(node) {
  const children = [...node.children.values()];
  const converted = { id: node.id, label: node.label, value: node.label, left: null, right: null };
  if (children[0]) converted.left = trieToBinary(children[0]);
  let cursor = converted.left;
  for (let i = 1; i < children.length; i++) {
    cursor.right = trieToBinary(children[i]);
    cursor = cursor.right;
  }
  return converted;
}

function runFibonacciHeap(input) {
  const values = parseNumbers(input);
  const roots = [];
  const steps = [];
  for (const value of values) {
    roots.push({ value, degree: 0, children: [] });
    markMin(roots);
    steps.push(step("heap", `Insert ${value} into root list.`, { roots: cloneHeapRoots(roots) }));
  }
  steps.push(step("heap", "Heap is ready. Use Extract-Min for the delete-min operation.", { roots: cloneHeapRoots(roots) }));
  return steps;
}

function runFibonacciHeapOperation(input, operation, rawValue) {
  const values = parseNumbers(input);
  if (operation === "insert") {
    const value = Number(rawValue);
    if (!Number.isFinite(value)) throw new Error("Insert needs a numeric value.");
    const beforeRoots = values.map((item) => ({ value: item, degree: 0, children: [] }));
    if (beforeRoots.length > 0) markMin(beforeRoots);
    const afterValues = values.concat(value);
    const afterRoots = afterValues.map((item) => ({ value: item, degree: 0, children: [] }));
    markMin(afterRoots);
    const steps = [
      step("heap", "Current Fibonacci heap root list.", { roots: cloneHeapRoots(beforeRoots) }),
      step("heap", `Create singleton heap node ${value}.`, { roots: [{ value, degree: 0, min: true, children: [] }] }),
      step("heap", `Meld node ${value} into the root list in O(1).`, { roots: cloneHeapRoots(afterRoots) }),
      step("heap", `Update min pointer after inserting ${value}.`, { roots: cloneHeapRoots(afterRoots) }),
    ];
    steps.finalInput = afterValues.join(",");
    return steps;
  }

  if (operation === "extract-min") {
    if (values.length === 0) {
      const steps = [step("text", "Extract-Min skipped because the heap is empty.", { visualText: "Empty heap" })];
      steps.finalInput = "";
      return steps;
    }
    const roots = values.map((item) => ({ value: item, degree: 0, children: [] }));
    markMin(roots);
    const minValue = Math.min(...values);
    const remaining = values.slice();
    remaining.splice(remaining.indexOf(minValue), 1);
    const promotedRoots = remaining.map((item) => ({ value: item, degree: 0, children: [] }));
    if (promotedRoots.length > 0) markMin(promotedRoots);
    const steps = [
      step("heap", "Current root list with min pointer highlighted.", { roots: cloneHeapRoots(roots) }),
      step("heap", `Remove minimum root ${minValue}.`, { roots: cloneHeapRoots(promotedRoots) }),
      step("heap", "Promote removed min children into the root list.", { roots: cloneHeapRoots(promotedRoots) }),
    ];
    consolidateRoots(promotedRoots, steps);
    if (promotedRoots.length > 0) markMin(promotedRoots);
    steps.push(step("heap", "Extract-Min complete after consolidation.", { roots: cloneHeapRoots(promotedRoots) }));
    steps.finalInput = remaining.join(",");
    return steps;
  }
  return [];
}

function consolidateRoots(roots, steps) {
  let changed = true;
  while (changed) {
    changed = false;
    for (let i = 0; i < roots.length; i++) {
      const j = roots.findIndex((node, index) => index !== i && node.degree === roots[i].degree);
      if (j === -1) continue;
      let a = roots[i];
      let b = roots[j];
      if (a.value > b.value) [a, b] = [b, a];
      a.children.push(b);
      a.degree++;
      roots.splice(Math.max(i, j), 1);
      roots.splice(Math.min(i, j), 1, a);
      changed = true;
      markMin(roots);
      steps.push(step("heap", `Link equal-degree roots ${a.value} and ${b.value}.`, { roots: cloneHeapRoots(roots) }));
      break;
    }
  }
}

function markMin(roots) {
  const min = Math.min(...roots.map((node) => node.value));
  roots.forEach((node) => { node.min = node.value === min; });
}

function cloneHeapRoots(roots) {
  return roots.map(cloneHeapNode);
}

function cloneHeapNode(node) {
  return { value: node.value, degree: node.degree, min: node.min, children: node.children.map(cloneHeapNode) };
}

function runDfs(input, startText) {
  const { vertices, edges } = parseEdges(input, false);
  const graph = adjacencyFromEdges(vertices, edges, false);
  const start = Number(startText || vertices[0]);
  const visited = new Set();
  const steps = [step("graph", "Initial graph.", { vertices, edges })];
  function visit(vertex) {
    visited.add(vertex);
    steps.push(step("graph", `Visit ${vertex}.`, { vertices, edges, active: [vertex], done: [...visited] }));
    for (const edge of graph.get(vertex)) {
      if (!visited.has(edge.to)) visit(edge.to);
    }
  }
  visit(start);
  return steps;
}

function runBfs(input, startText) {
  const { vertices, edges } = parseEdges(input, false);
  const graph = adjacencyFromEdges(vertices, edges, false);
  const start = Number(startText || vertices[0]);
  const queue = [start];
  const visited = new Set([start]);
  const steps = [step("graph", "Initial graph.", { vertices, edges })];
  while (queue.length) {
    const vertex = queue.shift();
    steps.push(step("graph", `Dequeue and visit ${vertex}.`, { vertices, edges, active: [vertex], done: [...visited] }));
    for (const edge of graph.get(vertex)) {
      if (!visited.has(edge.to)) {
        visited.add(edge.to);
        queue.push(edge.to);
      }
    }
  }
  return steps;
}

function runDijkstra(input, startText) {
  const { vertices, edges } = parseEdges(input, true);
  const graph = adjacencyFromEdges(vertices, edges, true);
  const start = Number(startText || vertices[0]);
  const dist = Object.fromEntries(vertices.map((vertex) => [vertex, Infinity]));
  dist[start] = 0;
  const done = new Set();
  const steps = [distanceStep("Initialize distances.", vertices, edges, dist, [], [])];
  while (done.size < vertices.length) {
    const candidates = vertices.filter((vertex) => !done.has(vertex));
    const vertex = candidates.reduce((best, current) => dist[current] < dist[best] ? current : best, candidates[0]);
    if (!Number.isFinite(dist[vertex])) break;
    done.add(vertex);
    steps.push(distanceStep(`Settle ${vertex}.`, vertices, edges, dist, [vertex], [...done]));
    for (const edge of graph.get(vertex)) {
      if (dist[vertex] + edge.weight < dist[edge.to]) {
        dist[edge.to] = dist[vertex] + edge.weight;
        steps.push(distanceStep(`Relax ${vertex} -> ${edge.to}.`, vertices, edges, dist, [edge.to], [...done], [edge]));
      }
    }
  }
  return steps;
}

function distanceStep(message, vertices, edges, dist, active, done, activeEdges = []) {
  return step("graph", `${message}\nDistances: ${vertices.map((v) => `${v}:${formatDistance(dist[v])}`).join(" ")}`, {
    vertices,
    edges,
    active,
    done,
    activeEdges,
  });
}

function formatDistance(value) {
  return Number.isFinite(value) ? value : "inf";
}

function runBellmanFord(input, startText) {
  const { vertices, edges } = parseEdges(input, true);
  const start = Number(startText || vertices[0]);
  const dist = Object.fromEntries(vertices.map((vertex) => [vertex, Infinity]));
  dist[start] = 0;
  const steps = [distanceStep("Initialize Bellman-Ford.", vertices, edges, dist, [start], [])];
  for (let pass = 1; pass < vertices.length; pass++) {
    for (const edge of edges) {
      if (Number.isFinite(dist[edge.from]) && dist[edge.from] + edge.weight < dist[edge.to]) {
        dist[edge.to] = dist[edge.from] + edge.weight;
        steps.push(distanceStep(`Pass ${pass}: relax ${edge.from} -> ${edge.to}.`, vertices, edges, dist, [edge.to], [], [edge]));
      }
    }
  }
  return steps;
}

function runFloydWarshall(input) {
  const { vertices, edges } = parseEdges(input, true);
  const index = new Map(vertices.map((v, i) => [v, i]));
  const dist = vertices.map((_, i) => vertices.map((__, j) => i === j ? 0 : Infinity));
  edges.forEach((edge) => { dist[index.get(edge.from)][index.get(edge.to)] = edge.weight; });
  const steps = [matrixDistanceStep("Initial distance matrix.", vertices, dist)];
  for (let k = 0; k < vertices.length; k++) {
    for (let i = 0; i < vertices.length; i++) {
      for (let j = 0; j < vertices.length; j++) {
        if (dist[i][k] + dist[k][j] < dist[i][j]) {
          dist[i][j] = dist[i][k] + dist[k][j];
          steps.push(matrixDistanceStep(`Use ${vertices[k]} as intermediate for ${vertices[i]} -> ${vertices[j]}.`, vertices, dist, [[i + 1, j + 1]]));
        }
      }
    }
  }
  return steps;
}

function matrixDistanceStep(message, vertices, matrix, activeCells = []) {
  const table = [["", ...vertices], ...matrix.map((row, i) => [vertices[i], ...row.map(formatDistance)])];
  return step("table", message, { table, activeCells });
}

function runJohnson(input) {
  const { vertices, edges } = parseEdges(input, true);
  const helper = Math.min(...vertices) - 1;
  const augmentedVertices = [helper, ...vertices];
  const augmentedEdges = edges.concat(vertices.map((vertex) => ({ from: helper, to: vertex, weight: 0 })));
  const potential = bellmanFordDistances(augmentedVertices, augmentedEdges, helper);
  const reweighted = edges.map((edge) => ({
    from: edge.from,
    to: edge.to,
    weight: edge.weight + potential[edge.from] - potential[edge.to],
  }));
  const steps = [
    step("graph", `Bellman-Ford potentials: ${vertices.map((v) => `${v}:${potential[v]}`).join(" ")}`, {
      vertices,
      edges,
      active: vertices,
    }),
  ];
  const matrix = [["", ...vertices]];
  for (const source of vertices) {
    const dist = dijkstraDistances(vertices, reweighted, source);
    matrix.push([source, ...vertices.map((target) => formatDistance(dist[target] - potential[source] + potential[target]))]);
    steps.push(step("table", `Run Dijkstra from ${source} on reweighted graph.`, { table: matrix.map((row) => row.slice()) }));
  }
  return steps;
}

function bellmanFordDistances(vertices, edges, start) {
  const dist = Object.fromEntries(vertices.map((vertex) => [vertex, Infinity]));
  dist[start] = 0;
  for (let pass = 1; pass < vertices.length; pass++) {
    for (const edge of edges) {
      if (Number.isFinite(dist[edge.from]) && dist[edge.from] + edge.weight < dist[edge.to]) {
        dist[edge.to] = dist[edge.from] + edge.weight;
      }
    }
  }
  return dist;
}

function dijkstraDistances(vertices, edges, start) {
  const graph = adjacencyFromEdges(vertices, edges, true);
  const dist = Object.fromEntries(vertices.map((vertex) => [vertex, Infinity]));
  const done = new Set();
  dist[start] = 0;
  while (done.size < vertices.length) {
    const candidates = vertices.filter((vertex) => !done.has(vertex));
    const vertex = candidates.reduce((best, current) => dist[current] < dist[best] ? current : best, candidates[0]);
    if (!Number.isFinite(dist[vertex])) break;
    done.add(vertex);
    for (const edge of graph.get(vertex)) {
      if (dist[vertex] + edge.weight < dist[edge.to]) dist[edge.to] = dist[vertex] + edge.weight;
    }
  }
  return dist;
}

function runKruskal(input) {
  const { vertices, edges } = parseEdges(input, false);
  const parent = Object.fromEntries(vertices.map((v) => [v, v]));
  const sorted = edges.slice().sort((a, b) => a.weight - b.weight);
  const chosen = [];
  const steps = [step("graph", "Sort edges by weight.", { vertices, edges })];
  function find(x) {
    if (parent[x] !== x) parent[x] = find(parent[x]);
    return parent[x];
  }
  for (const edge of sorted) {
    const a = find(edge.from);
    const b = find(edge.to);
    if (a !== b) {
      parent[a] = b;
      chosen.push(edge);
      steps.push(step("graph", `Accept edge ${edge.from}-${edge.to}.`, { vertices, edges, activeEdges: chosen }));
    } else {
      steps.push(step("graph", `Reject edge ${edge.from}-${edge.to}; cycle.`, { vertices, edges, activeEdges: chosen.concat(edge), danger: [edge.from, edge.to] }));
    }
  }
  return steps;
}

function runPrim(input, startText) {
  const { vertices, edges } = parseEdges(input, false);
  const graph = adjacencyFromEdges(vertices, edges, false);
  const start = Number(startText || vertices[0]);
  const visited = new Set([start]);
  const chosen = [];
  const steps = [step("graph", `Start Prim at ${start}.`, { vertices, edges, active: [start], done: [...visited] })];
  while (visited.size < vertices.length) {
    const crossing = [];
    for (const vertex of visited) {
      for (const edge of graph.get(vertex)) {
        if (!visited.has(edge.to)) crossing.push({ from: vertex, to: edge.to, weight: edge.weight });
      }
    }
    crossing.sort((a, b) => a.weight - b.weight);
    const next = crossing[0];
    if (!next) break;
    visited.add(next.to);
    chosen.push(next);
    steps.push(step("graph", `Choose lightest crossing edge ${next.from}-${next.to}.`, { vertices, edges, active: [next.to], done: [...visited], activeEdges: chosen }));
  }
  return steps;
}

function runFibonacciDp(input) {
  const n = Number(input) || 10;
  const table = [["i", 0, 1], ["fib", 0, 1]];
  const steps = [step("table", "Base cases.", { table })];
  for (let i = 2; i <= n; i++) {
    table[0].push(i);
    table[1].push(table[1][i - 1] + table[1][i - 2]);
    steps.push(step("table", `fib(${i}) = fib(${i - 1}) + fib(${i - 2}).`, { table: table.map((row) => row.slice()), activeCells: [[1, i + 1]] }));
  }
  return steps;
}

function runKnapsack(input, targetText) {
  const items = input.split(",").map((part) => part.trim().split(":").map(Number)).filter((pair) => pair.length === 2);
  const capacity = Number(targetText) || 50;
  const dp = Array(capacity + 1).fill(0);
  const steps = [];
  items.forEach(([weight, value], itemIndex) => {
    for (let w = capacity; w >= weight; w--) dp[w] = Math.max(dp[w], dp[w - weight] + value);
    steps.push(step("table", `After item ${itemIndex + 1}: weight ${weight}, value ${value}.`, { table: [["capacity", ...range(0, capacity + 1)], ["best", ...dp]] }));
  });
  return steps;
}

function runLcs(input, targetText) {
  const a = input || "AGGTAB";
  const b = targetText || "GXTXAYB";
  const dp = Array.from({ length: a.length + 1 }, () => Array(b.length + 1).fill(0));
  const steps = [step("table", "Initialize LCS table.", { table: lcsTable(a, b, dp) })];
  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      dp[i][j] = a[i - 1] === b[j - 1] ? dp[i - 1][j - 1] + 1 : Math.max(dp[i - 1][j], dp[i][j - 1]);
      steps.push(step("table", `Compare '${a[i - 1]}' and '${b[j - 1]}'.`, { table: lcsTable(a, b, dp), activeCells: [[i + 1, j + 1]] }));
    }
  }
  return steps;
}

function lcsTable(a, b, dp) {
  return [["", "", ...b.split("")], ...dp.map((row, index) => [index === 0 ? "" : a[index - 1], ...row])];
}

function runMatrixChain(input) {
  const dims = parseNumbers(input);
  const n = dims.length - 1;
  const dp = Array.from({ length: n }, () => Array(n).fill(0));
  const steps = [step("table", "Initialize matrix-chain table.", { table: dp.map((row, i) => [`A${i + 1}`, ...row]) })];
  for (let length = 2; length <= n; length++) {
    for (let left = 0; left <= n - length; left++) {
      const right = left + length - 1;
      dp[left][right] = Infinity;
      for (let split = left; split < right; split++) {
        const cost = dp[left][split] + dp[split + 1][right] + dims[left] * dims[split + 1] * dims[right + 1];
        dp[left][right] = Math.min(dp[left][right], cost);
      }
      steps.push(step("table", `Best cost for A${left + 1}..A${right + 1}.`, { table: dp.map((row, i) => [`A${i + 1}`, ...row.map(formatDistance)]), activeCells: [[left, right + 1]] }));
    }
  }
  return steps;
}

function runBacktracking(input) {
  const values = parseNumbers(input);
  const steps = [];
  function generate(index, subset) {
    steps.push(step("array", `index=${index}, subset=[${subset.join(", ")}]`, { values, active: subset.map((value) => values.indexOf(value)) }));
    if (index === values.length) return;
    generate(index + 1, subset);
    generate(index + 1, subset.concat(values[index]));
  }
  generate(0, []);
  return steps;
}

function runGreedyIntervals(input) {
  const intervals = input.split(",").map((part) => part.split("-").map(Number)).filter((pair) => pair.length === 2);
  intervals.sort((a, b) => a[1] - b[1]);
  const values = intervals.map(([a, b]) => b - a);
  const steps = [step("array", "Sort intervals by finish time.", { values })];
  let end = -Infinity;
  const chosen = [];
  intervals.forEach((interval, index) => {
    if (interval[0] >= end) {
      chosen.push(index);
      end = interval[1];
      steps.push(step("array", `Select [${interval[0]}, ${interval[1]}].`, { values, done: chosen }));
    } else {
      steps.push(step("array", `Skip [${interval[0]}, ${interval[1]}].`, { values, active: [index], done: chosen }));
    }
  });
  return steps;
}

function runDivideConquer(input) {
  const values = parseNumbers(input);
  const steps = [step("array", "Initial array.", { values })];
  function solve(left, right) {
    steps.push(step("array", `Solve range [${left}, ${right}].`, { values, active: range(left, right + 1) }));
    if (left === right) return values[left];
    const mid = Math.floor((left + right) / 2);
    const bestLeft = solve(left, mid);
    const bestRight = solve(mid + 1, right);
    let sum = 0;
    let crossLeft = -Infinity;
    for (let i = mid; i >= left; i--) { sum += values[i]; crossLeft = Math.max(crossLeft, sum); }
    sum = 0;
    let crossRight = -Infinity;
    for (let i = mid + 1; i <= right; i++) { sum += values[i]; crossRight = Math.max(crossRight, sum); }
    return Math.max(bestLeft, bestRight, crossLeft + crossRight);
  }
  const answer = solve(0, values.length - 1);
  steps.push(step("array", `Maximum subarray sum is ${answer}.`, { values, done: range(0, values.length) }));
  return steps;
}

function runQuickselect(input, targetText) {
  const values = parseNumbers(input);
  const k = Number(targetText) || 0;
  const steps = [step("array", `Find zero-based order statistic k=${k}.`, { values: cloneArray(values) })];
  let left = 0;
  let right = values.length - 1;
  while (left <= right) {
    const pivotIndex = left + ((right - left) % Math.max(1, right - left + 1));
    const pivot = values[pivotIndex];
    [values[pivotIndex], values[right]] = [values[right], values[pivotIndex]];
    let store = left;
    for (let i = left; i < right; i++) {
      if (values[i] < pivot) {
        [values[i], values[store]] = [values[store], values[i]];
        store++;
      }
    }
    [values[store], values[right]] = [values[right], values[store]];
    steps.push(step("array", `Partition with pivot ${pivot}; pivot lands at ${store}.`, { values: cloneArray(values), active: [store], compare: range(left, right + 1) }));
    if (store === k) break;
    if (store < k) left = store + 1;
    else right = store - 1;
  }
  return steps;
}

function runKmp(input, targetText) {
  const text = input || "";
  const pattern = targetText || "";
  const prefix = Array(pattern.length).fill(0);
  const steps = [step("table", "Build KMP prefix table.", { table: [["pattern", ...pattern.split("")], ["prefix", ...prefix]] })];
  let matched = 0;
  for (let i = 1; i < pattern.length; i++) {
    while (matched > 0 && pattern[i] !== pattern[matched]) matched = prefix[matched - 1];
    if (pattern[i] === pattern[matched]) prefix[i] = ++matched;
    steps.push(step("table", `Prefix at ${i} is ${prefix[i]}.`, { table: [["pattern", ...pattern.split("")], ["prefix", ...prefix]], activeCells: [[1, i + 1]] }));
  }
  matched = 0;
  for (let i = 0; i < text.length; i++) {
    while (matched > 0 && text[i] !== pattern[matched]) matched = prefix[matched - 1];
    if (text[i] === pattern[matched]) matched++;
    steps.push(step("text", `Scan text[${i}]='${text[i]}', matched=${matched}.`, { visualText: `${text}\n${" ".repeat(Math.max(0, i - matched + 1))}${pattern}` }));
    if (matched === pattern.length) matched = prefix[matched - 1];
  }
  return steps;
}

function runRabinKarp(input, targetText) {
  const text = input || "";
  const pattern = targetText || "";
  const steps = [];
  const base = 256;
  const mod = 1000000007;
  let high = 1;
  let patternHash = 0;
  let windowHash = 0;
  for (let i = 0; i < pattern.length; i++) {
    patternHash = (patternHash * base + pattern.charCodeAt(i)) % mod;
    windowHash = (windowHash * base + text.charCodeAt(i)) % mod;
    if (i + 1 < pattern.length) high = (high * base) % mod;
  }
  for (let i = 0; i + pattern.length <= text.length; i++) {
    const match = patternHash === windowHash && text.slice(i, i + pattern.length) === pattern;
    steps.push(step("text", `Window ${i}: hash=${windowHash}${match ? " match" : ""}.`, { visualText: `${text}\n${" ".repeat(i)}${pattern}` }));
    if (i + pattern.length === text.length) break;
    windowHash = (windowHash - text.charCodeAt(i) * high) % mod;
    if (windowHash < 0) windowHash += mod;
    windowHash = (windowHash * base + text.charCodeAt(i + pattern.length)) % mod;
  }
  return steps;
}
