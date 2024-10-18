import { createBullBoard } from 'bull-board';
import { BullAdapter } from 'bull-board/bullAdapter'; // Updated import
import express from 'express';



import { createCeepQueue } from 'queues/createCeep';
import { createDeliberationsQueue } from 'queues/createDeliberations';
import { createGeneralFrameworkOfDisallowedPersonsQueue } from 'queues/createGeneralFrameworkOfDisallowedPersons';
import { createGeneralFrameworkOfPersonsProhibitedFromActingQueue } from 'queues/createGeneralFrameworkOfPersonsProhibitedFromActing';
import { createJudgedSanctioningProceedingsQueue } from 'queues/createJudgedSanctioningProceedings';
import { createLeaveTemporaryPenaltiesQueue } from 'queues/createLeaveTemporaryPenalties';
import { portalDaTransparenciaQueue } from 'queues/portalDaTransparenciaDataInclusion';
import { mainRoutes } from './http/routes';

const app = express();

// Add BullBoard

const { router: bullBoardRouter } = createBullBoard([
  new BullAdapter(portalDaTransparenciaQueue),
  new BullAdapter(createCeepQueue),
  new BullAdapter(createDeliberationsQueue),
  new BullAdapter(createGeneralFrameworkOfDisallowedPersonsQueue),
  new BullAdapter(createGeneralFrameworkOfPersonsProhibitedFromActingQueue),
  new BullAdapter(createJudgedSanctioningProceedingsQueue),
  new BullAdapter(createLeaveTemporaryPenaltiesQueue),
]);
app.use('/admin/queues', bullBoardRouter);  // Monitor queues at /admin/queues

app.use(express.json());
app.use(mainRoutes);

app.listen(3000, () => {
  console.log(`Server is running on port ${3000}`);
});
