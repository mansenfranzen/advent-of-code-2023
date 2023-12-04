import * as util from './util.mjs';

const REGEXCARD = /Card\s+(?<card>\d+):(?<winning>[\d+ ]+)\|(?<drawn>[\d+ ]+)/;


class Card {
  /**
     * @constructor
     * @param {number} card - Card number.
     * @param {number[]} winning - Winning numbers.
     * @param {number[]} drawn - Drawn numbers.
     */
  constructor(card, winning, drawn) {
    this.card = card;
    this.winning = winning;
    this.drawn = drawn;
  }

  getMatchedCount() {
    const matches = util.setIntersection(
        new Set(this.winning),
        new Set(this.drawn),
    );
    return matches.size;
  }

  getPoints() {
    const size = this.getMatchedCount();
    if (size === 0) {
      return 0;
    } else {
      return 2 ** (size - 1);
    }
  }
}

function parseCardInput(cardString) {
  const match = cardString.match(REGEXCARD).groups;
  const card = parseInt(match.card);
  const parseInteger = (x) => parseInt(x);
  const winning = match.winning.match(/\d+/g).map(parseInteger);
  const drawn = match.drawn.match(/\d+/g).map(parseInteger);
  return new Card(card, winning, drawn);
}

function getSumOfPoints(fileName) {
  const inputData = util.readInputFile(fileName);
  const getPoints = (line) => parseCardInput(line).getPoints();
  const points = inputData.map(getPoints);
  const sumOfPoints = util.sumArray(points);
  return sumOfPoints;
}

function getNumberOfScratchCards(fileName) {
  const inputData = util.readInputFile(fileName);
  const scratchcards = new Array(inputData.length).fill(1);
  const cardsMatchedCount = inputData
      .map((line, idx) => [idx, parseCardInput(line).getMatchedCount()]);

  for (const [currentIdx, count] of cardsMatchedCount) {
    const increase = scratchcards[currentIdx];
    for (const idx of util.range(1, count+1)) {
      scratchcards[currentIdx + idx] += increase;
    }
  }

  return util.sumArray(scratchcards);
}


console.log(getSumOfPoints('data/04_0.txt'));
console.log(getNumberOfScratchCards('data/04_1.txt'));
