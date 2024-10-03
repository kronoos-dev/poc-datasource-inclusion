import { PrismaClient } from '@prisma/client';
import express, { Request, Response } from 'express';
import { getDateTimeFromString } from './utils/dateParse';

const app = express();
const prisma = new PrismaClient();

app.use(express.json());

app.get('/ceeps', async (req: Request, res: Response) => {
  const ceeps = await prisma.ceep_datasource.findMany()
  res.json(ceeps);
});

app.post('/ceeps', async (req, res) => {
  try {
    const {
      cnpj,
      corporateName,
      sanctionDescription,
      sanctionDate,
      leeniencyAgreement,
      disagreementDeal
    } = req.body;
    const newCeep = await prisma.ceep_datasource.create({
      data: {
        cnpj,
        corporateName,
        sanctionDescription,
        sanctionDate: getDateTimeFromString(sanctionDate),
        leeniencyAgreement,
        disagreementDeal
      },
    });
    res.json(newCeep);
  } catch (error) {
    res.json({
      error
    })
  }
});

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
