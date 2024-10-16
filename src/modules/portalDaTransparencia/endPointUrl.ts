enum EndpointUrlEnum {
  AUXILIO_BRASIL = '/auxilio-brasil-por-municipio',
  NOVO_BOLSA_FAMILIA = '/novo-bolsa-familia-por-municipio',
  BOLSA_FAMILIA = '/bolsa-familia-por-municipio',
  SEGURO_DEFESO = '/seguro-defeso-beneficiario-por-municipio',
  SAFRA = '/safra-por-municipio',
  PETIT = '/peti-beneficiario-por-municipio',
  BPC = '/bpc-beneficiario-por-municipio',
  AUXILIO_EMERGENCIAL = '/auxilio-emergencial-beneficiario-por-municipio',
}

type EndpointUrlEnumStrings = keyof typeof EndpointUrlEnum;


export { EndpointUrlEnum, EndpointUrlEnumStrings };
