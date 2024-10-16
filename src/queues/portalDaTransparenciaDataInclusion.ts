import { EndpointUrlEnum, EndpointUrlEnumStrings } from '@modules/portalDaTransparencia/endPointUrl';
import axios from 'axios';
import Bull from 'bull';

type JobDataType = {
  resource: EndpointUrlEnumStrings
  availableDate: string,
  codigoIbge: number
}

// Create a new queue (example queue for 'portalDaTransparencia')
const portalDaTransparenciaQueue = new Bull<JobDataType>('portalDaTransparencia', process.env.REDIS_URL || 'redis://localhost:6379', {
  limiter: {
    max: 5,    
    duration: 1000 * 60
  }
});

portalDaTransparenciaQueue.process(async ({ data } ) => {
  const { availableDate: mesAno , codigoIbge, resource } = data

  try {
    console.log(`Processando portalDaTransparencia queue no periodo de: ${mesAno} para o código ${codigoIbge} - ${new Date().toLocaleString()}`);

   const { data } = await axios.get(`${process.env.IBGE_API_URL}${EndpointUrlEnum[resource]}`, {
    headers: {
      'chave-api-dados': process.env.GOV_KEY
    },  
    
    params: {
      mesAno: mesAno,
      codigoIbge: codigoIbge,
      pagina: 1
    }
  })

  const [ portalDaTransparenciaData ] = data

  console.table(data)
  } catch (error) {
    console.error(error) 
  }
});

console.log('Bull - portalDaTransparencia - Queue is running...');

export { portalDaTransparenciaQueue };
