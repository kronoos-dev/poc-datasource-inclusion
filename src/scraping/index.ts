import { GetCelebratedDealsData } from "./cgu/get_celebrated_deals"

async function scrapeData() {
  // CVM
  // const getJudgedSanctioningProcessesData = new GetJudgedSanctioningProcessesData()
  
  // PGFN
  // const getGeneralActiveDebtData = new GetGeneralActiveDebtData()

  // CEEP
  // const getCeepData = new GetCeepData()
  
  // Portal da transparência
  // -> Beneficios ao cidadão
  // const getAuxilioBrasilData = new GetAuxilioBrasilData()
  
  // CGU  
  const getCelebratedDealsData = new GetCelebratedDealsData()
  

  try {
    // const judgedSanctioningProcessesData = await getJudgedSanctioningProcessesData.execute({});
    // const ceepData = await getCeepData.execute()
    // const generalActiveDebtData = await getGeneralActiveDebtData.execute()
    // const auxilioBrasilData = await getAuxilioBrasilData.execute()
    const celebratedDealsData = await getCelebratedDealsData.execute()

    //TODO, salvar dados
    // console.log('judgedSanctioningProcessesData:', judgedSanctioningProcessesData)
    // console.log('ceepData:', ceepData)
    // console.log('generalActiveDebtData:', generalActiveDebtData)
    // console.log('auxilioBrasilData:', auxilioBrasilData)
    console.log('celebratedDealsData:', celebratedDealsData)
  } catch (error) {
    throw new Error(error as any)
  }
}

scrapeData()