import fs from "fs";
import csv from "csv-parser";
import { createTendersAndContractsQueue } from "queues/createContractualTerms";

const readFile = async (): Promise<any[]> => {
  const results: any[] = [];

  return new Promise((resolve, reject) => {
    fs.createReadStream("../../../assets/tcu/report_1.csv")
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

async function loadSanctionedCompaniesData() {
  const array = await readFile();

  array.map((data) => {
    createTendersAndContractsQueue.add(data);
  });
}

export { loadSanctionedCompaniesData };
