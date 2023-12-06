import * as util from './util.mjs';


function parseNumbers(line) {
  return line.match(/\d+/g).map((x) => parseInt(x));
}

function parseRaces(fileName) {
  const inputData = util.readInputFile(fileName);
  const times = parseNumbers(inputData[0]);
  const distances = parseNumbers(inputData[1]);
  return times.map((time, i) => [time, distances[i]]);
}

function getDistances(totalTime) {
  return util.range(0, totalTime+1).map((x) => x * (totalTime - x));
}

function getWinCnt(time, distance) {
  const distances = getDistances(time);
  return distances.filter((x) => x > distance).length;
}

const races = parseRaces('data/06_1.txt');
const result = util.productArray(races.map((x) => getWinCnt(...x)));
console.log(result);
