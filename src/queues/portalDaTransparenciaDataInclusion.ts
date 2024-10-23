import { PrismaPortalDaTransparenciaItemRepository } from '@modules/ceep/repositories/implementations/PrismaPortalDaTransparenciaRepository';
import { CreatePortalDaTransparenciaItemUseCase } from '@modules/ceep/usecases/createPortalDaTransparenciaItem/CreatePortalDaTransparenciaItemUseCase';
import { EndpointUrlEnum, EndpointUrlEnumStrings } from '@modules/portalDaTransparencia/endPointUrl';
import { PortalDaTransparenciaResource } from '@prisma/client';
import axios from 'axios';
import Bull from 'bull';
import { readDB, writeDB } from 'jsonFileDB/database';

interface GetBeneficioAoCidadaoDataJobDataType {
  resource: EndpointUrlEnumStrings
  availableDate: string,
  codigoIbge: number
}

interface GetCartaoDataJobDataType {
  resource: EndpointUrlEnumStrings
  mesExtratoInicio: string,
  mesExtratoFim: string,
}

// Create a new queue (example queue for 'portalDaTransparencia')
const portalDaTransparenciaQueue = new Bull<GetBeneficioAoCidadaoDataJobDataType | GetCartaoDataJobDataType>('portalDaTransparencia', process.env.REDIS_URL || 'redis://localhost:6379', {
  limiter: {
    max: 150,    
    duration: 1000 * 60,
    
  }
});

portalDaTransparenciaQueue.process(async ({ data }) => {  
  const beneficioCidadaoResources = [
    PortalDaTransparenciaResource.AUXILIO_BRASIL,
    PortalDaTransparenciaResource.NOVO_BOLSA_FAMILIA,
    PortalDaTransparenciaResource.BOLSA_FAMILIA,
    PortalDaTransparenciaResource.SEGURO_DEFESO,
    PortalDaTransparenciaResource.SAFRA,
    PortalDaTransparenciaResource.PETIT,
    PortalDaTransparenciaResource.BPC,
    PortalDaTransparenciaResource.AUXILIO_EMERGENCIAL,
  ]
  const isBeneficioCidadao = beneficioCidadaoResources.some(( resource ) => resource === data.resource)
  const isCartao = data.resource === PortalDaTransparenciaResource.CARTOES

  if(isBeneficioCidadao) {
    const { availableDate: mesAno , codigoIbge, resource } = data as GetBeneficioAoCidadaoDataJobDataType
    
    console.log(`Processando portalDaTransparencia '${resource}' queue no periodo de: ${mesAno} para o código ${codigoIbge} - ${new Date().toLocaleString()}`);
  
    try {
  
    const { data, status } = await axios.get(`${process.env.API_URL}${EndpointUrlEnum[resource]}`, {
      headers: {
        'chave-api-dados': process.env.GOV_KEY
      },
      params: {
        mesAno,
        codigoIbge,
        pagina: 1
      }
    })
  
    if(status === 401) {
      throw new Error(`Ops, algo deu errado: ${data}`);
    }

    const portalDaTransparenciaItemRepository = PrismaPortalDaTransparenciaItemRepository.getInstance();
    const createPortalDaTransparenciaItemUseCase = new CreatePortalDaTransparenciaItemUseCase(portalDaTransparenciaItemRepository);
  
    
    if(data.length !== 0 && Array.isArray(data)) {
      for (const apiResponse of data) {
        console.table(apiResponse)

        await createPortalDaTransparenciaItemUseCase.execute({
          apiResponse,
          resource
        })    

        let db = await readDB(resource, mesAno);
    
        if(!db) db = []
    
        db.filter(( item: any ) => item.id !== apiResponse.id)
        db.push(apiResponse);
    
        await writeDB(db, resource, mesAno); 
    
        console.debug('dados do portalDaTransparenciaData salvos com sucesso!')
      }
    } else {
      console.debug('Nenhum dado encontrado')
    }
  
    } catch (error) {
      throw new Error(error as any);
    }
  } else if(isCartao) {
    const { resource, mesExtratoInicio, mesExtratoFim } = data as GetCartaoDataJobDataType

    try {
      const { data, status } = await axios.get(`${process.env.API_URL}${EndpointUrlEnum[resource]}`, {
        headers: {
          'chave-api-dados': process.env.GOV_KEY
        },
        params: {
          mesExtratoInicio, 
          mesExtratoFim,
          pagina: 1
        }
      })
    
      if(status === 401) {
        throw new Error(`Ops, algo deu errado: ${data}`);
      }

      const portalDaTransparenciaItemRepository = PrismaPortalDaTransparenciaItemRepository.getInstance();
    const createPortalDaTransparenciaItemUseCase = new CreatePortalDaTransparenciaItemUseCase(portalDaTransparenciaItemRepository);
  
    if(data.length !== 0 && Array.isArray(data)) {
      for (const apiResponse of data) {
        await createPortalDaTransparenciaItemUseCase.execute({
          apiResponse,
          resource
        })    

        console.table(apiResponse)
        const mesAno = `${mesExtratoInicio.slice(0,2)}${mesExtratoInicio.slice(3)}`

        let db = await readDB(resource, mesAno);
    
        if(!db) db = []
    
        db.filter(( item: any ) => item.id !== apiResponse.id)
        db.push(apiResponse);
    


        await writeDB(db, resource, mesAno); 
    
        console.debug('dados do portalDaTransparenciaData salvos com sucesso!')
      }
    }    
  
    } catch (error) {
      
    }

  } else {
    throw new Error(`Recurso não implementado - ${data.resource}`);
  }
});

console.log('Bull - portalDaTransparencia - Queue is running...');

export { portalDaTransparenciaQueue };
