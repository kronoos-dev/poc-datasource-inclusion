import { createDeliberationsQueue } from "queues/createDeliberations";
import { GetJudgedSanctioningProceedingsData } from "scraping/cvm/get_sanctioning_proceedings_judged_data";

class LoadJudgedSanctioningProceedingsData {
  async execute() {
    const getJudgedSanctioningProceedingsData =
      new GetJudgedSanctioningProceedingsData();

    const judgedSanctioningProceedingsData =
      await getJudgedSanctioningProceedingsData.execute({});

    console.log(judgedSanctioningProceedingsData);

    judgedSanctioningProceedingsData.map((data) => {
      createDeliberationsQueue.add(data);
    });
  }
}

export { LoadJudgedSanctioningProceedingsData };
