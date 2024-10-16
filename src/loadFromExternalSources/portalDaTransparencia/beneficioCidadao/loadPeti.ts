import { portalDaTransparenciaQueue } from "queues/portalDaTransparenciaDataInclusion";
import { GetBeneficioAoCidadaoData } from "scraping/portalDaTransparencia/beneficiosAoCidadao";

async function loadPetitData() {
  const getPetitData = new GetBeneficioAoCidadaoData('01/10/2001')

  const petitData = await getPetitData.execute()

  for (const petitDataItem of petitData) {
    const { availableDate, codigoIbge } = petitDataItem

    portalDaTransparenciaQueue.add({ availableDate, codigoIbge, resource: "PETIT" })
  }
} 

export { loadPetitData };
