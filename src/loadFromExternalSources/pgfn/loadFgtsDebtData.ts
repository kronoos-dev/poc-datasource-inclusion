import fs from "fs";
import csv from "csv-parser";
import { createFgtsDebtQueue } from "queues/createFgtsDebt";

const readFile = async (): Promise<any[]> => {
  const results: any[] = [];

  return new Promise((resolve, reject) => {
    fs.createReadStream(
      "assets/pgfn/fgts_debt/2021_trimestre_01-Dados_abertos_FGTS/arquivo_lai_FGTS_AC_202103.csv"
    )
      .pipe(csv())
      .on("data", (data: any) => {
        results.push(data);
      })
      .on("end", () => {
        resolve(results);
      })
      .on("error", reject);
  });
};

async function loadFgtsDebtData() {
  const array = await readFile();

  array.map((data) => {
    createFgtsDebtQueue.add(data);
  });
}

export { loadFgtsDebtData };
