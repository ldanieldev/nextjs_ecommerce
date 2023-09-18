import { appLocale } from '@/constants'

export function toDisplayPrice(number: number) {
  return new Intl.NumberFormat(appLocale, {
    minimumFractionDigits: 2,
    style: 'currency',
    currency: 'USD',
    currencyDisplay: 'narrowSymbol',
  }).format(number)
}

export function toDisplayDate(date: Date) {
  return date.toLocaleDateString(appLocale)
}

export function toDisplayDateTime(date: Date) {
  return date.toLocaleString(appLocale)
}

export function toDisplayTime(date: Date) {
  return date.toLocaleTimeString(appLocale)
}

export function getInitials(fullName: string) {
  const allNames = fullName.trim().split(' ')
  return allNames.reduce((acc, curr, index) => {
    if (index === 0 || index === allNames.length - 1) {
      acc = `${acc}${curr.charAt(0).toUpperCase()}`
    }
    return acc
  }, '')
}
