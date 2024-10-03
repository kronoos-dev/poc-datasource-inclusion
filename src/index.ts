import express from 'express';

import { mainRoutes } from './http/routes';

const app = express();

app.use(express.json());
app.use(mainRoutes);

app.listen(3000, () => {
  console.log(`Server is running on port ${3000}`);
});
