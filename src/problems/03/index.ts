import fs from 'fs';
import path from 'path';

const filePath = path.join(__dirname, 'input.txt');
const txt = fs.readFileSync(filePath, 'utf-8');

const isUppercase = (input: string): boolean => {
  return input === input.toUpperCase();
};

export const rucksackReorganization = () => {
  const input = txt.split('\n');

  const part1 = (): number => {
    let sum: number = 0;

    for (const items of input) {
      const firstCompartment = items.slice(0, items.length / 2).split('');
      const lastCompartment = items.slice(items.length / 2).split('');

      const letterMap: Map<string, string> = new Map(
        firstCompartment.map((letter) => [letter, letter])
      );

      for (const letter of lastCompartment) {
        const hasDuplicate = letterMap.has(letter);

        if (hasDuplicate) {
          const item = letterMap.get(letter) as string;

          if (isUppercase(item)) {
            sum += item.charCodeAt(0) - 38;
          } else {
            sum += item.charCodeAt(0) - 96;
          }

          break;
        }
      }
    }

    return sum;
  };

  const part2 = () => {
    let sum: number = 0;
    let tmp: string[][] = [];
    let iteration: number = 0;

    for (const item of input) {
      if (iteration === 3) {
        const itemMap: Map<string, string> = new Map();

        tmp[0].forEach((el) => {
          if (tmp[1].includes(el)) {
            itemMap.set(el, el);
          }
        });

        for (let j = 0; j <= tmp[2].length; j++) {
          const el = tmp[2][j];
          const hasItem = itemMap.has(el);

          if (hasItem) {
            if (isUppercase(el)) {
              sum += el.charCodeAt(0) - 38;
            } else {
              sum += el.charCodeAt(0) - 96;
            }

            break;
          }
        }

        iteration = 0;
        tmp = [];
      }

      tmp.push(item.split(''));
      iteration++;
    }

    return sum;
  };

  return {
    part1,
    part2,
  };
};
