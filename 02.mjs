const testStr = '3 blue, 4 red';
const re = /((?<amount>\d) (?<color>blue|red|green))/g;

const matches = testStr.matchAll(re);
for (const match of matches) {
  let item = [match.groups.color, match.groups.amount]
  console.log(item);
}

let items = testStr.matchAll(re).map(m => [m.groups.color, m.groups.amount]);
console.log(items);