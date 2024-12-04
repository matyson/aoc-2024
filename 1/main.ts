const inputPath = "data/input.txt";

const input = await Deno.readTextFile(inputPath);

const leftList: number[] = [];
const rightList: number[] = [];
input.split("\n").map((line) => {
  const [x, y] = line.split("   ").map(Number);
  leftList.push(x);
  rightList.push(y);
});

leftList.sort();
rightList.sort();

const distances = leftList.map((left, index) => {
  const right = rightList[index];
  return Math.abs(left - right);
});

const totalDistance = distances.reduce((acc, distance) => acc + distance, 0);

console.log(totalDistance);
