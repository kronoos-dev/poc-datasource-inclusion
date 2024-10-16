enum EndpointUrlEnum {
  AUXILIO_BRASIL = '/auxilio-brasil-por-municipio',
  BOLSA_FAMILIA = '/auxilio-brasil-por-municipio',
}

type EndpointUrlEnumStrings = keyof typeof EndpointUrlEnum;


export { EndpointUrlEnum, EndpointUrlEnumStrings };
