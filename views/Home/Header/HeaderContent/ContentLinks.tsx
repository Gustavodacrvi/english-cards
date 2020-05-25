

import React from 'react'
import { View, Text, StyleSheet, Animated } from 'react-native'
import { primary, darkBackgroundColor } from '../../../../styles/colors'
import { TouchableNativeFeedback } from 'react-native-gesture-handler'
import { animateProperty } from '../../../../animations'

function isMenuOpened({
  isMenuOpened,
  navigation,
} : {
  isMenuOpened: boolean;
  navigation: any;
}) {

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

  const changeEmail = () => {
    navigation.navigate('SignIn', {
      redirect: 'ChangeEmail',
    })
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
      {getLink('Resetar senha')}
      {getLink('Mudar e-mail', changeEmail)}
      {getLink('Mudar nome de usuário')}
      {getLink('Sair')}
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
