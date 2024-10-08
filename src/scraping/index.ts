
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
  

  try {
    // const judgedSanctioningProcessesData = await getJudgedSanctioningProcessesData.execute({});
    // const ceepData = await getCeepData.execute()
    // const generalActiveDebtData = await getGeneralActiveDebtData.execute()
    // const auxilioBrasilData = await getAuxilioBrasilData.execute()

    //TODO, salvar dados
    // console.log('judgedSanctioningProcessesData:', judgedSanctioningProcessesData)
    // console.log('ceepData:', ceepData)
    // console.log('generalActiveDebtData:', generalActiveDebtData)
    // console.log('auxilioBrasilData:', auxilioBrasilData)
  } catch (error) {
    throw new Error(error as any)
  }
}

scrapeData()