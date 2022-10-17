{
    interface iNode {
        data: number;
        left?: iNode | undefined;
        right?: iNode;
    }
    class Node implements iNode {
        data: number;
        left: iNode | undefined;
        right: iNode | undefined;
        constructor(data: number) {
            this.data = data; // node value
            this.left = undefined; // left node child reference
            this.right = undefined; // right node child reference
        }
    }
    class BinarySearchTree {
        root: iNode | undefined;
        constructor() {
            this.root = undefined; // корень bst
        }
        insert(data: number) {
            let newNode = new Node(data);
            if (!this.root) {
                this.root = newNode;
            } else {
                this.insertNode(this.root, newNode); // helper method below
            }
        }
        insertNode(node: iNode, newNode: iNode) {
            if (newNode.data < node.data) {
                if (!node.left) {
                    node.left = newNode;
                } else {
                    this.insertNode(node.left!, newNode);
                }
            } else {
                if (!node.right) {
                    node.right = newNode;
                } else {
                    this.insertNode(node.right!, newNode);
                }
            }
        }
        inOrderTraverse(node: iNode, callback: (data: number) => void) {
            if (node) {
                this.inOrderTraverse(node.left!, callback);
                callback(node.data);
                this.inOrderTraverse(node.right!, callback);
            }
        }
        preOrderTraverse(node: iNode, callback: (data: number) => void) {
            if (node) {
                callback(node.data);
                this.preOrderTraverse(node.left!, callback);
                this.preOrderTraverse(node.right!, callback);
            }
        }
        postOrderTraverse(node: iNode, callback: (data: number) => void) {
            if (node) {
                this.postOrderTraverse(node.left!, callback);
                this.postOrderTraverse(node.right!, callback);
                callback(node.data);
            }
        }
        search(node: iNode, data: number): iNode | undefined {
            if (!node) {
                return;
            } else if (data < node.data) {
                return this.search(node.left!, data);
            } else if (data > node.data) {
                return this.search(node.right!, data);
            } else {
                console.log(node);
                return node;
            }
        }
        minNode(node: iNode):iNode {
            if (!node.left) return node;
            else return this.minNode(node.left);
        }

        remove(data: number) {
            this.root = this.removeNode(this.root!, data); // helper method below
        }

        removeNode(node: iNode, data: number): iNode | undefined {
            if (!node) {
                return;
                // если данные, которые нужно удалить, меньше, чем данные корня, переходим к левому поддереву
            } else if (data < node.data) {
                node.left = this.removeNode(node.left!, data);
                return node;
                // если данные, которые нужно удалить, больше, чем данные корня, переходим к правому поддереву
            } else if (data > node.data) {
                node.right = this.removeNode(node.right!, data);
                return node;
                // если данные такие как данные корня, удаляем узел
            } else {
                // удаляем узел без потомков (листовой узел (leaf) или крайний)
                if (!node.left && !node.right) {
                    return;
                }
                // удаляем узел с одним потомком
                if (!node.left) {
                    return node.right;
                } else if (!node.right) {
                    return node.left;
                }
                // удаляем узел с двумя потомками
                // minNode правого поддерева хранится в новом узле
                let newNode = this.minNode(node.right);
                node.data = newNode.data;
                node.right = this.removeNode(node.right, newNode.data);
                return node;
            }
        }
    }
    const BST = new BinarySearchTree();
    BST.insert(11); // establishes root node
    BST.insert(7);
    BST.insert(9);
    BST.insert(15);
    BST.insert(6);
    BST.search(BST.root!, 7);
}
