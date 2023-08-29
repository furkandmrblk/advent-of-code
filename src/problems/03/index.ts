import fs from 'fs';
import path from 'path';

const filePath = path.join(__dirname, 'input.txt');
const txt = fs.readFileSync(filePath, 'utf-8');

const isUppercase = (input: string): boolean => {
  return input === input.toUpperCase();
};

export const rucksackReorganization = () => {
  const input = txt.split('\n');

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
        console.log(item);
        if (isUppercase(item)) {
          sum += item.charCodeAt(0) - 38;
        } else {
          sum += item.charCodeAt(0) - 96;
        }

        break;
      }
    }
  }

  const part1 = (): number => {
    return sum;
  };

  const part2 = () => {};

  return {
    part1,
    part2,
  };
};
