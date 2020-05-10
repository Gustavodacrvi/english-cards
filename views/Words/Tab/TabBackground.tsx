
import React from 'react'

import { View, Animated } from 'react-native'
import { primary } from '../../../styles/colors'
import { animateProperty } from '../../../animations'

interface Props {
  left: number;
  width: number;
}

function TabBackground({left, width}: Props) {
  return (
    <Animated.View
      style={{
        transform: [
          {
            translateX: animateProperty(left)
          },
        ],
        width: animateProperty(width, false),

        position: 'absolute',
        height: '100%',
        backgroundColor: primary,
        borderRadius: 8,
      }}
    >

    </Animated.View>
  )
}

export default React.memo(TabBackground)
