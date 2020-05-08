

import React, { useState, useEffect, useContext } from 'react'
import { View, StyleSheet, TouchableWithoutFeedback, Keyboard, Animated, Text } from "react-native"

import { backgroundColor } from '../../styles/colors'
import InputComponent from '../../components/Input'
import { animateProperty } from '../../animations'
import Button from '../../components/Button'

import AuthHeader from './AuthHeader'

import { AuthContext } from '../../contexts/auth'
import { ToastContext } from '../../contexts/toast'

function Authentication() {

  const [isFocused, setFocus] = useState(false)
  const [isLoading, setLoading] = useState(false)

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [email, setEmail] = useState("")
  const [isLogin, setLogin] = useState(true)

  const {data, user, signIn, signUp, signOut} = useContext(AuthContext)
  const {pushToast} = useContext(ToastContext)

  console.log('data', data)
  console.log('user', user)
  
  const dismiss = () => setFocus(false)

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

  const emptyFields = 
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

  const error = msg => pushToast({
    msg,
    duration: 4500,
    type: 'error',
  })
  const success = msg => pushToast({
    msg,
    duration: 4500,
    type: 'success',
  })

  const click = async () => {
    if (emptyFields) {
      error('Preencha os campos')
      return;
    }

    Keyboard.dismiss()
    setLoading(true)

    if (isLogin) {
      try {
        await signIn(email, password)
        success("Você entrou na sua conta com sucesso.")
        setLoading(false)
      } catch (err) {
        error(err)
        setLoading(false)
      }
    } else {
      try {
        await signUp(email, password, username)
        success("Você criou uma conta com sucesso!")
        setLoading(false)
        setLogin(true)
      } catch (err) {
        error(err)
        setLoading(false)
      }
    }
  }

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
                translateY: animateProperty(isFocused ? -128 : 0),
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
                    translateY: animateProperty(isLogin ? -60 : 0)
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
                    translateY: animateProperty(isLogin ? -60 : 0),
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
                type={emptyFields ? "slides" : "white"}
                click={click}
                icon={isLoading ? {
                  icon: 'loading'
                } : null}
                blocked={isLoading}
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

export default React.memo(Authentication)
