import fs from 'fs';

export function sumArray(iterable) {
  return Array.from(iterable).reduce((a, b) => a + b, 0);
}

export function productArray(iterable) {
  return Array.from(iterable).reduce((a, b) => a * b, 1);
}

export function readInputFile(fileName) {
  return fs.readFileSync(fileName, 'utf8').split('\n');
}

export function range(start, end, step = 1) {
  const numbers = [];

  for (let i = start; i <= end - 1; i += step) {
    numbers.push(i);
  }

  return numbers;
}

export function setIntersection(setA, setB) {
  const intersection = new Set();
  for (const elem of setB) {
    if (setA.has(elem)) {
      intersection.add(elem);
    }
  }
  return intersection;
}
