

import React, { useState, useContext, useEffect } from 'react'
import { View, BackHandler, Text, StyleSheet, TouchableWithoutFeedback, Keyboard, Animated } from "react-native"

import { backgroundColor } from '../../styles/colors'
import InputComponent from '../../components/Input'
import { animateProperty } from '../../animations'
import Button from '../../components/Button'

import AuthHeader from './AuthHeader'

function Authentication() {

  const [isFocused, setFocus] = useState(false)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [email, setEmail] = useState("")
  const [isLogin, setLogin] = useState(true)
  
  const dismiss = () => setFocus(false)

  Keyboard.addListener('keyboardDidHide', dismiss)

  useEffect(() => {
    Keyboard.addListener('keyboardDidHide', dismiss)
    return () => Keyboard.removeListener('keyboardDidHide', dismiss)
  }, [])

  useEffect(() => {
    Keyboard.dismiss()

    setUsername("")
    setPassword("")
    setEmail("")
    
  }, [isLogin])

  const isButtonBlocked = 
    (
      isLogin &&
      (
        !email.length ||
        !password.length
      )
    ) ||
    (
      !isLogin &&
      (
        !username.length ||
        !email.length ||
        !password.length
      )
    )

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        setFocus(false)
        Keyboard.dismiss()
      }}
    >
      <View style={s.Auth}>
        <Animated.View style={[
          s.Wrapper,
          {
            transform: [
              {
                translateY: animateProperty(isFocused ? -128 : 0, 200, true),
              }
            ],
          },
        ]}>

          <AuthHeader
            isLogin={isLogin}
            setLogin={!isFocused ? setLogin : () => {}}
          />

          <Animated.View
            style={
              {
                zIndex: -1,
                transform: [
                  {
                    translateY: animateProperty(isLogin ? -60 : 0, 200, true)
                  },
                ],
              }
            }
          >
            <InputComponent
              style={s.marginTop}
              placeholder="Nome de usuário:"
              onFocus={() => setFocus(true)}
              value={username}
              onChangeText={setUsername}
            />
          </Animated.View>
          <Animated.View
            style={
              {
                transform: [
                  {
                    translateY: animateProperty(isLogin ? -60 : 0, 200, true),
                  }
                ]
              }
            }
          >
            <InputComponent
              style={s.marginTop}
              placeholder="E-mail:"
              onFocus={() => setFocus(true)}
              value={email}
              onChangeText={setEmail}
              />
            <InputComponent
              style={s.marginTop}
              placeholder="Senha:"
              password={true}
              onFocus={() => setFocus(true)}
              value={password}
              onChangeText={setPassword}
            />
            <View style={s.marginTop}>
              <Button
                name={isLogin ? "Entrar" : "Criar"}
                type={isButtonBlocked ? "slides" : "white"}
                blocked={isButtonBlocked}
              />
            </View>
          </Animated.View>

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
    width: 268,
    marginTop: 150,
    position: 'relative',
    overflow: 'visible',
  },
  marginTop: {
    marginTop: 12,
  },
})

export default Authentication
