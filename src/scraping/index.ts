import { GetFgtsDebtData } from "./pgfn/get_fgts_debt_data";

async function scrapeData() {
  // CVM
  // const getJudgedSanctioningProcessesData =
  //   new GetJudgedSanctioningProcessesData();

  // const getGeneralFrameworkOfDisallowedPersonsData =
  //   new GetGeneralFrameworkOfDisallowedPersonsData();

  // const getGeneralFrameworkOfPersonsProhibitedFromActingData =
  //   new GetGeneralFrameworkOfPersonsProhibitedFromActingData();

  // const getDeliberationsData = new GetDeliberationsData();

  // PGFN
  // const getGeneralActiveDebtData = new GetGeneralActiveDebtData()
  const getFgtsDebtData = new GetFgtsDebtData()

  // CEEP
  // const getCeepData = new GetCeepData()

  // Portal da transparência
  // -> Beneficios ao cidadão
  // const getAuxilioBrasilData = new GetAuxilioBrasilData()

  // CGU
  //const getCelebratedDealsData = new GetCelebratedDealsData()

  try {
    // const judgedSanctioningProcessesData = await getJudgedSanctioningProcessesData.execute({});
    // const deliberationsData = await deliberationsData.execute({});
    // const ceepData = await getCeepData.execute()
    // const generalActiveDebtData = await getGeneralActiveDebtData.execute()
    const fgtsDebtData = await getFgtsDebtData.execute()
    // const auxilioBrasilData = await getAuxilioBrasilData.execute()
    //const celebratedDealsData = await getCelebratedDealsData.execute();

    //TODO, salvar dados
    console.log("fgtsDebtData:", fgtsDebtData);
    // console.log('ceepData:', ceepData)
    // console.log('generalActiveDebtData:', generalActiveDebtData)
    // console.log('auxilioBrasilData:', auxilioBrasilData)
    //console.log("celebratedDealsData:", celebratedDealsData);
  } catch (error) {
    throw new Error(error as any);
  }
}

scrapeData();
