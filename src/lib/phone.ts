/** Indian mobiles are 10 digits starting 6–9; other countries get a looser 6–14 digit check. */
export function isValidWhatsapp(countryCode: string, number: string) {
  const digits = number.replace(/\D/g, '')
  if (countryCode.replace(/\D/g, '') === '91') return /^[6-9]\d{9}$/.test(digits)
  return /^\d{6,14}$/.test(digits)
}

/** "+91" + "98765 43210" → "+919876543210" */
export function formatWhatsapp(countryCode: string, number: string) {
  return `+${countryCode.replace(/\D/g, '')}${number.replace(/\D/g, '')}`
}
