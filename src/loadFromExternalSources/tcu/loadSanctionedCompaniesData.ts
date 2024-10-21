import fs from "fs";
import { createSanctionedCompaniesQueue } from "queues/createSanctionedCompanies";

const readFile = async (): Promise<any[]> => {
  let results: any[] = [];

  return new Promise((resolve, reject) => {
    fs.readFile("assets/tcu/termos_contratuais.json", "utf8", (error, data) => {
      if (error) {
        reject(error);
      }
      results = JSON.parse(data);
      resolve(results);
    });
  });
};

async function loadSanctionedCompaniesData() {
  const array = await readFile();

  array.map((data) => {
    createSanctionedCompaniesQueue.add(data);
  });
}

export { loadSanctionedCompaniesData };
