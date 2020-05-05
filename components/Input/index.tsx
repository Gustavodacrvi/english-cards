

import React from 'react'
import { TextInput } from 'react-native-gesture-handler'
import { StyleSheet, ViewStyle } from 'react-native'

import { faded, primary } from './../../styles/colors'

interface Props {
  placeholder?: string;
  styles?: ViewStyle;
}

function Input({
  placeholder,
  styles = {},
}: Props) {
  return (
    <TextInput style={[s.Input, styles]}
      placeholder={placeholder}
      placeholderTextColor={faded}
      selectionColor={primary}
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
