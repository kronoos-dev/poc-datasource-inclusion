import fs from "fs";
import { createAppliedPenaltiesQueue } from "queues/createContractExecutionsAndCompetitionsPenalties";

const readFile = async (): Promise<any[]> => {
  let results: any[] = [];

  return new Promise((resolve, reject) => {
    fs.readFile(
      "assets/tcu/penalidades_aplicadas.json",
      "utf8",
      (error, data) => {
        if (error) {
          reject(error);
        }
        results = JSON.parse(data);
        resolve(results);
      }
    );
  });
};

async function loadAppliedPenaltiesData() {
  const array = await readFile();

  array.map((data) => {
    createAppliedPenaltiesQueue.add(data);
  });
}

export { loadAppliedPenaltiesData };
