import { GetCeepData } from "./ceep/get_ceep_data";
import { GetJudgedSanctioningProcessesData } from "./cvm/get_judged_sanctioning_processes_data";

async function scrapeData() {
  // CVM
  const getJudgedSanctioningProcessesData = new GetJudgedSanctioningProcessesData()
  
  // CEEP
  const getCeepData = new GetCeepData()

  try {
    const judgedSanctioningProcessesData = await getJudgedSanctioningProcessesData.execute({});
    const ceepData = await getCeepData.execute()

    //TODO, salvar dados
    // console.log('judgedSanctioningProcessesData:', judgedSanctioningProcessesData)
    // console.log('ceepData:', ceepData)
  } catch (error) {
    throw new Error(error as any)
  }
}

scrapeData()