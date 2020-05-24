

import React, { useRef } from 'react'
import { View, Text, StyleSheet, Animated } from 'react-native'
import { TouchableNativeFeedback } from 'react-native-gesture-handler'
import { IconInterface } from '../../../../../interfaces'
import Icon from '../../../../../components/Icon'
import { backgroundColor, darkBackgroundColor, primary } from '../../../../../styles/colors'
import { animateProperty } from '../../../../../animations'

function Circle({
  active,
  setTab,
  icon,
  isMiddle,
} : {
  active: boolean;
  isMiddle?: boolean;
  icon: IconInterface;
  setTab: (tab: 'saved' | 'review' | 'forgotten') => void;
}) {

  const scale = useRef(new Animated.Value(0))

  return (
    <Animated.View
      style={[
        s.Circle,
        {
          marginTop: (isMiddle && -25) || 0,
          transform: [
            {
              scale: scale.current.interpolate({
                inputRange: [0, 1],
                outputRange: [1, .8],
              })
            },
          ],
        }
      ]}
    >
      <TouchableNativeFeedback
        background={TouchableNativeFeedback.Ripple('white', false)}
        useForeground={true}
        onPressIn={() => {
          Animated.timing(scale.current, {
            toValue: 1,
            duration: 150,
            useNativeDriver: true,
          }).start()
        }}
        onPressOut={() => {
          Animated.spring(scale.current, {
            toValue: 0,
            bounciness: 12,
            speed: 8,
            velocity: 30,
            useNativeDriver: true,
          }).start()
        }}
  
        onPress={() => setTab({
          saved: 'saved',
          notification: 'review',
          'notification-dash': 'forgotten',
        }[icon.icon] as any)}
      >
        <View
          style={s.Wrapper}
        >
          <Animated.View
            style={[
              s.Background,
              {
                transform: [
                  {
                    scale: animateProperty(active ? 1 : 0, true),
                  },
                ],
              },
            ]}
          ></Animated.View>
          <Animated.View
            style={s.TextWrapper}
          >
            <Text></Text>
          </Animated.View>
          <Icon
            {...icon}
            width={24}
            color={active && darkBackgroundColor}
            animate={false}
          />
        </View>
      </TouchableNativeFeedback>
    </Animated.View>
  )
}

const s = StyleSheet.create({
  Circle: {
    position: 'relative',
    borderRadius: 100,
    overflow: 'hidden',
    width: 60,
    height: 60,
  },
  Background: {
    width: 60,
    height: 60,
    borderRadius: 100,
    backgroundColor: primary,
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: -1,
  },
  Wrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 60,
    height: 60,
    backgroundColor,
  },
  TextWrapper: {
    position: 'absolute',
  },
})

export default React.memo(Circle)
