interface YearDateRange {
  initialDate: string
  finalDate: string
}

function getMonthString(date: Date) : string {
  const month = String(date.getMonth() + 1)
  
  return `${month.length === 1 ? '0' + month : month}` 
}

function getYearString(date: Date) : string {
  const year = String(date.getFullYear())
  
  return `${year}` 
}

function handleFindBenefitAvailableDateRange(initialdate: Date) {
  const dateRange: string[] = []
  const now = new Date()

  let date = initialdate
  while (date < now) {
    dateRange.push(`${getYearString(date)}${getMonthString(date)}`)
    date.setMonth(date.getMonth() + 1)
    
  }
  return dateRange
}

function handleFindBenefitAvailableYearDateRange(initialdate: Date) {
  const dateRange: YearDateRange[] = [] as YearDateRange[]
  const now = new Date()

  let date = initialdate
  while (date < now) {
    dateRange.push({
      initialDate: `01/${getYearString(date)}`,
      finalDate: `12/${getYearString(date)}`
    })
    date.setFullYear(date.getFullYear() + 1)
    
  }
  return dateRange
}

export { handleFindBenefitAvailableDateRange, handleFindBenefitAvailableYearDateRange }
