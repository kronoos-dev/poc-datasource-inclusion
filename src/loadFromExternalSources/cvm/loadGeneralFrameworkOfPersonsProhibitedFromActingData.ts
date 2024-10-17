import { createGeneralFrameworkOfPersonsProhibitedFromActingQueue } from "queues/createGeneralFrameworkOfPersonsProhibitedFromActing";
import { GetGeneralFrameworkOfPersonsProhibitedFromActingData } from "scraping/cvm/get_general_framework_of_persons_prohibited_from_acting_data";

async function loadGeneralFrameworkOfPersonsProhibitedFromActingData () {
  const getGeneralFrameworkOfPersonsProhibitedFromActingData =
    new GetGeneralFrameworkOfPersonsProhibitedFromActingData();

  const generalFrameworkOfPersonsProhibitedFromActingData =
    await getGeneralFrameworkOfPersonsProhibitedFromActingData.execute();

  console.log(generalFrameworkOfPersonsProhibitedFromActingData);

  generalFrameworkOfPersonsProhibitedFromActingData.map((data) => {
    createGeneralFrameworkOfPersonsProhibitedFromActingQueue.add(data);
  });

}

export { loadGeneralFrameworkOfPersonsProhibitedFromActingData };

