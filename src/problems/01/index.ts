import fs from 'fs';
import path from 'path';

const filePath = path.join(__dirname, 'input.txt');
const txt = fs.readFileSync(filePath, 'utf-8');

export const caloryCounting = () => {
  const input = txt.split('\n');

  const arr: number[] = [];

  let tmp: number[] = [];

  for (const calories of input) {
    if (calories === '') {
      let sum: number = 0;
      tmp.forEach((cal) => (sum += cal));

      arr.push(sum);

      tmp = [];
    } else {
      tmp.push(Number(calories));
    }
  }

  arr.sort((a, b) => b - a);

  // Part 1 - Get the Elf that is carrying the most calories.

  const part1 = (): number => {
    return arr[0];
  };

  // Part 2 - Get the sum of the top 3 Elfs calories.

  const part2 = (): number => {
    let sum: number = 0;
    for (let i = 0; i < 3; i++) {
      if (i < arr.length) {
        sum += arr[i];
      }
    }
    return sum;
  };

  return {
    part1,
    part2,
  };
};
