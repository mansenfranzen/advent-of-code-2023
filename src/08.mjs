import * as util from './util.mjs';

const regexLocations = /(?<location>\w+)\s+=\s+\((?<left>\w+),\s+(?<right>\w+)\)/;

function gcd(a, b) {
  if (b === 0) {
    return a;
  } else {
    return gcd(b, a % b);
  }
}

function lcm(a, b) {
  return Math.abs(a * b) / gcd(a, b);
}

function parseLocation(line) {
  const groups = line.match(regexLocations).groups;
  return [groups.location, {'L': groups.left, 'R': groups.right}];
}

function parseLocations(lines) {
  const locations = lines.slice(2).map(parseLocation);
  return Object.fromEntries(locations);
}

function parseDirections(lines) {
  return lines[0];
}

function* yieldDirection(directions) {
  while (true) {
    for (const direction of directions) {
      yield direction;
    }
  }
}

function getNumberOfSteps(directions, locations, locationStart, locationsEnd) {
  let steps = 0;
  let currentLocation = locationStart;

  for (const direction of yieldDirection(directions)) {
    if (locationsEnd.includes(currentLocation)) {
      break;
    }
    currentLocation = locations[currentLocation][direction];
    steps++;
  }

  return steps;
}

function getNumberOfGhostSteps(directions, locations) {
  const locationsStart = Object.keys(locations).filter((x) => x.endsWith('A'));
  const locationsEnd = Object.keys(locations).filter((x) => x.endsWith('Z'));
  const ghostSteps = locationsStart.map((x) =>
    getNumberOfSteps(directions, locations, x, locationsEnd),
  );

  return ghostSteps.reduce((a, b) => lcm(a, b));
}

const lines = util.readInputFile('data/08_2.txt');
const directions = parseDirections(lines);
const locations = parseLocations(lines);

console.log(getNumberOfSteps(directions, locations, 'AAA', ['ZZZ']));
console.log(getNumberOfGhostSteps(directions, locations));
