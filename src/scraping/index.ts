import { GetCelebratedDealsData } from "./cgu/get_celebrated_deals";
import { GetGeneralFrameworkOfDisallowedPersonsData } from "./cvm/get_general_framework_of_disallowed_persons_data";
import { GetJudgedSanctioningProcessesData } from "./cvm/get_judged_sanctioning_processes_data";

async function scrapeData() {
  // CVM
  // const getJudgedSanctioningProcessesData =
  //   new GetJudgedSanctioningProcessesData();

  const getGeneralFrameworkOfDisallowedPersonsData =
    new GetGeneralFrameworkOfDisallowedPersonsData();

  // PGFN
  // const getGeneralActiveDebtData = new GetGeneralActiveDebtData()

  // CEEP
  // const getCeepData = new GetCeepData()

  // Portal da transparência
  // -> Beneficios ao cidadão
  // const getAuxilioBrasilData = new GetAuxilioBrasilData()

  // CGU
  //const getCelebratedDealsData = new GetCelebratedDealsData()

  try {
    // const judgedSanctioningProcessesData =
    //   await getJudgedSanctioningProcessesData.execute({});
    const generalFrameworkOfDisallowedPersonsData =
      await getGeneralFrameworkOfDisallowedPersonsData.execute();
    // const ceepData = await getCeepData.execute()
    // const generalActiveDebtData = await getGeneralActiveDebtData.execute()
    // const auxilioBrasilData = await getAuxilioBrasilData.execute()
    //const celebratedDealsData = await getCelebratedDealsData.execute();

    //TODO, salvar dados
    console.log(
      "generalFrameworkOfDisallowedPersonsData:",
      generalFrameworkOfDisallowedPersonsData
    );
    // console.log('ceepData:', ceepData)
    // console.log('generalActiveDebtData:', generalActiveDebtData)
    // console.log('auxilioBrasilData:', auxilioBrasilData)
    //console.log("celebratedDealsData:", celebratedDealsData);
  } catch (error) {
    throw new Error(error as any);
  }
}

scrapeData();
