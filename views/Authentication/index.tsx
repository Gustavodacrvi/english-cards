

import React, { useState, useEffect, useContext } from 'react'
import { View, StyleSheet, TouchableWithoutFeedback, Keyboard, Animated, Text } from "react-native"

import { backgroundColor, primary } from '../../styles/colors'
import InputComponent from '../../components/Input'
import { animateProperty } from '../../animations'
import Button from '../../components/Button'

import AuthHeader from './AuthHeader'

import { AuthContext } from '../../contexts/auth'
import { ToastContext } from '../../contexts/toast'
import FormWrapper from './FormWrapper'

function Authentication({navigation}) {

  const [isLoading, setLoading] = useState(false)

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [email, setEmail] = useState("")
  const [isLogin, setLogin] = useState(true)

  const {data, user, signIn, signUp} = useContext(AuthContext)
  const {pushToast, error, success} = useContext(ToastContext)

  console.log('data', data)
  console.log('user', user)
  
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
    <FormWrapper
      margin={isLogin ? -70 : -128}
    >
      {({moveFormUp, isFormUp}) => {

        return (
          <View>
            <AuthHeader
              isLogin={isLogin}
              setLogin={!isFormUp ? setLogin : () => {}}
            />

            <Animated.View
              style={
                {
                  zIndex: -1,
                  transform: [
                    {
                      translateY: animateProperty(isLogin ? -60 : 0, true)
                    },
                  ],
                }
              }
            >
              <InputComponent
                style={s.marginTop}
                placeholder="Nome de usuário:"
                onFocus={() => moveFormUp(true)}
                value={username}
                onChangeText={setUsername}
              />
            </Animated.View>
            <Animated.View
              style={
                {
                  transform: [
                    {
                      translateY: animateProperty(isLogin ? -60 : 0, true),
                    }
                  ]
                }
              }
            >
              <InputComponent
                style={s.marginTop}
                placeholder="E-mail:"
                onFocus={() => moveFormUp(true)}
                value={email}
                onChangeText={setEmail}
                />
              <InputComponent
                style={s.marginTop}
                placeholder="Senha:"
                password={true}
                onFocus={() => moveFormUp(true)}
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
              {
                isLogin ? 
                  <Text
                    style={{
                      textAlign: 'right',
                      color: primary,
                    }}
                    onPress={() => navigation.navigate('ResetPassword')}
                  >
                    Esqueceu a senha?
                  </Text>
                :
                  <Text>
                    Ao criar a conta você concorda com os <Text
                      style={{
                        color: primary,
                      }}
                      onPress={() => navigation.navigate('Terms')}
                    >
                      Termos de uso 
                    </Text> e a <Text
                      style={{
                        color: primary,
                      }}
                      onPress={() => navigation.navigate('Privacy')}
                    >
                      Política de privacidade
                    </Text>.
                  </Text>
              }
            </Animated.View>
          </View>
        )
      }}
    </FormWrapper>
  )
}

const s = StyleSheet.create({
  marginTop: {
    marginTop: 12,
  },
})

export default React.memo(Authentication)
