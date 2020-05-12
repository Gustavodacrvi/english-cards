

import React from 'react'
import { Animated, StyleSheet } from 'react-native'
import { primary, red } from '../../../../styles/colors'
import Icon from '../../../../components/Icon'

interface Props {
  touchX: Animated.Value;
  activeOffsetX: number;
}

function GestureBackground({touchX, activeOffsetX}: Props) {
  return (
    <>
      <Animated.View
        style={[
          s.Left,
          {
            backgroundColor: primary,
            left: 1,
            alignItems: 'flex-end',
            opacity: touchX.interpolate({
              inputRange: [0, 1],
              outputRange: [1, 0],
            }),
          }
        ]}
      >
        <Animated.View
          style={[
            s.GestureForeground,
            {
              opacity: touchX.interpolate({
                inputRange: [-(activeOffsetX  + 5), -activeOffsetX],
                outputRange: [0, 1],
              })
            },
          ]}
        ></Animated.View>
        <Icon
          icon='saved'
          color="white"
          width={24}
          animate={false}
        />
      </Animated.View>
      <Animated.View
        style={[
          s.Left,
          {
            backgroundColor: red,
            right: 1,
            opacity: touchX.interpolate({
              inputRange: [0, 1],
              outputRange: [0, 1],
            }),
          }
        ]}
      >
        <Animated.View
          style={[
            s.GestureForeground,
            {
              opacity: touchX.interpolate({
                inputRange: [activeOffsetX, activeOffsetX + 5],
                outputRange: [1, 0],
              })
            },
          ]}
        ></Animated.View>
        <Icon
          icon='trash'
          color="white"
          width={24}
          animate={false}
        />
      </Animated.View>
    </>
  )
}

const s = StyleSheet.create({
  Left: {
    position: 'absolute',
    top: 1,
    height: '98%',
    width: '98%',
    display: 'flex',
    justifyContent: 'center',
    paddingLeft: 16,
    paddingRight: 16,
    borderRadius: 8,
  },
  GestureForeground: {
    backgroundColor: 'gray',
    display: 'flex',
    justifyContent: 'center',
    paddingLeft: 16,
    paddingRight: 16,
    height: '100%',
    position: 'absolute',
    top: 0,
    width: '100%',
    borderRadius: 8,
  },
})

export default React.memo(GestureBackground)
