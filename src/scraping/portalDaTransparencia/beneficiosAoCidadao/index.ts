import 'dotenv/config';

import { getDateTimeFromString } from '@utils/dateParse';
import { handleFindBenefitAvailableDateRange } from '@utils/gov/gov.utils';
import { getMunicipios } from '@utils/ibgeData';

type SearchItemType = {
  availableDate: string;
  codigoIbge: number
} 

class GetBeneficioAoCidadaoData {

  constructor (
    private startDate: string
  ) {}
  /**
    A fim de garantir a estabilidade do ambiente, os seguintes limites são definidos:
    
    De 00:00 às 06:00: até 700 requisições por minuto
    Nos demais horários: 400 requisições por minuto
    APIs restritas: 180 requisições por minuto.  

    referência: https://portaldatransparencia.gov.br/api-de-dados/
  */
  // https://api.portaldatransparencia.gov.br/swagger-ui/index.html#/Benef%C3%ADcios

  async execute() {
    const availableDates = handleFindBenefitAvailableDateRange(getDateTimeFromString(this.startDate))
    const listaMunicipios = await getMunicipios()
      
    let itemsToSearch: SearchItemType[] = []
    listaMunicipios.forEach((municipioData) => {
      const { codigo: codigoIbge } = municipioData

      // https://www.ibge.gov.br/explica/codigos-dos-municipios.php#DF
      availableDates.map(( availableDate ) => {
        itemsToSearch.push({ availableDate, codigoIbge })
      })
    })
    
    return itemsToSearch  
  }
}
  
export { GetBeneficioAoCidadaoData };
