import { ceep_datasource, Prisma } from "@prisma/client";

interface ICeepsRepository {
  create( data : Prisma.ceep_datasourceCreateInput): Promise<ceep_datasource>;  
}

export { ICeepsRepository };
