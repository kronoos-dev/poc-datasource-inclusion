import { createLeaveTemporaryPenaltiesQueue } from "queues/createLeaveTemporaryPenalties";
import { GetLeaveTemporaryPenaltiesData } from "scraping/cvm/get_leave_temporary_penalties_data";

class LoadLeaveTemporaryPenaltiesData {
  async execute() {
    const getleaveTemporaryPenalties = new GetLeaveTemporaryPenaltiesData();

    const leaveTemporaryPenaltiesData =
      await getleaveTemporaryPenalties.execute();

    console.log(leaveTemporaryPenaltiesData);

    leaveTemporaryPenaltiesData.map((data) => {
      createLeaveTemporaryPenaltiesQueue.add(data);
    });
  }
}

export { LoadLeaveTemporaryPenaltiesData };
