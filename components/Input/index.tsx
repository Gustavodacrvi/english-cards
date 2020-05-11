

import React, { useRef, useEffect } from 'react'
import { TextInput } from 'react-native-gesture-handler'
import { StyleSheet, StyleProp, TextStyle, Keyboard, View } from 'react-native'

import { faded, primary } from './../../styles/colors'

import { inputHandler } from '../../utils'

interface Props {
  placeholder?: string;
  value?: string;
  password?: boolean;
  onFocus?: () => void;
  onChangeText?: (value: string) => void;
  style?: StyleProp<TextStyle>;
}

function Input({
  placeholder,
  style,
  value = "",
  password = false,
  onFocus = (() => {}),
  onChangeText = (() => {}),
}: Props) {

  const input = useRef(null)

  inputHandler(input)

  return (
    <View style={[s.Wrapper, style]}>
      <TextInput style={s.Input}
        autoFocus={false}
      
        ref={input}
      
        value={value}
        placeholder={placeholder}
        placeholderTextColor={faded}
        selectionColor={primary}
        secureTextEntry={password}
  
        onFocus={onFocus}
        onChangeText={onChangeText}
      />
    </View>
  )
}

const s = StyleSheet.create({
  Wrapper: {
    width: '100%',
    height: 48,
    paddingLeft: 16,
    borderColor: 'white',
    borderWidth: 3,
    borderRadius: 8,
  },
  Input: {
    color: '#fff',
    height: '100%',
    fontSize: 15,
  },
})

export default React.memo(Input)
