import { portalDaTransparenciaQueue } from "queues/portalDaTransparenciaDataInclusion";
import { GetCartoesData } from "scraping/portalDaTransparencia/cartoes";

async function loadCartoesData() {
  const getCartoesData = new GetCartoesData('01/01/2013')

  const cartoesData = await getCartoesData.execute()

  for (const cartoesDataItem of cartoesData) {
    const { mesExtratoFim, mesExtratoInicio } = cartoesDataItem

    portalDaTransparenciaQueue.add({ mesExtratoFim, mesExtratoInicio, resource: "CARTOES" })
  }
} 

export { loadCartoesData };
