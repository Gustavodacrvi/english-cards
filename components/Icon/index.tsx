

import iconRenderer from "./iconRenderer"

import React from 'react'
import { Animated } from 'react-native'
import { IconInterface } from './../../interfaces'

import ColorAnimation from './../../animations/colors'

const AnimatedIconRenderer = Animated.createAnimatedComponent(iconRenderer)

function Icon({color, primaryColor, secondaryColor, width = 32, icon}: IconInterface) {

  return <AnimatedIconRenderer
    width={width}
    icon={icon}
    

    primaryColor={ColorAnimation(color || primaryColor || '#fff')}
    secondaryColor={ColorAnimation(color || secondaryColor || '#FFD166')}
  />

}

export default Icon

