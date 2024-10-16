import axios from 'axios';


type MunicipioType = {
  municipio: string;
  codigo: number
}

async function getMunicipios() {
  try {
    const { data } = await axios.get('https://servicodados.ibge.gov.br/api/v1/localidades/municipios')

    let listMunicipios: MunicipioType[] = []

    for (const municipioData of data) {
      const { id, nome } = municipioData

      listMunicipios.push({
        codigo: id,
        municipio: nome
      })
    }

    return listMunicipios
  } catch (error:any) { 
    throw new Error(error);
  }
}

export { getMunicipios };
