import { portalDaTransparenciaQueue } from "queues/portalDaTransparenciaDataInclusion";
import { GetAuxilioBrasilData } from "scraping/portalDaTransparencia/beneficiosAoCidadao/get_auxilio_brasil_data";

async function loadAuxilioBrasilData() {
  const getAuxilioBrasilData = new GetAuxilioBrasilData()

  const auxilioBrasilData = await getAuxilioBrasilData.execute()

  for (const auxilioBrasilDataItem of auxilioBrasilData) {
    const { availableDate, codigoIbge } = auxilioBrasilDataItem

    portalDaTransparenciaQueue.add({ availableDate, codigoIbge, resource: 'AUXILIO_BRASIL' })
  }
} 

export { loadAuxilioBrasilData };
