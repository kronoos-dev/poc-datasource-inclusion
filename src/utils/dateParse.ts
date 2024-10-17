// TODO, Abstrair tipo
function getDateTimeFromString(value: string, separator = "/"): Date {
  const [ yearDate, monthDate, dayDate ] = value.split(separator);

  const dateObject = new Date(+dayDate, Number(monthDate) - 1, +yearDate); 

  return dateObject
}

export { getDateTimeFromString };
