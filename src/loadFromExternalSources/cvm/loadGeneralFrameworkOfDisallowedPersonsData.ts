import { createDeliberationsQueue } from "queues/createDeliberations";
import { GetGeneralFrameworkOfDisallowedPersonsData } from "scraping/cvm/get_general_framework_of_disallowed_persons_data";

class LoadGeneralFrameworkOfDisallowedPersonsData {
  async execute() {
    const getGeneralFrameworkOfDisallowedPersonsData =
      new GetGeneralFrameworkOfDisallowedPersonsData();

    const generalFrameworkOfDisallowedPersonsData =
      await getGeneralFrameworkOfDisallowedPersonsData.execute();

    console.log(generalFrameworkOfDisallowedPersonsData);

    generalFrameworkOfDisallowedPersonsData.map((data) => {
      createDeliberationsQueue.add(data);
    });
  }
}

export { LoadGeneralFrameworkOfDisallowedPersonsData };
