import { portalDaTransparenciaQueue } from "queues/portalDaTransparenciaDataInclusion";
import { GetBeneficioAoCidadaoData } from "scraping/portalDaTransparencia/beneficiosAoCidadao";

async function loadSafraData() {
  const getSafraData = new GetBeneficioAoCidadaoData('01/10/2021')

  const safraData = await getSafraData.execute()

  for (const safraDataItem of safraData) {
    const { availableDate, codigoIbge } = safraDataItem

    portalDaTransparenciaQueue.add({ availableDate, codigoIbge, resource: "SAFRA" })
  }
} 

export { loadSafraData };
