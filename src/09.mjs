import * as util from './util.mjs';


function parseDistances(fileName) {
  const lines = util.readInputFile(fileName);
  const toIntegers = (line) => line.split(' ').map((x)=>parseInt(x));
  return lines.map(toIntegers);
}

function applyPairWiseDiff(arr) {
  return arr.slice(1).map((v, i) => v - arr[i]);
}

function recursiveSumLastELement(arr) {
  const lastElement = arr[arr.length - 1];
  const diffs = applyPairWiseDiff(arr);

  if (diffs.every((v) => v === 0)) {
    return lastElement;
  } else {
    return lastElement + recursiveSumLastELement(diffs);
  }
}

// part 1
const lines = parseDistances('data/09_1.txt');
const nextElements = lines.map(recursiveSumLastELement);
console.log(util.sumArray(nextElements));

// part 2
lines.forEach((arr) => arr.reverse());
const nextElementsReversed = lines.map(recursiveSumLastELement);
console.log(util.sumArray(nextElementsReversed));

