function sumInstructions(instructions: string): number {
  const mulRegex = /mul\((\d+),(\d+)\)/g;
  const doRegex = /do\(\)/g;
  const dontRegex = /don't\(\)/g;

  let doMatch = doRegex.exec(instructions);
  let dontMatch = dontRegex.exec(instructions);
  let match = mulRegex.exec(instructions);

  let canMul = true;
  let sum = 0;
  while (match !== null) {
    const index = match.index;

    const doIndex = doMatch ? doMatch.index : -1;
    const dontIndex = dontMatch ? dontMatch.index : -1;

    if (
      doIndex < index && (index < dontIndex ||
        dontIndex === -1) &&
      doIndex !== -1
    ) {
      canMul = true;
      doMatch = doRegex.exec(instructions);
    }

    if (
      dontIndex < index && (index < doIndex ||
        doIndex === -1) &&
      dontIndex !== -1
    ) {
      canMul = false;
      dontMatch = dontRegex.exec(instructions);
    }

    if (canMul) {
      const [_, a, b] = match;
      sum += parseInt(a) * parseInt(b);
    }
    match = mulRegex.exec(instructions);
  }
  return sum;
}

async function main() {
  const path = "data/input.txt";

  const input = await Deno.readTextFile(path);
  console.log(sumInstructions(input));
}

if (import.meta.main) {
  main();
}
