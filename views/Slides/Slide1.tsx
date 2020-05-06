
import React from 'react'
import { View, Animated } from "react-native"

import { s, getTransformedData } from './utils'
import slideBuilder from './slideBuilder'

function Slide1({slide}: {slide: 0 | 1 | 2}) {
  
  const active = slide === 0
  const transformed = getTransformedData(active ? 0 : -325)

  return (
    <View>
      <Animated.Text
        style={[
          s.Bottom,
          s.Hero,
          transformed,
        ]}
      >
        English Cards
      </Animated.Text>
      <Animated.Text
        style={[
          s.Bottom,
          s.BigText,
          transformed,
        ]}
      >
        Aprenda e revise palavras em inglês usando Flash Cards!
      </Animated.Text>
    </View>
  )
}

export default slideBuilder(Slide1)
