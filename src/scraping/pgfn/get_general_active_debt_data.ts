import AdmZip from 'adm-zip';
import axios from 'axios';
import fs from 'fs';
import https from 'https';
import puppeteer from 'puppeteer';

// Cert issue solution
const httpsAgent = new https.Agent({
    rejectUnauthorized: false
});

class GetGeneralActiveDebtData {
  private async downloadFile(url: string) {
    try {      
      const pathMap = '/tmp/pgfn/general_active_debt'
      const fileName = `${url.split('/').at(-2)}-${url.split('/').at(-1)}`
      const filePath = `${pathMap}/${fileName}`
      
      console.log('Downloading file...', fileName)

      if (!fs.existsSync('/tmp')) fs.mkdirSync('/tmp');
      if (!fs.existsSync('/tmp/pgfn')) fs.mkdirSync('/tmp/pgfn');      
      if (!fs.existsSync(pathMap)) fs.mkdirSync(pathMap);

      const response = await axios.get(url, { responseType: 'stream', httpsAgent });
  
      const writer = fs.createWriteStream(filePath);
      await new Promise((resolve, reject) => {
        response.data.pipe(writer);
        writer.on('finish', resolve);
        writer.on('error', reject);
      });
  
      console.log('File downloaded successfully: ', fileName);

      return fileName
    } catch (error) {
      console.error('Error downloading file:', error);
    }
  }
  private async extractFile(url: string) {
    try {
      console.log('Extracting file... ', url)

      const pathMap = '/tmp/pgfn/general_active_debt'
      const fileName = `${pathMap}/${url}`
      const directory = url?.replace('.zip', '')
      const extractDirectory = `assets/pgfn/general_active_debt/${directory}`

      const zip = new AdmZip(fileName);

      zip.extractAllTo(extractDirectory, true);

      console.log(`Extraction complete:`, directory);

      return extractDirectory
    } catch (error) {
      console.error('Error extracting file:', error);
    }
  }

  async execute() {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(`https://www.gov.br/pgfn/pt-br/assuntos/divida-ativa-da-uniao/transparencia-fiscal-1/dados-abertos`);    

    const listUrlAssets = await page.$$eval(`table`, table => {
      return Array.from(table).map(col => {
        return col.querySelectorAll('tr:nth-child(2) td a')[0].getAttribute('href') as string
      })
    });
        
    const paths: string[] = []
    for (const urlAsset of listUrlAssets) {
      try {
        const arquivePath = await this.downloadFile(urlAsset)

        if(!arquivePath) throw new Error('No path provided for the created archive') 
          
        const extractedPath = await this.extractFile(arquivePath)
        
        if(!extractedPath) throw new Error('No path provided for the extracted archives') 

        paths.push(extractedPath)
      } catch (error) {
        console.error(error)
        throw new Error("Error processing file");      
      }
    }

    await browser.close();

    console.log('')

    return paths;
  }
}

export { GetGeneralActiveDebtData };
