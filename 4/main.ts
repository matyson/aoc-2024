function revertString(str: string) {
  return str.split("").reverse().join("");
}

function countKeywordInString(str: string, keyword: string) {
  return (str.match(new RegExp(keyword, "g")) || []).length;
}

async function main() {
  const inputPath = "data/input.txt";
  const input = await Deno.readTextFile(inputPath);
  const keyword = "XMAS";
  let keywordCount = 0;

  const rows = input.split("\n");
  keywordCount += countKeywordInString(input, keyword);
  keywordCount += countKeywordInString(revertString(input), keyword);

  const cols = rows.map((_, i) => rows.map((row) => row[i]).join(""));
  for (const col of cols) {
    keywordCount += countKeywordInString(col, keyword);
    keywordCount += countKeywordInString(revertString(col), keyword);
  }

  const principalDiagonals = [];
  for (let i = 0; i < rows.length; i++) {
    for (let j = 0; j < cols.length; j++) {
      if (i === 0 || j === 0) {
        const diag = rows.map((_, k) => rows[k][k + j - i] || "")
          .join("");
        principalDiagonals.push(diag);
      }
    }
  }
  for (const diag of principalDiagonals) {
    keywordCount += countKeywordInString(diag, keyword);
    keywordCount += countKeywordInString(revertString(diag), keyword);
  }

  const secondaryDiag = [];
  for (let i = 0; i < rows.length; i++) {
    for (let j = 0; j < cols.length; j++) {
      if (i === 0 || j === 0) {
        const diag = rows.map((_, k) =>
          rows[k][rows.length - 1 - k + j - i] || ""
        )
          .join("");
        secondaryDiag.push(diag);
      }
    }
  }
  for (const diag of secondaryDiag) {
    keywordCount += countKeywordInString(diag, keyword);
    keywordCount += countKeywordInString(revertString(diag), keyword);
  }

  console.log(keywordCount);
}

if (import.meta.main) {
  main();
}
