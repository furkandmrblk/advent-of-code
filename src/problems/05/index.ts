import fs from 'fs';
import path from 'path';

const filePath = path.join(__dirname, 'input.txt');
const txt = fs.readFileSync(filePath, 'utf-8');

export const supplyStacks = (activatePart2?: boolean) => {
  let stacks = [
    ['S', 'T', 'H', 'F', 'W', 'R'],
    ['S', 'G', 'D', 'Q', 'W'],
    ['B', 'T', 'W'],
    ['D', 'R', 'W', 'T', 'N', 'Q', 'Z', 'J'],
    ['F', 'B', 'H', 'G', 'L', 'V', 'T', 'Z'],
    ['L', 'P', 'T', 'C', 'V', 'B', 'S', 'G'],
    ['Z', 'B', 'R', 'T', 'W', 'G', 'P'],
    ['N', 'G', 'M', 'T', 'C', 'J', 'R'],
    ['L', 'G', 'B', 'W'],
  ];

  const replaceWords: { [key: string]: string } = {
    ' ': '',
    move: '',
    from: ';',
    to: ';',
  };

  const input = txt
    .replaceAll(/move|from|to| /g, function (matched) {
      return replaceWords[matched];
    })
    .split('\n');

  for (const row of input) {
    const [quantity, from, to] = row.split(';');

    let tmp: string[] = [];

    for (let i = 0; i < Number(quantity); i++) {
      if (!isNaN(Number(from))) {
        const crate = stacks[Number(from) - 1].pop();

        if (crate) {
          if (!activatePart2) stacks[Number(to) - 1].push(crate);
          tmp.unshift(crate);
        }
      }

      if (i === Number(quantity) - 1 && activatePart2) {
        stacks[Number(to) - 1] = [...stacks[Number(to) - 1], ...tmp];
        tmp = [];
      }
    }
  }

  let str: string = '';

  for (const stack of stacks) {
    str += stack.pop() ?? '';
  }

  return str;
};
