

import React, { useState, useContext, useEffect } from 'react'
import { View, BackHandler, Text, StyleSheet, TouchableWithoutFeedback, Keyboard, Animated } from "react-native"

import { backgroundColor } from './../styles/colors'
import Input from '../components/Input'
import { animateProperty } from '../animations'
import { ToastContext } from '../contexts/toast'

function Authentication() {

  const [isFocused, setFocus] = useState(false)
  
  const dismiss = () => setFocus(false)

  Keyboard.addListener('keyboardDidHide', dismiss)

  useEffect(() => {
    Keyboard.addListener('keyboardDidHide', dismiss)
    return () => Keyboard.removeListener('keyboardDidHide', dismiss)
  }, [])

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        if (isFocused) {
          setFocus(false)
          Keyboard.dismiss()
        }
      }}
    >
      <View style={s.Auth}>
        <Animated.View style={[
          s.Wrapper,
          {
            marginTop: animateProperty(isFocused ? 90 : 190, 300)
          },
        ]}>

          <Input
            style={s.marginTop}
            placeholder="Nome de usuário:"
            onFocus={() => setFocus(true)}
            />
          <Input
            style={s.marginTop}
            placeholder="E-mail:"
            onFocus={() => setFocus(true)}
            />
          <Input
            style={s.marginTop}
            placeholder="Senha:"
            onFocus={() => setFocus(true)}
          />

        </Animated.View>
      </View>
    </TouchableWithoutFeedback>
  )
}

const s = StyleSheet.create({
  Auth: {
    backgroundColor,
    height: '100%',
    alignItems: 'center',
  },
  Wrapper: {
    height: 30,
    width: 268,
  },
  marginTop: {
    marginTop: 12,
  },
})

export default Authentication
