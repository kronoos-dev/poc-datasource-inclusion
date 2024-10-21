import fs from "fs";
import csv from "csv-parser";
import { createContractExecutionsAndCompetitionsPenaltiesQueue } from "queues/createContractExecutionsAndCompetitionsPenalties";
import { createTendersAndContractsQueue } from "queues/createTendersAndContracts";

const readFile = async (): Promise<any[]> => {
  const results: any[] = [];

  return new Promise((resolve, reject) => {
    fs.createReadStream("../../../assets/tcu/termos_contratuais.csv")
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

async function loadContractExecutionsAndCompetitionsPenaltiesData() {
  const array = await readFile();

  array.map((data) => {
    createTendersAndContractsQueue.add(data);
  });
}

export { loadContractExecutionsAndCompetitionsPenaltiesData };
