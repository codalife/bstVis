class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
    this.height = 1;
  }
}

class BST {
  constructor() {
    this.head = null;
    this.size = 0;
    this.heap = [];
  }
  insert(val, current = this.head) {
    if (!current) {
      if (!this.head) {
        this.head = new Node(val);
      }
      return new Node(val);
    }
    if (current.value > val) {
      current.left = this.insert(val, current.left);
    } else if (current.value < val) {
      current.right = this.insert(val, current.right);
    }
    current.height =
      Math.max(
        current.right ? current.right.height : 0,
        current.left ? current.left.height : 0,
      ) + 1;
    return current;
  }

  heapify() {
    this.heap = new Array(2 ** this.head.height).fill(null);

    const heapInsert = (node, index = 0) => {
      if (!node) {
        return;
      }
      this.heap[index] = node.value;
      heapInsert(node.left, index * 2 + 1);
      heapInsert(node.right, index * 2 + 2);
    };

    heapInsert(this.head);
  }

  traverse(callback, current = this.head) {
    callback(current);

    if (current.left) {
      this.traverse(callback, current.left);
    }
    if (current.right) {
      this.traverse(callback, current.right);
    }
  }
  visualize() {
    const parent = document.getElementById('bst');
    const levels = new Set();
    let currentHolder;
    let currentNode;

    this.heap.forEach((node, index) => {
      const currentLevel = Math.ceil(Math.log2(index + 2));
      console.log(`level: ${currentLevel}`);

      if (node && !levels.has(currentLevel)) {
        currentHolder = document.createElement('div');
        currentHolder.className = 'holder';
        parent.appendChild(currentHolder);
        levels.add(currentLevel);
      }

      currentNode = document.createElement('div');
      currentNode.className = 'node';
      currentNode.innerText = node;
      currentHolder.appendChild(currentNode);
    });
  }
}

const testBST = new BST();
testBST.insert(10);
testBST.insert(15);
testBST.insert(7);
testBST.insert(8);
testBST.insert(5);
testBST.insert(12);
testBST.insert(17);

testBST.heapify();
testBST.visualize();

console.table(testBST.heap);
