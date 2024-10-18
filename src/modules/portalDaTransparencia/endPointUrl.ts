enum EndpointUrlEnum {
  // BENEFICIO CIDADAO
  AUXILIO_BRASIL = '/auxilio-brasil-por-municipio',
  NOVO_BOLSA_FAMILIA = '/novo-bolsa-familia-por-municipio',
  BOLSA_FAMILIA = '/bolsa-familia-por-municipio',
  SEGURO_DEFESO = '/seguro-defeso-por-municipio',
  SAFRA = '/safra-por-municipio',
  PETIT = '/peti-por-municipio',
  BPC = '/bpc-por-municipio',
  AUXILIO_EMERGENCIAL = '/auxilio-emergencial-por-municipio',

  // CARTOES
  CARTOES = '/cartoes',
}

type EndpointUrlEnumStrings = keyof typeof EndpointUrlEnum;


export { EndpointUrlEnum, EndpointUrlEnumStrings };
