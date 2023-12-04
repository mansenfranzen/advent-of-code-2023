import * as util from './util.mjs';


const stringNumbers = [
  'zero', 'one', 'two', 'three', 'four',
  'five', 'six', 'seven', 'eight', 'nine',
];

const numberMapping = Object.fromEntries(
    stringNumbers.map((number, index) => [number, index]),
);

function replaceFirstStringNumber(string) {
  const length = string.length;
  for (let i = 3; i < length; i++) {
    for (const number of stringNumbers) {
      if (string.substring(0, i).includes(number)) {
        return string.replace(number, numberMapping[number]);
      }
    }
  }
  return string;
}

function replaceLastStringNumber(string) {
  const length = string.length;
  for (let i = length - 3; i > 0; i--) {
    for (const number of stringNumbers) {
      const substring = string.substring(i, length);
      if (substring.includes(number)) {
        const replaced = substring.replace(number, numberMapping[number]);
        return string.substring(0, i) + replaced;
      }
    }
  }
  return string;
}

function replaceFirstLastStringNumber(string) {
  const replaced = replaceFirstStringNumber(string);
  return replaceLastStringNumber(replaced);
}

function replaceStringNumbers(strings) {
  return strings.map(replaceFirstLastStringNumber);
}

function isDigit(character) {
  return Number.isInteger(parseInt(character));
}

function getFirstLastDigit(string) {
  const digit = string.split('').filter(isDigit);
  const digits = digit[0] + digit[digit.length - 1];
  return parseInt(digits);
}

function sumNumbers(numbers) {
  const rawFirstLast = numbers.map(getFirstLastDigit);
  const validFirstLast = rawFirstLast.filter((number) => !isNaN(number));
  return util.sumArray(validFirstLast);
}

function main(fileName) {
  const inputData = util.readInputFile(fileName);
  const replacedNumbers = replaceStringNumbers(inputData);
  return sumNumbers(replacedNumbers);
}

console.log(main('data/01_2.txt'));
