
import React from 'react'
import { View, Animated } from "react-native"

import { s, getTransformedData } from './utils'
import slideBuilder from './slideBuilder'

// IGNORE THIS BUG
import slide1Svg from './slide1.svg'
import { SvgXml } from 'react-native-svg'
import { animateProperty } from '../../animations'

function Slide1({slide}: {slide: 0 | 1 | 2}) {
  
  const active = slide === 0
  const transformed = getTransformedData(active ? 0 : -325)

  return (
    <View>
      <Animated.View
        style={{
          transform: [
            {
              translateX: animateProperty({
                0: -325,
                1: -335,
                2: -345,
              }[slide]),
            },{
              translateY: animateProperty({
                0: 30,
                1: -145,
                2: -240,
              }[slide]),
            }
          ]
        }}
      >
        <SvgXml
          width='850'
          xml={slide1Svg}
        />
      </Animated.View>
      
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

export default slideBuilder(React.memo(Slide1))
