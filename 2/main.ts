function checkStrictlyIncreasing(numbers: number[]): boolean {
  for (let i = 1; i < numbers.length; i++) {
    if (numbers[i] <= numbers[i - 1]) {
      return false;
    }
  }
  return true;
}

function checkStrictlyDecreasing(numbers: number[]): boolean {
  for (let i = 1; i < numbers.length; i++) {
    if (numbers[i] >= numbers[i - 1]) {
      return false;
    }
  }
  return true;
}

function checkDifferenceTolerance(
  numbers: number[],
  tolerance: number,
): boolean {
  for (let i = 1; i < numbers.length; i++) {
    if (Math.abs(numbers[i] - numbers[i - 1]) > tolerance) {
      return false;
    }
  }
  return true;
}

function checkReportSafety(report: number[]): boolean {
  return (checkStrictlyIncreasing(report) || checkStrictlyDecreasing(report)) &&
    checkDifferenceTolerance(report, 3);
}

async function main() {
  const inputPath = "data/input.txt";

  const lines = await Deno.readTextFile(inputPath).then((text) =>
    text.split("\n")
  );

  const reports = lines.map((line) => {
    return line.split(" ").map(Number);
  });

  const safeReports = reports.filter((report) => {
    let safe = checkReportSafety(report);
    if (!safe) {
      for (let i = 0; i < report.length; i++) {
        const maybeSafe = report.toSpliced(i, 1);
        safe = checkReportSafety(maybeSafe);
        if (safe) {
          break;
        }
      }
    }
    return safe;
  }).length;

  console.log(safeReports);
}

if (import.meta.main) {
  main();
}
