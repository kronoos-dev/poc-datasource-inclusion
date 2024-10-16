import axios from 'axios';
import Bull from 'bull';

// Create a new queue (example queue for 'sendRequestBeneficioCidadao')
const sendRequestBeneficioCidadaoQueue = new Bull('sendRequestBeneficioCidadao', process.env.REDIS_URL || 'redis://localhost:6379', {
  limiter: {
    max: 180,    
    duration: 1000 * 60
  }
});

sendRequestBeneficioCidadaoQueue.process(async (job) => {
  const { availableDate: mesAno , codigoIbge } = job.data

  try {
    console.log(`Enviando sendRequestBeneficioCidadao no periodo de: ${mesAno} para o código ${codigoIbge} - ${new Date().toLocaleString()}`);

   const { data } = await axios.get(`${process.env.IBGE_API_URL}/auxilio-brasil-por-municipio`, {
    headers: {
      'chave-api-dados': process.env.GOV_KEY
    },  
    
    params: {
      mesAno: mesAno,
      codigoIbge: codigoIbge,
      pagina: 1
    }
  })

  console.log(data[0]) 
  } catch (error) {
    console.error(error) 
  }
});

console.log('Bull - sendRequestBeneficioCidadao - Queue is running...');

export { sendRequestBeneficioCidadaoQueue };
