import * as util from './util.mjs';


const REGEXMAPPING = /(?<name>[\w-]+) map:\n(?<numbers>[\d \n]+)\n/gm;
const REGEXNUMBERS = /(?<destination>\d+)\s(?<source>\d+)\s(?<range>\d+)/g;

/*
* MappingSpec
* destination: number
* source: number
* range: number
*/
class MappingSpec {
  constructor({destination, source, range}) {
    this.destination = parseInt(destination);
    this.source = parseInt(source);
    this.range = parseInt(range);
  }

  containsSource(source) {
    return (source >= this.source) && (source < (this.source + this.range));
  }
}

/*
* Mapping
* name: string
* mappingsSpecs: Array<MappingSpec>
*/
class Mapping {
  constructor(name, mappingsSpecs) {
    this.name = name;
    this.mappingsSpecs = mappingsSpecs;
  }

  mapSrcToDest(source) {
    for (const mappingSpec of this.mappingsSpecs) {
      if (mappingSpec.containsSource(source)) {
        const diff = source - mappingSpec.source;
        return mappingSpec.destination + diff;
      }
    }
    return source;
  }
}

function getSeeds(inputData) {
  return inputData[0].match(/\d+/g).map((x) => parseInt(x));
}

function getMappingNumbers(mappingString) {
  const iterator = mappingString.matchAll(REGEXNUMBERS);
  const numbers = Array.from(iterator).map((x) => new MappingSpec(x.groups));
  return numbers;
}

function getMappings(inputData) {
  const iterator = inputData.slice(2).join('\n').matchAll(REGEXMAPPING);
  const groups = Array.from(iterator).map((x) => [x.groups.name, x.groups.numbers]);
  const mappings = groups.map((x) => new Mapping(x[0], getMappingNumbers(x[1])));
  return mappings;
}

function travelMappings(start, mappings) {
  let value = start;
  for (const mapping of mappings) {
    value = mapping.mapSrcToDest(value);
  }
  return value;
}

function* yieldSeedFromRange(seeds) {
  for (const idx of util.range(0, seeds.length, 2)) {
    const start = seeds[idx];
    const added = seeds[idx + 1];
    const end = start + added;
    console.log(`start: ${start}, added: ${added}, end: ${end}`);

    for (let seed = start; seed < end; seed++) {
      yield seed;
    }
  }
}

function getLowestLocation(fileName) {
  const inputData = util.readInputFile(fileName);
  const mappings = getMappings(inputData);

  const seeds = getSeeds(inputData);
  const destinations = seeds.map((x) => travelMappings(x, mappings));
  return Math.min(...destinations);
}

function getLowestLocationFromRange(fileName) {
  const inputData = util.readInputFile(fileName);
  const mappings = getMappings(inputData);

  const seeds = getSeeds(inputData);

  let minSeed = Number.MAX_SAFE_INTEGER;
  for (const seed of yieldSeedFromRange(seeds)) {
    const destination = travelMappings(seed, mappings);
    if (destination < minSeed) {
      minSeed = destination;
    }
  }

  return minSeed;
}

console.log(getLowestLocation('data/05_1.txt'));
console.log(getLowestLocationFromRange('data/05_1.txt'));
