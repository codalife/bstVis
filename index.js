document.addEventListener('DOMContentLoaded', function(event) {
  console.log('DOM fully loaded and parsed');
});

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
  rotateLeft(node) {
    let temp = node.right;
    node.right = node.right.left;
    temp.left = node;
    node.height -= 1;
    temp.height += 1;
    if (this.head === node) {
      this.head = temp;
    }
    return temp;
  }
  rotateRight(node) {
    let temp = node.left;
    node.left = node.left.right;
    temp.right = node;
    node.height -= 1;
    temp.height += 1;
    if (node === this.head) {
      this.head = temp;
    }
    return temp;
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

    const rightHeight = current.right ? current.right.height : 0;
    const leftHeight = current.left ? current.left.height : 0;

    if (leftHeight - rightHeight > 1) {
      console.log(
        `getting off balance at node ${current.value} with diff ${leftHeight -
          rightHeight}`,
      );
      if (
        this.getLeftHeight(current.left) >= this.getRightHeight(current.left)
      ) {
        // LL
        current = this.rotateRight(current);
      } else {
        current = this.rotateLeft(current);
        current = this.rotateRight(current);
      }
    } else if (rightHeight - leftHeight > 1) {
      console.log(
        `getting off balance at node ${current.value} with diff ${rightHeight -
          leftHeight}`,
      );
      if (
        this.getLeftHeight(current.right) < this.getRightHeight(current.right)
      ) {
        current = this.rotateLeft(current);
      } else {
        current = this.rotateRight(current);
        current = this.rotateLeft(current);
      }
    }
    current.height =
      Math.max(
        current.right ? current.right.height : 0,
        current.left ? current.left.height : 0,
      ) + 1;
    return current;
  }

  getLeftHeight(node) {
    return node.left ? node.left.height : 0;
  }
  getRightHeight(node) {
    return node.right ? node.right.height : 0;
  }

  heapify() {
    this.heap = new Array(2 ** this.head.height - 1).fill(null);

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
    parent.innerHTML = '';
    const levels = new Set();
    let currentLevel = 0;
    let currentHolder;
    let currentNode;

    this.heap.forEach((node, index) => {
      if (index + 1 >= 2 ** currentLevel) {
        currentHolder = document.createElement('div');
        currentHolder.className = 'holder';
        parent.appendChild(currentHolder);
        currentLevel += 1;
      }

      currentNode = document.createElement('div');
      currentNode.className = node ? 'node filled' : 'node null';
      currentNode.innerText = node;
      currentHolder.appendChild(currentNode);
    });
  }
}

const testBST = new BST();
// testBST.insert(3);
// testBST.insert(12);
// testBST.insert(14);
// testBST.insert(16);
// testBST.insert(7);
// testBST.insert(9);
// testBST.insert(5);
// testBST.insert(19);
// testBST.insert(20);
// testBST.insert(6);
// testBST.insert(8);
// testBST.insert(10);
// testBST.insert(13);
// testBST.insert(15);
// testBST.insert(17);

// const insertions = [
//   testBST.insert(8),
//   testBST.insert(5),
//   testBST.insert(3),
//   testBST.insert(2),
//   testBST.insert(1),
//   testBST.insert(-1),
// ];

const nums = [8, 25, 124, -14, 16, 118, -20, 22, 24];
console.log(`the length is ${nums.length}`);
console.log(nums.slice().sort((a, b) => a - b));

let start = 0;

// nums.forEach((num, index) => {
//   setTimeout(() => {
//     testBST.insert(num);
//     testBST.heapify();
//     testBST.visualize();
//   }, 2000 * index);
// });

console.log(testBST.head);
console.table(testBST.head);

let count = 0;

while (count < 30) {
  const random = Math.floor(Math.random() * 1000);

  setTimeout(() => {
    testBST.insert(random);
    testBST.heapify();
    testBST.visualize();
  }, count * 1000);
  count += 1;
}
