import { EndpointUrlEnum, EndpointUrlEnumStrings } from '@modules/portalDaTransparencia/endPointUrl';
import axios from 'axios';
import Bull from 'bull';
import { readDB, writeDB } from 'jsonFileDB/database';

type JobDataType = {
  resource: EndpointUrlEnumStrings
  availableDate: string,
  codigoIbge: number
}

// Create a new queue (example queue for 'portalDaTransparencia')
const portalDaTransparenciaQueue = new Bull<JobDataType>('portalDaTransparencia', process.env.REDIS_URL || 'redis://localhost:6379', {
  limiter: {
    max: 180,    
    duration: 1000 * 60
  }
});

portalDaTransparenciaQueue.process(async ({ data } ) => {
  const { availableDate: mesAno , codigoIbge, resource } = data
  
  console.log(`Processando portalDaTransparencia '${resource}' queue no periodo de: ${mesAno} para o código ${codigoIbge} - ${new Date().toLocaleString()}`);

  try {

   const { data } = await axios.get(`${process.env.IBGE_API_URL}${EndpointUrlEnum[resource]}`, {
    headers: {
      'chave-api-dados': process.env.GOV_KEY
    },
    
    params: {
      mesAno,
      codigoIbge: codigoIbge,
      pagina: 1
    }
  })

  const [ portalDaTransparenciaData ] = data

  if(portalDaTransparenciaData) {
    console.table(portalDaTransparenciaData)
    let db = await readDB(resource, mesAno);

    if(!db) db = []

    db.filter(( item: any ) => item.id !== portalDaTransparenciaData.id)
    db.push(portalDaTransparenciaData);

     await writeDB(db, resource, mesAno); 

    console.debug('dados do portalDaTransparenciaData salvos com sucesso!')
  } else {
    console.warn('Nenhum dado para o parâmetro fornecido')
  }

  } catch (error) {
    console.error(error) 
  }
});

console.log('Bull - portalDaTransparencia - Queue is running...');

export { portalDaTransparenciaQueue };
