import fs from "fs";
import { createContractualTermsQueue } from "queues/createContractualTerms";

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

async function loadContractualTermsData() {
  const array = await readFile();
  console.log(array);

  array.map((data) => {
    createContractualTermsQueue.add(data);
  });
}

export { loadContractualTermsData };
