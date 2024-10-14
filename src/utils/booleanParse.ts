function stringPortugueseToBoolean(value: string) {
  try {
    if(value.toLowerCase() === "sim"){
      return true;
    }else if(value.toLowerCase() === "nao" || value.toLowerCase() === "não"){
      return false;
    }  else throw new Error("Valor não reconhecido");
  } catch (error) {
    throw new Error(error as any);
    
  }
}

export { stringPortugueseToBoolean };
