import fs, { Dir } from 'fs';
import path from 'path';

const filePath = path.join(__dirname, 'input.txt');
const txt = fs.readFileSync(filePath, 'utf-8');

type BaseNode_type =
  | {
      children: Node_type[];
      isDirectory: true;
    }
  | {
      size: number;
      isDirectory: false;
    };

type Node_type = {
  parent: Node_type | undefined;
  name: string;
} & BaseNode_type;

const isCommand = (str: string) => {
  return str[0] === '$';
};

const changeDirectory = (
  currentNode: Node_type | undefined,
  path: string,
  root: Node_type
) => {
  switch (path) {
    case '/':
      currentNode = root;
      break;
    case '..':
      currentNode = currentNode?.parent;
      break;
    default:
      if (currentNode && currentNode.isDirectory) {
        currentNode = currentNode.children.find(
          (val) => val.isDirectory && val.name === path
        );
      }
  }

  return currentNode;
};

const buildTree = (
  commands: string[],
  tree: Node_type,
  currentNode: Node_type
): Node_type => {
  for (const command of commands) {
    if (isCommand(command)) {
      const isDirectoryChange = /\bcd\b/.test(command);

      if (isDirectoryChange) {
        const [_, newPath] = command.split(' cd ');

        let res = changeDirectory(currentNode, newPath, tree);
        if (res) currentNode = res;
      }
    } else {
      const isDirectory = /\bdir\b/.test(command);
      let node: Node_type | undefined = undefined;

      if (isDirectory) {
        const [_, dirName] = command.split(' ');

        node = {
          name: dirName,
          isDirectory: true,
          children: [],
          parent: currentNode,
        };
      } else {
        const [size, fileName] = command.split(' ');

        node = {
          name: fileName,
          isDirectory: false,
          size: Number(size),
          parent: currentNode,
        };
      }

      if ('children' in currentNode) {
        currentNode.children.push(node);
      }
    }
  }

  return tree;
};

const printTree = (node: Node_type, depth: number = 0): void => {
  let size: string = '';

  if (!node.isDirectory) {
    if (node.size / 1000 >= 1000) {
      size = (node.size / (1000 * 1000)).toFixed(2) + 'GB';
    } else {
      size = (node.size / 1000).toFixed(2) + 'MB';
    }
  }

  console.log(
    `${' '.repeat(depth * 2)}|- ${node.name} (${
      !node.parent ? 'root' : node.isDirectory ? 'dir' : 'file, size = ' + size
    })`
  );

  if (node.isDirectory) {
    for (const child of node.children) {
      printTree(child, depth + 1);
    }
  }
};

type DirSizeCallback_type = {
  dirName: Node_type['name'];
  size: number;
};

const printDirectorySizes = (
  node: Node_type,
  cb: ({ dirName, size }: DirSizeCallback_type) => void
) => {
  if (!node.isDirectory) return node.size;

  const dirSize: number = node.children
    .map((node) => printDirectorySizes(node, cb))
    .reduce((a, b) => a + b, 0);

  cb({ dirName: node.name, size: dirSize });

  return dirSize;
};

export const noSpaceLeftOnDevice = () => {
  const commands = txt.split('\n');

  const tree: Node_type = {
    name: '/',
    isDirectory: true,
    children: [],
    parent: undefined,
  };

  let currentNode: Node_type = tree;

  const res = buildTree(commands, tree, currentNode);

  // printTree(res);

  let sum: number = 0;

  const dirSizes: number[] = [];

  printDirectorySizes(res, ({ size }) => {
    dirSizes.push(size);
    if (size < 100000) sum += size;
  });

  const part1 = (): number => {
    return sum;
  };

  const part2 = () => {
    const totalSpace = 70000000;
    const neededSpace = 30000000;

    // ? Could've just used the last element in arr, since it's the root.
    dirSizes.sort((a, b) => b - a);

    const usedSpace = dirSizes[0];

    const deletionSize = neededSpace - (totalSpace - usedSpace);

    const deletable = dirSizes
      .filter((size) => size >= deletionSize)
      .sort((a, b) => a - b)[0];

    return deletable;
  };

  return {
    part1,
    part2,
  };
};
