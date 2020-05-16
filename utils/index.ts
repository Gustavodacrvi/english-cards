import { Keyboard } from "react-native"
import { useEffect } from "react"
import mom from 'moment-timezone'

const TOD = mom().startOf('day')

export const memoize = <T extends Function>(func: T): T => {
  const cache = {}

  return <any>function() {
    const key = JSON.stringify(arguments)
    const val = cache[key]
    
    if (val !== undefined) return val
    
    let res = func.apply(null, arguments)
    if (res === undefined)
      res = null
    cache[key] = res
    return res
  }
}

export const inputHandler = input => {
  const blur = () => {
    if (input.current)
      input.current.blur()
  }

  Keyboard.addListener('keyboardDidHide', blur)

  useEffect(() => {
    Keyboard.addListener('keyboardDidHide', blur)
    return () => Keyboard.removeListener('keyboardDidHide', blur)
  }, [])
}

export const getHumanReadable = memoize((date: string) => {

  const m = mom(date, 'Y-M-D', true).startOf('day')

  if (!m.isValid())
    throw `"date" is not on the format "Y-M-D", utils/index.ts, getHumanReadable: date: ${date}`

  if (m.isSame(TOD, 'day'))
    return 'Hoje'
  if (m.isSame(TOD.clone().subtract(1, 'day'), 'day'))
    return 'Ontém'
  if (m.isSame(TOD.clone().subtract(2, 'day'), 'day'))
    return 'Antes de ontém'
  if (m.isSame(TOD.clone().add(1, 'day'), 'day'))
    return 'Amanhã'
  if (m.isSame(TOD.clone().add(2, 'day'), 'day'))
    return 'Depois de amanhâ'

  const daysDiff = m.diff(TOD, 'days')

  if (daysDiff >= -7 && daysDiff < 0) {
    return `${Math.abs(daysDiff)} dias atrás`
  }
  if (daysDiff <= 7 && daysDiff > 0) {
    return `Daqui ${Math.abs(daysDiff)} dias`
  }

  const weeksDiff = m.diff(TOD, 'weeks')

  if (weeksDiff >= -4 && weeksDiff < 0) {
    if (Math.abs(weeksDiff) === 1)
      return '1 semana atrás'
    return `${Math.abs(weeksDiff)} semanas atrás`
  }
  if (weeksDiff <= 4 && weeksDiff > 0) {
    if (Math.abs(weeksDiff) === 1)
      return 'Daqui 1 semana'
    return `Daqui ${Math.abs(weeksDiff)} semana`
  }

  const monthsDiff = m.diff(TOD, 'months')

  if (monthsDiff >= -12 && monthsDiff < 0) {
    if (Math.abs(monthsDiff) === 1)
      return '1 mês atrás'
    return `${Math.abs(monthsDiff)} meses atrás`
  }
  if (monthsDiff <= 12 && monthsDiff > 0) {
    if (Math.abs(monthsDiff) === 1)
      return 'Daqui 1 mês'
    return `Daqui ${Math.abs(monthsDiff)} meses`
  }

  const years = m.diff(TOD, 'years')

  if (years < 0) {
    if (Math.abs(years) === 1)
      return '1 ano atrás'
    return `${Math.abs(years)} anos atrás`
  }
  if (Math.abs(years) === 1)
    return 'Daqui 1 ano'
  return `Daqui ${Math.abs(years)} anos`

})
