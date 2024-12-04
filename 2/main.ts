const inputPath = "data/input.txt";

const lines = await Deno.readTextFile(inputPath).then((text) =>
  text.split("\n")
);

const reports = lines.map((line) => {
  return line.split(" ").map(Number);
});

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

const safeReports = reports.filter(checkReportSafety).length;

console.log(safeReports);
