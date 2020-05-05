

import React, { useState, useEffect, useCallback, useContext } from 'react'
import {
  Animated,
} from 'react-native'

import { primary, backgroundColor, red } from './../../styles/colors'


import ButtonRenderer from './buttonRenderer'

import { IconInterface } from './../../interfaces'
import { animateProperty } from '../../animations/'

const AnimatedButtonRenderer = Animated.createAnimatedComponent(ButtonRenderer)

interface ButtonProps {
  name: string;
  type?: 'default' | 'white' | 'slides' | 'cancel';
  blocked?: boolean;
  icon?: IconInterface;
  click?: () => void;
}

function Button({
  name,
  type = 'default',
  blocked,
  icon,
  click = (() => {}),
}: ButtonProps) {
  const key = blocked ? 'blocked' : type

  const iconWidth = 22

  return <AnimatedButtonRenderer
    name={name}
    click={click}

    icon={icon}
    iconWidth={iconWidth}

    textColor={animateProperty({
      default: '#fff',
      white: backgroundColor,
      slides: '#fff',
      cancel: '#fff',
    }[key])}
    borderColor={animateProperty({
      default: primary,
      white: '#fff',
      slides: '#fff',
      cancel: red,
    }[key])}
    backgroundColor={animateProperty({
      default: primary,
      white: '#fff',
      slides: backgroundColor,
      cancel: red,
    }[key])}
  />
}

export default Button
