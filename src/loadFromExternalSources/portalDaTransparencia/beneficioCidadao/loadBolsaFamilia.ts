import { portalDaTransparenciaQueue } from "queues/portalDaTransparenciaDataInclusion";
import { GetBeneficioAoCidadaoData } from "scraping/portalDaTransparencia/beneficiosAoCidadao";

async function loadBolsaFamiliaData() {
  const getBolsaFamiliaData = new GetBeneficioAoCidadaoData('01/01/2004')

  const bolsaFamiliaData = await getBolsaFamiliaData.execute()

  for (const bolsaFamiliaDataItem of bolsaFamiliaData) {
    const { availableDate, codigoIbge } = bolsaFamiliaDataItem

    portalDaTransparenciaQueue.add({ availableDate, codigoIbge, resource: "BOLSA_FAMILIA" })
  }
} 

export { loadBolsaFamiliaData };
