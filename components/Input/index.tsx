

import React, { useRef, useEffect } from 'react'
import { TextInput } from 'react-native-gesture-handler'
import { StyleSheet, ViewStyle, StyleProp, TextStyle, Keyboard } from 'react-native'

import { faded, primary } from './../../styles/colors'

interface Props {
  placeholder?: string;
  onFocus?: () => void;
  style?: StyleProp<TextStyle>;
}

function Input({
  placeholder,
  style,
  onFocus = (() => {})
}: Props) {

  const input = useRef(null)

  const blur = () => {
    if (input.current)
      input.current.blur()
  }

  Keyboard.addListener('keyboardDidHide', blur)

  useEffect(() => {
    Keyboard.addListener('keyboardDidHide', blur)
    return () => Keyboard.removeListener('keyboardDidHide', blur)
  }, [])
  
  return (
    <TextInput
      ref={input}
    
      style={[s.Input, style]}
      placeholder={placeholder}
      placeholderTextColor={faded}
      selectionColor={primary}

      onFocus={onFocus}
    />
  )
}

const s = StyleSheet.create({
  Input: {
    width: '100%',
    height: 42,
    paddingLeft: 16,
    color: '#fff',
    borderColor: 'white',
    borderWidth: 3,
    borderRadius: 8,
  },
})

export default Input
