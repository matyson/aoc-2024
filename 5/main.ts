function parseInput() {
  const instructions = [];
  const updates = [];
  for (const line of lines) {
    if (line.includes("|")) {
      instructions.push(line);
    }
    if (line.includes(",")) {
      updates.push(line);
    }
  }
  return {
    instructions,
    updates,
  };
}
function checkOrder(
  update: string,
  instruction: string,
) {
  const [before, after] = instruction.split("|");
  const pages = update.split(",");
  const beforeIndex = pages.findIndex((page) => page === before);
  const afterIndex = pages.findIndex((page) => page === after);
  if (beforeIndex === -1 || afterIndex === -1) {
    return true;
  }
  return beforeIndex < afterIndex;
}
function findMiddlePage(update: string) {
  const pages = update.split(",");
  const middleIndex = Math.floor(pages.length / 2);
  return pages[middleIndex];
}

function part1() {
  const { instructions, updates } = parseInput();
  let count = 0;
  for (const update of updates) {
    let isOrdered = true;
    for (const instruction of instructions) {
      isOrdered = isOrdered && checkOrder(update, instruction);
    }
    if (isOrdered) {
      count += parseInt(findMiddlePage(update));
    }
  }

  console.log("Part 1:", count);
}

function part2() {
  function sortUpdate(
    update: string,
    instruction: string,
  ) {
    const [before, after] = instruction.split("|");
    const pages = update.split(",");
    const beforeIndex = pages.findIndex((page) => page === before);
    const afterIndex = pages.findIndex((page) => page === after);
    if (beforeIndex === -1 || afterIndex === -1) {
      return update;
    }
    if (beforeIndex > afterIndex) {
      const temp = pages[beforeIndex];
      pages[beforeIndex] = pages[afterIndex];
      pages[afterIndex] = temp;
    }
    return pages.join(",");
  }
  function getUnordered() {
    const orderedUpdates: string[] = [];
    for (const update of updates) {
      let isOrdered = true;
      for (const instruction of instructions) {
        isOrdered = isOrdered && checkOrder(update, instruction);
      }
      if (isOrdered) {
        orderedUpdates.push(update);
      }
    }
    return updates.filter((update) => !orderedUpdates.includes(update));
  }

  const { instructions, updates } = parseInput();
  const unordered = getUnordered();
  let count = 0;
  for (let update of unordered) {
    const isOrdered = Array.from({ length: instructions.length }, () => false);
    while (!isOrdered.every((order) => order)) {
      instructions.map((instruction, index) => {
        isOrdered[index] = checkOrder(update, instruction);
        update = sortUpdate(update, instruction);
      });
    }
    count += parseInt(findMiddlePage(update));
  }

  console.log("Part 2:", count);
}

const path = "data/input.txt";
const input = await Deno.readTextFile(path);
const lines = input.split("\n");

if (import.meta.main) {
  part1();
  part2();
}
