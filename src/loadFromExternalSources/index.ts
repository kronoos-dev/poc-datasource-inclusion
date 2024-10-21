import { loadCartoesData } from "./portalDaTransparencia/beneficioCidadao/loadCartoes";
import { loadAppliedPenaltiesData } from "./tcu/loadAppliedPenaltiesData";

async function loadData() {
  try {
    // CVM
    // loadDeliberationsData()
    // loadGeneralFrameworkOfDisallowedPersonsData()
    // loadGeneralFrameworkOfPersonsProhibitedFromActingData()
    // CEEP
    // loadCeepData()
    // Portal da transparencia
    // BENEFICIO CIDADAO --
    // loadAuxilioBrasilData()
    // loadSeguroDefesoData()
    // loadSafraData()
    // loadPetitData()
    // loadAuxilioEmergencialData()
    // loadBpcData()
    // loadBolsaFamiliaData()
    // loadNovoBolsaFamilia()
    // CARTOES --
    // loadCartoesData()

    // TCU
    loadAppliedPenaltiesData();
  } catch (error) {
    throw new Error(`Ops, algo deu errado: ${error}`);
  }
}

loadData();
