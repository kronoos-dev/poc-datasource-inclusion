
import { EndpointUrlEnumStrings } from '@modules/portalDaTransparencia/endPointUrl';
import { existsSync, mkdirSync } from 'fs'; //his ensures you're using the promises version of 'fs'
import fs from 'fs/promises'; //his ensures you're using the promises version of 'fs'
import path from 'path';

// Function to read the database file
async function readDB(resource: EndpointUrlEnumStrings, period: string) {
  const year = period.slice(0,4)
  const month = period.slice(4,6)
  const fullPath = path.join(__dirname, resource, year, `${month}.json`);

  if (!existsSync(path.join(__dirname, resource))) {
    mkdirSync(path.join(__dirname, resource))
  }
  
  if (!existsSync(path.join(__dirname, resource, year))) {
    mkdirSync(path.join(__dirname, resource, year))
  }

  if (!existsSync(fullPathW)) {
    fs.writeFile(fullPath, '[]', 'utf8')
  }

  const data = await fs.readFile(fullPath, 'utf8');
  

  return JSON.parse(data);
}

// Function to write to the database file
async function writeDB(data: Object, resource: EndpointUrlEnumStrings, period: string) {
  const year = period.slice(0,4)
  const month = period.slice(4,6)

  const fullPath = path.join(__dirname, resource, year, `${month}.json`);

  await fs.writeFile(fullPath, JSON.stringify(data, null, 2), 'utf8');
}


// async function readDB() {
//   const data = await fs.readFile(dbFilePath, 'utf8');
//   return JSON.parse(data);
// }

// // Function to write to the database file
// async function writeDB(data: any) {
//   await fs.writeFile(dbFilePath, JSON.stringify(data, null, 2), 'utf8');
// }

export { readDB, writeDB };
