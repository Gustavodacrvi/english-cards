

import iconRenderer from "./iconRenderer"

import React from 'react'
import { Animated } from 'react-native'
import { IconInterface } from './../../interfaces'

import {animateProperty} from './../../animations/'

const AnimatedIconRenderer = Animated.createAnimatedComponent(iconRenderer)

function Icon({color, primaryColor, secondaryColor, width = 32, icon, rotate}: IconInterface) {

  return <AnimatedIconRenderer
    width={width}
    icon={icon}
    rotate={rotate}

    primaryColor={animateProperty(color || primaryColor || '#fff')}
    secondaryColor={animateProperty(color || secondaryColor || '#FFD166')}
  />

}

export default Icon

