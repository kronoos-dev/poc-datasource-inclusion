import fs from "fs";
import csv from "csv-parser";
import { createContractExecutionsAndCompetitionsPenaltiesQueue } from "queues/createContractExecutionsAndCompetitionsPenalties";

const readFile = async (): Promise<any[]> => {
  const results: any[] = [];

  return new Promise((resolve, reject) => {
    fs.createReadStream("../../../assets/tcu/licitacoes_concluídas.csv")
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
    createContractExecutionsAndCompetitionsPenaltiesQueue.add(data);
  });
}

export { loadContractExecutionsAndCompetitionsPenaltiesData };
