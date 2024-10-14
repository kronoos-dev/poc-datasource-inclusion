function removeSeparatorCnpj(value: string) {
  return value
  .replace('/', '')
  .replace('-', '')
  .replace('.', '')
  .replace('.', '')
}

export { removeSeparatorCnpj }
