import { createGeneralFrameworkOfPersonsProhibitedFromActingQueue } from "queues/createGeneralFrameworkOfPersonsProhibitedFromActing";
import { GetGeneralFrameworkOfPersonsProhibitedFromActingData } from "scraping/cvm/get_general_framework_of_persons_prohibited_from_acting_data";

class LoadGeneralFrameworkOfPersonsProhibitedFromActingData {
  async execute() {
    const getGeneralFrameworkOfPersonsProhibitedFromActingData =
      new GetGeneralFrameworkOfPersonsProhibitedFromActingData();

    const generalFrameworkOfPersonsProhibitedFromActingData =
      await getGeneralFrameworkOfPersonsProhibitedFromActingData.execute();

    console.log(generalFrameworkOfPersonsProhibitedFromActingData);

    generalFrameworkOfPersonsProhibitedFromActingData.map((data) => {
      createGeneralFrameworkOfPersonsProhibitedFromActingQueue.add(data);
    });
  }
}

export { LoadGeneralFrameworkOfPersonsProhibitedFromActingData };
