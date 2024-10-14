import { createCeepQueue } from "queues/createCeep";
import { GetCeepData } from "scraping/ceep/get_ceep_data";

async function loadCeepData() {
  const getCeepData = new GetCeepData()

  const ceepData = await getCeepData.execute()

  console.log(ceepData)

  ceepData.map(( data ) => {
    createCeepQueue.add(data)
  })
}


export { loadCeepData };
