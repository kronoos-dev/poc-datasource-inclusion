import { portalDaTransparenciaQueue } from "queues/portalDaTransparenciaDataInclusion";
import { GetBeneficioAoCidadaoData } from "scraping/portalDaTransparencia/beneficiosAoCidadao";

async function loadBpcData() {
  const getBpcData = new GetBeneficioAoCidadaoData('01/12/1993')

  const bpcData = await getBpcData.execute()

  for (const bpcDataItem of bpcData) {
    const { availableDate, codigoIbge } = bpcDataItem

    portalDaTransparenciaQueue.add({ availableDate, codigoIbge, resource: "BPC" })
  }
} 

export { loadBpcData };
