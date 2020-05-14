

import React, { useState } from 'react'
import { View, StyleSheet, Animated } from 'react-native'
import { TouchableNativeFeedback } from 'react-native-gesture-handler'
import { primary, backgroundColor } from '../../../styles/colors'
import Icon from '../../../components/Icon'
import { animateProperty } from '../../../animations'

interface Props {
  active: boolean;
}

function ActionButton({active}: Props) {
  const [pressing, setPress] = useState(false)

  const onPress = () => {

  }
  
  return (
    <View
      style={s.ActionButton}
    >
      <Animated.View
        style={[
          s.Wrapper,
          {
            transform: [
              {
                translateX: animateProperty(!active ? 80 : 0, true)
              },
            ],
          },
        ]}
      >
        <Animated.View
          style={[
            s.Ball,
            {
              transform: [
                {
                  scale: animateProperty(pressing ? .9 : 1, true)
                }
              ]
            },
          ]}
        >
          <TouchableNativeFeedback
            background={TouchableNativeFeedback.Ripple('white', false)}
            useForeground={true}
            delayPressIn={0}
            delayPressOut={0}

            onPress={onPress}
            onPressIn={() => setPress(true)}
            onPressOut={() => setPress(false)}
          >
            <View
              style={s.IconWrapper}
            >
              <Icon
                icon="plus"
                color={backgroundColor}
              />
            </View>
          </TouchableNativeFeedback>
        </Animated.View>
      </Animated.View>
    </View>
  )
}

const s = StyleSheet.create({
  ActionButton: {
    position: 'absolute',
    height: 60,
    width: 77,
    bottom: 73,
    right: 0,
  },
  Wrapper: {
    width: '100%',
    height: '100%',
    position: 'relative',
  },
  Ball: {
    position: 'absolute',
    left: 0,
    borderRadius: 80,
    width: 56,
    overflow: 'hidden',
    height: 56,
    backgroundColor: primary,
  },
  IconWrapper: {
    display: 'flex',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default React.memo(ActionButton)
