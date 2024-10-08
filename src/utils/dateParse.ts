function getDateTimeFromString(value: string): Date {
  const [ yearDate, monthDate, dayDate ] = value.split("/");

  const dateObject = new Date(+dayDate, Number(monthDate) - 1, +yearDate); 

  return dateObject
}

export { getDateTimeFromString };
