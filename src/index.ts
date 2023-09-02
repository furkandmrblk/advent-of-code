import { caloryCounting } from './problems/01';
import { rockPaperScissors } from './problems/02';
import { rucksackReorganization } from './problems/03';
import { campCleanup } from './problems/04';
import { supplyStacks } from './problems/05';
import { tuningTrouble } from './problems/06';

function main() {
  console.log('Advent of Code Adventures');

  // 01
  caloryCounting().part1();
  caloryCounting().part2();

  // 02
  rockPaperScissors().part1();
  rockPaperScissors().part2();

  // 03
  rucksackReorganization().part1();
  rucksackReorganization().part2();

  // 04
  campCleanup().part1();
  campCleanup().part2();

  // 05
  supplyStacks();
  supplyStacks(true);

  // 06
  tuningTrouble();

  // 07
}

main();
