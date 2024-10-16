import { portalDaTransparenciaQueue } from "queues/portalDaTransparenciaDataInclusion";
import { GetBeneficioAoCidadaoData } from "scraping/portalDaTransparencia/beneficiosAoCidadao";

async function loadNovoBolsaFamilia() {
  const getNovoBolsaFamilia = new GetBeneficioAoCidadaoData('01/01/2023')

  const novoBolsaFamilia = await getNovoBolsaFamilia.execute()

  for (const novoBolsaFamiliaItem of novoBolsaFamilia) {
    const { availableDate, codigoIbge } = novoBolsaFamiliaItem

    portalDaTransparenciaQueue.add({ availableDate, codigoIbge, resource: "NOVO_BOLSA_FAMILIA" })
  }
} 

export { loadNovoBolsaFamilia };
