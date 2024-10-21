import fs from "fs";
import csv from "csv-parser";
import { createGeneralActiveDebtDataQueue } from "queues/createGeneralActiveDebtData";

const readFile = async (): Promise<any[]> => {
  const results: any[] = [];

  return new Promise((resolve, reject) => {
    fs.createReadStream(
      "assets/pgfn/general_active_debt/arquivo_lai_FGTS_AC_202103"
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

async function loadGeneralActiveDebtData() {
  const array = await readFile();

  array.map((data) => {
    createGeneralActiveDebtDataQueue.add(data);
  });
}

export { loadGeneralActiveDebtData };
