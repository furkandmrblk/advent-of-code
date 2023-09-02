import fs from 'fs';
import path from 'path';

const filePath = path.join(__dirname, 'input.txt');
const txt = fs.readFileSync(filePath, 'utf-8');

export const tuningTrouble = () => {
  const input = txt.split('');

  // TODO: Time complexity is n^2 which is awful, there's probably a way better solution.
  // TODO: Will probably need to look into dynamic programming solutions?.

  const distinctCharacters = (n: number) => {
    let count: number = 0;
    let tmp_count: number = 1;

    for (let i = 0; i < input.length; i++) {
      let str: string = input[i];

      for (let j = i + 1; j < input.length; j++) {
        if (tmp_count === n) {
          return count;
        }

        count = j + 1;
        str += input[j];

        const setLength = new Set(str.split('')).size;

        if (str.length !== setLength) {
          str = '';
          tmp_count = 1;
          break;
        } else {
          tmp_count++;
        }
      }
    }
  };

  const part1 = (): number | undefined => {
    return distinctCharacters(4);
  };

  const part2 = (): number | undefined => {
    return distinctCharacters(14);
  };

  return {
    part1,
    part2,
  };
};
