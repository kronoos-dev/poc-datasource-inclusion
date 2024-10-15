import { createGeneralFrameworkOfDisallowedPersonsQueue } from "queues/createGeneralFrameworkOfDisallowedPersons";
import { GetGeneralFrameworkOfDisallowedPersonsData } from "scraping/cvm/get_general_framework_of_disallowed_persons_data";

class LoadGeneralFrameworkOfDisallowedPersonsData {
  async execute() {
    const getGeneralFrameworkOfDisallowedPersonsData =
      new GetGeneralFrameworkOfDisallowedPersonsData();

    const generalFrameworkOfDisallowedPersonsData =
      await getGeneralFrameworkOfDisallowedPersonsData.execute();

    console.log(generalFrameworkOfDisallowedPersonsData);

    generalFrameworkOfDisallowedPersonsData.map((data) => {
      createGeneralFrameworkOfDisallowedPersonsQueue.add(data);
    });
  }
}

export { LoadGeneralFrameworkOfDisallowedPersonsData };
