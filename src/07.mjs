import * as util from './util.mjs';


const RelativeCardStrength = {
  '2': '1',
  '3': '2',
  '4': '3',
  '5': '4',
  '6': '5',
  '7': '6',
  '8': '7',
  '9': '8',
  'T': '9',
  'J': 'A',
  'Q': 'B',
  'K': 'C',
  'A': 'D',
};

const HandTypeByOccurenceSum = new Map([
  [25, {'name': 'Five of a kind', 'value': 'F'}],
  [17, {'name': 'Four of a kind', 'value': 'E'}],
  [13, {'name': 'Full House', 'value': 'D'}],
  [11, {'name': 'Three of a kind', 'value': 'C'}],
  [9, {'name': 'Two pairs', 'value': 'B'}],
  [7, {'name': 'One pair', 'value': 'A'}],
  [5, {'name': 'High card', 'value': '9'}],
]);

const JokerUpgradeByOne = new Map([
  [5, 7],
  [7, 11],
  [9, 13],
  [11, 17],
  [13, 17],
  [17, 25],
  [25, 25],
]);

const JokerUpgradeByMore = new Map([
  [7, 11],
  [9, 17],
  [11, 17],
  [13, 25],
  [17, 25],
  [25, 25],
]);

class Hand {
  constructor(cards, bid) {
    this.cards = cards;
    this.bid = parseInt(bid);

    this.type = this.getType();
    this.strength = this.getStrength();
  }

  countOccurrences(card) {
    return this.cards.split(card).length - 1;
  }

  sumOccurrences() {
    const counts = Array.from(this.cards).map((x) => this.countOccurrences(x));
    return util.sumArray(counts);
  }

  getRelativeStrength() {
    const cardStrengths = Array.from(this.cards).map((c) => RelativeCardStrength[c]);
    return cardStrengths.join('');
  }

  getType() {
    return HandTypeByOccurenceSum.get(this.sumOccurrences());
  }

  getStrength() {
    const hex = this.type.value + this.getRelativeStrength();
    return parseInt(hex, 16);
  }
}

class JokerHand extends Hand {
  getType() {
    let occurenceSum = this.sumOccurrences();
    const jokerCount = this.countOccurrences('J');

    if (jokerCount === 1) {
      occurenceSum = JokerUpgradeByOne.get(occurenceSum);
    } else if (jokerCount > 1) {
      occurenceSum = JokerUpgradeByMore.get(occurenceSum);
    }

    return HandTypeByOccurenceSum.get(occurenceSum);
  }

  getRelativeStrength() {
    const relativeStrength = super.getRelativeStrength();
    return relativeStrength.replace(/A/g, '0'); // Adjust for joker
  }
}

class Game {
  constructor(hands) {
    this.hands = hands;
  }

  sortByStrength() {
    return this.hands.toSorted((a, b) => a.strength - b.strength);
  }

  getWinnings() {
    const products = this.sortByStrength().map((x, idx) => x.bid * (idx + 1));
    return util.sumArray(products);
  }
}

function parseHands(fileName, HandType) {
  const inputData = util.readInputFile(fileName);
  return inputData.map((x) => x.split(' ')).map((x) => new HandType(...x));
}

const game = new Game(parseHands('data/07_1.txt', Hand));
const jokerGame = new Game(parseHands('data/07_1.txt', JokerHand));

console.log(game.getWinnings());
console.log(jokerGame.getWinnings());
