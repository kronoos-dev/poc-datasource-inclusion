import { PrismaClient } from '@prisma/client';
import express, { Request, Response } from 'express';

const app = express();
const prisma = new PrismaClient();

app.use(express.json());

app.get('/ceeps', async (req: Request, res: Response) => {
  const ceeps = await prisma.ceep.findMany();
  res.json(ceeps);
});

app.post('/ceeps', async (req, res) => {
  const {
    cnpj,
    corporateName,
    sanctionDescription,
    sanctionDate,
    leeniencyAgreement,
    disagreementDeal
  } = req.body;
  const newCeep = await prisma.ceep.create({
    data: {
      cnpj,
      corporateName,
      sanctionDescription,
      sanctionDate,
      leeniencyAgreement,
      disagreementDeal
    },
  });
  res.json(newCeep);
});

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
