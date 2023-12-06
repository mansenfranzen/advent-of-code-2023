import * as util from './util.mjs';


class Coordinates {
  /**
   * @constructor
   * @param {number[]} self - Coordinates of the match.
   * @param {number[]} sourrounding - Coordinates of the sourrounding.
   */
  constructor(self, sourrounding) {
    this.self = new Set(self);
    this.sourrounding = new Set(sourrounding.filter((x) => !this.self.has(x)));
  }

  selfArray() {
    return Array.from(this.self);
  }
}


class Match {
  /**
  * @constructor
  * @param {string} value - Value of the match.
  * @param {Coordinates} coordinates - Coordinates of the match.
  */
  constructor(value, coordinates) {
    this.value = value;
    this.coord = coordinates;
  }

  selfMapping() {
    return this.coord.selfArray().map((x) => [x, this]);
  }
}

class Array2D {
  /**
  * @constructor
  * @param {string[]} array2d - Array of strings.
  */
  constructor(array2d) {
    this.array2d = array2d;
    this.flattened = array2d.join('');
    this.width = array2d[0].length;
    this.height = array2d.length;
  }

  findMatches(pattern) {
    const matches = [];
    let match;

    while ((match = pattern.exec(this.flattened)) !== null) {
      const value = match[0];
      const idx = match.index;

      const coordSelf = this.getCoordinatesSelf(value, idx);
      const coordSurrounding = this.getCoordinatesSurrounding(value, idx);
      const coord = new Coordinates(coordSelf, coordSurrounding);

      matches.push(new Match(value, coord));
    }

    return matches;
  }

  getCoordinatesSelf(value, index) {
    return util.range(index, index + value.length);
  }

  getCoordinatesSurrounding(value, index) {
    const leftIndex = index;
    const rightIndex = index + value.length - 1;

    let upperLeft = leftIndex - this.width;
    let upperRight = rightIndex - this.width;

    if ((leftIndex % this.width) !== 0) upperLeft--;
    if (((rightIndex + 1) % this.width) !== 0) upperRight++;

    const lines = util.range(0, 3);
    const left = lines.map((factor) => upperLeft + factor * this.width);
    const right = lines.map((factor) => upperRight + factor * this.width);
    return left.map((left, idx) => util.range(left, right[idx]+1)).flat();
  }
}


function getUniqueSymbolNumbers(symbol, numbersCoord, numberMap) {
  const adjacentNumberCoord = getAdjacentNumberCoord(symbol, numbersCoord);
  const coordArr = Array.from(adjacentNumberCoord);
  const numbers = coordArr.map((coord) => numberMap.get(coord));
  const uniqueNumbers = Array.from(new Set(numbers));
  return uniqueNumbers;
}

function getAdjacentNumberCoord(symbol, numbersCoord) {
  return util.setIntersection(symbol.coord.sourrounding, numbersCoord);
}

function isAdjacentToSymbol(number, symbolsCoord) {
  const intersection = util.setIntersection(number.coord.sourrounding, symbolsCoord);
  return Boolean(intersection.size);
}

function getNumberSymbols(inputData) {
  const array2d = new Array2D(inputData);

  const numbers = array2d.findMatches(/\d+/g);
  const symbols = array2d.findMatches(/[^\d\.]/g);

  return [numbers, symbols];
}

function getSumOfAdjacentNumbers(fileName) {
  const inputData = util.readInputFile(fileName);
  const [numbers, symbols] = getNumberSymbols(inputData);

  const symbolsCoord = symbols.map((symbol) => symbol.coord.selfArray()).flat();

  const filterNumbers = (number) => isAdjacentToSymbol(number, symbolsCoord);
  const adjacentNumbers = numbers.filter(filterNumbers);
  return util.sumArray(adjacentNumbers.map((number) => parseInt(number.value)));
}

function getSumOfGearNumbers(fileName) {
  const inputData = util.readInputFile(fileName);
  const [numbers, symbols] = getNumberSymbols(inputData);

  const numbersCoord = numbers.map((number) => number.coord.selfArray()).flat();
  const numberMap = new Map(numbers.map((x) => x.selfMapping()).flat(1));

  const gearNumbers = symbols
      .map((symbol) => getUniqueSymbolNumbers(symbol, numbersCoord, numberMap))
      .filter((numbers) => numbers.length === 2)
      .map((numbers) => numbers.map((match) => parseInt(match.value)).flat())
      .map((numbers) => util.productArray(numbers));

  return util.sumArray(gearNumbers);
}

console.log(getSumOfAdjacentNumbers('data/03_1.txt'));
console.log(getSumOfGearNumbers('data/03_1.txt'));

