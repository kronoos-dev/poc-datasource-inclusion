import 'dotenv/config';

import { getDateTimeFromString } from '@utils/dateParse';
import { handleFindBenefitAvailableYearDateRange } from '@utils/gov/gov.utils';

type SearchItemType = {
  mesExtratoInicio: string;
  mesExtratoFim: string
} 

class GetCartoesData {

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
    const availableDates = handleFindBenefitAvailableYearDateRange(getDateTimeFromString(this.startDate))      
    let itemsToSearch: SearchItemType[] = []
    
    availableDates.map(( availableDate ) => {
      const { initialDate, finalDate } = availableDate

      itemsToSearch.push({
        mesExtratoInicio: initialDate,
        mesExtratoFim: finalDate
      })
    })
      
    return itemsToSearch  
  }
}
  
export { GetCartoesData };
