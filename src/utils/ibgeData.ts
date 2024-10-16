import puppeteer from 'puppeteer';
import { puppeteerArgs } from './puppeter.args';


type MunicipioType = {
  municipio: string;
  codigo: number
}

async function getMunicipios() {
  const url = 'https://www.ibge.gov.br/explica/codigos-dos-municipios.php'

  const browser = await puppeteer.launch(puppeteerArgs);
  const page = await browser.newPage();
  await page.goto(url);

  return await page.$$eval('.container-codigos .container-uf', async tables => {
    let municipios: MunicipioType[] = []

    for (const table of tables) {        
      const cells = table.querySelectorAll('tbody tr');

      for (const col of Array.from(cells)) {
        const municipio = col.querySelector('td a')?.textContent as string
        const codigo = col.querySelector('td.numero')?.textContent as unknown as number

        municipios.push({
          municipio,
          codigo
        })
      } 
          
    }
    return municipios
  });
}

export { getMunicipios };
