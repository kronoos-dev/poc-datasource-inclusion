import { GetCeepData } from "./ceep/get_ceep_data";
import { GetJudgedSanctioningProcessesData } from "./cvm/get_judged_sanctioning_processes_data";
import { GetGeneralActiveDebtData } from "./pgfn/get_general_active_debt_data";

async function scrapeData() {
  // CVM
  const getJudgedSanctioningProcessesData = new GetJudgedSanctioningProcessesData()
  
  // CEEP
  const getCeepData = new GetCeepData()
  
  // PGFN
  const getGeneralActiveDebtData = new GetGeneralActiveDebtData()

  try {
    const judgedSanctioningProcessesData = await getJudgedSanctioningProcessesData.execute({});
    const ceepData = await getCeepData.execute()
    const generalActiveDebtData = await getGeneralActiveDebtData.execute()

    //TODO, salvar dados
    console.log('judgedSanctioningProcessesData:', judgedSanctioningProcessesData)
    console.log('ceepData:', ceepData)
    console.log('generalActiveDebtData:', generalActiveDebtData)
  } catch (error) {
    throw new Error(error as any)
  }
}

scrapeData()