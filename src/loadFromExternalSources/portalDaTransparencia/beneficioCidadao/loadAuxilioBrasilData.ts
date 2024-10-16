import { portalDaTransparenciaQueue } from "queues/portalDaTransparenciaDataInclusion";
import { GetBeneficioAoCidadaoData } from "scraping/portalDaTransparencia/beneficiosAoCidadao";

async function loadAuxilioBrasilData() {
  const getAuxilioBrasilData = new GetBeneficioAoCidadaoData('01/10/2021')

  const auxilioBrasilData = await getAuxilioBrasilData.execute()

  for (const auxilioBrasilDataItem of auxilioBrasilData) {
    const { availableDate, codigoIbge } = auxilioBrasilDataItem

    portalDaTransparenciaQueue.add({ availableDate, codigoIbge, resource: 'AUXILIO_BRASIL' })
  }
} 

export { loadAuxilioBrasilData };
