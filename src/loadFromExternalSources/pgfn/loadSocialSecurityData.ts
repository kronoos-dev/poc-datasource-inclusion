import fs from "fs";
import csv from "csv-parser";
import { createSocialSecurityDataQueue } from "queues/createSocialSecurityData";

const readFile = async (): Promise<any[]> => {
  const results: any[] = [];

  return new Promise((resolve, reject) => {
    fs.createReadStream(
      "assets/pgfn/social_security_debt/arquivo_lai_PREV_2_202403.csv"
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

async function loadSocialSecurityData() {
  const array = await readFile();

  array.map((data) => {
    createSocialSecurityDataQueue.add(data);
  });
}

export { loadSocialSecurityData };
