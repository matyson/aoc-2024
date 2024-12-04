function countSimilarity(numbers: number[], target: number): number {
  return numbers.filter((number) => number === target).length * target;
}

function sum(numbers: number[]): number {
  return numbers.reduce((acc, number) => acc + number, 0);
}

async function main() {
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

  const totalDistance = sum(distances);

  const similarityList = leftList.map((left) =>
    countSimilarity(rightList, left)
  );
  const totalSimilarity = sum(similarityList);

  console.log("Total distance:", totalDistance);
  console.log("Total similarity:", totalSimilarity);
}

if (import.meta.main) {
  main();
}
