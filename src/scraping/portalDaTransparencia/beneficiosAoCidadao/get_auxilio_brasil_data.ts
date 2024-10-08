import axios from 'axios';
import 'dotenv/config';
import puppeteer from 'puppeteer';

import { puppeteerArgs } from '@utils/puppeter.args';

type MunicipioType = {
  municipio: string;
  codigo: number
}

class GetAuxilioBrasilData {
  /**
    A fim de garantir a estabilidade do ambiente, os seguintes limites são definidos:
    
    De 00:00 às 06:00: até 700 requisições por minuto
    Nos demais horários: 400 requisições por minuto
    APIs restritas: 180 requisições por minuto.  

    referência: https://portaldatransparencia.gov.br/api-de-dados/
  */
  // https://api.portaldatransparencia.gov.br/swagger-ui/index.html#/Benef%C3%ADcios/auxilioBrasilPorMunicipio
  private urlApi = 'https://api.portaldatransparencia.gov.br/api-de-dados/auxilio-brasil-por-municipio'
  private url = 'https://www.ibge.gov.br/explica/codigos-dos-municipios.php'

  async execute() {    
    const browser = await puppeteer.launch(puppeteerArgs);
    const page = await browser.newPage();
    await page.goto(this.url);
      
    const listaMunicipios = await page.$$eval('.container-codigos .container-uf', async tables => {      

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

    console.log(listaMunicipios?.length)
    // 5597
  
    await browser.close();

    // TODO, extrair busca
    const auxilioBrasilData: MunicipioType[] = []
    for (const municipioData of listaMunicipios as MunicipioType[]) {
      const { municipio, codigo } = municipioData

      // https://www.ibge.gov.br/explica/codigos-dos-municipios.php#DF
      const codigoIbge = codigo
      const mesAno = '202201'

      try {
        const { data } = await axios.get(`${this.urlApi}?mesAno=${mesAno}&codigoIbge=${codigoIbge}&pagina=1`, {
          headers: {
            'chave-api-dados': process.env.GOV_KEY
          }
        })

        console.log(data)
  
        auxilioBrasilData.push(data)
      } catch (error) {
        console.error(error);        
      }
    }

    return auxilioBrasilData
  }
}

export { GetAuxilioBrasilData };
