import {
  contractExecutionsAndCompetitionsPenalties,
  Prisma,
} from "@prisma/client";

interface IContractExecutionsAndCompetitionsPenaltiesRepository {
  create(
    data: Prisma.contractExecutionsAndCompetitionsPenaltiesCreateInput
  ): Promise<contractExecutionsAndCompetitionsPenalties>;
  find(): Promise<contractExecutionsAndCompetitionsPenalties[]>;
}

export { IContractExecutionsAndCompetitionsPenaltiesRepository };
