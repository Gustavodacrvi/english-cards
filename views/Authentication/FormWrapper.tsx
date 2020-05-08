

import React, { useState, useEffect } from 'react'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'
import { Keyboard, View, Animated, StyleSheet } from 'react-native'
import { animateProperty } from '../../animations'
import { backgroundColor } from '../../styles/colors'

interface Props {
  children: any;
  margin?: number;
}

function FormWrapper({ children, margin = -128 }: Props) {

  const [isFormUp, moveFormUp] = useState(false)

  const dismiss = () => moveFormUp(false)

  useEffect(() => {
    Keyboard.addListener('keyboardDidHide', dismiss)
    return () => Keyboard.removeListener('keyboardDidHide', dismiss)
  }, [])
  
  return (
    <TouchableWithoutFeedback
    onPress={() => {
      moveFormUp(false)
      Keyboard.dismiss()
    }}
  >
    <View style={s.Auth}>
      <Animated.View style={[
        s.Wrapper,
        {
          transform: [
            {
              translateY: animateProperty(isFormUp ? margin : 0, true),
            }
          ],
        },
      ]}>
        {children({isFormUp, moveFormUp})}
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
})

export default FormWrapper
