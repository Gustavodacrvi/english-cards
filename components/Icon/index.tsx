

import iconRenderer from "./iconRenderer"

import React from 'react'
import { Animated } from 'react-native'
import { IconInterface } from './../../interfaces'

import {colorChangeDetection} from './../../animations/'

const AnimatedIconRenderer = Animated.createAnimatedComponent(iconRenderer)

function Icon({color, primaryColor, secondaryColor, width = 32, icon, rotate}: IconInterface) {

  return <AnimatedIconRenderer
    width={width}
    icon={icon}
    rotate={rotate}

    primaryColor={colorChangeDetection(color || primaryColor || '#fff')}
    secondaryColor={colorChangeDetection(color || secondaryColor || '#FFD166')}
  />

}

export default Icon

