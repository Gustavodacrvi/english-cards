
import React from 'react'
import { View, StyleSheet, Text, Animated } from "react-native"
import { primary } from '../../styles/colors'
import { animateProperty } from '../../animations'

function Slide1({slide}: {slide: 0 | 1 | 2 | 3}) {
  
  const active = slide === 0

  return (
    <View style={s.Wrapper}>
      <Animated.Text
        style={[
          s.Bottom,
          s.Hero,
          {
            transform: [
              {
                translateX: animateProperty(active ? 0 : -325, 150, true),
              }
            ]
          }
        ]}
      >
        English Cards
      </Animated.Text>
      <Animated.Text
        style={[
          s.Bottom,
          s.Normal,
          {
            transform: [
              {
                translateX: animateProperty(active ? 0 : -325, 150, true),
              }
            ]
          }
        ]}
      >
        Aprenda e revise palavras em inglês usando Flash Cards!
      </Animated.Text>
    </View>
  )
}

const s = StyleSheet.create({
  Wrapper: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-end',
    bottom: 86,
    paddingLeft: 30,
    paddingRight: 30,
  },
  Bottom: {
    marginBottom: 40,
  },
  Hero: {
    fontSize: 45,
    color: primary,
    width: 170,
    fontFamily: 'OpenSans-Bold'
  },
  Normal: {
    fontFamily: 'OpenSans-Semibold'
  },
})

export default Slide1
