import puppeteer from 'puppeteer';

class GetJudgedSanctioningProcessesData {
  async execute({ initialDate = '01/01/2024', finalDate = '30/06/2024' }) {        
    const initialDateParsed = encodeURIComponent(initialDate)
    const finalDateParsed = encodeURIComponent(finalDate)

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(`https://conteudo.cvm.gov.br/sancionadores/index.html?lastNameShow=&lastName=&filtro=todos&dataInicio=${initialDateParsed}&dataFim=${finalDateParsed}&categoria0=%2Fsancionadores%2Fsancionador%2F&categoria1=%2Fsancionadores%2Fdespachos%2F&buscado=false&contCategoriasCheck=2&itensPagina=50`);
      
    const urlsList = await page.$$eval('.listaResultados article', items => {
      const detailsPagePrefix = "https://conteudo.cvm.gov.br"
      
      return items.map(item => {
        const anchorElemet = item.querySelector('a')?.getAttribute('href');        

        return `${detailsPagePrefix}${anchorElemet}`       
      });

    });

    // TODO, tipar
    const content = [] as any[]
    for (const url of urlsList) {
      // console.log('Going to:', url)
      await page.goto(url)

      const value = await page.$eval('.contentTextoGeral', property => {
        const title = property.querySelector('h2')?.innerText
        const items: NodeListOf<HTMLElement> = property.querySelectorAll('.contentArticle p')
        const pdfUrl = property.querySelector('.contentVejaMais a')?.getAttribute('href');        

        const [ , dateJudgementSession ] = items[0].innerText.split('\n')
        const description = items[2]?.innerText

        const pdfUrlPrefix = "https://conteudo.cvm.gov.br"

        return {
          title,
          description,
          dateJudgementSession,
          pdfUrl: `${pdfUrlPrefix}${pdfUrl}`
        }
      })

      content.push(value)        
    }

    await browser.close();

    return content;
  }
}

export { GetJudgedSanctioningProcessesData };
