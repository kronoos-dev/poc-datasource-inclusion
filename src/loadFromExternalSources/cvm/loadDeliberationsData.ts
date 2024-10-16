import { createDeliberationsQueue } from "queues/createDeliberations";
import { GetDeliberationsData } from "scraping/cvm/get_deliberations_data";

class LoadDeliberationsData {
  async execute() {
    const getDeliberationsData = new GetDeliberationsData();

    const deliberationsData = await getDeliberationsData.execute({});

    console.log(deliberationsData);

    deliberationsData.map((data) => {
      createDeliberationsQueue.add(data);
    });
  }
}

export { LoadDeliberationsData };
