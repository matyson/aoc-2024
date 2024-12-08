function sumInstructions(instructions: string): number {
  const regex = /mul\((\d+),(\d+)\)/g;
  let match = regex.exec(instructions);
  let sum = 0;
  while (match !== null) {
    const [_, a, b] = match;
    sum += parseInt(a) * parseInt(b);
    match = regex.exec(instructions);
  }
  return sum;
}

async function main() {
  //   const example = "xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))";
  const path = "data/input.txt";
  const input = await Deno.readTextFile(path);
  console.log(sumInstructions(input));
}

if (import.meta.main) {
  main();
}
