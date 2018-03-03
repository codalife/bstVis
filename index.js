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
        let temp = current.left;
        current.left = current.left.right;
        temp.right = current;
        current.height -= 1;
        temp.height += 1;
        if (current === this.head) {
          this.head = temp;
        } else {
          current = temp;
        }
      } else {
        let temp = ([current.left, current.left.left] = [
          current.left.right,
          current.left,
        ]);
        [current, current.left, current.right] = [
          current.left,
          current.left.left,
          current,
        ];
      }
    } else if (rightHeight - leftHeight > 1) {
      console.log(
        `getting off balance at node ${current.value} with diff ${rightHeight -
          leftHeight}`,
      );
      if (
        this.getLeftHeight(current.right) < this.getRightHeight(current.right)
      ) {
        console.log(`doing magic`);
        let temp = current.right;
        current.right = current.right.left;
        temp.left = current;
        current.height -= 1;
        temp.height += 1;
        if (this.head === current) {
          this.head = temp;
        } else {
          current = temp;
        }
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

const nums = [8, 10, 12];

let start = 0;

nums.forEach((num, index) => {
  setTimeout(() => {
    console.log(index * 2000);
    testBST.insert(num);
    testBST.heapify();
    testBST.visualize();
  }, 2000 * index);
});

console.log(testBST.head);
console.table(testBST.head);
