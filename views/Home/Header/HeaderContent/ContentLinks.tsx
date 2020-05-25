

import React, { useContext } from 'react'
import { View, Text, StyleSheet, Animated } from 'react-native'
import { primary, darkBackgroundColor } from '../../../../styles/colors'
import { TouchableNativeFeedback } from 'react-native-gesture-handler'
import { animateProperty } from '../../../../animations'
import { AuthContext } from '../../../../contexts/auth'
import { ToastContext } from '../../../../contexts/toast'

function isMenuOpened({
  isMenuOpened,
  navigation,
} : {
  isMenuOpened: boolean;
  navigation: any;
}) {

  const {sendResetPasswordEmail, signOut} = useContext(AuthContext)
  const {success, error} = useContext(ToastContext)

  const getLink = (text: string, onPress: () => void = () => {}) => (
    <TouchableNativeFeedback
      background={TouchableNativeFeedback.Ripple(primary, false)}
      useForeground={true}
      delayPressIn={0}
      delayPressOut={0}

      onPress={onPress}
    >
      <View
        style={s.Wrapper}
      >
        <Text
          style={s.Link}
        >
          {text}
        </Text>
      </View>
    </TouchableNativeFeedback>
  )

  const sendPasswordReset = async () => {
    try {
      await sendResetPasswordEmail()
      success('E-mail mandado com sucesso')
    } catch (err) {
      error('Houve algum erro ao tentar mandar o e-mail.')
    }
  }
  const changeEmail = () => {
    navigation.navigate('SignIn', {
      redirect: 'ChangeEmail',
    })
  }
  const changeDisplayName = () => {
    navigation.navigate('SignIn', {
      redirect: 'ChangeDisplayName',
    })
  }
  const logOut = () => {
    navigation.navigate('Authentication')
    signOut()
  }

  return (
    <Animated.View
      style={[
        s.Content,
        {
          opacity: animateProperty(isMenuOpened ? 1 : 0, true),
        },
      ]}
    >
      {getLink('Resetar senha', sendPasswordReset)}
      {getLink('Mudar e-mail', changeEmail)}
      {getLink('Mudar nome de usuário', changeDisplayName)}
      {getLink('Sair', logOut)}
    </Animated.View>
  )
}

const s = StyleSheet.create({
  Content: {
    top: 10,
    position: 'absolute',
    width: '100%',
  },
  Wrapper: {
    height: 33,
    paddingLeft: 28,
    backgroundColor: darkBackgroundColor,
    display: 'flex',
    justifyContent: 'center',
  },
  Link: {
    fontFamily: 'OpenSans-Semibold',
    fontSize: 16,
  },
})

export default React.memo(isMenuOpened)
