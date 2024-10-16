import { loadAuxilioBrasilData } from "./portalDaTransparencia/beneficioCidadao/loadAuxilioBrasilData"
import { loadAuxilioEmergencialData } from "./portalDaTransparencia/beneficioCidadao/loadAuxilioEmergencial"
import { loadBolsaFamiliaData } from "./portalDaTransparencia/beneficioCidadao/loadBolsaFamilia"
import { loadBpcData } from "./portalDaTransparencia/beneficioCidadao/loadBpc"
import { loadNovoBolsaFamilia } from "./portalDaTransparencia/beneficioCidadao/loadNovoBolsaFamiliaData"
import { loadPetitData } from "./portalDaTransparencia/beneficioCidadao/loadPeti"
import { loadSafraData } from "./portalDaTransparencia/beneficioCidadao/loadSafra"
import { loadSeguroDefesoData } from "./portalDaTransparencia/beneficioCidadao/loadSeguroDefeso"

function loadData() {
  try {

    // CEEP    
    // loadCeepData()
    
    // Portal da transparencia
    loadAuxilioBrasilData()
    loadSeguroDefesoData()
    loadSafraData()
    loadPetitData()
    loadAuxilioEmergencialData()
    loadBpcData()
    loadBolsaFamiliaData()
    loadNovoBolsaFamilia()
  } catch (error) {
    
  }
  
}


loadData()  