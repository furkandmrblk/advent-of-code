import fs from 'fs';
import path from 'path';

const filePath = path.join(__dirname, 'input.txt');
const txt = fs.readFileSync(filePath, 'utf-8');

export const rockPaperScissors = () => {
  const input = txt.split('\n');

  const moves: { [key: string]: number } = {
    X: 1,
    Y: 2,
    Z: 3,
  };

  const moves2: { [key: string]: { [key: string]: number } } = {
    X: {
      A: 3,
      B: 1,
      C: 2,
    },
    Y: {
      A: 1 + 3,
      B: 2 + 3,
      C: 3 + 3,
    },
    Z: {
      A: 2 + 6,
      B: 3 + 6,
      C: 1 + 6,
    },
  };

  let sum1: number = 0;
  let sum2: number = 0;

  for (const round of input) {
    if (round[0] && round[2]) {
      const elfMove = round[0];
      const myMove = round[2];

      const lostRound =
        (elfMove === 'A' && myMove === 'Z') ||
        (elfMove === 'B' && myMove === 'X') ||
        (elfMove === 'C' && myMove === 'Y');

      const wonRound =
        (myMove === 'X' && elfMove === 'C') ||
        (myMove === 'Y' && elfMove === 'A') ||
        (myMove === 'Z' && elfMove === 'B');

      if (lostRound) {
        sum1 += moves[myMove];
      } else if (wonRound) {
        sum1 += 6 + moves[myMove];
      } else {
        sum1 += 3 + moves[myMove];
      }

      sum2 += moves2[myMove][elfMove];
    }
  }

  const part1 = (): number => {
    return sum1;
  };

  const part2 = (): number => {
    return sum2;
  };

  return {
    part1,
    part2,
  };
};
