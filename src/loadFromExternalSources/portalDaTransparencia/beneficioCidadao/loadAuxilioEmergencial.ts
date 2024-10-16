import { portalDaTransparenciaQueue } from "queues/portalDaTransparenciaDataInclusion";
import { GetBeneficioAoCidadaoData } from "scraping/portalDaTransparencia/beneficiosAoCidadao";

async function loadAuxilioEmergencialData() {
  const getAuxilioEmergencialData = new GetBeneficioAoCidadaoData('01/10/2021')

  const auxilioEmergencialData = await getAuxilioEmergencialData.execute()

  for (const auxilioEmergencialDataItem of auxilioEmergencialData) {
    const { availableDate, codigoIbge } = auxilioEmergencialDataItem

    portalDaTransparenciaQueue.add({ availableDate, codigoIbge, resource: "AUXILIO_EMERGENCIAL" })
  }
} 

export { loadAuxilioEmergencialData };
