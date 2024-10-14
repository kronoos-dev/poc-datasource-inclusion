import { LoadCeepData } from "./ceep/loadCeepData"

function loadData() {
  try {
    new LoadCeepData()
      .execute() 
  } catch (error) {
    
  }
  
}


loadData() 