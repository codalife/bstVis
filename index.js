const head = document.querySelector('#bst');

const headNode = document.createElement('div');

const tree = [null];

headNode.className = 'node';
headNode.innerText = tree[0] || 'null';

head.appendChild(headNode);

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
    // if (val === 5) {
    //   debugger;
    // }
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
    // return heap;
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
    let level = 0;
    // while (2 ** level < this.)

    const render = (level = 1) => {
      const htmlNode = document.createElement('div');
      htmlNode.className = 'node';
      htmlNode.setAttribute('top', 20 * level + 'rem');
      headNode.innerText = current.value;

      const headHtmlNode = document.querySelector('#bst');

      headHtmlNode.appendChild(htmlNode);
    };

    this.traverse(render);
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

console.log(testBST.heap);
