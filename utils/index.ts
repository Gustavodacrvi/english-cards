import { Keyboard } from "react-native"
import { useEffect } from "react"

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
