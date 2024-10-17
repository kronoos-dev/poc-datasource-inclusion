import { createCelebratedDealsQueue } from "queues/createCelebratedDeals";
import { GetCelebratedDealsData } from "scraping/cgu/get_celebrated_deals";

class LoadCelebratedDealsData {
  async execute() {
    const getCelebratedDealsData = new GetCelebratedDealsData();

    const celebratedDealsData = await getCelebratedDealsData.execute();

    console.log(celebratedDealsData);

    celebratedDealsData.map((data) => {
      createCelebratedDealsQueue.add(data);
    });
  }
}

export { LoadCelebratedDealsData };
