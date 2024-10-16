import { portalDaTransparenciaQueue } from "queues/portalDaTransparenciaDataInclusion";
import { GetBeneficioAoCidadaoData } from "scraping/portalDaTransparencia/beneficiosAoCidadao";

async function loadSeguroDefesoData() {
  const beneficioAoCidadaoData = new GetBeneficioAoCidadaoData('01/10/2021')

  const seguroDefesoData = await beneficioAoCidadaoData.execute()

  for (const seguroDefesoDataItem of seguroDefesoData) {
    const { availableDate, codigoIbge } = SeguroDefesoDataItem

    portalDaTransparenciaQueue.add({ availableDate, codigoIbge, resource:"SEGURO_DEFESO" })
  }
} 

export { loadSeguroDefesoData };
