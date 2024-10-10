import { puppeteerArgs } from "@utils/puppeter.args";
import puppeteer from "puppeteer";

class GetDeliberationsData {
  async execute({ initialDate = "01/01/2024", finalDate = "30/06/2024" }) {
    const initialDateParsed = encodeURIComponent(initialDate);
    const finalDateParsed = encodeURIComponent(finalDate);

    const browser = await puppeteer.launch(puppeteerArgs);
    const page = await browser.newPage();
    await page.goto(
      `https://conteudo.cvm.gov.br/legislacao/index.html?numero=&lastNameShow=irregular&lastName=irregular&filtro=todos&dataInicio=${initialDateParsed}&dataFim=${finalDateParsed}&categoria2=%2Flegislacao%2Fdeliberacoes%2F&buscado=false&contCategoriasCheck=7`
    );

    const urlsList = await page.$$eval(".listaResultados article", (items) => {
      const detailsPagePrefix = "https://conteudo.cvm.gov.br";

      return items.map((item) => {
        const anchorElemet = item.querySelector("a")?.getAttribute("href");

        return `${detailsPagePrefix}${anchorElemet}`;
      });
    });

    // TODO, tipar
    const content = [] as any[];
    for (const url of urlsList) {
      // console.log('Going to:', url)
      if (!url.includes(".docx") && !url.includes(".pdf")) {
        await page.goto(url);

        const value = await page.$eval(".contentTextoGeral", (property) => {
          const title = property.querySelector("h2")?.innerText;
          const items: NodeListOf<HTMLElement> =
            property.querySelectorAll(".contentArticle p");

          const pdfUrl = property
            .querySelectorAll(".contentVejaMais a")[0]
            ?.getAttribute("href");

          const docUrl = property
            .querySelectorAll(".contentVejaMais a")[3]
            ?.getAttribute("href");
          const dateJudgementSession = items[0].querySelector("b")?.innerText;
          const description = items[1]?.innerText;

          const fileUrlPrefix = "https://conteudo.cvm.gov.br";

          return {
            title,
            description,
            dateJudgementSession,
            pdfUrl: `${fileUrlPrefix}${pdfUrl}`,
            docUrl: `${fileUrlPrefix}${docUrl}`,
          };
        });

        content.push(value);
      }
    }

    await browser.close();

    return content;
  }
}

export { GetDeliberationsData };
