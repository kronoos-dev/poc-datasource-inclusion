import { GetCeepData } from "./ceep/get_ceep_data"

async function scrapeData() {
  const getCeepData = new GetCeepData()

  try {
    const ceepData = await getCeepData.execute()

    console.log('ceepData:', ceepData)

    //TODO, salvar dados
  } catch (error) {
    throw new Error(error as any)
  }
}

scrapeData()