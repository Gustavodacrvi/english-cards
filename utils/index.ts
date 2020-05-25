import { Keyboard } from "react-native"
import { useEffect } from "react"
import mom from 'moment-timezone'
import { LingueTranslationInterface, SimpleTranslationData, WordInterface } from "../interfaces"
import fire from '@react-native-firebase/firestore'

const TOD = mom().startOf('day')
const TOD_STR = mom().format('Y-M-D mm')

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

export const getHumanReadable = memoize((date: string): string => {

  const m = mom(date, 'Y-M-D mm', true).startOf('day')

  if (!m.isValid())
    throw `"date" is not on the format "Y-M-D mm", utils/index.ts, getHumanReadable: date: ${date}`

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
    return `Daqui ${Math.abs(weeksDiff)} semanas`
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

export const getNextReviewDate = memoize(({
  lastReview,
  reviewNumber,
}: {
  lastReview: string | null; // Y-M-D mm
  reviewNumber: null | number;
}): string => {

  if (!lastReview)
    return TOD.clone().add(1, 'days').format('Y-M-D mm')

  const last = mom(lastReview, 'Y-M-D mm', true)

  if (!last.isValid())
    throw `"lastReview" property isn't valid, the data might be corrupted; lastReview: "${lastReview}"`

  if (reviewNumber === null)
    throw `"reviewNumber" should NOT be null when lastReview isn't null, when updating the "lastReview" property, make sure you're updating "reviewNumber" too; lastReview: ${lastReview}, reviewNumber: ${reviewNumber}`

  return last.add({

    0: 1,
    1: 4,
    2: 7,
    3: 21,
    4: 64,
    5: 128,
    6: 250,
    7: 364,
    
  }[reviewNumber] || 364, 'days').format('Y-M-D mm')
})

export const getWordName = ({api, data}: WordInterface) => {
  switch (api) {
    case 'linguee': {
      return (data as LingueTranslationInterface).query 
    }
    case 'simple': {
      return (data as SimpleTranslationData).term
    }
  }
}

export const forgotWord = memoize(({
  lastReview,
  reviewNumber,
}: WordInterface) => {
  return mom(
    getNextReviewDate({lastReview, reviewNumber}), 'Y-M-D mm'
  ).isBefore(TOD, 'day')
})

export const uid = (): string => fire().collection('random').doc().id

export const filterList = (oldSearch: string, newSearch: string, oldTab: 'saved' | 'forgotten' | 'learned', newTab: 'saved' | 'forgotten' | 'learned', list: WordInterface[], force: boolean) => {
  let arr = list.slice()
  
  if (force || newSearch !== oldSearch)
    arr = !newSearch ? list : list.filter(w => getWordName(w).toLowerCase().includes(newSearch))

  if (newTab !== null && (force || newTab !== oldTab))
    switch (newTab) {
      case 'saved': {
        arr = arr.filter(w => !w.lastReview)
        break
      }
      case 'learned': {
        arr = arr.filter(w => w.lastReview && !forgotWord(w))
        break
      }
      case 'forgotten': {
        arr = arr.filter(w => w.lastReview && forgotWord(w))
        break
      }
    }

  return arr

}

export const sortList = (oldSort: 'alphabetical' | 'creation' | 'reviews', newSort: 'alphabetical' | 'creation' | 'reviews', list: WordInterface[], force: boolean) => {

  if (force || newSort !== oldSort)
  switch (newSort) {
    case 'alphabetical': {
      list.sort((a, b) => getWordName(a).toLowerCase().localeCompare(getWordName(b).toLowerCase()))
      break
    }
    case 'creation': {
      list.sort((word1, word2) => {
        const a = mom(word1.creationDate, 'Y-M-D mm')
        const b = mom(word2.creationDate, 'Y-M-D mm')

        if (a.isSame(b, 'day')) return 0
        if (a.isAfter(b, 'day')) return -1
        if (b.isAfter(a, 'day')) return 1
      })
      break
    }
    default: {
      list.sort((word1, word2) => {
        const a = mom(getNextReviewDate(word1), 'Y-M-D mm')
        const b = mom(getNextReviewDate(word2), 'Y-M-D mm')

        if (a.isSame(b, 'day')) return 0
        if (a.isAfter(b, 'day')) return -1
        if (b.isAfter(a, 'day')) return 1
      })
      break
    }
  }

  return list
}
