import { puppeteerArgs } from "@utils/puppeter.args";
import puppeteer from "puppeteer";

class GetCelebratedDealsData {
  private urlApi =
    "https://www.gov.br/cgu/pt-br/assuntos/integridade-privada/acordo-leniencia/acordos-celebrados";

  async execute() {
    const browser = await puppeteer.launch(puppeteerArgs);
    const page = await browser.newPage();
    await page.goto(this.urlApi);

    const dataElements = await page.$$eval(
      "table.mceItemTable tbody tr",
      async (rows) => {
        return rows.map((row) => {
          const [year, companyName, agreedValue] = row.querySelectorAll("td");
          const attachments = row.querySelectorAll("td a");

          return {
            year: year.querySelector("p strong")?.textContent,
            companyName: companyName.querySelector("p")?.textContent,
            agreedValue: agreedValue.querySelector("p")?.textContent,
            attachments: Array.from(attachments).map((attachment) =>
              attachment.getAttribute("href")
            ),
          };
        });
      }
    );

    await browser.close();

    dataElements.pop();
    dataElements.shift();

    return dataElements;
  }
}

export { GetCelebratedDealsData };
