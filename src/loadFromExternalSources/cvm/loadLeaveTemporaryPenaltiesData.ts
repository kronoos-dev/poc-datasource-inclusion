import { puppeteerArgs } from '@utils/puppeter.args';
import puppeteer from 'puppeteer';

class GetLeaveTemporaryPenaltiesData {
  getUrl() {
    return `https://www.gov.br/cvm/pt-br/assuntos/protecao/afastamentos-impedimentos-temporarios/afastamentos-penalidades-temporarias`
  }

  async execute() {        
    const url = this.getUrl()

    const browser = await puppeteer.launch(puppeteerArgs);
    const page = await browser.newPage();
    await page.goto(url);
      
    const content = await page.$$eval('table.listing tr', items => {
      const detailsPagePrefix = "https://conteudo.cvm.gov.br"
      
      return items.map(item => {
        const [ processId, participant, typeOfDecision, judgedDate, vicencyDate, leavePeriod , decision ] = item.querySelectorAll('td')        

        let participantName = participant.querySelector('p span')?.textContent
        if(participant.querySelector('p span span')?.textContent){
          participantName = participant.querySelector('p span span')?.textContent
        } else if(participant.querySelector('p span')?.textContent){
          participantName = participant.querySelector('p span')?.textContent
        } else if(participant.querySelector('span')?.textContent){
          participantName = participant.querySelector('span')?.textContent
        } else if(participant.textContent){
          participantName = participant.textContent
        } else {
          participantName = participant.querySelector('p')?.textContent
        }

        const linkDecision = decision.querySelector('a')?.getAttribute('href')

        return {
          processId: `${processId.innerText}`,
          participant: `${participantName?.replace('\n', '')}`,
          typeOfDecision: typeOfDecision.innerText,
          judgedDate: judgedDate.innerText, 
          vicencyDate: vicencyDate.innerText, 
          leavePeriod: leavePeriod.innerText,
          decision: linkDecision
        }
      });

    });

    await browser.close();

    return content;
  }
}

export { GetLeaveTemporaryPenaltiesData };
