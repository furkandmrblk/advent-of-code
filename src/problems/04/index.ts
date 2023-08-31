import fs from 'fs';
import path from 'path';

const filePath = path.join(__dirname, 'input.txt');
const txt = fs.readFileSync(filePath, 'utf-8');

export const campCleanup = () => {
  const input = txt.split('\n');

  const sortedArr: string[][] = [];

  for (const sections of input) {
    const res = sections.split(',');

    if (res.length === 2) sortedArr.push([res[0], res[1]]);
  }

  let count: number = 0;
  let count2: number = 0;

  for (const section of sortedArr) {
    const [a, b] = section[0].split('-');
    const [x, y] = section[1].split('-');

    if (Number(a) <= Number(x) && Number(b) >= Number(y)) {
      count++;
    } else if (Number(x) <= Number(a) && Number(y) >= Number(b)) {
      count++;
    }

    if (Number(b) < Number(x) || Number(y) < Number(a)) {
      // Do nothing
    } else count2++;
  }

  const part1 = () => {
    return count;
  };

  const part2 = () => {
    return count2;
  };

  return {
    part1,
    part2,
  };
};
