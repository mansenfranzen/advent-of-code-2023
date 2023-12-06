import * as util from './util.mjs';

class Bag {
  constructor({red = 0, blue = 0, green = 0}) {
    this.red = red;
    this.blue = blue;
    this.green = green;
  }

  powerOfCubes() {
    return this.red * this.blue * this.green;
  }
}

class Set extends Bag {
  isPossible(bag) {
    return (
      this.red <= bag.red &&
      this.blue <= bag.blue &&
      this.green <= bag.green
    );
  }
}

class Game {
  constructor({id, sets}) {
    this.id = parseInt(id);
    this.sets = sets;
  }

  isPossible(bag) {
    return this.sets.every((set) => set.isPossible(bag));
  }

  smallestValidBag() {
    const reds = this.sets.map((set) => set.red);
    const blues = this.sets.map((set) => set.blue);
    const greens = this.sets.map((set) => set.green);

    const red = Math.max(...reds);
    const blue = Math.max(...blues);
    const green = Math.max(...greens);

    return new Bag({red: red, blue: blue, green: green});
  }

  powerOfCubesForSmallestValidBag() {
    return this.smallestValidBag().powerOfCubes();
  }
}

function instantiateSets(setStr) {
  const setRe = /((?<amount>\d+) (?<color>blue|red|green))/g;
  const matches = Array.from(setStr.matchAll(setRe));
  const items = matches.map((m) => [m.groups.color, parseInt(m.groups.amount)]);

  return new Set(Object.fromEntries(items));
}

function instantiateGame(gameStr) {
  const gameRe = /Game (?<game_id>\d+): (?<sets>.*)/;
  const gameMatches = gameStr.match(gameRe);

  const id = gameMatches.groups.game_id;
  const sets = gameMatches.groups.sets.split(';').map(instantiateSets);

  return new Game({id: id, sets: sets});
}

function getSumOfPossbileIds(fileName, bag) {
  const games = util.readInputFile(fileName).map(instantiateGame);
  const possibleGames = games.filter((game) => game.isPossible(bag));
  const possibleIds = possibleGames.map((game) => game.id);

  return util.sumArray(possibleIds);
}

function getSumOfCubesForSmallestValidBag(fileName) {
  const games = util.readInputFile(fileName).map(instantiateGame);
  const cubes = games.map((game) => game.powerOfCubesForSmallestValidBag());

  return util.sumArray(cubes);
}

const bag = new Bag({red: 12, blue: 14, green: 13});
console.log(getSumOfPossbileIds('data/02_1.txt', bag));

console.log(getSumOfCubesForSmallestValidBag('data/02_1.txt'));
