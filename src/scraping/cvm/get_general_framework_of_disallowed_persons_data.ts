import { puppeteerArgs } from "@utils/puppeter.args";
import puppeteer from "puppeteer";

class GetGeneralFrameworkOfDisallowedPersonsData {
  getUrl() {
    return `https://olinda.bcb.gov.br/olinda/servico/Gepad_QuadrosGeraisInternet/versao/v1/odata/QuadroGeralInabilitados?format=text/html`;
  }

  async execute() {
    const url = this.getUrl();

    const browser = await puppeteer.launch(puppeteerArgs);
    const page = await browser.newPage();
    await page.goto(url);

    const content = await page.$$eval("table.table tr", (items) => {
      return items.map((item) => {
        const [
          pas,
          name,
          cpf,
          penalty,
          termInYears,
          startOfPenaltyTerm,
          endOfPenaltyTerm,
        ] = item.querySelectorAll("td");

        if (!pas) return;

        return {
          pas: `${pas.innerText}`,
          name: `${name.innerText}`,
          cpf: `${cpf.innerText}`,
          penalty: `${penalty.innerText}`,
          termInYears: `${termInYears.innerText}`,
          startOfPenaltyTerm: `${startOfPenaltyTerm.innerText}`,
          endOfPenaltyTerm: `${endOfPenaltyTerm.innerText}`,
        };
      });
    });

    await browser.close();

    return content.filter(Boolean);
  }
}

export { GetGeneralFrameworkOfDisallowedPersonsData };
