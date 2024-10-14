import { puppeteerArgs } from '@utils/puppeter.args';
import puppeteer from 'puppeteer';

class GetCeepData {
  async execute() {        
    const browser = await puppeteer.launch(puppeteerArgs);
    const page = await browser.newPage();
    await page.goto('http://www.servicos.controladoriageral.sp.gov.br/PesquisaCEEP.aspx#gsc.tab=0');
      
    const dataElements = await page.$$eval('.borderCEEP tbody tr', async rows => {
      const detailsPagePrefix = "http://www.servicos.controladoriageral.sp.gov.br"

      return rows.map(col => {

               
          const [ , cnpj, corporateName, sanctionDescription, sanctionDate, leeniencyAgreement, disagreementDeal ] = col.innerText.split('\t')
          const achorCell = col.querySelector('a')

          return {
            "link" : `${detailsPagePrefix}/${achorCell?.getAttribute('href')}`,
            cnpj,
            corporateName,
            sanctionDescription,
            sanctionDate,
            leeniencyAgreement,
            disagreementDeal
          }
        
      });
    });

    dataElements.shift()
  
    await browser.close();

    return dataElements
  }
}

export { GetCeepData };
