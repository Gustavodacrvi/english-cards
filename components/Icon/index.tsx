

import iconRenderer from "./iconRenderer"

import React, { useState, useEffect } from 'react'
import { Animated } from 'react-native'
import {IconInterface} from './../../interfaces'

import ColorAnimation from './../../animations/colors'

const AnimatedIconRenderer = Animated.createAnimatedComponent(iconRenderer)

function Icon({color, primaryColor, secondaryColor, width = 32, icon}: IconInterface) {

  return <AnimatedIconRenderer
    width={width}
    icon={icon}

    primaryColor={ColorAnimation(color || primaryColor || '#fff', [primaryColor, color])}
    secondaryColor={ColorAnimation(color || secondaryColor || '#FFD166', [secondaryColor, color])}
  />

}

export default Icon

