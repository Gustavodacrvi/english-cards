

import IconRenderer from "./iconRenderer"

import React from 'react'
import { Animated } from 'react-native'
import { IconInterface } from './../../interfaces'

import {animateProperty} from './../../animations/'

const AnimatedIconRenderer = Animated.createAnimatedComponent(IconRenderer)

function Icon({color, primaryColor, secondaryColor, width = 32, icon, rotate, animate = true}: (IconInterface & {animate?: boolean})) {

  const props = {
    width, icon, rotate,
    primaryColor: animateProperty(color || primaryColor || '#fff'),
    secondaryColor: animateProperty(color || secondaryColor || '#FFD166')
  }
  
  return animate ? <AnimatedIconRenderer {...props} /> :
    <IconRenderer {...props}
      primaryColor={color || primaryColor || '#fff'}
      secondaryColor={color || secondaryColor || '#FFD166'}
    />

}

export default React.memo(Icon)

